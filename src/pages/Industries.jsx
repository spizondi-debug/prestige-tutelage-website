import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import CTABand from '../components/CTABand.jsx'
import { industries } from '../data/industries.js'

export default function Industries() {
  usePageMeta(
    'Industries',
    'Workplace training and learnerships across manufacturing, agriculture and agri-processing, logistics, retail, professional services, the public sector and community development — from Prestige Tutelage, an accredited South African training provider.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Training designed for the realities of your sector."
        lead="A supervisor on a poultry farm, a team leader on a production line and a manager in a professional firm face different problems. We design for each — and we know the difference."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Industry sectors">
          {industries.map((i) => (
            <a
              key={i.slug}
              href={`#${i.slug}`}
              className="text-sm font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep"
            >
              {i.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {industries.map((ind, i) => (
        <section
          key={ind.slug}
          id={ind.slug}
          className={`scroll-mt-28 py-12 lg:py-16 ${i % 2 === 1 ? 'border-y border-line bg-paper' : ''}`}
        >
          <div className="container-px">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <div className="mb-4 flex items-baseline gap-4">
                  <span className="font-display text-3xl font-semibold text-prestige-green/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>
                <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {ind.title}
                </h2>
                <p className="mt-4 leading-relaxed text-body">{ind.summary}</p>
              </div>

              <div className="lg:pt-12">
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                  What we typically deliver
                </h3>
                <ul className="mt-4 grid gap-x-10 border-t border-line sm:grid-cols-2">
                  {ind.offerings.map((o) => (
                    <li key={o} className="flex items-start gap-3 border-b border-line py-3 text-body">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTABand
        title="Your sector, your constraints."
        text="Tell us how your operation runs and we will design training that fits around it — not the other way around."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
