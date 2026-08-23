/**
 * Disclaimer — compliance notice shown wherever programmes or courses are
 * listed. Deliberately quiet: a hairline rule and muted text, so it reads as
 * professional care rather than a warning banner.
 */
export default function Disclaimer({ children, className = '' }) {
  return (
    <p className={`border-l-2 border-prestige-blue/25 pl-5 text-sm leading-relaxed text-muted ${className}`.trim()}>
      {children}
    </p>
  )
}
