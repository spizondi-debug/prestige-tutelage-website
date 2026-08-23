import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import { industries } from '../../data/industries.js'

export default function IndustriesSection() {
  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Industries"
            title="Grounded in the sectors that carry the South African economy."
            lead="From the production line to the farm gate to the boardroom, Prestige designs training for the realities of each sector."
          />
          <Link to="/industries" className="btn btn-outline shrink-0">All Industries</Link>
        </div>

        <div className="mt-12 grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Link
              key={ind.slug}
              to={`/industries#${ind.slug}`}
              className="group grid grid-cols-[auto_1fr] gap-4 border-b border-line py-5 lg:pr-6"
            >
              <span className="font-display text-base font-semibold text-prestige-green">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <h3 className="font-sans font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                  {ind.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  {ind.offerings[0]}
                </p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
