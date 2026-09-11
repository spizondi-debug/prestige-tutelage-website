# Prestige Tutelage — social media campaign

12 posts in the sequence, plus 1 standalone post. Each has a square
poster, a vertical poster and a vertical video. 26 posters and 13 videos
in total.

Nothing here is scheduled or published by the build. Every asset is a file for
a person to post.

## What is in this campaign

| Path | Contents |
|---|---|
| `public/social-posts/posters/square/` | 13 posters, 1080 × 1080 PNG |
| `public/social-posts/posters/vertical/` | 13 posters, 1080 × 1920 PNG |
| `public/social-posts/videos/` | 13 videos, 1080 × 1920 MP4, H.264, silent |
| `campaign-docs/social-media/` | Plan, captions, calendar, posting guide, manifest |

## Documents

| File | What it is for |
|---|---|
| `campaign-plan.md` | The full 12-day plan — headline, copy, CTA, caption, hashtags, audience, visual direction, filenames |
| `captions-and-hashtags.md` | Final captions to copy and paste, with the file to attach to each |
| `campaign-calendar.csv` | The same schedule as a spreadsheet |
| `linkedin-posting-guide.md` | Step-by-step manual posting for LinkedIn |
| `media-manifest.md` / `.csv` | Every file with dimensions, duration and checksum |
| `campaign-plan.json` | The source of truth the whole build reads from |

## Channels

- **LinkedIn** — posted manually, following `linkedin-posting-guide.md`.
- **Facebook, TikTok, YouTube** — to be prepared later through Metricool.

Nothing was scheduled or published in producing this campaign.

## How the assets are built

Everything derives from `campaign-plan.json`. Edit the plan, re-run the
renderers, and the posters, videos and documents all move together.

```bash
npm install --no-save playwright          # Chromium is already on the image
export PT_FONT_DIR=/path/to/poppins/woff2 # Poppins 300-800

node campaign-docs/social-media/build/render-posters.mjs    # 24 posters
node campaign-docs/social-media/build/render-videos.mjs     # 12 videos
node campaign-docs/social-media/build/make-docs.mjs         # plan, captions, CSV, guide
node campaign-docs/social-media/build/make-manifest.mjs     # manifest + this README
```

Posters render in about a minute. Videos take roughly a minute each.

### Layout is checked, not eyeballed

Both renderers fail the build rather than writing a broken file. They reject
text overflow, clipping, blocks colliding, anything crossing the canvas edge,
single-word widows in headlines, and copy straying into a video safe area.
`make-manifest.mjs` then refuses to write a manifest unless all
39 assets exist, open correctly and match the specification.

`measure-balance.mjs` reports the residual whitespace on each poster, which is
how the gap above the call-to-action bar was made consistent across the set.

## Brand rules applied

- The supplied logo is placed unaltered — never redrawn, recoloured or replaced.
- Blue `#006FD8` and green `#2DA22F` are sampled from the logo artwork itself.
  Navy, ink and cloud are the repository's own Tailwind tokens.
- Poppins throughout, weights 300, 400, 500, 600, 700, 800.
- Only the five genuine photographs in `public/images/` are used.

## Compliance rules applied

- No invented statistics, completion rates, learner numbers or client counts.
- No named clients, testimonials or logos that are not supplied and approved.
- No AI-generated people. Only the five genuine photographs already in the repository.
- SAQA IDs, NQF levels and credits are quoted only where the repository holds a verified value.
- Short courses are never described as accredited or credit-bearing.
- B-BBEE posts claim Level 1 contributor status only, with no guarantee of client scorecard outcomes.
- Prestige is never presented as a B-BBEE verification agency.

Programme posts carry this wording:

> Programme availability is subject to current qualification registration, Prestige Tutelage's applicable accreditation or approved delivery route, learner eligibility, workplace requirements and the relevant assessment and certification arrangements.

## Contact details used

- prestigetutelage.co.za
- info@prestigetutelage.co.za
- 010 065 0822
- 64 Hill Street, Ferndale, Randburg, 2194
