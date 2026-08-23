# Prestige Tutelage — Website (standalone)

A **new, standalone** marketing website for **Prestige Tutelage** (accredited
training and workforce development). This project is **completely separate** from
Prestige Growth Pathways and shares no files, assets, or deployment with it.

> Scope so far: **homepage hero + navigation only**, pending visual approval.
> No other sections have been built yet.

## Stack
Vite · React 18 · Tailwind CSS 3 (Fraunces display + DM Sans body).

## Run locally
```bash
npm install
npm run dev      # http://localhost:5180
npm run build
npm run preview
```

## Placeholders to replace with real assets
- **Logo** (`src/components/Logo.jsx`): a clearly-marked typographic wordmark
  stands in for the **official Prestige Tutelage logo**. Drop in the real logo
  (SVG/PNG) and replace this component.
- **Hero image** (`src/components/Hero.jsx`): a clearly-marked placeholder panel.
  Replace with a real, licensed Prestige training/workplace photograph.
  **No AI-generated people.**

## Design note
The hero composition is adapted from the 21st.dev "Hero Section 5" **structure**
(slim nav + two-column hero: headline, supporting copy and dual CTAs on the left,
a large media panel on the right). None of Tailark's branding, SaaS language,
navigation, login buttons or software visuals are used.
