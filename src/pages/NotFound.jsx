import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import { allPages } from '../data/site.js'
import CornerSwirl from '../components/CornerSwirl.jsx'

export default function NotFound() {
  // A 404 must not be indexed: otherwise every mistyped or retired URL becomes
  // a thin page competing with the real ones in the index.
  usePageMeta('Page not found', 'The page you were looking for is not here. Browse Prestige Tutelage’s accredited programmes, short courses and business solutions instead.', { noindex: true })

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <CornerSwirl size="sm" />
      <div className="container-px relative">
        <div className="max-w-2xl">
          <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
          <p className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">Error 404</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            This pathway doesn’t lead anywhere.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            The link may be out of date, or the page may have moved. Every pathway on the site is
            listed below.
          </p>

          <nav className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2" aria-label="All pages">
            {allPages.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="border-b border-line py-3 font-medium text-ink transition-colors hover:text-prestige-blue-hover"
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="btn btn-primary mt-9">Return Home</Link>
        </div>
      </div>
    </section>
  )
}
