// Generates the human-readable campaign documents from campaign-plan.json, so
// the plan, the captions and the posting guide can never drift apart.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../../..')
const docs = resolve(root, 'campaign-docs/social-media')
const plan = JSON.parse(readFileSync(resolve(docs, 'campaign-plan.json'), 'utf8'))

const P = plan.posts
const pad = (n) => String(n).padStart(2, '0')

/* ---------------------------------------------------------------- plan --- */

const planMd = `# Prestige Tutelage — 12-day social media campaign plan

**Campaign:** ${plan.campaign.name}
**Owner:** ${plan.campaign.owner}
**Posts:** ${plan.campaign.posts} · one per campaign day
**Primary call to action:** ${plan.campaign.primaryCta}
**Language:** ${plan.campaign.language}

## Channels

| Channel | Handling |
|---|---|
| LinkedIn | ${plan.campaign.channels.linkedin} |
| Facebook | ${plan.campaign.channels.facebook} |
| TikTok | ${plan.campaign.channels.tiktok} |
| YouTube | ${plan.campaign.channels.youtube} |

Nothing in this campaign is scheduled or published by the build. Every asset is
produced as a file for a person to post.

## Asset specification

| Asset | Specification |
|---|---|
| Square poster | ${plan.campaign.assetSpec.square} |
| Vertical poster | ${plan.campaign.assetSpec.vertical} |
| Video | ${plan.campaign.assetSpec.video} |

## Brand

- **Logo** — \`${plan.brand.logo}\`. ${plan.brand.logoNote}
- **Blue** \`${plan.brand.colours.blue}\` · **Green** \`${plan.brand.colours.green}\` · **Navy** \`${plan.brand.colours.blueDeep}\`
- ${plan.brand.colourNote}
- **Typography** — ${plan.brand.typography.family}, weights ${plan.brand.typography.weights.join(', ')}. ${plan.brand.typography.note}
- **Tagline** — ${plan.brand.tagline}

## Compliance rules applied to every post

${plan.compliance.rules.map((r) => `- ${r}`).join('\n')}

Standard availability wording used across programme posts:

> ${plan.compliance.availabilityDisclaimer}

## Photography

Only genuine photographs already in the repository are used. No AI-generated
people appear anywhere in the campaign.

| File | Used by posts |
|---|---|
${plan.photography.map((p) => `| \`${p.file}\` | ${p.usedBy.map((n) => pad(n)).join(', ')} |`).join('\n')}

---

${P.map(
  (p) => `## Day ${p.day} — Post ${pad(p.id)}: ${p.theme}

**Headline:** ${p.headline}${p.headlineSquare ? `\n**Headline (square):** ${p.headlineSquare}` : ''}

**Supporting copy:** ${p.subhead}

**On-poster points:**
${p.points.map((x) => `- ${x}`).join('\n')}
${p.squarePoints ? `\n**Square variant points:**\n${p.squarePoints.map((x) => `- ${x}`).join('\n')}\n` : ''}
**Call to action:** ${p.cta}

**Target audience:** ${p.audience}

**Visual direction:** ${p.visualDirection}
${p.footnote ? `\n**Compliance footnote on the poster:** ${p.footnote}\n` : ''}
**Caption:**

${p.caption
  .split('\n')
  .map((l) => (l.trim() ? `> ${l}` : '>'))
  .join('\n')}

**Hashtags:** ${p.hashtags.join(' ')}

**Media filenames:**

- \`public/social-posts/posters/square/${p.media.square}\`
- \`public/social-posts/posters/vertical/${p.media.vertical}\`
- \`public/social-posts/videos/${p.media.video}\`

**Video scenes:** ${p.videoScenes.map((s) => s.kind).join(' → ')} · ${p.videoScenes
    .reduce((n, s) => n + s.seconds, 0)
    .toFixed(1)}s
`,
).join('\n---\n\n')}
`

writeFileSync(resolve(docs, 'campaign-plan.md'), planMd)

/* ------------------------------------------------- captions & hashtags --- */

const captionsMd = `# Prestige Tutelage — final captions and hashtags

