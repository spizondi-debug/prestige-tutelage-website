import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import { qualifications } from '../../data/programmes.js'

export default function FeaturedProgrammes() {
  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Qualifications"
            title="Registered qualifications, stated on the record."
            lead="Every qualification below is registered, with its SAQA ID, NQF level and credit value published — delivered as a full qualification or through a learnership."
          />
          <Link to="/programmes" className="btn btn-outline shrink-0">All Programme Areas</Link>
        </div>

        <ul className="mt-12 grid gap-x-12 border-t border-line lg:grid-cols-2">
          {qualifications.map((q) => (
            <li key={q.saqaId} className="border-b border-line py-5">
              <Link to="/programmes#qualifications" className="group flex items-baseline justify-between gap-6">
                <span>
                  <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                    {q.name}
                  </h3>
                  <span className="mt-1 block text-sm text-muted">
                    SAQA ID {q.saqaId} · {q.credits} credits
                  </span>
                </span>
                <span className="shrink-0 font-sans text-sm font-semibold text-prestige-blue">
                  NQF {q.nqf}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-body">
          Prestige also delivers programme areas in management, production technology, agriculture
          and custom corporate interventions.{' '}
          <Link to="/programmes" className="font-semibold text-prestige-blue hover:underline">
            See all programme areas
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
