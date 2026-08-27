import { Link } from 'react-router-dom'
import Photo from '../Photo.jsx'
import Reveal from '../Reveal.jsx'

// Impact framing without fabricated case studies or statistics: the outcomes
// Prestige designs for. Verified client stories can replace/extend this later.
const outcomes = [
  {
    who: 'For organisations',
    text: 'Supervisors who lead, teams that hit standard, and skills development spend that shows up in operations — not just on a compliance report.',
  },
  {
    who: 'For learners',
    text: 'Recognised qualifications, real workplace competence and the confidence that comes from being backed properly through a programme.',
  },
  {
    who: 'For communities',
    text: 'Unemployed youth moving into structured learning and workplace experience — a first credible step into the economy.',
  },
]

/**
 * A full-bleed split: the photograph runs to the left edge of the viewport,
 * the argument sits in the right half. No frame, no radius, no shadow — the
 * photograph is the panel.
 */
export default function ImpactSection() {
  return (
    <section className="tex tex-grid border-t border-line bg-paper">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:min-h-[40rem]">
          <Photo
            src="certificates-cohort.jpg"
            alt="Prestige Tutelage learners with their certificates of completion"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="flex items-center">
          <div className="w-full px-5 py-16 sm:px-8 lg:py-24 lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-24">
            <Reveal>
              <p className="eyebrow">Impact</p>
              <h2 className="mt-5 max-w-xl font-display text-editorial font-semibold text-ink">
                We measure success where it matters: in the workplace.
              </h2>

              <div className="mt-10 max-w-xl divide-y divide-line border-y border-line">
                {outcomes.map((o) => (
                  <div key={o.who} className="py-5">
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-prestige-blue">
                      {o.who}
                    </h3>
                    <p className="mt-2 leading-relaxed text-body">{o.text}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted">
                Every qualification represents a person whose working life changed — and an
                employer with capability it did not have before. Client references and programme
                results are shared on request during proposals.
              </p>

              <Link to="/contact" className="btn btn-outline mt-9">Request a Proposal</Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
