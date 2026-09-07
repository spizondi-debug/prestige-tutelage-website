// Renders each post's vertical MP4 by screenshotting deterministic frames and
// piping them to ffmpeg.
//
//   node render-videos.mjs          -> all 12 posts
//   node render-videos.mjs 1        -> only post 1

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { plan, videoHtml, durationOf, repoRoot, W, H, FPS } from './video.mjs'

const only = process.argv.slice(2).map(Number).filter(Boolean)
const posts = only.length ? plan.posts.filter((p) => only.includes(p.id)) : plan.posts

const OUT = resolve(repoRoot, 'public/social-posts/videos')
mkdirSync(OUT, { recursive: true })

/**
 * Background music, if a track has been supplied.
 *
 * The campaign default lives at plan.campaign.audio.track; a post may override
 * it with its own `audioTrack`. Paths are relative to the repo root. When no
 * track is present the render stays silent, exactly as before — the videos are
 * designed to be understood with the sound off either way.
 *
 * These videos carry no voiceover, so the music is the only audio and should sit
 * at a normal listening level rather than ducked under a voice. Rather than
 * trusting whatever level the supplied file happens to have, the track is
 * loudness-normalised to -14 LUFS with -1.5 dBTP headroom: the target the
 * platforms normalise to anyway, so the clip is neither quiet nor clipped.
 *
 * If a voiceover is added later, drop LUFS_TARGET to about -24 so the music
 * sits under the voice.
 */
const LUFS_TARGET = Number(process.env.PT_AUDIO_LUFS ?? -14)
const TRUE_PEAK = -1.5
const FADE_IN = 0.8
const FADE_OUT = 1.5

function trackFor(post) {
  const rel = post.audioTrack ?? plan.campaign?.audio?.track
  if (!rel) return null
  const abs = resolve(repoRoot, rel)
  if (!existsSync(abs)) {
    console.log(`     ! audio track not found, rendering silent: ${rel}`)
    return null
  }
  return abs
}

/** ffmpeg arguments for muxing the bed under a clip of `seconds`. */
function audioArgs(track, seconds) {
  if (!track) return { input: [], output: ['-an'] }
  return {
    // Loop the track so a short bed still covers the whole clip.
    input: ['-stream_loop', '-1', '-i', track],
    output: [
      '-map', '0:v:0', '-map', '1:a:0',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2',
      '-af', [
        `loudnorm=I=${LUFS_TARGET}:TP=${TRUE_PEAK}:LRA=11`,
        'aresample=48000',
        `afade=t=in:st=0:d=${FADE_IN}`,
        `afade=t=out:st=${(seconds - FADE_OUT).toFixed(2)}:d=${FADE_OUT}`,
      ].join(','),
      // Cut the looped audio at the video's length.
      '-shortest', '-fflags', '+shortest', '-max_interleave_delta', '0',
    ],
  }
}

/** Checks the copy fits the frame before spending a minute encoding it. */
function auditVideoPage() {
  const problems = []
  for (const scene of document.querySelectorAll('.scene')) {
    const prev = scene.style.opacity
    scene.style.opacity = '1'
    const stage = document.querySelector('.stage').getBoundingClientRect()
    // The progress hairline and platform UI live in the bottom band.
    const safeBottom = stage.bottom - 150
    for (const el of scene.querySelectorAll('.ln, .ln span')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      const label = `${scene.dataset.start}s "${el.textContent.trim().slice(0, 38)}"`
      if (r.right > stage.right + 0.5) problems.push(`past right edge ${label}`)
      if (r.left < stage.left - 0.5) problems.push(`past left edge ${label}`)
      if (r.bottom > safeBottom) problems.push(`enters bottom safe area ${label}`)
      if (r.top < stage.top + 60) problems.push(`enters top safe area ${label}`)
      if (el.scrollWidth > el.clientWidth + 1) problems.push(`clipped ${label}`)
    }
    scene.style.opacity = prev
  }
  return problems
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})

let failures = 0
for (const post of posts) {
  const seconds = durationOf(post)
  const frames = Math.round(seconds * FPS)
  const outFile = resolve(OUT, post.media.video)

  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  await page.setContent(videoHtml(post), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)

  const problems = await page.evaluate(auditVideoPage)
  if (problems.length) {
    failures += problems.length
    console.log(`FAIL post ${String(post.id).padStart(2, '0')} video layout`)
    ;[...new Set(problems)].forEach((p) => console.log(`       - ${p}`))
    await page.close()
    continue
  }

  const track = trackFor(post)
  const audio = audioArgs(track, seconds)
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    ...audio.input,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '23',
    '-pix_fmt', 'yuv420p',
    // Baseline-friendly settings so the file plays everywhere it is posted.
    '-profile:v', 'high', '-level', '4.0',
    '-movflags', '+faststart',
    '-r', String(FPS),
    ...audio.output,
    outFile,
  ])
  const done = new Promise((res, rej) => {
    ff.on('close', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exit ${code}`))))
    ff.stderr.on('data', (d) => process.stderr.write(d))
  })

  const stage = page.locator('.stage')
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.renderFrame(t), i / FPS)
    const buf = await stage.screenshot({ type: 'jpeg', quality: 96 })
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  await page.close()

  console.log(
    `ok   post ${String(post.id).padStart(2, '0')} ${post.media.video}  ${seconds.toFixed(1)}s  ` +
      `${frames} frames  ${track ? 'music' : 'silent'}`,
  )
}

await browser.close()
if (failures) {
  console.log(`\n${failures} video layout problem(s).`)
  process.exit(1)
}
console.log('\nVideos rendered.')
