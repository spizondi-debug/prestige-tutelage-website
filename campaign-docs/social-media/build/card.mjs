// Light-card poster — a second visual register alongside the navy sequence.
//
// The twelve campaign posts are navy, photographic and factual. This one is the
// opposite: paper-white, typographic, no photograph, soft colour fields. It is
// for the greetings and seasonal notes that would look cold in the house style
// — a Friday message, a holiday wish — where warmth is the whole point.
//
// Same palette, same Poppins, same logo artwork, so it still reads as Prestige.
// Only the temperature changes.

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
export const repoRoot = resolve(here, '../../..')
const FONT_DIR = process.env.PT_FONT_DIR

export const plan = JSON.parse(
  readFileSync(resolve(repoRoot, 'campaign-docs/social-media/campaign-plan.json'), 'utf8'),
)

/* Palette. blue/green are the campaign values sampled from the logo artwork.
   The two "deep" variants exist purely for contrast: Prestige Green on a pale
   green field is 2.98:1, which fails AA outright, and Prestige Blue on a pale
   blue pill is 4.32:1 — large-text only, and the eyebrow is not large text.
   Deepening just those two lifts them to 4.87:1 and 6.14:1 with no visible
   change in hue at a glance. The display words keep the true brand colours:
   at 150px+ they clear the 3.0:1 large-text floor comfortably. */
const C = {
  blue: plan.brand.colours.blue,
  green: plan.brand.colours.green,
  blueInk: '#0559A8',
  greenInk: '#1B7A2E',
  ink: plan.brand.colours.ink,
  body: plan.brand.colours.body,
  paper: '#FFFFFF',
  ground: '#F4F8FC',
  pillBg: '#E8F1FC',
  boxBg: '#E9F6EC',
  blobBlue: '#DCEBFB',
  blobGreen: '#E2F3E6',
}

function fontFaces() {
  return [400, 500, 600, 700, 800]
    .map((w) => {
      const b64 = readFileSync(resolve(FONT_DIR, `poppins-latin-${w}-normal.woff2`)).toString('base64')
      return `@font-face{font-family:Poppins;font-style:normal;font-weight:${w};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`
    })
    .join('')
}

