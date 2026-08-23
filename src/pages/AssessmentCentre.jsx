import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'

// Scope is confirmed per engagement — no approval for specific qualifications
// or assessment-centre scope is asserted anywhere on this page.
const SCOPE_NOTE =
  'Scope of assessment, the applicable qualifications and the relevant quality-assurance arrangements are confirmed in writing per engagement.'

const pathways = [
  {
    who: 'Employers',
    text: 'Confirming competence across teams — for qualifications, learnerships or internal standards — with records that survive audit.',
    needs: ['Assessment planning for a cohort', 'Moderation of internal assessment decisions', 'Evidence and record management', 'Results and reporting'],
    cta: { label: 'Discuss an Employer Assessment', to: '/contact?interest=Assessment%20Centre' },
  },
  {
    who: 'Training Providers',
    text: 'Independent assessment and moderation capacity when your own is stretched, or when a separation of duties is required.',
    needs: ['External moderation', 'Assessor capacity', 'Invigilation services', 'Assessment centre facilities'],
    cta: { label: 'Discuss Provider Support', to: '/contact?interest=Assessment%20Centre' },
  },
  {
    who: 'Candidates',
    text: 'A fair, well-run assessment with clear expectations, proper support and a transparent appeals route.',
    needs: ['Registration and scheduling', 'What to expect on the day', 'Results processing', 'Queries and appeals'],
    cta: { label: 'Candidate Enquiry', to: '/contact?interest=Assessment%20Centre' },
  },
]

const capabilities = [
  { name: 'Candidate Registration', text: 'Accurate capture and verification of candidate details before any assessment begins.' },
  { name: 'Assessment Scheduling', text: 'Planned assessment calendars that fit operational realities and give candidates fair notice.' },
  { name: 'Assessment Administration', text: 'Venue, materials, controls and logistics managed so the assessment runs without incident.' },
  { name: 'Assessors', text: 'Registered, briefed assessors applying agreed criteria consistently across candidates.' },
  { name: 'Moderation', text: 'Independent moderation of assessment decisions to confirm fairness and consistency.' },
  { name: 'Invigilation', text: 'Controlled invigilation that protects the integrity of every sitting.' },
  { name: 'Evidence Management', text: 'Secure collection, filing and retention of portfolios and assessment evidence.' },
  { name: 'Results Processing', text: 'Timely, accurate processing and release of results through the correct channels.' },
  { name: 'Appeals', text: 'A clear, documented route for candidates to query or appeal an assessment decision.' },
  { name: 'Quality Assurance', text: 'Internal quality checks across assessment design, delivery and record-keeping.' },
  { name: 'Record Management', text: 'Complete, retrievable records that stand up to audit and verification.' },
  { name: 'Occupational Qualification Support', text: 'Support for candidates and employers navigating occupational qualification assessment requirements.' },
]

const principles = [
  { t: 'Quality', d: 'Every assessment is designed, delivered and moderated to a standard we can defend.' },
  { t: 'Integrity', d: 'Controls, invigilation and evidence handling that leave no doubt about a result.' },
  { t: 'Competence', d: 'We assess what a person can actually do — not what they can recite.' },
]

export default function AssessmentCentre() {
  usePageMeta(
    'Assessment Centre',
    'Assessment centre services in Johannesburg — candidate registration, assessment scheduling, assessors, moderation, invigilation, evidence management, results processing and quality assurance from Prestige Tutelage, Randburg.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Assessment Centre"
        title="Assessment built around quality, integrity and competence."
        lead="A certificate is only worth the process behind it. Prestige operates a professionally managed assessment capability — from candidate registration through moderation, results and records."
      >
        <Link to="/contact" className="btn btn-primary mt-8">Enquire About Assessment Services</Link>
      </PageHeader>

      {/* Three principles */}
      <section className="border-b border-line bg-paper py-12 lg:py-16">
        <div className="container-px">
          <div className="grid gap-8 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.t} className="border-l-2 border-prestige-green/60 pl-5">
                <h2 className="font-display text-xl font-semibold text-ink">{p.t}</h2>
                <p className="mt-2 leading-relaxed text-body">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything an assessment requires, handled in one place."
            lead="Employers, providers and candidates deal with a single, accountable assessment operation rather than a chain of hand-offs."
          />
          <dl className="mt-12 grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.name} className="border-b border-line py-5 lg:pr-6">
                <dt className="font-sans font-semibold text-ink">{c.name}</dt>
                <dd className="mt-1.5 leading-relaxed text-body">{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who uses it */}
      <section className="border-y border-line bg-mist/60 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Who we assess for"
            title="Three routes in — employers, providers and candidates."
            lead="Each comes to the assessment centre with different needs. Find yours below."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pathways.map((p) => (
              <article key={p.who} className="flex flex-col border border-line bg-paper p-7">
                <h3 className="font-display text-2xl font-semibold text-ink">{p.who}</h3>
                <p className="mt-3 leading-relaxed text-body">{p.text}</p>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                  Typically needing
                </h4>
                <ul className="mt-3 flex-1 border-t border-line">
                  {p.needs.map((n) => (
                    <li key={n} className="flex items-start gap-3 border-b border-line py-2.5 text-[0.95rem] text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                      {n}
                    </li>
                  ))}
                </ul>

                <Link
                  to={p.cta.to}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-prestige-blue transition-colors hover:text-navy-lift"
                >
                  {p.cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>

          <Disclaimer className="mt-10">{SCOPE_NOTE}</Disclaimer>
        </div>
      </section>

      <CTABand
        title="Enquire about assessment services."
        text="Tell us how many candidates, which qualifications and your timelines. We will come back with a clear assessment plan."
        primary={{ label: 'Enquire About Assessment Services', to: '/contact' }}
        secondary={{ label: 'Assessment & Quality Services', to: '/services#assessment-quality' }}
      />
    </>
  )
}
