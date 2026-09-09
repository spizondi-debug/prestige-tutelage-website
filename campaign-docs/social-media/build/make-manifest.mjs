// Builds the media manifest and campaign README from the files that actually
// exist on disk — and fails if the delivery is incomplete.
//
// This is the verification gate for the campaign: it counts the assets, probes
// every one of them, and refuses to write a manifest describing a set that is
// short, mis-sized or corrupt.

import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../../..')
const docs = resolve(root, 'campaign-docs/social-media')
const plan = JSON.parse(readFileSync(resolve(docs, 'campaign-plan.json'), 'utf8'))

const EXPECT = { square: 12, vertical: 12, video: 12 }
const SPEC = {
  square: { w: 1080, h: 1080 },
  vertical: { w: 1080, h: 1920 },
  video: { w: 1080, h: 1920, min: 15, max: 25 },
}
const DIR = {
  square: 'public/social-posts/posters/square',
  vertical: 'public/social-posts/posters/vertical',
  video: 'public/social-posts/videos',
}

const errors = []
const rows = []

/** PNG dimensions straight from the IHDR chunk — no image library needed. */
function pngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) return null
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) }
}

function probeVideo(file) {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-count_frames',
    '-show_entries', 'stream=width,height,codec_name,pix_fmt,nb_read_frames',
    '-show_entries', 'format=duration',
    '-of', 'json', file,
  ]).toString()
  const j = JSON.parse(out)
  const s = j.streams[0]
  return {
    w: s.width,
    h: s.height,
    codec: s.codec_name,
    pix: s.pix_fmt,
    frames: Number(s.nb_read_frames),
    duration: Number(j.format.duration),
  }
}

for (const post of plan.posts) {
  for (const kind of ['square', 'vertical', 'video']) {
    const rel = `${DIR[kind]}/${post.media[kind]}`
    const abs = resolve(root, rel)
    const tag = `post ${String(post.id).padStart(2, '0')} ${kind}`

    if (!existsSync(abs)) {
      errors.push(`${tag}: missing ${rel}`)
      continue
    }
    const buf = readFileSync(abs)
    const bytes = statSync(abs).size
    const sha = createHash('sha256').update(buf).digest('hex')
    const row = { post: post.id, kind, file: post.media[kind], rel, bytes, sha256: sha }

    if (kind === 'video') {
      const v = probeVideo(abs)
      Object.assign(row, v)
      if (v.w !== SPEC.video.w || v.h !== SPEC.video.h) {
        errors.push(`${tag}: ${v.w}x${v.h}, expected 1080x1920`)
      }
      if (v.codec !== 'h264') errors.push(`${tag}: codec ${v.codec}, expected h264`)
      if (v.pix !== 'yuv420p') errors.push(`${tag}: pix_fmt ${v.pix}, expected yuv420p`)
      if (v.duration < SPEC.video.min || v.duration > SPEC.video.max) {
        errors.push(`${tag}: ${v.duration.toFixed(1)}s, outside the 15-25s brief`)
      }
      // A truncated encode still probes as valid; the frame count is what
      // catches it.
      if (Math.abs(v.frames - v.duration * 30) > 1) {
        errors.push(`${tag}: ${v.frames} frames for ${v.duration.toFixed(1)}s at 30fps`)
      }
    } else {
      const size = pngSize(buf)
      if (!size) {
        errors.push(`${tag}: not a valid PNG`)
      } else {
        Object.assign(row, size)
        if (size.w !== SPEC[kind].w || size.h !== SPEC[kind].h) {
          errors.push(`${tag}: ${size.w}x${size.h}, expected ${SPEC[kind].w}x${SPEC[kind].h}`)
        }
      }
    }
    rows.push(row)
  }
}

for (const kind of Object.keys(EXPECT)) {
  const n = rows.filter((r) => r.kind === kind).length
  if (n !== EXPECT[kind]) errors.push(`counted ${n} ${kind} assets, expected ${EXPECT[kind]}`)
}

if (errors.length) {
  console.error('Manifest NOT written — the delivery is incomplete:\n')
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
}

/* ------------------------------------------------------------ manifest --- */

const mb = (b) => (b / 1024 / 1024).toFixed(2)
const total = rows.reduce((n, r) => n + r.bytes, 0)
const posters = rows.filter((r) => r.kind !== 'video')
const videos = rows.filter((r) => r.kind === 'video')

const csv = [
  ['Post', 'Kind', 'File', 'Path', 'Width', 'Height', 'Duration (s)', 'Bytes', 'SHA-256'],
  ...rows.map((r) => [
    String(r.post).padStart(2, '0'), r.kind, r.file, r.rel,
    r.w, r.h, r.duration ? r.duration.toFixed(1) : '', r.bytes, r.sha256,
  ]),
]
writeFileSync(
  resolve(docs, 'media-manifest.csv'),
  csv.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n') + '\r\n',
)

