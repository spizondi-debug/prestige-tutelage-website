// Measures every voiceover line by actually synthesising it, and reports
// whether it fits its scene.
//
// Word-count estimates are unreliable here: they miss the pauses at sentence
// breaks, which is most of the difference on list scenes. Synthesising each
// line gives a real duration to design against.

import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { plan } from './video.mjs'

/** Pronunciation fixes so the synth measures the same words a person says. */
function speakable(s) {
  return s
    .replace(/prestigetutelage\.co\.za/gi, 'prestige tutelage dot co dot z a')
    .replace(/\bB-BBEE\b/g, 'B, triple B, E, E')
    .replace(/\bNQF\b/g, 'N Q F')
    .replace(/\bSAQA\b/g, 'S A Q A')
    .replace(/\bECD\b/g, 'E C D')
    .replace(/\bCSI\b/g, 'C S I')
    .replace(/\bHR\b/g, 'H R')
    .replace(/—/g, ',')
}

/** A line needs a beat at each end; it should not run to the very cut. */
const HEADROOM = 0.5

const dir = mkdtempSync(resolve(tmpdir(), 'vo-'))
let tight = 0, over = 0, worst = Infinity

for (const post of plan.posts) {
  let t = 0
  const rows = []
  for (const [i, s] of post.videoScenes.entries()) {
    const start = t
    t += s.seconds
    const wav = resolve(dir, `${post.id}-${i}.wav`)
    spawnSync('pico2wave', ['-l', 'en-GB', '-w', wav, ' ' + speakable(s.vo) + ' '])
    const d = Number(
      spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
        '-of', 'csv=p=0', wav]).stdout.toString().trim(),
    )
    const slack = s.seconds - d
    if (slack < 0) { over++ } else if (slack < HEADROOM) { tight++ }
    worst = Math.min(worst, slack)
    rows.push({ start, end: t, sec: s.seconds, spoken: d, slack, vo: s.vo })
  }
  console.log(`\npost ${String(post.id).padStart(2, '0')} — ${post.theme}`)
  for (const r of rows) {
    const flag = r.slack < 0 ? 'OVER' : r.slack < HEADROOM ? 'tight' : 'ok'
    console.log(
      `  ${r.start.toFixed(1).padStart(4)}-${r.end.toFixed(1).padStart(4)}s  ` +
      `${r.spoken.toFixed(1)}s / ${r.sec.toFixed(1)}s  ${String(r.slack.toFixed(1)).padStart(5)}s  ` +
      `${flag.padEnd(5)}  ${r.vo}`)
  }
}

rmSync(dir, { recursive: true, force: true })
console.log(`\n${over} line(s) overrun, ${tight} tight, tightest slack ${worst.toFixed(1)}s`)
process.exit(over ? 1 : 0)
