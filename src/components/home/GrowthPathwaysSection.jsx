import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import { Accent } from '../Section.jsx'
import GrowthPathwaysMockup from './GrowthPathwaysMockup.jsx'

const connects = [
  'Skills gaps',
  'Workforce development',
  'Development planning',
  'Learning',
  'Workplace readiness',
  'Employee growth',
  'Measurable outcomes',
]

/**
 * The right-hand visual is a stylised illustration (GrowthPathwaysMockup),
 * not a screenshot — a tilted laptop/phone panel with a scatter of glass
 * cards, each carrying an obviously illustrative stat. Replaces the real
 * product-film frame this section carried previously.
 */
export default function GrowthPathwaysSection() {
  return (
    <section className="on-dark tex tex-grain tex-edge relative overflow-hidden bg-shadow py-20 text-white lg:py-28">
      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow-light">A related Prestige solution</p>
            <h2 className="mt-5 font-display text-section font-semibold leading-tight text-white">
              Prestige <Accent>Growth Pathways</Accent>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              Growth Pathways joins the dots between where your workforce is and where your
              organisation needs it to be — connecting skills gaps to development plans, learning to
              workplace readiness, and individual growth to outcomes you can actually measure.
            </p>
            <Link to="/growth-pathways" className="btn btn-green mt-8">
              Explore Prestige Growth Pathways
            </Link>

            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              One connected pathway
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line-dark pt-6 sm:grid-cols-3">
              {connects.map((c, i) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      i % 2 ? 'bg-prestige-blue-hover' : 'bg-prestige-green'
                    }`}
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="relative">
            <div
              className="absolute -inset-x-6 -inset-y-8 rounded-[2rem] bg-prestige-blue/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <GrowthPathwaysMockup />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
