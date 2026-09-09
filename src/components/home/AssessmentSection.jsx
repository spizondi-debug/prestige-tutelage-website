import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'

const capabilities = [
  { t: 'Registration & scheduling', d: 'Candidates captured accurately and assessment calendars planned around your operation.' },
  { t: 'Assessors & moderation', d: 'Registered assessors applying criteria consistently, with independent moderation behind every decision.' },
  { t: 'Invigilation & evidence', d: 'Controlled sittings and secure handling of portfolios and assessment evidence.' },
  { t: 'Results, appeals & records', d: 'Timely results, a documented appeals route and records that stand up to audit.' },
]

export default function AssessmentSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Assessment Centre"
              title="Assessment built around quality, integrity and competence."
              lead="A certificate is only worth the process behind it. Prestige runs a professionally managed assessment operation — registration through to records."
            />
            <Link to="/assessment-centre" className="btn btn-primary mt-8">
              Enquire About Assessment Services
            </Link>
          </div>

          <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.t} className="border-b border-line py-5">
                <dt className="font-display text-lg font-semibold text-ink">{c.t}</dt>
                <dd className="mt-1.5 leading-relaxed text-body">{c.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
