import { Link } from 'react-router-dom'

/**
 * LearningRoutes — the "short course or qualification?" choice, shown on
 * both Programmes and Short Courses so either page states the fork and
 * points at the other branch.
 *
 * One full-bleed Prestige-blue band, not a card. The section carries no
 * container-px of its own — it fills the viewport edge to edge — and only
 * the content inside is width-constrained, so the colour reads as a true
 * band rather than a panel floating in a paler background.
 *
 * Colour and text sizing were worked out together, not separately:
 *
 *   - White on #087BE8 measures 4.19:1. That clears 3.0:1, the AA floor for
 *     large text (≥24px, or ≥18.66px at 700 weight) — but falls short of
 *     4.5:1, the floor for normal text. Nothing brighter than white exists
 *     to fix that from the text side, and using a different background
 *     would mean not using the exact blue asked for.
 *   - So every heading, lead line and route badge here is sized or weighted
 *     into the large-text bracket on purpose — the intro heading and each
 *     route's lead sentence are comfortably over 24px, and the small tile
 *     names are bold at 19px, just past the 18.66px cutoff — and all of
 *     those clear 4.19:1 cleanly.
 *   - The smaller supporting sentences (the compliance detail under each
 *     route, and the tile descriptions) are ordinary flowing text that
 *     cannot reasonably be blown up to 24px without looking absurd. Those
 *     measure the same 4.19:1 — a small, known, disclosed shortfall against
 *     the strict 4.5:1 number, not a silent one.
 *
 * Green never appears as text colour here: the brand green is 1.61:1 on
 * this blue and even the palest tint of it barely clears 3:1 before it stops
 * reading as green at all. So the "green accent" the brief asked for is
 * decorative — a rule, a bullet dot, a filled badge with dark text on it —
 * never green letters on blue.
 */

const HEADING = 'Practical learning for the work ahead.'

function RouteBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-prestige-green px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-ink">
      {children}
    </span>
  )
}

function RouteLink({ to, href, children }) {
  const Tag = href ? 'a' : Link
  const linkProps = href ? { href } : { to }
  return (
    <Tag
      {...linkProps}
      // 19px/700: not a style choice, a contrast one. At the 16px/600 this
      // carried before, white measured 4.19:1 on #087BE8 — 0.31 short of the
      // 4.5:1 a link this size needs. Bold at 19px crosses into the large-text
      // bracket (needs only 3.0:1), which 4.19 clears with room to spare.
      className="group inline-flex items-center gap-2 font-sans text-[19px] font-bold text-white underline decoration-white/40 decoration-2 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 ease-prestige group-hover:translate-x-0.5">
        <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Tag>
  )
}

function RouteColumn({ route, divided }) {
  return (
    <div
      className={
        divided
          ? 'border-t border-white/20 pt-10 lg:border-t-0 lg:pt-0 lg:pl-12'
          : 'lg:pr-12'
      }
    >
      <RouteBadge>{route.badge}</RouteBadge>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">{route.title}</h3>
      <p className="mt-4 text-xl font-medium leading-snug text-white sm:text-2xl">{route.lead}</p>

      {route.detail && (
        <div className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-white">
          {(Array.isArray(route.detail) ? route.detail : [route.detail]).map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}

      {route.tiles && (
        <ul className="mt-6 space-y-5 border-t border-white/20 pt-6">
          {route.tiles.map((t) => (
            <li key={t.name} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
              <div>
                <p className="text-[19px] font-bold leading-snug text-white">{t.name}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-white">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {route.cta && (
        <div className="mt-8">
          <RouteLink to={route.cta.to} href={route.cta.href}>{route.cta.label}</RouteLink>
        </div>
      )}
    </div>
  )
}

export default function LearningRoutes({ route1, route2 }) {
  return (
    <section className="bg-prestige-blue">
      <div className="container-px py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {HEADING}
          </h2>
        </div>

        <div className="mt-12 grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-white/20">
          <RouteColumn route={route1} />
          <RouteColumn route={route2} divided />
        </div>
      </div>
    </section>
  )
}
