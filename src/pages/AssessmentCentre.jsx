import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'

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
    'The Prestige Tutelage Assessment Centre provides candidate registration, scheduling, assessment, moderation, invigilation, evidence management, results processing and quality assurance.',
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
      <section className="border-y border-line bg-sand/60 py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Who we assess for"
                title="Employers, providers and candidates."
              />
              <p className="mt-7 text-sm text-muted">
                Scope of assessment, applicable qualifications and quality-assurance arrangements are
                confirmed in writing per engagement.
              </p>
            </div>

            <dl className="grid content-start border-t border-line">
              {[
                { t: 'Employers', d: 'Confirming competence across teams — for qualifications, learnerships or internal standards — with records that survive audit.' },
                { t: 'Training providers', d: 'Independent assessment and moderation capacity when your own is stretched or a separation of duties is required.' },
                { t: 'Candidates', d: 'A fair, well-run assessment with clear expectations, proper support and a transparent appeals route.' },
              ].map((x) => (
                <div key={x.t} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[0.3fr_0.7fr] sm:gap-6">
                  <dt className="font-display text-lg font-semibold text-ink">{x.t}</dt>
                  <dd className="leading-relaxed text-body">{x.d}</dd>
                </div>
              ))}
            </dl>
          </div>
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
