import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import { programmeAreas } from '../../data/programmes.js'

const featuredSlugs = [
  'management',
  'human-resources',
  'project-management',
  'production-technology',
  'early-childhood-development',
  'poultry-production',
]

export default function FeaturedProgrammes() {
  const featured = programmeAreas.filter((p) => featuredSlugs.includes(p.slug))

  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Programmes"
            title="Accredited learning across business, production, agriculture and community."
            lead="A programme architecture built for the occupations South African organisations actually employ."
          />
          <Link to="/programmes" className="btn btn-outline shrink-0">All Programme Areas</Link>
        </div>

        <div className="mt-12 grid gap-x-10 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              to="/programmes"
              className={`group grid grid-cols-[auto_1fr] gap-5 border-t border-line py-6 ${
                i >= featured.length - 2 ? 'lg:border-b' : ''
              } ${i === featured.length - 1 ? 'border-b lg:border-b' : ''}`}
            >
              <span className="font-display text-lg font-semibold text-prestige-green">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                    {p.title}
                  </h3>
                  <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-wider text-muted sm:inline">
                    {p.group}
                  </span>
                </span>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{p.summary}</p>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Qualification levels and accreditation details are confirmed per programme during enquiry —
          we don’t publish detail we haven’t verified.
        </p>
      </div>
    </section>
  )
}