const dataUri = (rel) => {
  const abs = resolve(repoRoot, rel)
  const mime = abs.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${mime};base64,${readFileSync(abs).toString('base64')}`
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * `shape` is 'vertical' (1080x1920) or 'square' (1080x1080).
 *
 * The square is not a scaled vertical. It has roughly half the height for the
 * same card content, so the display words, the gaps and the card padding all
 * step down together — scaling one and not the others is what makes a resized
 * poster look wrong.
 */
export function cardHtml(card, shape = 'vertical') {
  const v = shape === 'vertical'
  const W = 1080
  const H = v ? 1920 : 1080

  /* The logo artwork is 768x404, so `logo` is a width and the height follows at
     1.9:1. At 200px wide the wordmark under the mark was unreadable at a
     glance on a phone, which is the only place this gets seen. */
  const s = v
    ? { pad: 92, cardPad: 96, radius: 60, eyebrow: 30, display: 196, lead: 38,
        boxText: 36, url: 40, logo: 420, tagline: 28, gap: 44, cardTop: 96 }
    : { pad: 60, cardPad: 52, radius: 44, eyebrow: 22, display: 116, lead: 30,
        boxText: 26, url: 28, logo: 190, tagline: 21, gap: 19, cardTop: 0 }

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{font-family:Poppins,sans-serif;background:${C.ground};overflow:hidden;
  -webkit-font-smoothing:antialiased;position:relative}

/* Soft colour fields. Large, low-contrast and cropped by the frame so they read
   as light rather than as shapes competing with the card. */
.blob{position:absolute;border-radius:50%;filter:blur(2px)}
.b1{width:${v ? 760 : 520}px;height:${v ? 760 : 520}px;background:${C.blobBlue};
  top:${v ? -230 : -170}px;left:${v ? -260 : -190}px}
.b2{width:${v ? 620 : 430}px;height:${v ? 620 : 430}px;background:${C.blobGreen};
  top:${v ? 90 : -60}px;right:${v ? -230 : -170}px}
.b3{width:${v ? 700 : 480}px;height:${v ? 700 : 480}px;background:${C.blobGreen};
  bottom:${v ? -250 : -200}px;left:${v ? -210 : -160}px}
.b4{width:${v ? 560 : 380}px;height:${v ? 560 : 380}px;background:${C.blobBlue};
  bottom:${v ? -160 : -140}px;right:${v ? -200 : -150}px}

.frame{position:relative;width:${W}px;height:${H}px;padding:${s.pad}px;
  display:flex;flex-direction:column;align-items:center;justify-content:flex-start}
.card{width:100%;margin-top:${s.cardTop}px;background:${C.paper};
  border-radius:${s.radius}px;padding:${s.cardPad}px ${s.cardPad}px ${s.cardPad + 10}px;
  box-shadow:0 40px 90px rgba(16,36,54,.10), 0 8px 24px rgba(16,36,54,.05);
  display:flex;flex-direction:column;align-items:center;text-align:center}

.pill{display:inline-block;background:${C.pillBg};color:${C.blueInk};
  font-size:${s.eyebrow}px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  padding:${v ? 16 : 12}px ${v ? 34 : 26}px;border-radius:999px;line-height:1}

.display{font-weight:800;font-size:${s.display}px;line-height:.98;letter-spacing:-.035em}
.d1{color:${C.blue};margin-top:${s.gap + (v ? 16 : 10)}px}
.d2{color:${C.green};margin-top:${v ? 6 : 4}px}

.rule{width:${v ? 104 : 76}px;height:${v ? 8 : 6}px;border-radius:999px;
  background:${C.blue};margin:${s.gap + (v ? 12 : 6)}px 0 ${s.gap}px}

/* Sized so the greeting sets on two lines inside the card's inner width
   (704px vertical, 856px square). At 44px the vertical ran to three, leaving
   a single-word last line — and the extra line was also what pushed the
   tagline into the bottom margin. */
.lead{font-size:${s.lead}px;line-height:1.5;font-weight:400;color:${C.body};
  max-width:${v ? 700 : 700}px}

.box{margin-top:${s.gap + (v ? 14 : 8)}px;background:${C.boxBg};border-radius:${v ? 26 : 20}px;
  padding:${v ? 32 : 22}px ${v ? 40 : 30}px;width:100%}
.box p{font-size:${s.boxText}px;line-height:1.45;font-weight:600;color:${C.greenInk}}

.logo{margin-top:${s.gap + (v ? 26 : 14)}px;width:${s.logo}px;height:auto;display:block}
.url{margin-top:${v ? 22 : 14}px;font-size:${s.url}px;font-weight:700;color:${C.ink};
  letter-spacing:-.01em}

.tagline{margin-top:${v ? 56 : 32}px;font-size:${s.tagline}px;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;color:${C.body}}
</style></head><body>
<div class="blob b1"></div><div class="blob b2"></div>
<div class="blob b3"></div><div class="blob b4"></div>
<div class="frame">
  <div class="card">
    <span class="pill">${esc(card.eyebrow)}</span>
    <div class="display d1">${esc(card.line1)}</div>
    <div class="display d2">${esc(card.line2)}</div>
    <div class="rule"></div>
    <p class="lead">${esc(card.lead)}</p>
    <div class="box"><p>${esc(card.boxLine1)}<br>${esc(card.boxLine2)}</p></div>
    <img class="logo" src="${dataUri(plan.brand.logo)}" alt="">
    <div class="url">${esc(card.url)}</div>
  </div>
  <div class="tagline">${esc(plan.brand.tagline)}</div>
</div>
</body></html>`
}
