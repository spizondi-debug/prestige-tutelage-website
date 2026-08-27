import { Link } from 'react-router-dom'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'

const connects = [
  'Skills gaps',
  'Workforce development',
  'Development planning',
  'Learning',
  'Workplace readiness',
  'Employee growth',
  'Measurable outcomes',
]

export default function GrowthPathwaysSection() {
  return (
    // Growth Pathways carries the Prestige Digital Gradient — the one place on
    // the homepage where the gradient appears at full strength, so it stays a
    // signature rather than a wash. The Path runs over it, dropping from blue
    // into green exactly where the copy talks about progression.
    <section className="tex tex-grain tex-edge relative overflow-hidden bg-prestige-digital py-20 text-white lg:py-28">
      <PrestigePath
        stage={2.6}
        intensity={0.38}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {/* Keeps type legible where the gradient runs brightest. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.86)_0%,rgba(7,26,43,0.55)_55%,rgba(7,26,43,0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow-light">A related Prestige solution</p>
            <h2 className="mt-5 font-display text-section font-semibold leading-tight text-white">
              Prestige Growth Pathways
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Growth Pathways joins the dots between where your workforce is and where your
              organisation needs it to be — connecting skills gaps to development plans, learning to
              workplace readiness, and individual growth to outcomes you can actually measure.
            </p>
            <Link to="/growth-pathways" className="btn btn-green mt-8">
              Explore Prestige Growth Pathways
            </Link>
          </Reveal>

          <div className="border-l border-line-dark pl-8 lg:pl-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
              One connected pathway
            </p>
            <ul className="mt-4 space-y-2.5">
              {connects.map((c, i) => (
                <li key={c} className="flex items-center gap-3 text-white/85">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      i % 2 ? 'bg-prestige-electric' : 'bg-prestige-growth'
                    }`}
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
