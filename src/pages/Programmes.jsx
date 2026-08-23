import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import { programmeAreas, programmeGroups, learnerships } from '../data/programmes.js'
import { shortCourseNotes } from '../data/shortCourses.js'

export default function Programmes() {
  usePageMeta(
    'Programmes',
    'Accredited programme areas from Prestige Tutelage across project management, HR, marketing, administration, management, production technology, early childhood development and agriculture.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Accredited learning that maps onto real occupations."
        lead="Prestige Tutelage delivers programmes across business and management, technical production, agriculture and community development — as full qualifications, learnerships or components of a wider workforce plan."
      />

      {/* How programmes are delivered */}
      <section className="border-b border-line bg-paper py-12 lg:py-16">
        <div className="container-px">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'Full qualifications', d: 'Structured learning toward a registered qualification, with formal assessment and moderation.' },
              { t: 'Learnerships', d: 'Qualification-linked programmes combining classroom learning with structured workplace experience.' },
              { t: 'Skills programmes', d: 'Focused, credit-bearing components for organisations that need targeted capability quickly.' },
            ].map((x) => (
              <div key={x.t} className="border-l-2 border-prestige-green/60 pl-5">
                <h2 className="font-sans font-semibold text-ink">{x.t}</h2>
                <p className="mt-2 leading-relaxed text-body">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme areas by group */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Programme areas"
            title="Where Prestige delivers."
            lead="Each area is delivered in a format that suits your organisation — on-site, cohort-based or blended with workplace learning."
          />

          <div className="mt-12 space-y-14">
            {programmeGroups.map((group) => {
              const items = programmeAreas.filter((p) => p.group === group)
              if (!items.length) return null
              return (
                <div key={group}>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">{group}</h3>
                  <div className="mt-5 grid gap-x-12 border-t border-line lg:grid-cols-2">
                    {items.map((p) => (
                      <article key={p.slug} className="border-b border-line py-6">
                        <h4 className="font-display text-xl font-semibold text-ink">{p.title}</h4>
                        <p className="mt-2 leading-relaxed text-body">{p.summary}</p>
                        <p className="mt-3 text-sm text-muted">
                          <span className="font-semibold text-body">Typically for:</span> {p.forWho}
                        </p>
                        {(p.nqf || p.saqaId) && (
                          <p className="mt-2 text-sm font-medium text-prestige-blue">
                            {p.nqf ? `NQF Level ${p.nqf}` : ''}
                            {p.nqf && p.saqaId ? ' · ' : ''}
                            {p.saqaId ? `SAQA ID ${p.saqaId}` : ''}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-paper p-6">
            <h3 className="font-sans font-semibold text-ink">Qualification detail confirmed on enquiry</h3>
            <p className="mt-2 leading-relaxed text-body">
              NQF levels, SAQA registrations and accreditation numbers differ by programme and are
              confirmed in writing when we scope your intervention. We publish only what we can verify.
            </p>
          </div>
        </div>
      </section>

      {/* Learnerships */}
      <section id="learnerships" className="border-y border-line bg-sand/60 py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Learnerships"
                title="Work-based learning, managed properly."
                lead={learnerships.intro}
              />
              <div className="mt-8 space-y-6">
                {[learnerships.employed, learnerships.unemployed].map((l) => (
                  <div key={l.title} className="border-l-2 border-prestige-green/60 pl-5">
                    <h3 className="font-sans font-semibold text-ink">{l.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-body">{l.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-body">{learnerships.employerNote}</p>
              <Link to="/contact" className="btn btn-primary mt-8">Discuss a Learnership</Link>
            </div>
            <div className="relative">
              <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-xl2 bg-paper lg:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
                <Photo
                  src="graduate-celebrating.jpg"
                  alt="A graduate celebrating after completing his qualification"
                  className="aspect-[5/4] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accredited vs non-accredited */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Know what you are buying"
            title="Accredited programmes and short courses do different jobs."
          />
          <div className="mt-10 grid gap-8 border-t border-line pt-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">Accredited programmes</h3>
              <p className="mt-2 leading-relaxed text-body">{shortCourseNotes.accredited}</p>
              <Link to="/programmes" className="mt-4 inline-block text-sm font-semibold text-prestige-blue hover:underline">
                You are here →
              </Link>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">Short courses</h3>
              <p className="mt-2 leading-relaxed text-body">{shortCourseNotes.nonAccredited}</p>
              <Link to="/short-courses" className="mt-4 inline-block text-sm font-semibold text-prestige-blue hover:underline">
                Browse short courses →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which programme fits?"
        text="Tell us the roles and gaps you are working with, and we will recommend the right qualification, learnership or blend."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
