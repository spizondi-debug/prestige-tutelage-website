/**
 * Check the hero slide sets hold their invariants.
 *
 *   npm run validate:heroes
 *
 * Three rules, all easy to break by hand and none visible in a build error:
 *   1. Every referenced photograph exists in public/images.
 *   2. Each set runs 3–5 slides.
 *   3. A page's hero never repeats a photograph already used further down
 *      that same page, and no two pages carry the same set. Body imagery now
 *      lives partly in sectionSliders, so those are resolved back to the page
 *      that references them rather than read off the JSX.
 *   4. Every sectionSliders set is 2-5 real photographs and is actually used.
 *
 * Exits non-zero on any failure so it can gate a commit or CI run.
 */
import fs from 'node:fs'
import path from 'node:path'

const { pageHeroes, articleHeroes, sectionSliders } = await import('../src/data/pageHeroes.js')

const PAGE_FILES = {
  home: 'Home', about: 'About', programmes: 'Programmes', shortCourses: 'ShortCourses',
  industries: 'Industries', growthPathways: 'GrowthPathways', corporateTraining: 'CorporateTraining',
  services: 'Services', businessSolutions: 'BusinessSolutions', bbbee: 'BBBEEConsulting',
  recruitment: 'Recruitment', officeRental: 'OfficeRental', assessment: 'AssessmentCentre',
  insights: 'Insights', contact: 'Contact',
}

const images = new Set(fs.readdirSync('public/images'))
const problems = []

// Home's imagery is spread across its sections, not its page file.
const homeSections = fs.readdirSync('src/components/home')
  .map((f) => fs.readFileSync(path.join('src/components/home', f), 'utf8')).join('\n')

const sourceFor = (key) => {
  const file = `src/pages/${PAGE_FILES[key]}.jsx`
  return (fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '') +
    (key === 'home' ? homeSections : '')
}

const sliderUse = new Map() // sectionSliders key -> page key that references it

const bodyImagesFor = (key) => {
  const src = sourceFor(key)
  const found = [...src.matchAll(/(?:src=["']|photo: ['"]|poster: ['"])([a-z0-9-]+\.jpg)/g)].map((m) => m[1])
  // A ContentSlider hides its filenames behind a sectionSliders key.
  for (const m of src.matchAll(/sectionSliders\.([A-Za-z]+)/g)) {
    const set = sectionSliders[m[1]]
    if (!set) { problems.push(`${key}: references unknown sectionSliders.${m[1]}`); continue }
    sliderUse.set(m[1], key)
    found.push(...set.map((s) => s.src))
  }
  return new Set(found)
}

const seen = new Map()
for (const [key, set] of Object.entries(pageHeroes)) {
  for (const s of set) if (!images.has(s.src)) problems.push(`${key}: missing file ${s.src}`)
  if (set.length < 3 || set.length > 5) problems.push(`${key}: ${set.length} slides (want 3-5)`)

  const body = bodyImagesFor(key)
  for (const s of set) if (body.has(s.src)) problems.push(`${key}: hero repeats ${s.src} from its own page`)

  const fingerprint = set.map((s) => s.src).sort().join('|')
  if (seen.has(fingerprint)) problems.push(`${key}: identical set to ${seen.get(fingerprint)}`)
  seen.set(fingerprint, key)
}

for (const [key, set] of Object.entries(sectionSliders)) {
  for (const s of set) if (!images.has(s.src)) problems.push(`section ${key}: missing file ${s.src}`)
  if (set.length < 2 || set.length > 5) problems.push(`section ${key}: ${set.length} slides (want 2-5)`)
  const page = sliderUse.get(key)
  if (!page) { problems.push(`section ${key}: defined but never used`); continue }
  for (const s of set) {
    if (pageHeroes[page]?.some((h) => h.src === s.src)) {
      problems.push(`section ${key}: repeats ${s.src} from the ${page} hero`)
    }
  }
}

// Two sliders on one page must not show the same photograph.
const perPage = new Map()
for (const [key, page] of sliderUse) {
  for (const s of sectionSliders[key]) {
    const owner = perPage.get(`${page}|${s.src}`)
    if (owner) problems.push(`section ${key}: repeats ${s.src} from ${owner} on the same page`)
    else perPage.set(`${page}|${s.src}`, key)
  }
}

for (const [cat, set] of Object.entries(articleHeroes)) {
  for (const s of set) if (!images.has(s.src)) problems.push(`article ${cat}: missing file ${s.src}`)
  if (set.length < 2) problems.push(`article ${cat}: ${set.length} slides`)
}

const pages = Object.keys(pageHeroes).length
if (problems.length) {
  console.error(`${problems.length} problem(s):\n` + problems.map((p) => '  - ' + p).join('\n'))
  process.exit(1)
}
console.log(`${pages} page sets, ${Object.keys(sectionSliders).length} section sliders and ${Object.keys(articleHeroes).length} article sets valid.`)
const jpgs = [...images].filter((f) => f.endsWith('.jpg')).length
console.log(`${jpgs} photographs in the library, all referenced files present.`)
