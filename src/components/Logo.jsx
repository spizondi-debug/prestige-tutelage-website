import { Link } from 'react-router-dom'

/**
 * Logo — the official Prestige Tutelage logo.
 * public/prestige-tutelage-logo.png is the supplied original, trimmed of its
 * white margin and given an alpha channel so it sits on any background.
 * Do not alter, redraw or substitute it.
 */
export default function Logo({ className = 'h-11' }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Prestige Tutelage — home">
      <img
        src={`${import.meta.env.BASE_URL}prestige-tutelage-logo.png`}
        alt="Prestige Tutelage"
        width="316"
        height="168"
        className={`${className} w-auto`}
      />
    </Link>
  )
}