const manifestMd = `# Media manifest

Generated from the files on disk. Every asset below was opened and probed:
posters are checked for a valid PNG header and exact pixel dimensions, videos
for codec, pixel format, dimensions, duration and frame count.

**Verified:** ${posters.length} posters (${EXPECT.square} square + ${EXPECT.vertical} vertical) · ${videos.length} videos · ${mb(total)} MB total

## Posters

| Post | Format | File | Size | Bytes |
|---|---|---|---|---|
${posters
  .map((r) => `| ${String(r.post).padStart(2, '0')} | ${r.kind} | \`${r.file}\` | ${r.w}×${r.h} | ${r.bytes.toLocaleString()} |`)
  .join('\n')}

## Videos

| Post | File | Size | Duration | Frames | Codec | Bytes |
|---|---|---|---|---|---|---|
${videos
  .map(
    (r) => `| ${String(r.post).padStart(2, '0')} | \`${r.file}\` | ${r.w}×${r.h} | ${r.duration.toFixed(1)}s | ${r.frames} | ${r.codec}/${r.pix} | ${r.bytes.toLocaleString()} |`,
  )
  .join('\n')}

## SHA-256

\`\`\`
${rows.map((r) => `${r.sha256}  ${r.rel}`).join('\n')}
\`\`\`
`
writeFileSync(resolve(docs, 'media-manifest.md'), manifestMd)

/* -------------------------------------------------------------- README --- */

const readme = `# Prestige Tutelage — social media campaign

${plan.campaign.posts} posts. Each has a square poster, a vertical poster and a
vertical video. ${posters.length} posters and ${videos.length} videos in total.

Nothing here is scheduled or published by the build. Every asset is a file for
a person to post.

## What is in this campaign

| Path | Contents |
|---|---|
| \`public/social-posts/posters/square/\` | ${EXPECT.square} posters, 1080 × 1080 PNG |
| \`public/social-posts/posters/vertical/\` | ${EXPECT.vertical} posters, 1080 × 1920 PNG |
| \`public/social-posts/videos/\` | ${EXPECT.video} videos, 1080 × 1920 MP4, H.264, silent |
| \`campaign-docs/social-media/\` | Plan, captions, calendar, posting guide, manifest |

## Documents

| File | What it is for |
|---|---|
| \`campaign-plan.md\` | The full 12-day plan — headline, copy, CTA, caption, hashtags, audience, visual direction, filenames |
| \`captions-and-hashtags.md\` | Final captions to copy and paste, with the file to attach to each |
| \`campaign-calendar.csv\` | The same schedule as a spreadsheet |
| \`linkedin-posting-guide.md\` | Step-by-step manual posting for LinkedIn |
| \`media-manifest.md\` / \`.csv\` | Every file with dimensions, duration and checksum |
| \`campaign-plan.json\` | The source of truth the whole build reads from |

## Channels

- **LinkedIn** — posted manually, following \`linkedin-posting-guide.md\`.
- **Facebook, TikTok, YouTube** — to be prepared later through Metricool.

Nothing was scheduled or published in producing this campaign.

## How the assets are built

Everything derives from \`campaign-plan.json\`. Edit the plan, re-run the
renderers, and the posters, videos and documents all move together.

\`\`\`bash
npm install --no-save playwright          # Chromium is already on the image
export PT_FONT_DIR=/path/to/poppins/woff2 # Poppins 300-800

node campaign-docs/social-media/build/render-posters.mjs    # 24 posters
node campaign-docs/social-media/build/render-videos.mjs     # 12 videos
node campaign-docs/social-media/build/make-docs.mjs         # plan, captions, CSV, guide
node campaign-docs/social-media/build/make-manifest.mjs     # manifest + this README
\`\`\`

Posters render in about a minute. Videos take roughly a minute each.

### Layout is checked, not eyeballed

Both renderers fail the build rather than writing a broken file. They reject
text overflow, clipping, blocks colliding, anything crossing the canvas edge,
single-word widows in headlines, and copy straying into a video safe area.
\`make-manifest.mjs\` then refuses to write a manifest unless all
${posters.length + videos.length} assets exist, open correctly and match the specification.

\`measure-balance.mjs\` reports the residual whitespace on each poster, which is
how the gap above the call-to-action bar was made consistent across the set.

## Brand rules applied

- The supplied logo is placed unaltered — never redrawn, recoloured or replaced.
- Blue \`${plan.brand.colours.blue}\` and green \`${plan.brand.colours.green}\` are sampled from the logo artwork itself.
  Navy, ink and cloud are the repository's own Tailwind tokens.
- ${plan.brand.typography.family} throughout, weights ${plan.brand.typography.weights.join(', ')}.
- Only the five genuine photographs in \`public/images/\` are used.

## Compliance rules applied

${plan.compliance.rules.map((r) => `- ${r}`).join('\n')}

Programme posts carry this wording:

> ${plan.compliance.availabilityDisclaimer}

## Contact details used

- ${plan.contact.website}
- ${plan.contact.email}
- ${plan.contact.phone}
- ${plan.contact.address}
`
writeFileSync(resolve(docs, 'README.md'), readme)

console.log(`Verified ${posters.length} posters and ${videos.length} videos (${mb(total)} MB).`)
console.log('Wrote media-manifest.md, media-manifest.csv, README.md')
