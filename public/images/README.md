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

| File | Shows |
|------|-------|
| `training-room.jpg` | A Prestige training room, Prestige slide on screen |
| `workshop-training.jpg` | Practical training in full PPE, angle grinder |
| `learner-cohort.jpg` | A learner intake outside the training venue |
| `certificates-cohort.jpg` | Learners with Prestige certificates of completion |
| `learner-intake-group.jpg` | A large intake outside the Randburg premises |
| `learners-certificates-group.jpg` | A completing cohort holding their certificates |
| `certificate-handover-overalls.jpg` | A learner receiving his certificate |
| `certificate-handover-red-shirt.jpg` | A learner receiving her certificate |
| `certificate-handover-reviewing.jpg` | A learner and facilitator reading a certificate |
| `certificate-handover-congratulations.jpg` | A certificate handover |
| `learner-carrying-steel-beam.jpg` | A learner carrying a steel section on a fabrication floor |
| `learner-welding-workshop.jpg` | A learner welding in visor and gloves |
| `learner-bandsaw-operator.jpg` | A learner operating a cutting machine |
| `learners-plate-handling.jpg` | Three learners moving steel plate |
| `learner-loading-components.jpg` | A learner loading fabricated components on site |
| `learners-client-site.jpg` | Learners at a client site |
| `learner-angle-grinder.jpg` | A learner using an angle grinder at a workbench |
| `fabrication-workshop-floor.jpg` | A worker preparing plate in a large fabrication shop |

Six of these arrived as social-media captures and were cropped inside the app
chrome — search bar, caption and action rail — before use. Their usable area
is 505x850, which is why they are cropped tightly in a landscape panel and
carry a low `object-position`. **Originals at full resolution would be
better**; ask for the camera files if they still exist.

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
| Services | Business Solutions | `learner-cohort.jpg` |
| B-BBEE Consulting | `certificates-cohort.jpg` |
| Recruitment | `young-professional.jpg` |
| Office & Training Space | Assessment Centre | `certificates-cohort.jpg` |
| Insights | `graduate-portrait-hero.jpg` |
| Insight articles | by category — see `ARTICLE_HERO` in `InsightArticle.jsx` |
| Contact | `bbbee-consultation.jpg` |

Hero slide sets live in `src/data/pageHeroes.js`. Two rules hold: a page's
hero never shows a photograph that already appears further down that same
page, and no two pages carry the same set. Both are worth re-checking after
any swap.

`facilitator-session.jpg` was removed from the library at the client's
request. It is recoverable from git history if that changes.

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
