import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'

const broaderServices = [
  {
    title: 'B-BBEE Consulting',
    text: 'Skills-development strategy and implementation support that connects transformation priorities with practical workforce development.',
    to: '/bbbee-consulting',
    cta: 'Explore B-BBEE Advisory',
  },
  {
    title: 'Recruitment',
    text: 'Talent sourcing, learner recruitment and workforce-pipeline support for employers and development programmes.',
    to: '/recruitment',
    cta: 'View Recruitment Services',
  },
  {
    title: 'Assessment Centre',
    text: 'Professional assessment, moderation, invigilation, evidence management and candidate administration.',
    to: '/assessment-centre',
    cta: 'View Assessment Centre',
  },
  {
    title: 'Office & Training Space',
    text: 'Flexible professional space in Ferndale, Randburg for training, meetings, interviews and assessments.',
    to: '/office-rental',
    cta: 'View Available Spaces',
  },
]

export default function ServicesSection() {
  return (
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Beyond Training"
            title="More than training. A complete workforce support partner."
            lead="Prestige supports organisations across the wider workforce-development journey — from transformation strategy and recruitment to assessment and professional training facilities."
          />
          <Link to="/services" className="btn btn-outline shrink-0">Explore Our Services</Link>
        </div>

        <div className="mt-12 grid gap-x-10 border-t border-line md:grid-cols-2">
          {broaderServices.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              className="group border-b border-line py-7 md:pr-8"
            >
              <h3 className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-body">{service.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-prestige-blue">
                {service.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
