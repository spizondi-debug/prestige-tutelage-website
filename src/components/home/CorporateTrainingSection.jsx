import { Link } from 'react-router-dom'
import { corporateProcess } from '../../data/corporate.js'

export default function CorporateTrainingSection() {
  return (
    <section className="bg-prestige-blue-deep py-16 lg:py-24">
      <div className="container-px">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-prestige-green" />
            <span className="text-sm font-semibold tracking-wide text-white/85">Corporate training</span>
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Training built around your business.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            For HR directors, L&amp;D managers and operations leaders who need training that changes
            performance — not just attendance registers. One process, applied to your context.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
          {corporateProcess.map((step, i) => (
            <li key={step.name} className="bg-prestige-blue-deep p-6">
              <span className="font-display text-lg font-semibold text-prestige-green">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-sans font-semibold text-white">{step.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/corporate-training" className="btn btn-green">Train Your Workforce</Link>
          <Link to="/contact" className="btn border border-white/30 text-white transition-colors hover:border-white/60">
            Request a Proposal
          </Link>
        </div>
      </div>
    </section>
  )
}
