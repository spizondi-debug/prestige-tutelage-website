import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'

const services = [
  'B-BBEE Skills Development Advisory',
  'Skills Development Strategy',
  'Learnership Planning',
  'Employed Learnership Planning',
  'Unemployed Learnership Planning',
  'Skills Spend Planning',
  'Training Intervention Planning',
  'Disability Skills Development Planning',
  'Youth Development Programmes',
  'Absorption and employment-pathway planning support',
  'WSP / ATR training evidence support where appropriate',
  'Learner Evidence Management',
  'Training Records',
  'Skills Development Reporting Support',
  'Supplier / Enterprise Development training interventions where relevant',
  'CSI skills-development programme design',
  'Transformation-aligned workforce development',
]

const approach = [
  { title: 'Diagnose', text: 'Start with the workforce, scorecard context and evidence already available so the intervention solves the right problem.' },
  { title: 'Structure', text: 'Build a practical skills-development plan around learners, programmes, budgets, workplaces, evidence and implementation responsibilities.' },
  { title: 'Implement', text: 'Coordinate training, learner administration, evidence and reporting so the plan is carried through properly.' },
]

export default function BBBEEConsulting() {
  usePageMeta(
    'B-BBEE Skills Development Consulting',
    'B-BBEE skills development consulting and implementation support in Johannesburg and across South Africa, including learnership planning, training evidence and workforce development strategy.',
  )

  return (
    <>
      <PageHeader
        eyebrow="B-BBEE Skills Development Advisory"
        title="Turn skills development into measurable transformation value."
        lead="Prestige Tutelage helps organisations structure practical skills-development and workforce-development initiatives that support broader B-BBEE objectives while creating genuine capability in the workplace."
      >
        <Link to="/contact" className="btn btn-primary mt-8">Discuss Your B-BBEE Skills Strategy</Link>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="What we support"
              title="Skills development planned as a business intervention — not a box-ticking exercise."
              lead="We help employers connect transformation priorities with credible learning, learner support, evidence and workforce outcomes."
            />
            <dl className="grid content-start gap-x-10 border-t border-line sm:grid-cols-2">
              {services.map((service) => (
                <div key={service} className="border-b border-line py-4">
                  <dt className="font-sans font-semibold text-ink">{service}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16 lg:py-20">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our approach"
            title="Strategy, implementation and evidence connected from the start."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {approach.map((item, index) => (
              <article key={item.title} className="border-t-2 border-prestige-green pt-5">
                <p className="text-sm font-semibold text-prestige-blue">0{index + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="container-px">
          <div className="border-l-4 border-prestige-green bg-sand/60 px-6 py-6 lg:px-8">
            <h2 className="font-display text-xl font-semibold text-ink">Important verification distinction</h2>
            <p className="mt-3 max-w-4xl leading-relaxed text-body">
              Prestige Tutelage provides B-BBEE skills-development consulting and implementation support. Formal B-BBEE verification and scoring remain the responsibility of an appropriately accredited verification professional or agency.
            </p>
            <p className="mt-3 text-sm text-muted">
              We do not guarantee scorecard outcomes, specific B-BBEE points or tax deductions.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Build a skills-development strategy that can actually be implemented."
        text="Tell us what your organisation is trying to achieve and we will help structure the right workforce-development response."
        primary={{ label: 'Discuss Your B-BBEE Skills Strategy', to: '/contact' }}
        secondary={{ label: 'View All Services', to: '/services' }}
      />
    </>
  )
}
