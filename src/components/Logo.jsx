import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Logo — uses the official Prestige Tutelage logo when the image file is
 * present, and falls back to a typographic wordmark until it is added.
 *
 * DROP-IN: save the real logo to  public/prestige-tutelage-logo.png
 * (or .svg — update the src below). No other change needed.
 */
export default function Logo({ onDark = false }) {
  const [imgOk, setImgOk] = useState(true)
  const src = `${import.meta.env.BASE_URL}prestige-tutelage-logo.png`

  return (
    <Link to="/" className="inline-flex items-center" aria-label="Prestige Tutelage — home">
      {imgOk ? (
        <img
          src={src}
          alt="Prestige Tutelage"
          className="h-11 w-auto"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="inline-flex items-center">
          <span className={`font-display text-[1.35rem] font-bold leading-none tracking-tight ${onDark ? 'text-white' : 'text-ink'}`}>
            Prestige<span className={onDark ? ' text-prestige-green' : ' text-prestige-blue'}> Tutelage</span>
          </span>
        </span>
      )}
    </Link>
  )
}
