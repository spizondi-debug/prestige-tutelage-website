import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import CTABand from '../components/CTABand.jsx'
import { serviceGroups } from '../data/services.js'
import { pageHeroes } from '../data/pageHeroes.js'

export default function Services() {
  usePageMeta(
    'Services',
    'Skills development consulting, B-BBEE skills advisory, recruitment services, assessment services and training room rental in Randburg — the full workforce support offering from Prestige Tutelage, South Africa.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.services}
        eyebrow="Services"
        title="More than training. A complete workforce support partner."
        lead="Training is where Prestige started, and it remains the core. But the work around it — advising on strategy, finding the people, administering the programme, assessing the outcome and housing it all — is just as much a part of what we do."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Service groups">
          {serviceGroups.map((g) => (
            <a
              key={g.slug}
              href={`#${g.slug}`}
              className="text-sm font-semibold text-prestige-blue transition-colors hover:text-navy-lift"
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
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-prestige-green" />
                  <span className="text-sm font-semibold tracking-wide text-prestige-blue">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-3 leading-relaxed text-body">{group.lead}</p>
                {group.to && (
                  <Link
                    to={group.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-prestige-blue transition-colors hover:text-navy-lift"
                  >
                    {group.toLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>

              <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
                {group.services.map((s) => (
                  <div key={s.name} className="border-b border-line py-5">
                    <dt className="font-sans font-semibold text-ink">
                      {s.to ? (
                        <Link to={s.to} className="transition-colors hover:text-prestige-blue">
                          {s.name}
                        </Link>
                      ) : (
                        s.name
                      )}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-body">{s.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      <CTABand
        title="Which of these do you need?"
        text="Most engagements combine several. Tell us the situation and we will propose the right mix — no more than you need."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
