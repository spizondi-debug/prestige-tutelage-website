# Real assets to add (drop-in)

The site is wired to use these exact files the moment they exist. Add real,
licensed photography — **no AI-generated people, no illustrated or 3D
characters, no generic AI art.**

Until a file is present, that slot renders a quiet branded panel naming the
photograph required. The site never shows a fake or generated image.

## Logo

| File | Used by | Notes |
|------|---------|-------|
| `public/prestige-tutelage-logo.png` | `src/components/Logo.jsx` | The **official** Prestige Tutelage logo. `.svg` also fine — update the `src` in `Logo.jsx`. Do not recreate or substitute it. The footer inverts it automatically for the dark background. |

## Photography

All paths below are relative to `public/images/`.

| File | Used on | What the photograph should show |
|------|---------|--------------------------------|
| `hero.jpg` | Homepage hero | The flagship image. South African learners with a facilitator, or a graduation moment. Warm, human, real. |
| `learnerships.jpg` | Homepage, Programmes | A learner working alongside a workplace mentor — on-the-job learning. |
| `corporate-training.jpg` | Corporate Training | A facilitator leading a session with employees in a workplace or training room. |
| `assessment-centre.jpg` | Homepage, Assessment Centre | Candidates completing a written assessment under invigilation. |
| `growth-pathways.jpg` | Growth Pathways | A manager and employee in a development-planning conversation. |
| `about-team.jpg` | About | The Prestige team, or the Randburg office at work. |
| `impact-graduation.jpg` | Homepage impact | Learners celebrating at a graduation ceremony. |
| `impact-workplace.jpg` | Homepage impact | An employee applying new skills on the job. |
| `impact-youth.jpg` | Homepage impact | Young people in a workplace-readiness session. |

### Industry photography (`public/images/industries/`)

| File | Sector |
|------|--------|
| `manufacturing.jpg` | Production team on a factory floor |
| `agriculture.jpg` | Farm workers tending crops or livestock |
| `logistics.jpg` | Warehouse / distribution centre team |
| `retail.jpg` | Retail staff assisting a customer |
| `professional-services.jpg` | Professionals collaborating in an office |
| `public-sector.jpg` | Public-sector employees in a workshop |
| `education.jpg` | Facilitator with adult learners in a community setting |

## Preparing images

- Resize to roughly **1600px on the long edge** and keep each file **under ~300KB**.
- Prefer genuine Prestige-owned photography. Where unavailable, use high-quality
  licensed/royalty-free photography of real South African workplaces and people.
- Images are lazy-loaded automatically (the hero loads eagerly).
- Alt text is already written for every slot in the components — update it if a
  supplied photograph shows something different.
