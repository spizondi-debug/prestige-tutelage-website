import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import CTABand from '../components/CTABand.jsx'
import { serviceGroups } from '../data/services.js'

export default function Services() {
  usePageMeta(
    'Services',
    'Prestige Tutelage is a complete workforce support partner across training, skills development consulting, B-BBEE advisory, recruitment, programme management, assessment, office and training space, and social impact.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="More than training. A complete workforce support partner."
        lead="Prestige supports the wider workforce-development journey — from learning and transformation strategy to recruitment, programme management, assessment and professional business facilities."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Service groups">
          {serviceGroups.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="text-sm font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {serviceGroups.map((group, gi) => (
        <section
          key={group.slug}
          id={group.slug}
          className={`scroll-mt-28 py-14 lg:py-20 ${gi % 2 === 1 ? 'border-y border-line bg-paper' : ''}`}
        >
          <div className="container-px">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-prestige-green" />
                  <span className="text-sm font-semibold tracking-wide text-prestige-blue">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-3xl font-semibold leading-tight text-ink">{group.title}</h2>
                <p className="mt-3 leading-relaxed text-body">{group.lead}</p>
                {group.to && (
                  <Link to={group.to} className="mt-5 inline-block text-sm font-semibold text-prestige-blue hover:underline">
                    {group.cta || 'Explore this service'} →
                  </Link>
                )}
              </div>

              <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
                {group.services.map((s) => (
                  <div key={s.name} className="border-b border-line py-5">
                    <dt className="font-sans font-semibold text-ink">{s.name}</dt>
                    <dd className="mt-1.5 leading-relaxed text-body">{s.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      <CTABand
        title="Which part of the workforce journey needs attention?"
        text="Tell us the business problem first. We will recommend the right mix of training, advisory, talent, assessment or facilities support — no more than you need."
        primary={{ label: 'Talk to Prestige', to: '/contact' }}
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
