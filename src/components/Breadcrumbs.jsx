import { Link } from 'react-router-dom'

/**
 * Breadcrumbs — visible trail, matched by BreadcrumbList in the page's JSON-LD.
 *
 * `aria-current="page"` marks the last crumb and it is rendered as text rather
 * than a link: a link to the page you are already on is noise for a keyboard
 * or screen-reader user, and Google reads the markup from the JSON-LD anyway.
 */
export default function Breadcrumbs({ trail, className = '' }) {
  if (!trail?.length) return null
  return (
    <nav aria-label="Breadcrumb" className={`no-print ${className}`.trim()}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {trail.map((t, i) => {
          const last = i === trail.length - 1
          return (
            <li key={t.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-muted">{t.name}</span>
              ) : (
                <Link
                  to={t.path}
                  className="font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
                >
                  {t.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className="text-muted">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
