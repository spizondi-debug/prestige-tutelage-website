import { assetUrl } from '../lib/asset.js'
import { metaFor } from '../data/imageMeta.js'

/**
 * Photo — a real photograph in a fixed aspect box.
 *
 * Serves WebP with a JPEG fallback, and emits the intrinsic width/height so
 * the browser reserves the correct box before the file arrives. The box is
 * still sized by `className`; the attributes only supply the aspect ratio the
 * browser needs to avoid shifting the page.
 *
 * All photography on this site is real. Slots without a suitable photograph
 * are designed without one rather than filled with a placeholder.
 */
export default function Photo({
  src,
  alt,
  className = '',
  position = 'center',
  eager = false,
}) {
  const meta = metaFor(src)
  const webp = src.replace(/\.jpe?g$/i, '.webp')

  return (
    <div className={`overflow-hidden bg-mist ${className}`.trim()}>
      <picture className="block h-full w-full">
        <source srcSet={assetUrl(`images/${webp}`)} type="image/webp" />
        <img
          src={assetUrl(`images/${src}`)}
          alt={alt}
          width={meta?.w}
          height={meta?.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : undefined}
          className="block h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </picture>
    </div>
  )
}
