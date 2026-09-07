// Builds a SCRATCH voiceover track for a post and muxes it over the video.
//
// This is a temp track in the sense the industry means it: a stand-in used to
// test pacing and script before booking a person. The voice is SVOX Pico
// (en-GB) and sounds synthetic — it is NOT for publication. What it is good
// for is answering, with real speech rather than a word-count estimate,
// whether each line fits its scene.
//
//   node make-scratch-vo.mjs 2

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import { plan, videoHtml, durationOf, repoRoot, W, H, FPS } from './video.mjs'

const DUCKED_LUFS = -24   // music sits under the voice
const VO_LUFS = -16       // the voice carries the clip

const id = Number(process.argv[2] || 2)
const post = plan.posts.find((p) => p.id === id)
if (!post) throw new Error(`no post ${id}`)

const OUT = process.env.PT_PREVIEW_DIR || '/tmp'
const tmp = resolve(OUT, `vo-${id}`)
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })

/** Same lines as the recording script and the timing preview. */
function lineFor(scene) {
  switch (scene.kind) {
    case 'logo': return 'Prestige Tutelage.'
    case 'statement': case 'photo': return scene.text
    case 'list': return [scene.text, ...(scene.items || [])].filter(Boolean).join('. ') + '.'
    case 'rows': case 'steps': return (scene.items || []).join('. ') + '.'
    case 'facts': return (scene.items || []).map((i) => i.split('|').join(', ')).join('. ') + '.'
    case 'contact': return [scene.text, ...(scene.items || [])].join('. ')
    case 'cta': return scene.text
    default: return ''
  }
}

/**
 * The synthesiser mangles the terms this campaign depends on. Spelling the
 * acronyms out and speaking the URL keeps the scratch track intelligible —
 * a human reader gets these right from the recording script instead.
 */
function speakable(s) {
  return s
    .replace(/prestigetutelage\.co\.za/gi, 'prestige tutelage dot co dot z a')
    .replace(/\bB-BBEE\b/g, 'B, triple B, E, E')
    .replace(/\bNQF\b/g, 'N Q F')
    .replace(/\bSAQA\b/g, 'S A Q A')
    .replace(/\bECD\b/g, 'E C D')
    .replace(/\bCSI\b/g, 'C S I')
    .replace(/\bHR\b/g, 'H R')
    .replace(/\bID\b/g, 'I D')
    .replace(/—/g, ',')
}

let t0 = 0
const cues = post.videoScenes.map((s, i) => {
  const start = t0
  t0 += s.seconds
  return { i, start, budget: s.seconds, line: lineFor(s), kind: s.kind }
})
const seconds = durationOf(post)

// --- synthesise each line -------------------------------------------------
for (const c of cues) {
  c.wav = resolve(tmp, `${String(c.i).padStart(2, '0')}.wav`)
  const r = spawnSync('pico2wave', ['-l', 'en-GB', '-w', c.wav, ' ' + speakable(c.line) + ' '])
  if (r.status !== 0 || !existsSync(c.wav)) throw new Error(`pico2wave failed on scene ${c.i}`)
  const d = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'csv=p=0', c.wav]).stdout.toString().trim()
  c.spoken = Number(d)
  c.over = c.spoken > c.budget - 0.4
}

console.log('measured against real speech, not an estimate:')
cues.forEach((c) =>
  console.log(`  ${c.start.toFixed(1).padStart(4)}s  ${c.kind.padEnd(10)} ` +
    `${c.spoken.toFixed(1)}s spoken / ${c.budget.toFixed(1)}s scene  ${c.over ? 'OVERRUNS' : 'fits'}`))

// --- lay the takes onto one timeline --------------------------------------
// Each take is delayed to its scene start and the whole lot mixed down.
const voMix = resolve(tmp, 'vo.wav')
const inputs = cues.flatMap((c) => ['-i', c.wav])
const delays = cues
  .map((c, n) => `[${n}:a]adelay=${Math.round(c.start * 1000)}|${Math.round(c.start * 1000)}[v${n}]`)
  .join(';')
const mixIn = cues.map((_, n) => `[v${n}]`).join('')
spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...inputs,
  '-filter_complex',
  `${delays};${mixIn}amix=inputs=${cues.length}:normalize=0[m];[m]loudnorm=I=${VO_LUFS}:TP=-2:LRA=11,aresample=48000[a]`,
  '-map', '[a]', '-t', String(seconds), voMix])

// --- render the video -----------------------------------------------------
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
await page.setContent(videoHtml(post), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)

const trackRel = plan.campaign?.audio?.track
const music = trackRel && existsSync(resolve(repoRoot, trackRel)) ? resolve(repoRoot, trackRel) : null
const outFile = resolve(OUT, `post-${String(id).padStart(2, '0')}-scratch-vo.mp4`)

const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
  '-i', voMix,
  ...(music ? ['-stream_loop', '-1', '-i', music] : []),
  '-filter_complex', music
    ? `[2:a]loudnorm=I=${DUCKED_LUFS}:TP=-2:LRA=11,afade=t=in:st=0:d=0.8,afade=t=out:st=${(seconds - 1.5).toFixed(2)}:d=1.5[bed];[1:a][bed]amix=inputs=2:duration=first:normalize=0[a]`
    : `[1:a]anull[a]`,
  '-map', '0:v:0', '-map', '[a]',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
  '-profile:v', 'high', '-level', '4.0', '-movflags', '+faststart', '-r', String(FPS),
  '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2',
  '-t', String(seconds),
  outFile,
])
const done = new Promise((res, rej) => {
  ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg ' + c))))
  ff.stderr.on('data', (d) => process.stderr.write(d))
})
const stage = page.locator('.stage')
for (let i = 0; i < Math.round(seconds * FPS); i++) {
  await page.evaluate((t) => window.renderFrame(t), i / FPS)
  const buf = await stage.screenshot({ type: 'jpeg', quality: 94 })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
}
ff.stdin.end()
await done
await browser.close()
console.log(`\nscratch: ${outFile}`)
