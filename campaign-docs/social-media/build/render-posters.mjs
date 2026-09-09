// Renders posters to PNG and audits every text box for overflow/clipping.
//
//   node render-posters.mjs            -> all 12 posts
//   node render-posters.mjs 1 4 7      -> only those posts

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { plan, posterHtml, FORMAT, repoRoot } from './poster.mjs'

const only = process.argv.slice(2).map(Number).filter(Boolean)
const posts = only.length ? plan.posts.filter((p) => only.includes(p.id)) : plan.posts

const OUT = {
  square: resolve(repoRoot, 'public/social-posts/posters/square'),
  vertical: resolve(repoRoot, 'public/social-posts/posters/vertical'),
}
Object.values(OUT).forEach((d) => mkdirSync(d, { recursive: true }))

/**
 * Runs in the page. Flags anything that would show as clipped, overflowing or
 * colliding in the exported PNG — the checks a person would otherwise have to
 * make by eye on 24 files.
 */
function auditPage({ canvasW, canvasH }) {
  const problems = []
  const canvas = document.querySelector('.canvas')

  if (canvas.scrollHeight > canvasH + 1) {
    problems.push(`canvas content ${canvas.scrollHeight}px exceeds ${canvasH}px`)
  }

  const textSel = 'h1,.subhead,.eyebrow,.ptext,.row-label,.row-meta,.row-saqa,.fact-num,.fact-label,.cta-url,.cta-tag,.badge,.foot'
  for (const el of document.querySelectorAll(textSel)) {
    const r = el.getBoundingClientRect()
    const label = `${el.className || el.tagName}: "${el.textContent.trim().slice(0, 42)}"`

    const fs = parseFloat(getComputedStyle(el).fontSize)
    if (el.scrollWidth > el.clientWidth + 1) problems.push(`h-overflow ${label}`)
    if (el.scrollHeight > el.clientHeight + fs * 0.3) problems.push(`v-overflow ${label}`)
    if (r.bottom > canvasH + 0.5) problems.push(`below canvas (${Math.round(r.bottom)}px) ${label}`)
    if (r.top < -0.5) problems.push(`above canvas ${label}`)
    if (r.right > canvasW + 0.5) problems.push(`past right edge ${label}`)
    if (r.left < -0.5) problems.push(`past left edge ${label}`)

    // A widow — a last line holding a single short word — reads as a mistake
    // at poster scale even though nothing is technically broken.
    if (el.tagName === 'H1') {
      const words = el.textContent.trim().split(/\s+/)
      const lh = parseFloat(getComputedStyle(el).lineHeight)
      const lines = Math.round(r.height / lh)
      if (lines > 1 && words.length > 3) {
        const range = document.createRange()
        const node = el.firstChild
        const text = node.textContent
        const lastStart = text.lastIndexOf(' ') + 1
        range.setStart(node, lastStart)
        range.setEnd(node, text.length)
        const lastWordRect = range.getBoundingClientRect()
        const firstOnLine = text.slice(0, lastStart).trimEnd()
        const prevEnd = firstOnLine.lastIndexOf(' ') + 1
        range.setStart(node, prevEnd)
        range.setEnd(node, lastStart - 1)
        const prevRect = range.getBoundingClientRect()
        if (Math.abs(lastWordRect.top - prevRect.top) > lh * 0.5) {
          problems.push(`widow in headline: "${text.slice(lastStart)}"`)
        }
      }
    }
  }

  // Vertical collisions between sibling blocks in the content column.
  const blocks = [...document.querySelectorAll('.body > *')].filter(
    (el) => !el.classList.contains('spacer'),
  )
  for (let i = 0; i < blocks.length - 1; i++) {
    const a = blocks[i].getBoundingClientRect()
    const b = blocks[i + 1].getBoundingClientRect()
    if (b.top < a.bottom - 0.5) {
      problems.push(`blocks overlap: .${blocks[i].className} / .${blocks[i + 1].className}`)
    }
  }
  return problems
}

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--force-color-profile=srgb', '--disable-lcd-text', '--font-render-hinting=none'],
})

let failures = 0
for (const post of posts) {
  for (const format of ['square', 'vertical']) {
    const f = FORMAT[format]
    const page = await browser.newPage({
      viewport: { width: f.w, height: f.h },
      deviceScaleFactor: 1,
    })
    await page.setContent(posterHtml(post, format), { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)

    const problems = await page.evaluate(auditPage, { canvasW: f.w, canvasH: f.h })
    const file = resolve(OUT[format], post.media[format])
    const buf = await page.locator('.canvas').screenshot({ type: 'png' })
    writeFileSync(file, buf)
    await page.close()

    const tag = `post ${String(post.id).padStart(2, '0')} ${format.padEnd(8)}`
    if (problems.length) {
      failures += problems.length
      console.log(`FAIL ${tag} ${post.media[format]}`)
      problems.forEach((p) => console.log(`       - ${p}`))
    } else {
      console.log(`ok   ${tag} ${post.media[format]}`)
    }
  }
}

await browser.close()
console.log(failures ? `\n${failures} layout problem(s).` : '\nAll posters clean.')
process.exit(failures ? 1 : 0)
