import { assetUrl } from '../lib/asset.js'

/**
 * The concentric dot-arc swirl used behind "More than training." — blue
 * fanning from the top-right corner, green from the bottom-left. Pulled out
 * into its own component so other plain white/grey sections can reuse it
 * without repeating the inline style.
 *
 * Two independent square images, each anchored to its own corner, rather
 * than one image stretched to the section — a single stretched image
 * distorts whenever the section's own proportions differ from the image's.
 * `size` controls how large each swirl reads relative to the viewport;
 * smaller than the homepage default for a section that carries less empty
 * space around its content. `opacity` (0–1) turns the whole thing down
 * further for a section where the pattern sits over especially busy
 * content. Decoration only; aria-hidden.
 *
 * The default is 0.4, not 1. At full strength the dot arcs compete with body
 * copy for attention wherever a section's text runs across a corner, and the
 * pattern had been turned down by hand, section by section, each time someone
 * noticed — which is the signal that the default was wrong rather than those
 * sections being unusual.
 */
export default function CornerSwirl({ size = 'md', opacity = 0.4 }) {
  const sizes = {
    // Large enough that the two swirls span most of a full-bleed section's
    // width on desktop, rather than staying a corner accent.
    md: [
      'clamp(480px, 92vw, 1500px) clamp(480px, 92vw, 1500px)',
      'clamp(440px, 86vw, 1400px) clamp(440px, 86vw, 1400px)',
    ],
    sm: [
      'clamp(380px, 76vw, 1200px) clamp(380px, 76vw, 1200px)',
      'clamp(360px, 70vw, 1100px) clamp(360px, 70vw, 1100px)',
    ],
  }
  const [blueSize, greenSize] = sizes[size]

  return (
    <div
      className="pointer-events-none absolute inset-0"
      data-swirl=""
      style={{
        backgroundImage: `url(${assetUrl('images/bg-dots-blue.svg')}), url(${assetUrl('images/bg-dots-green.svg')})`,
        backgroundPosition: 'top right, bottom left',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: `${blueSize}, ${greenSize}`,
        opacity,
      }}
      aria-hidden="true"
    />
  )
}
