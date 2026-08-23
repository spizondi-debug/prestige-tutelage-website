import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import { allPages } from '../data/site.js'

export default function NotFound() {
  usePageMeta('Page not found', 'The page you were looking for could not be found on the Prestige Tutelage website.')

  return (
    <section className="py-20 lg:py-28">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
          <p className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">Error 404</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            We could not find that page.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            The link may be out of date, or the page may have moved. Everything on the site is listed
            below.
          </p>

          <nav className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2" aria-label="All pages">
            {allPages.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="border-b border-line py-3 font-medium text-ink transition-colors hover:text-prestige-blue"
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="btn btn-primary mt-9">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}
