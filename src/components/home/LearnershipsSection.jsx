import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import Photo from '../Photo.jsx'
import { learnerships } from '../../data/programmes.js'

export default function LearnershipsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="relative order-last lg:order-first">
            <div className="absolute -left-4 -top-4 hidden h-full w-full bg-sand lg:block" aria-hidden="true" />
            <div className="relative overflow-hidden">
              <Photo
                src="graduate-celebrating.jpg"
                alt="A graduate celebrating after completing his qualification"
                className="aspect-[5/4] w-full"
              />
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Learnerships"
              title="Structured, work-based routes to real qualifications."
              lead={learnerships.intro}
            />
            <div className="mt-8 space-y-6">
              {[learnerships.employed, learnerships.unemployed].map((l) => (
                <div key={l.title} className="border-l-2 border-prestige-green/60 pl-5">
                  <h3 className="font-sans font-semibold text-ink">{l.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-body">{l.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-l-2 border-prestige-blue/25 pl-5 text-sm leading-relaxed text-muted">
              {learnerships.contributionNote}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary">Discuss a Learnership</Link>
              <Link to="/programmes#learnerships" className="btn btn-outline">How Learnerships Work</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
