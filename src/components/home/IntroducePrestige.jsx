import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import { useCountUp } from '../../lib/motion.js'

/**
 * The handover from the cinematic hero into the editorial site.
 *
 * Proof points are limited to what Prestige has verified — B-BBEE level,
 * ownership, accredited delivery and national capability. No invented figures,
 * no learner counts, no percentages we cannot stand behind.
 */

const proof = [
  { value: 1, prefix: 'Level ', label: 'B-BBEE contributor' },
  { value: 100, suffix: '%', label: 'Black owned' },
  { label: 'Accredited', sub: 'learning programmes' },
  { label: 'National', sub: 'delivery capability' },
]

function Counter({ item }) {
  const [ref, n] = useCountUp(item.value ?? 0)
  if (item.value == null) {
    return (
      <>
        <span className="block font-display text-4xl font-semibold text-ink sm:text-5xl">
          {item.label}
        </span>
        <span className="mt-2 block text-body">{item.sub}</span>
      </>
    )
  }
  return (
    <>
      <span ref={ref} className="block font-display text-4xl font-semibold text-ink sm:text-5xl">
        {item.prefix}
        <span className="tabular-nums">{n}</span>
        {item.suffix}
      </span>
      <span className="mt-2 block text-body">{item.label}</span>
    </>
  )
}

export default function IntroducePrestige() {
  return (
    <section className="tex tex-dots bg-cloud py-24 lg:py-32">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <h2 className="font-display text-editorial font-semibold text-ink">
              More than training.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="max-w-xl text-lg leading-relaxed text-body">
              Prestige Tutelage is a workforce-development partner helping organisations build
              capable people, stronger talent pipelines and measurable skills-development outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn btn-outline">About Prestige</Link>
              <Link to="/programmes" className="btn btn-primary">Explore Programmes</Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 90}>
              <Counter item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
