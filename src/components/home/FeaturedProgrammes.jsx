import { Link } from 'react-router-dom'
import { coursePath } from '../../lib/slug.js'
import Reveal from '../Reveal.jsx'
import Disclaimer from '../Disclaimer.jsx'
import { Accent } from '../Section.jsx'
import CornerSwirl from '../CornerSwirl.jsx'
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
    <section className="relative overflow-hidden border-t border-line bg-paper py-20 lg:py-28">
      <CornerSwirl size="sm" />
      <div className="container-px relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Qualifications</p>
            <h2 className="mt-5 max-w-2xl font-display text-editorial font-semibold text-prestige-green-deep">
              Business, production, <Accent>agriculture and community</Accent>.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
              {qualifications.length} qualifications across {populatedAreas.length} training
              areas — each listed with the SAQA ID and NQF level Prestige has verified.
            </p>
          </Reveal>
          <Link to="/programmes" className="btn btn-outline shrink-0">Browse All Qualifications</Link>
        </div>

        <ul className="mt-14 border-t border-line">
          {featured.map((q) => (
            <li key={q.saqaId}>
              <Link
                to={coursePath(q)}
                className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:bg-cloud lg:px-2"
              >
                <span className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue-hover sm:text-xl">
                    {q.name}
                  </h3>
                  <span className="mt-1.5 block text-sm text-muted">
                    SAQA ID {q.saqaId}
                    {q.credits ? ` · ${q.credits} credits` : ''} · {q.area}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  <span className="rounded-full border border-prestige-blue/25 px-3.5 py-1 font-sans text-sm font-semibold text-prestige-blue-hover">
                    NQF {q.nqf}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg text-muted transition-all duration-500 ease-prestige group-hover:translate-x-1 group-hover:text-prestige-blue-hover"
                  >
                    ›
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
          {populatedAreas.map((a) => (
            <Link
              key={a}
              to="/programmes#catalogue"
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              {a} <span className="opacity-60">({qualificationsIn(a).length})</span>
            </Link>
          ))}
        </div>

        <Disclaimer className="mt-10 max-w-3xl">{AVAILABILITY_DISCLAIMER}</Disclaimer>
      </div>
    </section>
  )
}
