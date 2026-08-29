/**
 * Build a single self-contained HTML file of the whole site.
 *
 * Used to produce a shareable preview that needs no server: the JS and CSS are
 * inlined, every image becomes a data URI, and routing switches to hashes.
 * The deployed site is unaffected — this only reads dist/ and writes one file.
 *
 *   npm run build:preview   ->  preview/prestige-tutelage-preview.html
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const outDir = path.join(root, 'preview')
const outFile = path.join(outDir, 'prestige-tutelage-preview.html')

const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' }
const fontMime = { '.woff2': 'font/woff2' }
const dataUri = (file) =>
  `data:${mime[path.extname(file).toLowerCase()] ?? 'application/octet-stream'};base64,` +
  fs.readFileSync(file).toString('base64')

console.log('Building with hash routing…')
execSync('vite build', { stdio: 'inherit', env: { ...process.env, VITE_HASH_ROUTER: '1' } })

// Collect every public asset as a data URI, keyed by its public path.
const assets = {}
const walk = (dir, prefix = '') => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, `${prefix}${entry.name}/`)
    else if (mime[path.extname(entry.name).toLowerCase()]) {
      assets[`${prefix}${entry.name}`] = dataUri(full)
    }
  }
}
walk(path.join(dist, 'images'), 'images/')
for (const name of ['prestige-tutelage-logo.png', 'favicon.png']) {
  const p = path.join(dist, name)
  if (fs.existsSync(p)) assets[name] = dataUri(p)
}

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// Self-hosted fonts are referenced by absolute URL from the CSS, which has no
// server to resolve against once everything is one file — so they are inlined
// into the stylesheet as data URIs before it is embedded.
const inlineFonts = (css) =>
  css.replace(/url\((['"]?)\/(fonts\/[^)'"]+)\1\)/g, (whole, _q, rel) => {
    const file = path.join(dist, rel)
    if (!fs.existsSync(file)) return whole
    const type = fontMime[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
    return `url(data:${type};base64,${fs.readFileSync(file).toString('base64')})`
  })

// Inline the emitted CSS and JS, then drop their tags.
html = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+)"[^>]*>/g, (_, href) =>
  `<style>${inlineFonts(fs.readFileSync(path.join(dist, href), 'utf8'))}</style>`)
html = html.replace(/<script type="module"[^>]*src="\/(assets\/[^"]+)"[^>]*><\/script>/g, (_, src) =>
  `<script type="module">${fs.readFileSync(path.join(dist, src), 'utf8')}</script>`)

// Favicon as a data URI, and the asset map ahead of the bundle.
html = html.replace(/<link rel="icon"[^>]*>/, assets['favicon.png']
  ? `<link rel="icon" type="image/png" href="${assets['favicon.png']}" />` : '')
html = html.replace(/<link rel="apple-touch-icon"[^>]*>/, '')
html = html.replace(/\s*<link rel="preload"[^>]*as="font"[^>]*>/g, '')
html = html.replace('</head>', `<script>window.__PT_ASSETS__=${JSON.stringify(assets)};</script></head>`)

// The deployed <title> carries the SEO tagline; the preview is identified by
// name alone so it reads cleanly as a browser tab.
html = html.replace(/<title>[^<]*<\/title>/, '<title>Prestige Tutelage</title>')

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, html)

const mb = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2)
console.log(`\n${path.relative(root, outFile)}  —  ${mb} MB, ${Object.keys(assets).length} assets inlined`)
