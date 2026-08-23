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
quality 82–84. All are lazy-loaded except the homepage hero and the training
room, which load eagerly.

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
