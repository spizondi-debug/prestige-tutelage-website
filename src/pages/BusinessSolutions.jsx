import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import { SectionHeading } from '../components/Section.jsx'
import { pageHeroes } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

// Each solution has its own page — this is the way in, not a place to hide them.
const solutions = [
  {
    title: 'B-BBEE Consultation',
    lead: 'Help organisations structure skills-development initiatives that contribute towards transformation objectives.',
    to: '/bbbee-consulting',
    cta: 'Explore B-BBEE Consultation',
    photo: 'learners-certificates-group.jpg',
    photoAlt: 'Prestige Tutelage learners holding their certificates of completion',
    points: [
      'Skills development strategy and spend planning',
      'Employed and unemployed learnership planning',
      'Youth, disability and CSI programme design',
      'Learner evidence, records and reporting support',
    ],
  },
  {
    title: 'Recruitment',
    lead: 'Workforce sourcing and recruitment support — including the learnership and youth intakes most agencies will not take on.',
    to: '/recruitment',
    cta: 'Explore Recruitment',
    photo: 'learner-intake-group.jpg',
    photoAlt: 'A Prestige Tutelage learner intake outside the training premises',
    points: [
      'Candidate sourcing, screening and shortlisting',
      'Interview coordination and administration',
      'Learnership and youth programme intakes',
      'Pre-employment check coordination',
    ],
  },
  {
    title: 'Assessment Centre',
    lead: 'Assessment and moderation services delivered through Prestige’s assessment infrastructure.',
    to: '/assessment-centre',
    cta: 'Explore the Assessment Centre',
    points: [
      'Candidate registration, scheduling and administration',
      'Registered assessors and independent moderation',
      'Invigilation and evidence management',
      'Results processing, appeals and records',
    ],
  },
  {
    title: 'Office & Training Venue Rental',
    lead: 'Professional spaces for training, assessments, meetings and business use in Ferndale, Randburg.',
    to: '/office-rental',
    cta: 'Explore Venue Rental',
    photo: 'training-room.jpg',
    photoAlt: 'A training room at Prestige Tutelage set up with a projector screen and boardroom seating',
    points: [
      'Training rooms for groups and workshops',
      'Meeting rooms for clients and interviews',
      'Short-term office space',
      'Controlled assessment and examination space',
    ],
  },
]

export default function BusinessSolutions() {
  usePageMeta(
    'Business Solutions',
    'B-BBEE skills development consulting, recruitment services, assessment centre services and training venue rental in Randburg — the Prestige Tutelage offering beyond training.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.businessSolutions}
        eyebrow="Business solutions"
        title={<>More than training. A complete <Accent>workforce support partner</Accent>.</>}
        lead="Training is where Prestige started and it remains the core. But the work around it — advising on transformation strategy, finding the people, assessing the outcome and housing it all — is just as much a part of what we do."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Business solutions">
          {solutions.map((s) => (
            <Link key={s.to} to={s.to} className="text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-hover">
              {s.title}
            </Link>
          ))}
        </nav>
      </PageHeader>

      {solutions.map((s, i) => (
        <section
          key={s.to}
          className={`py-14 lg:py-20 ${i % 2 === 1 ? 'border-y border-line bg-paper' : ''}`}
        >
          <div className="container-px">
            <div className={`grid items-center gap-10 lg:gap-20 ${s.photo ? 'lg:grid-cols-2' : ''}`}>
              <div className={s.photo && i % 2 === 1 ? 'lg:order-last' : ''}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-prestige-green" />
                  <span className="text-sm font-semibold tracking-wide text-prestige-blue-hover">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-body">{s.lead}</p>

                <ul className="mt-6 grid gap-x-10 border-t border-line sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 border-b border-line py-2.5 text-[0.95rem] text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link to={s.to} className="btn btn-outline mt-7">{s.cta}</Link>
              </div>

              {s.photo && (
                <div className="overflow-hidden">
                  <Photo src={s.photo} alt={s.photoAlt} className="aspect-[3/2] w-full" />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Pointer to the wider service list */}
      <section className="border-t border-line py-14">
        <div className="container-px">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Also part of the offering"
              title="Workforce advisory, programme management and social impact."
              lead="Skills gap analysis, training needs analysis, learner administration, workplace monitoring, CSI programmes and community training sit alongside the four solutions above."
            />
            <Link to="/services" className="btn btn-outline mt-7">See the Full Service List</Link>
          </div>
        </div>
      </section>

      <CTABand
        title="Which of these do you need?"
        text="Most engagements combine several. Tell us the situation and we will propose the right mix — no more than you need."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
