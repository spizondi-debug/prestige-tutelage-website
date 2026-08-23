/**
 * SmartImage — renders a real photograph from public/images/ when the file
 * exists, and a quiet branded panel wherever one has not been supplied yet.
 *
 * The placeholder is a layer *behind* the image rather than an error-state
 * swap, so a missing or not-yet-loaded photo never flashes an empty white box
 * (which is what a lazy-loaded broken image would otherwise show). When the
 * real photograph loads it simply covers the panel.
 *
 * No fake or AI imagery is ever rendered: the fallback is a plain textured
 * panel captioned with the photograph that belongs in the slot.
 * See public/images/README.md for the full asset manifest.
 */
export default function SmartImage({ src, alt, label, className = '', imgClassName = '', eager = false }) {
  const url = `${import.meta.env.BASE_URL}images/${src}`

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`.trim()}>
      {/* Placeholder layer — visible only until/unless a real photo covers it */}
      <div className="absolute inset-0 flex items-end">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-prestige-blue/[0.06]" />
          <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-prestige-green/[0.07]" />
        </div>
        <p className="relative w-full px-4 py-3 text-[0.7rem] leading-snug text-muted">
          Photograph: {label || alt}
        </p>
      </div>

      <img
        src={url}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        className={`relative h-full w-full object-cover ${imgClassName}`.trim()}
        onError={(e) => {
          // Hide the broken-image element so the panel beneath reads cleanly.
          e.currentTarget.style.visibility = 'hidden'
        }}
      />
    </div>
  )
}
