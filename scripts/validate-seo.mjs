/**
 * Check the SEO invariants hold.
 *
 *   npm run validate:seo
 *
 * These are the things that break silently — a duplicate title, a course
 * missing from the sitemap, a slug collision after a qualification is added —
 * and that nothing in a build or a page render would ever complain about.
 * Exits non-zero so it can gate a commit or a CI run.
 */
import fs from 'node:fs'

const { qualifications } = await import('../src/data/programmes.js')
const { courseOutlines } = await import('../src/data/courseOutlines.js')
const { slugFor, coursePath } = await import('../src/lib/slug.js')
const { pageSeo, courseSeo, courseFaqs, ORIGIN } = await import('../src/lib/seo.js')

const problems = []
const warn = []

// 1. Slugs unique, lowercase, hyphenated, no trailing slash.
const slugs = qualifications.map(slugFor)
if (new Set(slugs).size !== slugs.length) problems.push('slug collision between qualifications')
for (const s of slugs) {
  if (s !== s.toLowerCase()) problems.push(`slug not lowercase: ${s}`)
  if (!/^[a-z0-9-]+$/.test(s)) problems.push(`slug has unsafe characters: ${s}`)
}

// 2. Titles and descriptions unique across curated AND generated routes.
const titles = [
  ...Object.values(pageSeo).map((v) => v.title),
  ...qualifications.map((q) => courseSeo(q).title),
]
const descs = [
  ...Object.values(pageSeo).map((v) => v.description),
  ...qualifications.map((q) => courseSeo(q).description),
]
if (new Set(titles).size !== titles.length) problems.push('duplicate page title')
if (new Set(descs).size !== descs.length) problems.push('duplicate meta description')
for (const [route, v] of Object.entries(pageSeo)) {
  if (!v.title || !v.description) problems.push(`${route}: missing title or description`)
  const full = `${v.title} | Prestige Tutelage`.length
  if (full > 62) warn.push(`${route}: title ${full} chars`)
  if (v.description.length < 140 || v.description.length > 162)
    warn.push(`${route}: description ${v.description.length} chars`)
}
for (const q of qualifications) {
  const { title, description } = courseSeo(q)
  const full = `${title} | Prestige Tutelage`.length
  if (full > 62) warn.push(`${coursePath(q)}: title ${full} chars`)
  // Course descriptions lead with the full registered credential name, which
  // runs to 56 characters on its own. Once the NQF level, SAQA ID and credits
  // are stated the sentence is already 120-160, and there is genuinely no room
  // for a tail on the longer names. 125 is the floor that reflects that rather
  // than one that can only be met by padding.
  if (description.length < 125 || description.length > 162)
    warn.push(`${coursePath(q)}: description ${description.length} chars`)
}

// 3. Every course is in the sitemap, and the sitemap has no strays.
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
for (const q of qualifications) {
  const url = ORIGIN + coursePath(q)
  if (!locs.includes(url)) problems.push(`course missing from sitemap: ${coursePath(q)}`)
}
if (new Set(locs).size !== locs.length) problems.push('duplicate URL in sitemap')
for (const l of locs) {
  if (!l.startsWith('https://')) problems.push(`sitemap URL not https: ${l}`)
  if (l.includes('#')) problems.push(`sitemap URL has a fragment: ${l}`)
  if (l !== l.toLowerCase()) problems.push(`sitemap URL not lowercase: ${l}`)
  if (l.length > ORIGIN.length + 1 && l.endsWith('/')) problems.push(`sitemap URL has a trailing slash: ${l}`)
}

// 4. FAQ answers must be non-empty — FAQPage markup for a blank answer is a
//    structured-data violation, not just untidy.
for (const q of qualifications) {
  for (const f of courseFaqs(q)) {
    if (!f.question?.trim() || !f.answer?.trim())
      problems.push(`${coursePath(q)}: empty FAQ question or answer`)
  }
}

// 5. Every qualification has an outline, and every outline a real course.
for (const q of qualifications) {
  if (!courseOutlines[q.saqaId]) warn.push(`${q.name}: no course outline`)
}
for (const id of Object.keys(courseOutlines)) {
  if (!qualifications.some((q) => q.saqaId === String(id)))
    problems.push(`outline ${id} has no matching qualification`)
}

// 6. robots.txt points at the sitemap and blocks nothing important.
const robots = fs.readFileSync('public/robots.txt', 'utf8')
if (!robots.includes(`${ORIGIN}/sitemap.xml`)) problems.push('robots.txt does not reference the sitemap')
for (const bad of ['Disallow: /', 'Disallow: /programmes', 'Disallow: /assets']) {
  if (robots.split('\n').some((l) => l.trim() === bad)) problems.push(`robots.txt blocks crawling: ${bad}`)
}

if (warn.length) console.warn(`${warn.length} warning(s):\n` + warn.map((w) => '  ~ ' + w).join('\n'))
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => '  - ' + p).join('\n'))
  process.exit(1)
}
console.log(
  `SEO valid: ${qualifications.length} course URLs, ${Object.keys(pageSeo).length} curated routes, ` +
    `${locs.length} sitemap entries, all titles and descriptions unique.`,
)
