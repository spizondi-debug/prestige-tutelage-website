/**
 * Photo — a real photograph in a fixed aspect box.
 *
 * All photography on this site is real. Slots without a suitable photograph
 * are designed without one rather than filled with a placeholder.
 */
export default function Photo({ src, alt, className = '', position = 'center', eager = false }) {
  return (
    <div className={`overflow-hidden bg-sand ${className}`.trim()}>
      <img
        src={`${import.meta.env.BASE_URL}images/${src}`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  )
}
