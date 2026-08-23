import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'

const services = [
  {
    title: 'B-BBEE Consulting',
    text: 'Skills-development strategy and implementation support.',
    to: '/bbbee-consulting',
  },
  {
    title: 'Recruitment',
    text: 'Talent sourcing, learner recruitment and workforce pipeline support.',
    to: '/recruitment',
  },
  {
    title: 'Assessment Centre',
    text: 'Professional assessment, moderation and invigilation services.',
    to: '/assessment-centre',
  },
  {
    title: 'Office & Training Space',
    text: 'Flexible professional space in Ferndale, Randburg.',
    to: '/office-rental',
  },
]

export default function BeyondTraining() {
  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Beyond training"
            title="A partner across the wider workforce journey."
            lead="Prestige supports organisations across the wider workforce-development journey — from transformation strategy and recruitment to assessment and professional training facilities."
          />
          <Link to="/services" className="btn btn-outline shrink-0">Explore Our Services</Link>
        </div>

        <div className="mt-12 grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link key={s.to} to={s.to} className="group border-b border-line py-6 lg:pr-6">
              <span className="font-display text-base font-semibold text-prestige-green">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{s.text}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-prestige-blue opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
