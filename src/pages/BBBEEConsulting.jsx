import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import { bbbeeGroups, bbbeeProcess, SCOPE_STATEMENT, OUTCOME_QUALIFIER } from '../data/bbbee.js'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'
import CornerSwirl from '../components/CornerSwirl.jsx'

export default function BBBEEConsulting() {
  usePageMeta(
    'B-BBEE Skills Development Consulting',
    'B-BBEE skills development consulting in Johannesburg — skills development strategy, learnership planning, youth and disability development programmes, learner evidence management and training reporting support from Prestige Tutelage, Randburg.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.bbbee}
        eyebrow="B-BBEE skills development consulting"
        title={<>Turn skills development into <Accent>measurable transformation value</Accent>.</>}
        lead="Prestige Tutelage helps organisations structure practical skills-development and workforce-development initiatives that support their broader B-BBEE objectives while creating genuine capability in the workplace."
      >
        <Link to="/contact?interest=B-BBEE%20Consultation" className="btn btn-primary mt-8">
          Discuss Your B-BBEE Skills Strategy
        </Link>
      </PageHeader>

      {/* Scope — stated up front, not buried */}
      <section className="relative overflow-hidden border-b border-line bg-paper py-10">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
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
            <ContentSlider
              images={sectionSliders.bbbee}
              aspect="aspect-[4/3]"
              label="Prestige Tutelage learners at work in the trades"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-prestige-blue-hover py-14 lg:py-16">
        <div className="container-px">
          <div className="max-w-3xl">
            <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold leading-tight text-white">
              How an engagement runs.
            </h2>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {bbbeeProcess.map((s, i) => (
              <li key={s.name} className="bg-prestige-blue-deep p-6">
                <span className="font-display text-lg font-semibold text-prestige-green-light">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-sans font-semibold text-white">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-premium">
            <div className="p-8 lg:p-10">
              <SectionHeading
                eyebrow="Programme areas"
                title="Build capability where it matters."
                lead="Explore focused pathways across strategy, learnerships, inclusion and reporting."
                tone="ink"
              />
              <span className="mt-5 block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
            </div>

            {bbbeeGroups.map((group, gi) => (
              <div
                key={group.slug}
                id={group.slug}
                className={`scroll-mt-28 border-t border-line p-8 lg:p-10 ${
                  gi % 2 === 0 ? 'bg-prestige-blue-light/40' : 'bg-paper'
                }`}
              >
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-prestige-blue-deep font-display text-lg font-bold text-white">
                      {String(gi + 1).padStart(2, '0')}
                    </span>
                    <div className="border-l-2 border-prestige-green pl-4">
                      <h3 className="font-display text-xl font-semibold text-prestige-green-deep sm:text-2xl">
                        {group.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-body">{group.lead}</p>
                    </div>
                  </div>
                  <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.services.map((s) => (
                      <div key={s.name} className="rounded-xl border border-line bg-paper p-5">
                        <p className="font-sans font-semibold text-prestige-blue-hover">{s.name}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-body">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
