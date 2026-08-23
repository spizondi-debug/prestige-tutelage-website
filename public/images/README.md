# Site assets

All photography on this site is real. There are no placeholders: sections
without a suitable photograph are designed without one rather than filled.

## Logo

`public/prestige-tutelage-logo.png` — the supplied original Prestige Tutelage
logo, trimmed of its white margin and given an alpha channel so it sits cleanly
on the cream navigation and the dark footer. Colours and artwork are unaltered.
Used in desktop navigation, mobile navigation and the footer.

**Do not redraw, recolour or substitute it.** To replace with a newer original,
drop in a PNG/SVG at the same path (transparent background, tightly cropped).

## Photography in use

| File | Used on |
|------|---------|
| `graduate-portrait-hero.jpg` | Homepage hero |
| `graduate-celebrating.jpg` | Homepage learnerships · Programmes |
| `graduates-together.jpg` | Homepage impact |
| `graduates-group.jpg` | About |
| `young-professional.jpg` | Prestige Growth Pathways |

Each is cropped from a supplied original, resized to ~1200–1600px on the long
edge and saved as progressive JPEG at quality 82. Every one is lazy-loaded
except the hero, which loads eagerly.

## Photography still needed

The supplied set is graduation-themed. These subjects would let the site show
Prestige at work rather than only at the finish line, and would allow
photography to return to the sections currently designed without it
(Industries, Corporate Training, Assessment Centre):

- A facilitator leading a session with employees — the single most valuable gap
- Learners with a workplace mentor, on the job
- Candidates in an invigilated assessment
- Sector settings: manufacturing floor, farm or pack-house, warehouse, retail
  floor, office
- The Prestige team and the Randburg office

Prefer genuine Prestige-owned photography of South African workplaces. Where
unavailable, use properly licensed stock. **No AI-generated people.**

## Adding a photograph

1. Save the original at high resolution.
2. Crop to the aspect the slot uses, resize to ~1600px long edge, export JPEG
   at quality ~82.
3. Drop it into `public/images/` with a descriptive filename.
4. Use it via `<Photo src="filename.jpg" alt="..." className="aspect-[3/2]" />`
   — `alt` text is required, and `position` accepts any CSS `object-position`
   value if the focal point is off-centre.
