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
 * space around its content. Decoration only; aria-hidden.
 */
export default function CornerSwirl({ size = 'md' }) {
  const sizes = {
    md: [
      'clamp(320px, 62vw, 940px) clamp(320px, 62vw, 940px)',
      'clamp(300px, 58vw, 880px) clamp(300px, 58vw, 880px)',
    ],
    sm: [
      'clamp(220px, 40vw, 560px) clamp(220px, 40vw, 560px)',
      'clamp(200px, 36vw, 500px) clamp(200px, 36vw, 500px)',
    ],
  }
  const [blueSize, greenSize] = sizes[size]

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `url(${assetUrl('images/bg-dots-blue.svg')}), url(${assetUrl('images/bg-dots-green.svg')})`,
        backgroundPosition: 'top right, bottom left',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: `${blueSize}, ${greenSize}`,
      }}
      aria-hidden="true"
    />
  )
}
