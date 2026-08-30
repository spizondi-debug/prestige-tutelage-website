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

export function SectionHeading({ eyebrow, title, lead, light = false, center = false, tone = 'green' }) {
  const colour = light
    ? 'text-white'
    : tone === 'blue'
      ? 'text-prestige-blue-hover'
      : tone === 'ink'
        ? 'text-ink'
        : 'text-prestige-green-deep'

  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      {/* Section headings are the logo green by default, across the whole site.
          Not the bright green though: #31B84A measures 2.60:1 on white, which
          fails even the 3.0:1 floor for display type. `green-deep` #1E7A2E is
          the same hue at the same saturation, dark enough to hold 5.41:1 on
          White, 5.08:1 on Cloud and 4.80:1 on Mist — so it stays legal wherever
          a section moves, and even if the heading later drops below display
          size. The bright green stays for <Accent> spans and graphic rules.

          `tone="blue"` and `tone="ink"` are the escape hatches; `light` keeps
          headings white on the blue and photographic surfaces, where green is
          unusable (the brand green is 1.61:1 on the brand blue). */}
      <h2
        className={`font-display text-section font-semibold ${eyebrow ? 'mt-5' : ''} ${colour}`}
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
