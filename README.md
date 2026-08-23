# Prestige Tutelage — Website (standalone)

The marketing website for **Prestige Tutelage** (accredited training and
workforce development, Randburg, South Africa). This project is **completely
separate** from Prestige Growth Pathways and shares no files, assets or
deployment with it.

## Stack

Vite · React 18 · React Router 7 · Tailwind CSS 3
(Fraunces display + DM Sans body, loaded from Google Fonts).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home — 16 sections, hero through CTA |
| `/about` | About — who we are, purpose, philosophy, accreditation, journey |
| `/programmes` | Programme areas, learnerships, accredited vs non-accredited |
| `/short-courses` | Seven short-course families |
| `/corporate-training` | Understand → Diagnose → Design → Deliver → Measure |
| `/services` | Six service groups |
| `/industries` | Seven sectors, image-led |
| `/assessment-centre` | Assessment capabilities and principles |
| `/growth-pathways` | Prestige Growth Pathways as a related solution |
| `/insights` + `/insights/:slug` | Nine explainer articles |
| `/contact` | Enquiry form and company details |
| `*` | 404 with full sitemap |

## Content integrity rules

These are deliberate and should be preserved:

- **No invented accreditation detail.** NQF levels and SAQA IDs are absent
  until verified. `src/data/programmes.js` has optional `nqf` / `saqaId` fields
  — set them and they render automatically.
- **No fake statistics, testimonials or case studies.** The impact section
  describes the outcomes Prestige designs for; client references are offered on
  request.
- **Prestige is not positioned as a B-BBEE verification agency** — only as
  support for the skills development element.
- **Accredited programmes and non-accredited short courses are clearly
  distinguished** on both the Programmes and Short Courses pages.

## Real assets still required

See [`public/images/README.md`](public/images/README.md) for the full manifest —
the official logo plus 16 photography slots. Every slot renders a quiet branded
placeholder until the real file is dropped in. **No AI-generated people.**

## Deployment note

This is a client-side routed SPA. The host must rewrite unknown paths to
`index.html` (Netlify `_redirects`, Vercel rewrites, or `try_files ... /index.html`
on nginx), otherwise deep links such as `/programmes` will 404 on refresh.

## Design direction

The homepage hero follows the approved 21st.dev "Hero Section 5" **structure**
(slim nav + two-column hero: headline, supporting copy and dual CTAs on the
left, a large media panel on the right), and that composition sets the benchmark
for the rest of the site: editorial layouts, generous white space, hairline
rules, restrained corner radius, real photography, blue/green brand accents.
No third-party branding, SaaS language, dashboards or software visuals are used.
