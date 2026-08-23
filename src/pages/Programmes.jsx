import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import {
  programmeAreas,
  programmeGroups,
  learnerships,
  qualifications,
  qualificationsFor,
} from '../data/programmes.js'
import { shortCourseNotes } from '../data/shortCourses.js'

export default function Programmes() {
  usePageMeta(
    'Programmes',
    'Registered qualifications from Prestige Tutelage including Management Assistant (NQF 5), Human Resource Management Administrator and Officer, Office Supervisor, Marketing Coordinator, Project Manager and Early Childhood Development Practitioner — plus programme areas across production technology and agriculture.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Accredited learning that maps onto real occupations."
        lead="Prestige Tutelage delivers programmes across business and management, technical production, agriculture and community development — as full qualifications, learnerships or components of a wider workforce plan."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="On this page">
          <a href="#qualifications" className="text-sm font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep">
            Registered qualifications
          </a>
          <a href="#learnerships" className="text-sm font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep">
            Learnerships
          </a>
        </nav>
      </PageHeader>

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

      {/* Registered qualifications */}
      <section id="qualifications" className="scroll-mt-28 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Registered qualifications"
            title="Qualifications we deliver, on the record."
            lead="Each is a registered qualification with its SAQA ID, NQF level and credit value stated. Delivered as a full qualification or through a learnership."
          />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">
                Registered qualifications delivered by Prestige Tutelage, with SAQA ID, NQF level and credits
              </caption>
              <thead>
                <tr className="border-y border-line">
                  <th scope="col" className="py-3 pr-6 text-sm font-semibold uppercase tracking-wider text-muted">
                    Qualification
                  </th>
                  <th scope="col" className="py-3 pr-6 text-sm font-semibold uppercase tracking-wider text-muted">
                    SAQA ID
                  </th>
                  <th scope="col" className="py-3 pr-6 text-sm font-semibold uppercase tracking-wider text-muted">
                    NQF
                  </th>
                  <th scope="col" className="py-3 text-right text-sm font-semibold uppercase tracking-wider text-muted">
                    Credits
                  </th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((q) => (
                  <tr key={q.saqaId} className="border-b border-line">
                    <th scope="row" className="py-4 pr-6 font-display text-lg font-semibold text-ink">
                      {q.name}
                    </th>
                    <td className="py-4 pr-6 font-medium tabular-nums text-body">{q.saqaId}</td>
                    <td className="py-4 pr-6 text-body">
                      <span className="font-semibold text-prestige-blue">Level {q.nqf}</span>
                    </td>
                    <td className="py-4 text-right tabular-nums text-body">{q.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-sm text-muted">
            Additional programme areas below are delivered as skills programmes or customised
            interventions. Where a qualification is not listed here, we confirm the registration
            detail in writing when we scope your intervention.
          </p>
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
                    {items.map((p) => {
                      const quals = qualificationsFor(p.slug)
                      return (
                        <article key={p.slug} className="border-b border-line py-6">
                          <h4 className="font-display text-xl font-semibold text-ink">{p.title}</h4>
                          <p className="mt-2 leading-relaxed text-body">{p.summary}</p>
                          <p className="mt-3 text-sm text-muted">
                            <span className="font-semibold text-body">Typically for:</span> {p.forWho}
                          </p>
                          {quals.length > 0 && (
                            <ul className="mt-4 space-y-2 border-t border-line pt-4">
                              {quals.map((q) => (
                                <li key={q.saqaId} className="text-sm">
                                  <span className="font-semibold text-ink">{q.name}</span>
                                  <span className="mt-0.5 block text-muted">
                                    SAQA ID {q.saqaId} · NQF Level {q.nqf} · {q.credits} credits
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </article>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 rounded-lg border border-line bg-paper p-6">
            <h3 className="font-sans font-semibold text-ink">What we publish</h3>
            <p className="mt-2 leading-relaxed text-body">
              Registered qualifications are listed above with their SAQA ID, NQF level and credits.
              For every other programme area, the applicable registration and accreditation detail is
              confirmed in writing when we scope your intervention — we publish only what we can verify.
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
