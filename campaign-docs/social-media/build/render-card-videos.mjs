// Turns a light-card poster into a postable clip.
//
// TikTok and YouTube Shorts take video, not stills, so a card that only exists
// as a PNG can go to Facebook and nowhere else. This wraps the rendered card in
// a slow push and the campaign music bed, using the same loudness treatment as
// render-videos.mjs so the two registers sound identical in a feed.
//
//   node render-card-videos.mjs            -> every card
//   node render-card-videos.mjs friday     -> one card by key

import { spawnSync } from 'node:child_process'
import { mkdirSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { plan, repoRoot } from './card.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const cards = JSON.parse(readFileSync(resolve(here, '../cards.json'), 'utf8'))

const only = process.argv.slice(2)
const chosen = only.length ? cards.filter((c) => only.includes(c.key)) : cards
if (!chosen.length) {
  console.error(`No card matched. Known keys: ${cards.map((c) => c.key).join(', ')}`)
  process.exit(1)
}

const W = 1080
const H = 1920
const FPS = 30
const SECONDS = 15
const FRAMES = SECONDS * FPS

// Matches render-videos.mjs exactly: the platforms normalise to -14 LUFS
// anyway, so hitting it here means neither register is quieter than the other
// when they land next to each other in someone's feed.
const LUFS_TARGET = Number(process.env.PT_AUDIO_LUFS ?? -14)
const TRUE_PEAK = -1.5
const FADE_IN = 0.8
const FADE_OUT = 1.5

const OUT = resolve(repoRoot, 'public/social-posts/cards')
mkdirSync(OUT, { recursive: true })

// A card may name its own track; otherwise it falls back to the campaign bed.
// The two registers want different music — the navy sequence posts carry a
// restrained corporate underscore, and a greeting card can carry something with
// a pulse — so this is a per-card override rather than a change to the default.
function trackFor(card) {
  const rel = card.audioTrack ?? plan.campaign?.audio?.track
  return rel ? resolve(repoRoot, rel) : null
}

let failed = false

for (const card of chosen) {
  const still = resolve(repoRoot, `public/social-posts/cards/${card.file}-vertical.png`)
  if (!existsSync(still)) {
    console.error(`FAIL ${card.key}: render the poster first — missing ${still}`)
    failed = true
    continue
  }

  const out = resolve(OUT, `${card.file}.mp4`)
  const track = trackFor(card)
  const hasAudio = track && existsSync(track)
  if (!hasAudio) console.log(`     ! no audio track, rendering silent`)

  /* The push is 4% over fifteen seconds — about a pixel every four frames.
     The still is oversampled first so the zoom resamples from real detail
     rather than enlarging 1080px of type, which is what makes a zoomed still
     look soft. 1.5x covers a 1.04 zoom with detail to spare.

     `d=1` is the part that matters. The input is `-loop 1 -t 15`, so ffmpeg
     hands zoompan 450 identical frames — and zoompan emits `d` frames for
     every frame it receives. At d=450 that is 450 x 450 = 202,500 frames,
     which is why the first version of this ran for eleven minutes without
     finishing. At d=1 each input frame yields one output frame and `on`
     counts across the whole stream, which is what the zoom expression reads
     anyway. */
  const OVERSAMPLE = 1.5
  const video =
    `scale=${Math.round(W * OVERSAMPLE)}:${Math.round(H * OVERSAMPLE)},` +
    `zoompan=z='1+0.04*on/${FRAMES}':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'` +
    `:s=${W}x${H}:fps=${FPS},` +
    `fade=t=in:st=0:d=0.6,fade=t=out:st=${SECONDS - 0.8}:d=0.8,format=yuv420p`

  const args = [
    '-y', '-loglevel', 'error',
    '-loop', '1', '-framerate', String(FPS), '-t', String(SECONDS), '-i', still,
    ...(hasAudio ? ['-stream_loop', '-1', '-i', track] : []),
    '-vf', video,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
    '-r', String(FPS), '-movflags', '+faststart',
    ...(hasAudio
      ? ['-map', '0:v:0', '-map', '1:a:0',
         '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2',
         '-af', [
           `loudnorm=I=${LUFS_TARGET}:TP=${TRUE_PEAK}:LRA=11`,
           'aresample=48000',
           `afade=t=in:st=0:d=${FADE_IN}`,
           `afade=t=out:st=${(SECONDS - FADE_OUT).toFixed(2)}:d=${FADE_OUT}`,
         ].join(','),
         '-shortest', '-fflags', '+shortest', '-max_interleave_delta', '0']
      : ['-an']),
    out,
  ]

  const r = spawnSync('ffmpeg', args, { encoding: 'utf8' })
  if (r.status !== 0) {
    console.error(`FAIL ${card.key}\n${r.stderr}`)
    failed = true
    continue
  }
  console.log(`ok   ${card.key.padEnd(10)} ${card.file}.mp4  ${SECONDS}s  ${hasAudio ? 'music' : 'silent'}`)
}

if (failed) process.exit(1)
console.log('\nCard videos rendered.')