Copy each caption exactly as written. The hashtags sit on their own line at the
end of the post. Captions are written in South African English.

${P.map(
  (p) => `## Post ${pad(p.id)} — ${p.theme}

**Attach:** \`${p.media.square}\` (feed) · \`${p.media.vertical}\` (story/reel) · \`${p.media.video}\` (video)

\`\`\`
${p.caption}

${p.hashtags.join(' ')}
\`\`\`

**Character count (caption without hashtags):** ${p.caption.length}
**Hashtags:** ${p.hashtags.length}
`,
).join('\n---\n\n')}
`

writeFileSync(resolve(docs, 'captions-and-hashtags.md'), captionsMd)

/* --------------------------------------------------------------- CSV ----- */

const csvCell = (v) => `"${String(v).replace(/"/g, '""').replace(/\n/g, ' ')}"`
const csvRows = [
  [
    'Day', 'Post', 'Theme', 'Headline', 'Call to action', 'Target audience',
    'Caption', 'Hashtags', 'Square poster', 'Vertical poster', 'Video',
    'Video seconds', 'LinkedIn', 'Facebook', 'TikTok', 'YouTube',
  ],
  ...P.map((p) => [
    p.day, pad(p.id), p.theme, p.headline, p.cta, p.audience,
    p.caption, p.hashtags.join(' '),
    p.media.square, p.media.vertical, p.media.video,
    p.videoScenes.reduce((n, s) => n + s.seconds, 0).toFixed(1),
    'Manual', 'Metricool', 'Metricool', 'Metricool',
  ]),
]
writeFileSync(
  resolve(docs, 'campaign-calendar.csv'),
  csvRows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n',
)

/* --------------------------------------------------- LinkedIn guide ------ */

const linkedinMd = `# LinkedIn manual-posting guide

LinkedIn is posted by hand. Facebook, TikTok and YouTube are prepared later
through Metricool. Nothing in this campaign is scheduled or published
automatically.

## Which file goes where

| Post type | File to upload | Why |
|---|---|---|
| Single image post | \`posters/square/…-square.png\` | 1080 × 1080 is LinkedIn's most reliable feed crop on desktop and mobile |
| Video post | \`videos/….mp4\` | 1080 × 1920, H.264, silent |
| Story-style reuse | \`posters/vertical/…-vertical.png\` | Kept for reuse on vertical surfaces |

Post either the square poster **or** the video on a given day — not both. The
vertical poster is there for reuse elsewhere, not as a second LinkedIn post.

## Posting steps

1. Open the Prestige Tutelage company page and choose **Start a post**.
2. Paste the caption from \`captions-and-hashtags.md\` for that day's post.
   Paste it as plain text so no formatting is carried across.
3. Leave a blank line before the hashtag line so it sits on its own.
4. Click the image or video icon and upload the file named in the guide above.
5. Wait for the thumbnail to finish processing before you continue — a video
   uploaded and posted immediately can publish without its preview frame.
6. Check the preview on both desktop and mobile before posting.
7. Post. Do not edit the post within the first hour; edits reset reach.

## Before you post — a short check

- The caption matches the file exactly (post 04's caption with post 04's image).
- The hashtag line is present and sits on its own line.
- Any compliance footnote in the caption has been left in. The availability and
  B-BBEE scope wording is deliberate and must not be trimmed for length.
- The website address reads \`${plan.contact.website}\`.

## Videos

The videos carry no audio by design and are built to be understood with the
sound off. LinkedIn autoplays muted, so no captions file is required. Do not
add background music without checking licensing.

## Contact details used in the campaign

- Website — ${plan.contact.website}
- Email — ${plan.contact.email}
- Phone — ${plan.contact.phone}
- Address — ${plan.contact.address}

## Posting order

${P.map((p) => `${p.day}. **Post ${pad(p.id)}** — ${p.theme}`).join('\n')}
`

writeFileSync(resolve(docs, 'linkedin-posting-guide.md'), linkedinMd)

console.log('Wrote campaign-plan.md, captions-and-hashtags.md, campaign-calendar.csv, linkedin-posting-guide.md')
