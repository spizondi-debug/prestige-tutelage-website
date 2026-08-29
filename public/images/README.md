# Site assets

All photography on this site is real. There are no placeholders: sections
without a suitable photograph are designed without one rather than filled.

## Logo

`public/prestige-tutelage-logo.png` — the supplied original, trimmed of its
white margin and given an alpha channel so it sits cleanly on the cream
navigation and the dark footer. Colours and artwork are unaltered.
**Do not redraw, recolour or substitute it.**

`favicon.png` / `apple-touch-icon.png` are cropped from the logo's figure mark.

## Photography in use

### Prestige's own photographs

| File | Used on | Shows |
|------|---------|-------|
| `facilitator-session.jpg` | Corporate Training | A facilitator leading a session with learners |
| `training-room.jpg` | Office & Training Space Rental | A Prestige training room, Prestige slide on screen |
| `workshop-training.jpg` | Corporate Training | Practical training in full PPE, angle grinder |
| `learner-cohort.jpg` | Recruitment | A learner intake outside the training venue |
| `certificates-cohort.jpg` | Homepage impact | Learners with Prestige certificates of completion |

### Licensed stock

| File | Used on |
|------|---------|
| `graduate-portrait-hero.jpg` | Homepage hero |
| `graduate-celebrating.jpg` | Homepage learnerships · Programmes |
| `graduates-group.jpg` | About |
| `bbbee-consultation.jpg` | B-BBEE Consulting |
| `recruitment-interview.jpg` | Recruitment |
| `young-professional.jpg` | Growth Pathways |

Everything is cropped to the aspect its slot uses (so CSS never re-crops),
resized to 1100–1600px on the long edge and saved as progressive JPEG at
quality 82–84.

## Formats

Every `.jpg` has a `.webp` sibling at the same dimensions (quality 82). The
`Photo` component serves WebP through `<picture>` with the JPEG as fallback,
so nothing breaks on a browser that cannot read WebP. Across the library that
is 2337KB down to 1452KB — 38% less to download.

`Photo` also emits intrinsic `width`/`height` from `src/data/imageMeta.js`, so
the browser reserves the right box and the page does not jump as photos load.
Hero images load eagerly at high priority; everything else is lazy.

Regenerate both the WebP files and the meta after adding or recropping an
image:

    npm run build:images

## Page hero images

Every interior page opens with a photograph beside its heading, assigned so it
never repeats an image already used further down that same page:

| Page | Hero image |
|------|-----------|
| About | `graduate-portrait-hero.jpg` |
| Programmes | `graduates-group.jpg` |
| Short Courses | `young-professional.jpg` |
| Industries | `workshop-training.jpg` |
| Growth Pathways | `graduate-celebrating.jpg` |
| Corporate Training | `training-room.jpg` |
| Services | `facilitator-session.jpg` |
| Business Solutions | `learner-cohort.jpg` |
| B-BBEE Consulting | `certificates-cohort.jpg` |
| Recruitment | `young-professional.jpg` |
| Office & Training Space | `facilitator-session.jpg` |
| Assessment Centre | `certificates-cohort.jpg` |
| Insights | `graduate-portrait-hero.jpg` |
| Insight articles | by category — see `ARTICLE_HERO` in `InsightArticle.jsx` |
| Contact | `bbbee-consultation.jpg` |

There are 11 photographs for 15 hero slots, so four images appear on two pages
each: `graduate-portrait-hero`, `young-professional`, `facilitator-session`
and `certificates-cohort`. Four more genuine photographs would give every page
its own. See the priority list below.

## Still worth adding

Prestige's own photography always beats stock. Gaps where stock is still doing
the work, in priority order:

- **The Randburg premises** — reception, exterior, more rooms. Only one interior
  photograph exists, so Office & Training Space Rental carries a single image.
- **The Prestige team** — About currently uses a stock graduation photo.
- **Assessment in progress** — candidates under invigilation. The Assessment
  Centre page has no photograph at all.
- **Sector settings** — farm or pack-house, warehouse, retail floor, office.
  The Industries page is deliberately editorial because none exist.

## Two cautions

- **Faces and names.** `certificates-cohort.jpg` shows identifiable learners
  holding certificates that carry their names. Confirm you hold consent to
  publish before this goes live on the public domain.
- **No AI-generated people**, ever. Where no suitable photograph exists, design
  the section without one — see Industries and the Assessment Centre.

## Adding a photograph

1. Crop to the aspect the slot uses, resize to ~1600px long edge, export JPEG
   at quality ~82.
2. Drop it into `public/images/` with a descriptive filename.
3. Use it via `<Photo src="file.jpg" alt="…" className="aspect-[3/2]" />`.
   `alt` is required; `position` takes any CSS `object-position` value.

Phone screenshots of social posts are not usable — they carry app UI. Upload
the original photograph instead.
