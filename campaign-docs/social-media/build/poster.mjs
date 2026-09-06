// Poster renderer — Prestige Tutelage social campaign.
//
// Builds each post as a fixed-size HTML canvas and screenshots it with
// Chromium. Every text region is a flex child with a declared minimum, so a
// long string pushes the layout rather than silently clipping; audit.mjs then
// proves nothing overflowed.
//
// Colours come from the original logo artwork (blue/green) and the repo's own
// tailwind tokens (navy, ink, cloud, line). Typography is Poppins throughout.

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
export const repoRoot = resolve(here, '../../..')
const FONT_DIR = process.env.PT_FONT_DIR

const plan = JSON.parse(
  readFileSync(resolve(repoRoot, 'campaign-docs/social-media/campaign-plan.json'), 'utf8'),
)
export { plan }

const C = plan.brand.colours

/** Inline the woff2 files so the render never depends on the network. */
function fontFaces() {
  const weights = [300, 400, 500, 600, 700, 800]
  return weights
    .map((w) => {
      const b64 = readFileSync(resolve(FONT_DIR, `poppins-latin-${w}-normal.woff2`)).toString('base64')
      return `@font-face{font-family:Poppins;font-style:normal;font-weight:${w};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`
    })
    .join('')
}

function dataUri(relPath) {
  const abs = resolve(repoRoot, relPath)
  const mime = abs.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${mime};base64,${readFileSync(abs).toString('base64')}`
}

/**
 * Per-format geometry. `photo` is the height of the photograph band; the
 * content field takes whatever is left, which is what keeps the two formats
 * visually related rather than one being a stretched copy of the other.
 */
const FORMAT = {
  square: {
    w: 1080,
    h: 1080,
    margin: 76,
    logoW: 226,
    headerH: 150,
    photoMin: 280,
    headlineSolo: 70,
    eyebrow: 19,
    headline: 62,
    headlineLh: 1.1,
    subhead: 0, // squares stay punchy — the subhead lives on the vertical
    subheadLh: 1.5,
    point: 25,
    pointGap: 19,
    ctaH: 92,
    cta: 30,
    foot: 14,
    rowLabel: 31,
    rowMeta: 25,
    factNum: 62,
    factLabel: 16,
  },
  vertical: {
    w: 1080,
    h: 1920,
    margin: 88,
    logoW: 250,
    headerH: 190,
    photoMin: 560,
    headlineSolo: 86,
    eyebrow: 22,
    headline: 74,
    headlineLh: 1.1,
    subhead: 29,
    subheadLh: 1.55,
    point: 29,
    pointGap: 26,
    ctaH: 116,
    cta: 36,
    foot: 17,
    rowLabel: 37,
    rowMeta: 29,
    factNum: 82,
    factLabel: 19,
  },
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Accent colour for a post — matches the two colours in the logo. */
const accentOf = (post) => (post.accent === 'green' ? C.green : C.blue)
/** The CTA bar carries small white type, so green drops to its deeper tone. */
const ctaOf = (post) => (post.accent === 'green' ? C.greenDeep : C.blue)

function photoBlock(post, f) {
  if (!post.photo) return '<div class="fill"></div>'
  const src = dataUri(`public/images/${post.photo}`)
  // Portrait sources are framed higher so faces are never cut by the band.
  const pos = post.photo === 'graduate-portrait-hero.jpg' ? '50% 22%' : '50% 34%'
  return `<div class="photo" style="min-height:${f.photoMin}px">
    <img src="${src}" alt="" style="object-position:${pos}">
    <span class="photo-veil"></span>
  </div>`
}

/** Qualification ladder — name / NQF level / SAQA id, on a fixed rhythm. */
function rowsBlock(post, f, accent) {
  if (!post.programmeRows) return ''
  const isFacts = post.programmeRows.every((r) => !r.saqa)
  if (isFacts) {
    return `<div class="facts">${post.programmeRows
      .map(
        (r) => `<div class="fact">
          <div class="fact-label">${esc(r.label)}</div>
          <div class="fact-num" style="color:${accent}">${esc(r.meta)}</div>
        </div>`,
      )
      .join('')}</div>`
  }
  return `<div class="rows">${post.programmeRows
    .map(
      (r) => `<div class="row" style="border-left-color:${accent}">
        <div class="row-main">
          <span class="row-label">${esc(r.label)}</span>
          <span class="row-meta" style="color:${accent}">${esc(r.meta)}</span>
        </div>
        ${r.saqa ? `<div class="row-saqa">${esc(r.saqa)}</div>` : ''}
      </div>`,
    )
    .join('')}</div>`
}

function pointsBlock(post, f, accent, points) {
  if (!points || !points.length) return ''
  const numbered = post.layout === 'photo-hero' && post.id === 11
  const contact = post.layout === 'cta'
  return `<ul class="points ${contact ? 'points-contact' : ''}">${points
    .map(
      (p, i) => `<li>
        ${
          numbered
            ? `<span class="num" style="color:${accent}">${String(i + 1).padStart(2, '0')}</span>`
            : `<span class="tick" style="background:${accent}"></span>`
        }
        <span class="ptext ${contact && i === 0 ? 'ptext-lead' : ''}">${esc(p)}</span>
      </li>`,
    )
    .join('')}</ul>`
}

export function posterHtml(post, format) {
  const f = FORMAT[format]
  const square = format === 'square'
  const headline = (square && post.headlineSquare) || post.headline
  const points = (square && post.squarePoints) || post.points
  const accent = accentOf(post)
  const logo = dataUri(plan.brand.logo)
  const showSubhead = f.subhead > 0 && post.subhead
  const hasRows = Boolean(post.programmeRows)
  // Squares carry either the fact ladder or the bullet points, never both —
  // that is what keeps 1080x1080 from becoming a wall of text.
  const showPoints = format === 'vertical' || !hasRows
  const showRows = hasRows

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFaces()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${f.w}px;height:${f.h}px}
body{font-family:Poppins,sans-serif;background:${C.blueDeep};color:#fff;
  -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.canvas{width:${f.w}px;height:${f.h}px;display:flex;flex-direction:column;
  position:relative;overflow:hidden;background:${C.blueDeep}}

/* A very restrained field gradient so flat navy does not read as dead. */
.canvas::before{content:'';position:absolute;inset:0;
  background:radial-gradient(120% 85% at 82% -12%, rgba(0,111,216,.30) 0%, rgba(11,39,66,0) 62%);
  pointer-events:none}
.canvas>*{position:relative}

.header{height:${f.headerH}px;flex:0 0 ${f.headerH}px;display:flex;align-items:center;
  padding:0 ${f.margin}px}
.header img{width:${f.logoW}px;height:auto;display:block}

.photo{flex:1 1 auto;width:100%;position:relative;overflow:hidden}
.fill{flex:1 1 auto}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
/* Ties the photograph into the navy field instead of leaving a hard seam. */
.photo-veil{position:absolute;inset:0;
  background:linear-gradient(180deg, rgba(11,39,66,.30) 0%, rgba(11,39,66,0) 34%,
    rgba(11,39,66,0) 62%, rgba(11,39,66,.92) 100%)}

.body{flex:0 0 auto;display:flex;flex-direction:column;
  padding:${f.margin * 0.62}px ${f.margin}px ${f.margin * 0.82}px}
.eyebrow{font-size:${f.eyebrow}px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;
  color:${accent};line-height:1.4}
.rule{width:64px;height:3px;background:${accent};margin:${f.margin * 0.24}px 0 ${f.margin * 0.3}px;
  border-radius:2px}
h1{font-size:${post.photo ? f.headline : f.headlineSolo}px;line-height:${f.headlineLh};font-weight:700;letter-spacing:-.02em;
  color:#fff;text-wrap:balance}
.subhead{font-size:${f.subhead}px;line-height:${f.subheadLh};font-weight:300;
  color:rgba(255,255,255,.80);margin-top:${f.margin * 0.34}px;max-width:${f.w - f.margin * 2}px}

.rows{margin-top:${f.margin * 0.42}px;display:flex;flex-direction:column;
  gap:${f.pointGap * 0.9}px}
.row{border-left:3px solid;padding-left:${f.margin * 0.3}px}
.row-main{display:flex;align-items:baseline;justify-content:space-between;gap:${f.margin * 0.3}px}
.row-label{font-size:${f.rowLabel}px;font-weight:600;color:#fff;line-height:1.25}
.row-meta{font-size:${f.rowMeta}px;font-weight:700;white-space:nowrap;letter-spacing:.01em}
.row-saqa{font-size:${f.foot + 3}px;font-weight:400;color:rgba(255,255,255,.55);
  margin-top:${f.pointGap * 0.22}px;letter-spacing:.03em}

.facts{margin-top:${f.margin * 0.44}px;display:flex;gap:${f.margin * 0.34}px}
.fact{flex:1 1 0;min-width:0;border-top:3px solid rgba(255,255,255,.16);
  padding-top:${f.margin * 0.26}px}
.fact-label{font-size:${f.factLabel}px;font-weight:500;letter-spacing:.11em;text-transform:uppercase;
  color:rgba(255,255,255,.58);line-height:1.4}
.fact-num{font-size:${f.factNum}px;font-weight:700;letter-spacing:-.02em;line-height:1.1;
  margin-top:${f.margin * 0.1}px}

.points{list-style:none;margin-top:${f.margin * 0.44}px;display:flex;flex-direction:column;
  gap:${f.pointGap}px}
.points li{display:flex;align-items:flex-start;gap:${f.margin * 0.24}px}
.tick{flex:0 0 auto;width:10px;height:10px;border-radius:50%;
  margin-top:${Math.round(f.point * 0.52)}px}
.num{flex:0 0 auto;font-size:${f.point}px;font-weight:700;letter-spacing:.02em;
  min-width:${f.point * 1.9}px;line-height:1.45}
.ptext{font-size:${f.point}px;font-weight:400;line-height:1.45;color:rgba(255,255,255,.90)}
.points-contact .ptext{font-weight:500}
.ptext-lead{font-weight:700 !important;color:#fff !important}

.foot{font-size:${f.foot}px;line-height:1.6;font-weight:300;color:rgba(255,255,255,.46);
  margin-top:${f.margin * 0.5}px;max-width:${f.w - f.margin * 2}px}

.cta{height:${f.ctaH}px;flex:0 0 ${f.ctaH}px;background:${ctaOf(post)};display:flex;
  align-items:center;justify-content:space-between;padding:0 ${f.margin}px}
.cta-url{font-size:${f.cta}px;font-weight:700;letter-spacing:-.01em;color:#fff}
.cta-tag{font-size:${f.foot + 2}px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(255,255,255,.82)}
</style></head><body>
<div class="canvas">
  <div class="header">
    <img src="${logo}" alt="Prestige Tutelage">
  </div>
  ${photoBlock(post, f)}
  <div class="body">
    <div class="eyebrow">${esc(post.eyebrow)}</div>
    <div class="rule"></div>
    <h1>${esc(headline)}</h1>
    ${showSubhead ? `<p class="subhead">${esc(post.subhead)}</p>` : ''}
    ${showRows ? rowsBlock(post, f, accent) : ''}
    ${showPoints ? pointsBlock(post, f, accent, points) : ''}
    ${post.footnote ? `<p class="foot">${esc(post.footnote)}</p>` : ''}
  </div>
  ${post.photo ? '' : '<div class="fill"></div>'}
  <div class="cta">
    <span class="cta-url">${esc(post.cta)}</span>
    <span class="cta-tag">${esc(plan.brand.tagline)}</span>
  </div>
</div>
</body></html>`
}

export { FORMAT }
