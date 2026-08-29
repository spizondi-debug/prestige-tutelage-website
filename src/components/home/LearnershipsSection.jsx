import { Link } from 'react-router-dom'
import { SectionHeading, Accent } from '../Section.jsx'
import ContentSlider from '../ContentSlider.jsx'
import { sectionSliders } from '../../data/pageHeroes.js'
import { learnerships } from '../../data/programmes.js'

export default function LearnershipsSection() {
  return (
    <section className="border-t border-line bg-paper py-20 lg:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <ContentSlider
            images={sectionSliders.homeLearnerships}
            aspect="aspect-[5/4]"
            label="Prestige Tutelage learnership completions"
            className="order-last lg:order-first"
          />

          <div>
            <SectionHeading
              eyebrow="Learnerships"
              title={<>Structured, work-based routes to <Accent>real qualifications</Accent>.</>}
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
