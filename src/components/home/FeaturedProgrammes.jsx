import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import Disclaimer from '../Disclaimer.jsx'
import {
  qualifications,
  populatedAreas,
  qualificationsIn,
  AVAILABILITY_DISCLAIMER,
} from '../../data/programmes.js'

// One representative qualification per area keeps the homepage scannable; the
// full catalogue with filters lives on the Programmes page.
const highlights = [
  '101869', // Project Manager
  '101876', // Management Assistant
  '115723', // Production Supervisor
  '49578',  // Poultry Production
  '104461', // Engine Workshop Maintenance Mechanic
  '97542',  // ECD Practitioner
]

export default function FeaturedProgrammes() {
  const featured = highlights
    .map((id) => qualifications.find((q) => q.saqaId === id))
    .filter(Boolean)

  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Qualifications"
            title="Qualifications across business, production, agriculture and community."
            lead={`${qualifications.length} qualifications spanning ${populatedAreas.length} training areas — each listed with the SAQA ID and NQF level Prestige has verified.`}
          />
          <Link to="/programmes" className="btn btn-outline shrink-0">Browse All Qualifications</Link>
        </div>

        <ul className="mt-12 grid gap-x-12 border-t border-line lg:grid-cols-2">
          {featured.map((q) => (
            <li key={q.saqaId} className="border-b border-line py-5">
              <Link to="/programmes#catalogue" className="group flex items-baseline justify-between gap-6">
                <span>
                  <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                    {q.name}
                  </h3>
                  <span className="mt-1 block text-sm text-muted">
                    SAQA ID {q.saqaId}
                    {q.credits ? ` · ${q.credits} credits` : ''} · {q.area}
                  </span>
                </span>
                <span className="shrink-0 font-sans text-sm font-semibold text-prestige-blue">
                  NQF {q.nqf}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {populatedAreas.map((a) => (
            <Link key={a} to="/programmes#catalogue" className="font-medium text-prestige-blue hover:underline">
              {a} <span className="font-normal text-muted">({qualificationsIn(a).length})</span>
            </Link>
          ))}
        </div>

        <Disclaimer className="mt-8">{AVAILABILITY_DISCLAIMER}</Disclaimer>
      </div>
    </section>
  )
}
