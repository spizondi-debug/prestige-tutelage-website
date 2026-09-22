import { Link } from 'react-router-dom'
import { assetUrl } from '../lib/asset.js'

/**
 * Logo — the official Prestige Tutelage logo.
 * public/prestige-tutelage-logo.png is rebuilt from the supplied 1536px
 * original, trimmed of its white margin and given an alpha channel so it sits
 * sharply on any background, including high-density displays.
 * Do not alter, redraw or substitute it.
 */
export default function Logo({ className = 'h-11' }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Prestige Tutelage — home">
      <img
        src={assetUrl('prestige-tutelage-logo.png')}
        alt="Prestige Tutelage – Passion for training"
        width="768"
        height="404"
        className={`${className} w-auto`}
      />
    </Link>
  )
}
