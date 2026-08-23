import { useState } from 'react'

/**
 * Logo — uses the official Prestige Tutelage logo when the image file is
 * present, and falls back to a typographic wordmark until it is added.
 *
 * DROP-IN: save the real logo to  public/prestige-tutelage-logo.png
 * (or .svg — update the src below). No other change needed.
 */
export default function Logo() {
  const [imgOk, setImgOk] = useState(true)
  const src = `${import.meta.env.BASE_URL}prestige-tutelage-logo.png`

  return (
    <a href="#home" className="inline-flex items-center" aria-label="Prestige Tutelage — home">
      {imgOk ? (
        <img
          src={src}
          alt="Prestige Tutelage"
          className="h-11 w-auto"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="inline-flex items-center">
          <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight text-ink">
            Prestige<span className="text-prestige-blue"> Tutelage</span>
          </span>
          <span className="ml-2 hidden rounded border border-line px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wide text-muted sm:inline">
            logo placeholder
          </span>
        </span>
      )}
    </a>
  )
}
