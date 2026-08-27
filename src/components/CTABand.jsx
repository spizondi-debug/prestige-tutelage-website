import { Link } from 'react-router-dom'

/**
 * CTABand — the closing band used across pages. Carries the Prestige Digital
 * Gradient, so the Growth Pathways treatment closes every page on the site.
 */
export default function CTABand({
  title = 'Let’s talk about your workforce.',
  text = 'Tell us what your organisation is trying to achieve, and we will propose a practical, credible way to get there.',
  primary = { label: 'Request a Proposal', to: '/contact' },
  secondary = { label: 'Explore Our Programmes', to: '/programmes' },
}) {
  return (
    <section className="tex tex-grain tex-edge relative overflow-hidden bg-prestige-digital">
      {/* Holds type on a readable field where the gradient runs brightest. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.9)_0%,rgba(7,26,43,0.6)_52%,rgba(7,26,43,0.32)_100%)]"
        aria-hidden="true"
      />
      <div className="container-px relative">
        <div className="grid items-center gap-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <span className="mb-5 block h-px w-10 bg-prestige-growth" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link to={primary.to} className="btn btn-green">{primary.label}</Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="btn btn-ghost-light"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
