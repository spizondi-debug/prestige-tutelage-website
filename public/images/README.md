# Real assets to add (drop-in)

The site is wired to use these exact files the moment they exist. Add the real,
licensed assets you supplied (no AI-generated people, no recreation):

| File | Used by | Notes |
|------|---------|-------|
| `public/prestige-tutelage-logo.png` | `src/components/Logo.jsx` | The official Prestige Tutelage logo (figure mark + wordmark). `.svg` also fine — update the `src` in Logo.jsx. |
| `public/images/hero.jpg` | `src/components/Hero.jsx` | The hero photograph. A landscape group graduation shot works best for the 4:5 / 5:4 crop. |

Until each file is present, the component shows a clearly-marked fallback
(wordmark for the logo, a placeholder panel for the hero image) — never a fake
or AI image.

Optimise photos for web (≈1600px on the long edge, < ~300KB) before adding.
