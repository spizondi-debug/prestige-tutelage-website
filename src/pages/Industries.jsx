import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import SmartImage from '../components/SmartImage.jsx'
import CTABand from '../components/CTABand.jsx'
import { industries } from '../data/industries.js'

export default function Industries() {
  usePageMeta(
    'Industries',
    'Prestige Tutelage delivers training across manufacturing and engineering, agriculture, logistics, retail, professional services, the public sector and community development.',
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
          className={`scroll-mt-28 py-14 lg:py-20 ${i % 2 === 1 ? 'border-y border-line bg-paper' : ''}`}
        >
          <div className="container-px">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 === 1 ? 'lg:order-last' : ''}>
                <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
                  <SmartImage
                    src={ind.image}
                    alt={ind.imageAlt}
                    label={ind.imageAlt}
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-prestige-green" />
                  <span className="text-sm font-semibold tracking-wide text-prestige-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-semibold leading-tight text-ink">{ind.title}</h2>
                <p className="mt-4 leading-relaxed text-body">{ind.summary}</p>
                <h3 className="mt-7 font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                  What we typically deliver
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {ind.offerings.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-body">
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
