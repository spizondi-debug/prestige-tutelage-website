import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import { bbbeeGroups, bbbeeProcess, SCOPE_STATEMENT, OUTCOME_QUALIFIER } from '../data/bbbee.js'

export default function BBBEEConsulting() {
  usePageMeta(
    'B-BBEE Skills Development Consulting',
    'B-BBEE skills development consulting in Johannesburg — skills development strategy, learnership planning, youth and disability development programmes, learner evidence management and training reporting support from Prestige Tutelage, Randburg.',
  )

  return (
    <>
      <PageHeader
        eyebrow="B-BBEE skills development consulting"
        title="Turn skills development into measurable transformation value."
        lead="Prestige Tutelage helps organisations structure practical skills-development and workforce-development initiatives that support their broader B-BBEE objectives while creating genuine capability in the workplace."
      >
        <Link to="/contact?interest=B-BBEE%20Consultation" className="btn btn-primary mt-8">
          Discuss Your B-BBEE Skills Strategy
        </Link>
      </PageHeader>

      {/* Scope — stated up front, not buried */}
      <section className="border-b border-line bg-paper py-10">
        <div className="container-px">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:gap-12">
            <h2 className="font-display text-xl font-semibold text-ink">What we do — and what we don’t</h2>
            <div className="space-y-4">
              <p className="leading-relaxed text-body">{SCOPE_STATEMENT}</p>
              <Disclaimer>{OUTCOME_QUALIFIER}</Disclaimer>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="The problem we solve"
                title="Spend that satisfies a scorecard but changes nothing is wasted twice."
              />
              <p className="mt-5 leading-relaxed text-body">
                Plenty of organisations meet their skills-development obligations on paper and see no
                difference on the floor. The training happens, the invoices clear, the evidence file
                fills up — and capability stays where it was.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                We plan the other way round. Start from the roles and gaps that actually constrain the
                business, design development that addresses them, then make sure it is administered
                and evidenced properly. Transformation objectives and real capability are not
                competing goals — they are the same programme, planned well.
              </p>
            </div>
            <div className="overflow-hidden">
              <Photo
                src="bbbee-consultation.jpg"
                alt="Two colleagues in conversation beside an office window"
                className="aspect-[3/2] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-14 lg:py-16">
        <div className="container-px">
          <div className="max-w-3xl">
            <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold leading-tight text-white">
              How an engagement runs.
            </h2>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {bbbeeProcess.map((s, i) => (
              <li key={s.name} className="bg-navy p-6">
                <span className="font-display text-lg font-semibold text-prestige-growth">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-sans font-semibold text-white">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      {bbbeeGroups.map((group, gi) => (
        <section
          key={group.slug}
          id={group.slug}
          className={`scroll-mt-28 py-14 lg:py-16 ${gi % 2 === 1 ? 'border-y border-line bg-paper' : ''}`}
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
                <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-3 leading-relaxed text-body">{group.lead}</p>
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

      {/* Delivery link */}
      <section className="border-t border-line py-14 lg:py-16">
        <div className="container-px">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Planning and delivery in one place"
              title="We do not hand you a strategy and walk away."
              lead="The plans we help you build are ones we can also deliver — qualifications, learnerships, short courses and workplace training, with the learner administration and assessment behind them."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/programmes" className="btn btn-outline">Qualifications &amp; Learnerships</Link>
              <Link to="/services" className="btn btn-outline">All Services</Link>
            </div>
          </div>
          <Disclaimer className="mt-10">{SCOPE_STATEMENT}</Disclaimer>
        </div>
      </section>

      <CTABand
        title="Discuss your B-BBEE skills strategy."
        text="Tell us your transformation objectives and where your workforce actually needs to improve. We will propose a practical plan."
        primary={{ label: 'Discuss Your B-BBEE Skills Strategy', to: '/contact?interest=B-BBEE%20Consultation' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  )
}
