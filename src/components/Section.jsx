// Small layout primitives shared across the site.
//
// The eyebrow is a wide-tracked micro-caps label rather than a rule-and-text
// pair: it sets the same rhythm on every section, light or dark, and lets the
// statement below it carry the weight on its own.

/**
 * Accent — lifts one phrase out of a headline in the logo green.
 *
 * Headings only. The logo green clears AA at large text sizes but not at body
 * size, and not at all on Mist; see the note in src/index.css.
 */
export function Accent({ children }) {
  return <span className="hl-accent">{children}</span>
}

export function Eyebrow({ children, light = false }) {
  return <p className={light ? 'eyebrow-light' : 'eyebrow'}>{children}</p>
}

export function SectionHeading({ eyebrow, title, lead, light = false, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-section font-semibold ${eyebrow ? 'mt-5' : ''} ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/75' : 'text-body'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
