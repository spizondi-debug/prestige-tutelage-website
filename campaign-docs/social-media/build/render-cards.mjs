// Renders the light-card posters.
//
//   node render-cards.mjs            -> every card, both shapes
//   node render-cards.mjs friday     -> one card by key
//
// Like the poster renderer, this audits the layout before it writes a file: a
// card whose copy has overflowed its frame, or whose content has pushed past
// the bottom edge, is a bug worth failing on rather than shipping.

import { chromium } from 'playwright'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cardHtml, repoRoot } from './card.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const cards = JSON.parse(
  readFileSync(resolve(here, '../cards.json'), 'utf8'),
)

const only = process.argv.slice(2)
const chosen = only.length ? cards.filter((c) => only.includes(c.key)) : cards
if (!chosen.length) {
  console.error(`No card matched. Known keys: ${cards.map((c) => c.key).join(', ')}`)
  process.exit(1)
}

// Their own directory, deliberately. The campaign's poster folders are a
// closed, verified delivery of exactly twelve posts each, and media-manifest
// states their counts; dropping cards in alongside would quietly make those
// statements false.
const OUT = {
  vertical: resolve(repoRoot, 'public/social-posts/cards'),
  square: resolve(repoRoot, 'public/social-posts/cards'),
}
Object.values(OUT).forEach((d) => mkdirSync(d, { recursive: true }))

/** Runs in the page: does anything overflow the frame, or the card its box? */
function auditCard() {
  const problems = []
  const frame = document.querySelector('.frame')
  const fr = frame.getBoundingClientRect()

  // Against the padding box, not the border box. Measuring to fr.bottom let
  // content sit inside the frame's own bottom padding and still pass, which is
  // how the tagline ended up all but touching the poster edge.
  const cs = getComputedStyle(frame)
  const safeBottom = fr.bottom - parseFloat(cs.paddingBottom)
  const safeTop = fr.top + parseFloat(cs.paddingTop)

  const tagline = document.querySelector('.tagline').getBoundingClientRect()
  if (tagline.bottom > safeBottom + 1) {
    problems.push(`content runs ${Math.round(tagline.bottom - safeBottom)}px into the bottom margin`)
  }
  if (document.querySelector('.card').getBoundingClientRect().top < safeTop - 1) {
    problems.push('card starts above the top margin')
  }
  const card = document.querySelector('.card').getBoundingClientRect()
  if (card.width > fr.width + 1) problems.push('card is wider than the frame')

  for (const sel of ['.pill', '.d1', '.d2', '.lead', '.box p', '.url']) {
    const el = document.querySelector(sel)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.right > card.right + 1 || r.left < card.left - 1) {
      problems.push(`${sel} overflows the card horizontally`)
    }
    if (el.scrollWidth > el.clientWidth + 1) problems.push(`${sel} is clipped`)
  }
  return problems
}

// Same launch options as render-posters.mjs and render-videos.mjs. The
// executable is pinned because the image ships browsers outside Playwright's
// default lookup, and the three flags force sRGB and turn off subpixel
// antialiasing and hinting — without them this card's type would not match
// the type on every other asset in the set.
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})
let failed = false

for (const card of chosen) {
  for (const shape of ['vertical', 'square']) {
    const w = 1080
    const h = shape === 'vertical' ? 1920 : 1080
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.setContent(cardHtml(card, shape), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)

    const problems = await page.evaluate(auditCard)
    if (problems.length) {
      failed = true
      console.error(`FAIL ${card.key} ${shape}`)
      problems.forEach((p) => console.error(`       - ${p}`))
      await page.close()
      continue
    }

    // Report the card's vertical placement. A card that floats high with a
    // dead band under it is the failure mode this layout has, and it is much
    // easier to see as two numbers than to judge by eye.
    const fit = await page.evaluate(() => {
      const f = document.querySelector('.frame').getBoundingClientRect()
      const c = document.querySelector('.card').getBoundingClientRect()
      return { top: c.top / f.height, bottom: c.bottom / f.height }
    })

    const file = `${card.file}-${shape}.png`
    await page.screenshot({ path: resolve(OUT[shape], file) })
    console.log(
      `ok   ${card.key.padEnd(10)} ${shape.padEnd(8)} ${file.padEnd(40)}` +
        `card ${(fit.top * 100).toFixed(0)}%-${(fit.bottom * 100).toFixed(0)}%`,
    )
    await page.close()
  }
}

await browser.close()
if (failed) {
  console.error('\nSome cards did not render. Nothing was written for those.')
  process.exit(1)
}
console.log('\nCards rendered.')
