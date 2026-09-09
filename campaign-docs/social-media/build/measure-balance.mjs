import { chromium } from 'playwright'
import { plan, posterHtml, FORMAT } from './poster.mjs'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const post of plan.posts) {
  const line = []
  for (const fmt of ['square','vertical']) {
    const f = FORMAT[fmt]
    const p = await b.newPage({ viewport:{width:f.w,height:f.h}, deviceScaleFactor:1 })
    await p.setContent(posterHtml(post, fmt), { waitUntil:'load' })
    await p.evaluate(() => document.fonts.ready)
    // Breathing room between the last line of copy and the CTA bar, plus the
    // height the photograph band settled at once it absorbed the slack.
    const gap = await p.evaluate(() => {
      const body = document.querySelector('.body')
      const last = body.lastElementChild.getBoundingClientRect().bottom
      const cta = document.querySelector('.cta').getBoundingClientRect().top
      const band = document.querySelector('.photo, .fill').getBoundingClientRect().height
      return `gap ${String(Math.round(cta - last)).padStart(3)}  band ${String(Math.round(band)).padStart(4)}`
    })
    line.push(`${fmt.padEnd(8)} ${gap}`)
    await p.close()
  }
  console.log(`post ${String(post.id).padStart(2,'0')}  ${line.join('   |   ')}`)
}
await b.close()
