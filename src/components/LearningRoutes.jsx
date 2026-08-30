import { Link } from 'react-router-dom'

/**
 * LearningRoutes — the "short course or qualification?" choice, shown on
 * both Programmes and Short Courses so either page states the fork and
 * points at the other branch.
 *
 * One full-bleed band, not a card — the section carries no container-px of
 * its own, so the background fills the viewport edge to edge, and only the
 * content inside is width-constrained. Started as a solid Prestige-blue
 * band; moved to this light one after that shipped, because white text on
 * #087BE8 measured 4.19:1 for normal-sized copy — under the 4.5:1 floor —
 * and getting every line of it into the large-text bracket that lets 4.19
 * pass (24px, or 18.66px bold) meant either an oversized statement everywhere
 * or a disclosed shortfall on the smaller print. `mist` removes the problem
 * outright: every colour below clears AA with room to spare, at any size.
 *
 * Green is still reserved for accent, not running text, on the same
 * reasoning as before — decorative here rather than load-bearing, so the
 * badge fill and rule keep it further from any contrast question, not
 * because green fails on this lighter background too.
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
      className="group inline-flex items-center gap-2 font-sans font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
    >
      {children}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200 ease-prestige group-hover:translate-x-0.5">
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
          ? 'border-t border-line pt-10 lg:border-t-0 lg:pt-0 lg:pl-12'
          : 'lg:pr-12'
      }
    >
      <RouteBadge>{route.badge}</RouteBadge>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{route.title}</h3>
      <p className="mt-4 text-xl font-medium leading-snug text-ink sm:text-2xl">{route.lead}</p>

      {route.detail && (
        <div className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-body">
          {(Array.isArray(route.detail) ? route.detail : [route.detail]).map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      )}

      {route.tiles && (
        <ul className="mt-6 space-y-5 border-t border-line pt-6">
          {route.tiles.map((t) => (
            <li key={t.name} className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
              <div>
                <p className="text-[19px] font-bold leading-snug text-ink">{t.name}</p>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-body">{t.text}</p>
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
    <section className="bg-mist/50">
      <div className="container-px py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-prestige-green-deep sm:text-4xl">
            {HEADING}
          </h2>
        </div>

        <div className="mt-12 grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-line">
          <RouteColumn route={route1} />
          <RouteColumn route={route2} divided />
        </div>
      </div>
    </section>
  )
}
