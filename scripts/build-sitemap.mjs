/**
 * Generate public/sitemap.xml from the site's own data.
 *
 * Reads the real page list and insight slugs rather than keeping a hand-written
 * copy, so the sitemap cannot drift out of step with the routes. Runs as part
 * of `npm run build`.
 */
import fs from 'node:fs'
import path from 'node:path'

const ORIGIN = 'https://www.prestigetutelage.co.za'
const root = process.cwd()

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

// Page routes, from the sitemap array the navigation already uses.
const site = read('src/data/site.js')
const pages = [...site.matchAll(/to:\s*'(\/[^']*)'/g)]
  .map((m) => m[1])
  .filter((p) => !p.includes('#'))

// Course pages, from the qualification list and the same slug rule the app
// uses. Regex rather than an import so the script stays dependency-free and
// cannot pull JSX into node; validate-seo.mjs checks the two agree.
const programmes = read('src/data/programmes.js')
const slugLib = read('src/lib/slug.js')
const overrides = Object.fromEntries(
  [...slugLib.matchAll(/(\d{5,6}):\s*'([^']+)'/g)].map((m) => [m[1], m[2]]),
)
const kebab = (str) =>
  str.toLowerCase().replace(/&/g, 'and').replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const courses = [...programmes.matchAll(/saqaId:\s*'(\d+)',\s*\n\s*name:\s*'([^']+)',(?:\s*\n\s*icon:[^\n]*)?\s*\n\s*nqf:\s*(\d+)/g)]
  .map(([, id, name, nqf]) => `/programmes/${overrides[id] ?? `${kebab(name)}-nqf-${nqf}`}`)

// Insight articles, from their slugs.
const insights = read('src/data/insights.js')
const slugs = [...insights.matchAll(/slug:\s*'([^']+)'/g)].map((m) => `/insights/${m[1]}`)

const urls = [...new Set([...pages, ...courses, ...slugs])]
  .filter((u) => !u.includes('#'))
  .sort()

const priority = (u) =>
  u === '/' ? '1.0'
  : u === '/programmes' ? '0.9'
  : u.startsWith('/programmes/') ? '0.7'
  : u.startsWith('/insights/') ? '0.5'
  : '0.8'

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${ORIGIN}${u === '/' ? '/' : u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(u)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml — ${urls.length} URLs`)
