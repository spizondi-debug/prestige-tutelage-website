import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import SmartImage from '../SmartImage.jsx'
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.slice(0, 4).map((ind) => (
            <Link key={ind.slug} to={`/industries#${ind.slug}`} className="group">
              <div className="overflow-hidden rounded-lg border border-line">
                <SmartImage
                  src={ind.image}
                  alt={ind.imageAlt}
                  label={ind.imageAlt}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-3 font-sans font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                {ind.title}
              </h3>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-body">
          Also serving{' '}
          {industries.slice(4).map((ind, i, arr) => (
            <span key={ind.slug}>
              <Link to={`/industries#${ind.slug}`} className="font-medium text-prestige-blue hover:underline">
                {ind.title}
              </Link>
              {i < arr.length - 1 ? (i === arr.length - 2 ? ' and ' : ', ') : '.'}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
