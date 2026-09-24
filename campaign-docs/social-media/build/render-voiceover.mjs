// Renders a video with the RECORDED voiceover laid against its scenes.
//
// The takes and their positions come from voiceover-takes.json, measured from
// the recording rather than estimated. A placement may stretch scene lengths;
// that override applies to this cut only, so the published music-only asset is
// never touched. Music is side-chain ducked by the voice instead of being held
// at a flat low level, so it stays present through the scenes nobody speaks in.
//
//   node render-voiceover.mjs 1

import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { plan, videoHtml, repoRoot, W, H, FPS } from './video.mjs'

const VO_LUFS = -16      // the voice carries the clip
const MUSIC_LUFS = -18   // bed level when nobody is speaking; the duck takes it down
const FADE_IN = 0.8
const FADE_OUT = 1.5
/** Brief: every campaign video stays between these. */
const MIN_S = 15, MAX_S = 25

const docs = resolve(repoRoot, 'campaign-docs/social-media')
const vo = JSON.parse(readFileSync(resolve(docs, 'voiceover-takes.json'), 'utf8'))
const takes = Object.fromEntries(vo.takes.map((t) => [t.id, t]))

const id = Number(process.argv[2] || 1)
const place = vo.placements.find((p) => p.post === id)
if (!place) throw new Error(`no voiceover placement for post ${id}`)
const base = plan.posts.find((p) => p.id === id)
if (!base) throw new Error(`no post ${id}`)

// --- apply the scene-length override to a COPY, never to the plan ----------
const post = JSON.parse(JSON.stringify(base))
if (place.sceneSeconds) {
  if (place.sceneSeconds.length !== post.videoScenes.length)
    throw new Error(`post ${id}: ${place.sceneSeconds.length} overrides for ${post.videoScenes.length} scenes`)
  post.videoScenes.forEach((s, i) => { s.seconds = place.sceneSeconds[i] })
}
const seconds = post.videoScenes.reduce((a, s) => a + s.seconds, 0)
if (seconds < MIN_S || seconds > MAX_S)
  throw new Error(`post ${id}: ${seconds}s is outside the ${MIN_S}-${MAX_S}s brief`)

// --- check every cue lands inside the clip, and report its scene -----------
let t = 0
const starts = post.videoScenes.map((s) => { const a = t; t += s.seconds; return a })
const sceneAt = (x) => {
  const i = starts.findIndex((st, n) => x >= st && x < st + post.videoScenes[n].seconds)
  return i < 0 ? '(past end)' : `${i} ${post.videoScenes[i].kind}`
}
const cues = place.cues.map((c) => {
  const take = takes[c.take]
  if (!take) throw new Error(`unknown take ${c.take}`)
  const dur = take.out - take.in
  const end = c.at + dur
  if (end > seconds) throw new Error(`take ${c.take} ends at ${end.toFixed(2)}s, past the ${seconds}s clip`)
  return { ...c, take, dur, end }
})
console.log(`post ${String(id).padStart(2, '0')} — ${post.theme}  (${seconds.toFixed(1)}s)`)
for (const c of cues)
  console.log(`  ${c.at.toFixed(2).padStart(5)}-${c.end.toFixed(2).padStart(5)}s  scene ${sceneAt(c.at).padEnd(12)} "${c.take.text}"`)

// --- cut each take out of the recording ------------------------------------
const src = resolve(repoRoot, vo.source)
if (!existsSync(src)) throw new Error(`recording missing: ${vo.source}`)
const OUT = process.env.PT_PREVIEW_DIR || resolve(repoRoot, '.vo-out')
mkdirSync(OUT, { recursive: true })
const tmp = resolve(OUT, `vo-cut-${id}`)
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })

for (const [n, c] of cues.entries()) {
  c.wav = resolve(tmp, `${String(n).padStart(2, '0')}.wav`)
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src,
    '-ss', String(c.take.in), '-to', String(c.take.out),
    '-ar', '48000', '-ac', '2', c.wav])
  if (r.status !== 0 || !existsSync(c.wav)) throw new Error(`could not cut take ${c.take.id}`)
}

// --- lay the takes on one timeline at their cue points ---------------------
const voBed = resolve(tmp, 'vo.wav')
const delays = cues
  .map((c, n) => `[${n}:a]adelay=${Math.round(c.at * 1000)}|${Math.round(c.at * 1000)}[d${n}]`)
  .join(';')
const mixIn = cues.map((_, n) => `[d${n}]`).join('')
const mk = spawnSync('ffmpeg', ['-y', '-loglevel', 'error',
  ...cues.flatMap((c) => ['-i', c.wav]),
  '-filter_complex',
  `${delays};${mixIn}amix=inputs=${cues.length}:normalize=0[m];` +
  `[m]loudnorm=I=${VO_LUFS}:TP=-2:LRA=11,aresample=48000,apad[a]`,
  '-map', '[a]', '-t', String(seconds), voBed])
if (mk.status !== 0) throw new Error('could not build the voiceover bed')

// --- render ----------------------------------------------------------------
const trackRel = plan.campaign?.audio?.track
const music = trackRel && existsSync(resolve(repoRoot, trackRel)) ? resolve(repoRoot, trackRel) : null
const outFile = resolve(OUT, `post-${String(id).padStart(2, '0')}-voiceover.mp4`)

const filter = music
  ? `[1:a]asplit=2[vo][key];` +
    `[2:a]loudnorm=I=${MUSIC_LUFS}:TP=-2:LRA=11,aresample=48000,` +
    `afade=t=in:st=0:d=${FADE_IN},afade=t=out:st=${(seconds - FADE_OUT).toFixed(2)}:d=${FADE_OUT}[bed];` +
    // The voice keys the compressor, so music dips only while she is speaking.
    `[bed][key]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=450[duck];` +
    `[vo][duck]amix=inputs=2:duration=first:normalize=0[a]`
  : `[1:a]anull[a]`

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await page.setContent(videoHtml(post), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)

const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
  '-i', voBed,
  ...(music ? ['-stream_loop', '-1', '-i', music] : []),
  '-filter_complex', filter,
  '-map', '0:v:0', '-map', '[a]',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
  '-profile:v', 'high', '-level', '4.0', '-movflags', '+faststart', '-r', String(FPS),
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2',
  '-t', String(seconds), outFile])
const done = new Promise((res, rej) => {
  ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c))))
  ff.stderr.on('data', (d) => process.stderr.write(d))
})

const stage = page.locator('.stage')
const frames = Math.round(seconds * FPS)
for (let i = 0; i < frames; i++) {
  await page.evaluate((x) => window.renderFrame(x), i / FPS)
  const buf = await stage.screenshot({ type: 'jpeg', quality: 96 })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
}
ff.stdin.end()
await done
await browser.close()
rmSync(tmp, { recursive: true, force: true })
console.log(`\nvoiceover cut: ${outFile}`)
