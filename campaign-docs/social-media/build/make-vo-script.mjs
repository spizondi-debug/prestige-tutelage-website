// Generates the voiceover recording script from campaign-plan.json.
//
// Each scene gets the line to read, the window it has to land in, and a
// warning where the line will not fit at a measured delivery pace. Keeping it
// generated means the script can never drift from the videos it belongs to.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const docs = resolve(here, '../../..', 'campaign-docs/social-media')
const plan = JSON.parse(readFileSync(resolve(docs, 'campaign-plan.json'), 'utf8'))

/** Words per second for unhurried, credible corporate delivery. */
const WPS = 2.5
/** Leave a breath at each end of a scene rather than talking over the cut. */
const HEADROOM = 0.5

const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length
const secs = (s) => words(s) / WPS

/**
 * The approved spoken line for a scene. Deliberately shorter than the on-screen
 * copy: the voice complements the visuals rather than reading them aloud, and
 * every line here has been measured against its scene by synthesising it.
 */
const lineFor = (scene) => scene.vo || ''

let overruns = 0
const body = plan.posts
  .map((post) => {
    let t = 0
    const rows = post.videoScenes.map((s) => {
      const start = t
      t += s.seconds
      const line = lineFor(s)
      const need = secs(line)
      const fits = need <= s.seconds - HEADROOM
      if (!fits) overruns++
      return { start, end: t, line, need, budget: s.seconds, fits, kind: s.kind }
    })
    return `## Post ${String(post.id).padStart(2, '0')} — ${post.theme}

Total ${t.toFixed(1)}s. Read each line inside its window, leaving a beat at both ends.

| Window | Scene | Line to read | Est. | Fits |
|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| ${r.start.toFixed(1)}–${r.end.toFixed(1)}s | ${r.kind} | ${r.line ? r.line.replace(/\|/g, '\\|') : '*(silent)*'} | ${r.need.toFixed(1)}s | ${r.fits ? 'yes' : '**tight**'} |`,
  )
  .join('\n')}
`
  })
  .join('\n')

const md = `# Voiceover recording script

Read against the videos in \`public/social-posts/videos/\`. The lines are shorter than the
on-screen copy on purpose: the viewer can already read the screen, so the voice
adds to it rather than repeating it. Every line has been measured against its
scene, so if you read at a natural pace it will fit.

## How to record it

- **Anywhere quiet with soft furnishings.** A room with curtains and a carpet
  beats an office with hard walls. Avoid anywhere with an air conditioner.
- **A phone is fine.** Hold it a hand's width away, slightly off to the side so
  breath does not hit the microphone. Record in a voice memo app at the highest
  quality it offers.
- **One scene per take.** Do not try to read a whole post in one pass. Short
  takes are easier to get right and far easier to edit.
- **Leave three seconds of silence** at the start of the first recording. That
  gives a noise profile to work from if the room turns out to be noisier than
  it sounded.
- **Read slightly slower than feels natural.** The estimates below assume
  ${WPS} words per second, which is unhurried on purpose.
- **A South African voice.** These posts speak to South African employers about
  South African qualifications. Send the files however is easiest — one file
  per scene, or one long file with pauses between takes.

## Pronunciation

Say these as letters, not words: **NQF**, **SAQA** ("sacka" is wrong — S-A-Q-A),
**B-BBEE**, **ECD**, **CSI**, **HR**. Numbers read naturally: "SAQA ID one one
eight seven four zero", "NQF Level five", "two hundred and forty credits".

## What happens after you send it

The music drops to about -24 LUFS so it sits under the voice instead of
competing, the takes are placed against their scenes, and the videos are
re-rendered. Nothing about the visuals changes.

${overruns > 0 ? `> **${overruns} line(s) are tight** against their scene window and are marked below. Either read those briskly, or say the word and the scene can be lengthened — the videos have room to grow a second or two before they run past the 25s brief.\n` : ''}
---

${body}`

writeFileSync(resolve(docs, 'voiceover-script.md'), md)
console.log(`Wrote voiceover-script.md — ${plan.posts.length} posts, ${overruns} tight line(s)`)
