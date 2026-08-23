import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import SmartImage from '../SmartImage.jsx'
import { learnerships } from '../../data/programmes.js'

export default function LearnershipsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="relative order-last lg:order-first">
            <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-xl2 bg-sand lg:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
              <SmartImage
                src="learnerships.jpg"
                alt="Learners and a workplace mentor during on-the-job training"
                label="learners with a workplace mentor"
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
            <Link to="/contact" className="btn btn-primary mt-9">Discuss a Learnership</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
