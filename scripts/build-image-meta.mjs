/**
 * Regenerate WebP derivatives and src/data/imageMeta.js from public/images.
 *
 * Run after adding, replacing or recropping a photograph:
 *   npm run build:images
 *
 * Every .jpg gets a .webp sibling at the same dimensions, and the meta file
 * records intrinsic width/height so <img> can reserve its box and avoid
 * layout shift. Requires `sharp`; if it is not installed the script says so
 * and exits without touching anything.
 */
import fs from 'node:fs'
import path from 'node:path'

const dir = path.join(process.cwd(), 'public', 'images')
const metaFile = path.join(process.cwd(), 'src', 'data', 'imageMeta.js')

let sharp
try {
  ({ default: sharp } = await import('sharp'))
} catch {
  console.error(
    'sharp is not installed. Install it (npm i -D sharp) or regenerate the\n' +
    'WebP files and src/data/imageMeta.js by hand — the site works either way,\n' +
    'it just will not pick up new images automatically.',
  )
  process.exit(1)
}

const jpgs = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).sort()
const meta = {}

for (const file of jpgs) {
  const full = path.join(dir, file)
  const img = sharp(full)
  const { width, height } = await img.metadata()
  meta[file] = { w: width, h: height }
  const webp = full.replace(/\.jpe?g$/i, '.webp')
  await img.webp({ quality: 82, effort: 6 }).toFile(webp)
  console.log(`${file}  ${width}x${height}  ->  ${path.basename(webp)}`)
}

const body = Object.entries(meta)
  .map(([k, v]) => `  '${k}': { w: ${v.w}, h: ${v.h} },`)
  .join('\n')

fs.writeFileSync(metaFile, `// Intrinsic pixel dimensions of every photograph, generated from the files
// themselves. Rendering width/height on the <img> reserves the right box
// before the image arrives, so nothing on the page jumps as photos load.
//
// Regenerate with scripts/build-image-meta.mjs after adding or recropping an
// image; a missing entry simply means no dimensions are emitted.
export const imageMeta = {
${body}
}

export const metaFor = (src) => imageMeta[src] ?? null
`)

console.log(`\n${jpgs.length} images processed; ${path.relative(process.cwd(), metaFile)} written.`)
