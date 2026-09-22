import { Link } from 'react-router-dom'

/**
 * LearningRoutes — the "short course or qualification?" choice, shown on
 * both Programmes and Short Courses so either page states the fork and
 * points at the other branch.
 *
 * Two elevated cards rather than a divided band: route 1 carries the blue
 * accent, route 2 the green one, and the "Choose your route" badge in the
 * gap between them makes the fork explicit rather than implied by a
 * vertical rule. `mist` background: white text isn't in play here, so the
 * contrast reasoning that drove earlier colour choices doesn't apply — this
 * is about the fork reading as a real decision, not a continuation of the
 * page above it.
 */

const HEADING = 'Practical learning for the work ahead.'

const ROUTE_TONE = {
  1: { badge: 'bg-prestige-blue text-white', edge: 'bg-prestige-blue', cta: 'btn-primary' },
  2: { badge: 'bg-prestige-green text-ink', edge: 'bg-prestige-green', cta: 'btn-green' },
}

function RouteLink({ to, href, className, children }) {
  const Tag = href ? 'a' : Link
  const linkProps = href ? { href } : { to }
  return (
    <Tag {...linkProps} className={`group inline-flex items-center gap-2 ${className}`}>
      {children}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200 ease-prestige group-hover:translate-x-0.5">
        <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Tag>
  )
}

function RouteCard({ route, index }) {
  const tone = ROUTE_TONE[index]
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-paper shadow-premium">
      <span className={`absolute inset-x-0 top-0 h-1 ${tone.edge}`} aria-hidden="true" />
      <div className="p-7 sm:p-8">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide ${tone.badge}`}>
          {route.badge}
        </span>
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
          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {route.tiles.map((t) => {
              const Icon = t.icon
              return (
                <li key={t.name} className="flex items-start gap-4 rounded-xl bg-prestige-green-pale p-4">
                  {Icon && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-prestige-green-deep">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                  )}
                  <div>
                    <p className="font-display text-base font-bold leading-snug text-ink">{t.name}</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-body">{t.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {route.cta && (
          <div className="mt-8">
            <RouteLink to={route.cta.to} href={route.cta.href} className={`btn ${tone.cta}`}>
              {route.cta.label}
            </RouteLink>
          </div>
        )}
      </div>
    </div>
  )
}

/** The dashed connector and "Choose your route" badge — desktop only. */
function RouteConnector() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-24 -translate-x-1/2 lg:block" aria-hidden="true">
      <svg viewBox="0 0 96 400" fill="none" preserveAspectRatio="none" className="h-full w-full">
        <path d="M16,0 C16,120 48,120 48,200 C48,280 16,280 16,400" stroke="#087BE8" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
        <path d="M80,0 C80,120 48,120 48,200 C48,280 80,280 80,400" stroke="#31B84A" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper p-2 text-center text-[0.6rem] font-bold uppercase leading-snug tracking-normal text-ink shadow-premium">
        Choose your route
      </span>
    </div>
  )
}

export default function LearningRoutes({ route1, route2 }) {
  return (
    <section className="bg-mist/50">
      <div className="container-px py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {HEADING}
          </h2>
          <span className="mx-auto mt-5 block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
        </div>

        <div className="relative mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RouteConnector />
          <RouteCard route={route1} index={1} />
          <RouteCard route={route2} index={2} />
        </div>
      </div>
    </section>
  )
}
