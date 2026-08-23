import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import { serviceGroups } from '../../data/services.js'

export default function ServicesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="More than courses — the full machinery of workforce development."
            lead="Strategy, delivery, programme management, assessment and social impact, under one accountable partner."
          />
          <Link to="/services" className="btn btn-outline shrink-0">Explore Services</Link>
        </div>

        <div className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g) => (
            <Link
              key={g.slug}
              to={`/services#${g.slug}`}
              className="group border-b border-line py-6 lg:pr-6"
            >
              <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                {g.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{g.lead}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-prestige-blue opacity-0 transition-opacity group-hover:opacity-100">
                View services →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
