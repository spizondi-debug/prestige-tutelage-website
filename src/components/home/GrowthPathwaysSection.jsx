import { Link } from 'react-router-dom'

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
    <section className="border-y border-line bg-sand/60 py-16 lg:py-24">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-blue">A related Prestige solution</span>
            </div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Prestige Growth Pathways
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-body">
              Growth Pathways joins the dots between where your workforce is and where your
              organisation needs it to be — connecting skills gaps to development plans, learning to
              workplace readiness, and individual growth to outcomes you can actually measure.
            </p>
            <Link to="/growth-pathways" className="btn btn-primary mt-8">Explore Prestige Growth Pathways</Link>
          </div>

          <div className="border-l border-line pl-8 lg:pl-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">One connected pathway</p>
            <ul className="mt-4 space-y-2.5">
              {connects.map((c, i) => (
                <li key={c} className="flex items-center gap-3 text-body">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i % 2 ? 'bg-prestige-blue' : 'bg-prestige-green'}`} aria-hidden="true" />
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
