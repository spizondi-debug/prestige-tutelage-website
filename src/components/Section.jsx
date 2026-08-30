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

export function SectionHeading({ eyebrow, title, lead, light = false, center = false, tone }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      {/* `tone="green"` puts the whole heading in the logo green — the deeper
          shade, not #2DA22F. Same hue and saturation, darker: #2DA22F measures
          3.32:1 on White, 3.12:1 on Cloud and 2.98:1 on the mist/60 bands, so
          it fails outright on Mist and clears large-text AA elsewhere with no
          headroom. #237D24 holds 4.53:1 or better on every light surface the
          site uses, which keeps the heading legal wherever a section moves and
          even if it later drops below the large-text size. #2DA22F stays for
          <Accent> spans and graphic rules. */}
      <h2
        className={`font-display text-section font-semibold ${eyebrow ? 'mt-5' : ''} ${
          light ? 'text-white' : tone === 'green' ? 'text-prestige-green-deep' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/90' : 'text-body'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
