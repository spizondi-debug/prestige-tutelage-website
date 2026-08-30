import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

const connects = [
  { t: 'Skills gaps', d: 'A clear, current view of the distance between the capability you have and the capability the work requires.' },
  { t: 'Workforce development', d: 'Programmes and interventions organised around the gaps that matter most, not the ones easiest to book.' },
  { t: 'Development planning', d: 'Individual and team development plans that people understand and managers can actually support.' },
  { t: 'Learning', d: 'Qualifications, learnerships and short courses sequenced into a coherent pathway.' },
  { t: 'Workplace readiness', d: 'Attention to whether the workplace is set up to absorb, apply and reinforce the learning.' },
  { t: 'Employee growth', d: 'Progression that individuals can see — a reason to stay, engage and take the next step.' },
  { t: 'Measurable outcomes', d: 'Progress, completion and workplace application reported in terms the business recognises.' },
]

export default function GrowthPathways() {
  usePageMeta(
    'Prestige Growth Pathways',
    'Prestige Growth Pathways connects skills gaps, workforce development, development planning, learning, workplace readiness and employee growth to measurable outcomes.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.growthPathways}
        eyebrow="A related Prestige solution"
        title={<>Prestige <Accent>Growth Pathways</Accent></>}
        lead="One workforce. One development journey. Most organisations do not lack training — they lack the thread that connects a skills gap to a development plan, a development plan to learning, and learning to something you can actually measure. Growth Pathways is that thread."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact?interest=Prestige%20Growth%20Pathways" className="btn btn-primary">
            Discover Growth Pathways
          </Link>
          <Link to="/contact?interest=Prestige%20Growth%20Pathways" className="btn btn-outline">
            Book a Demo
          </Link>
        </div>
      </PageHeader>

      {/* What it connects */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="What it connects"
              title="Seven things that usually live in seven different places."
              lead="Growth Pathways brings them into one connected view, so development stops being a series of disconnected events."
            />
            <ol className="grid content-start border-t border-line">
              {connects.map((c, i) => (
                <li key={c.t} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <span className="font-display text-lg font-semibold text-prestige-blue-hover">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <h3 className="font-sans font-semibold text-ink">{c.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-body">{c.d}</p>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <ContentSlider
              images={sectionSliders.growthPathways}
              aspect="aspect-[5/4]"
              label="Prestige Tutelage learners building practical skills"
              className="order-last lg:order-first"
            />
            <div>
              <SectionHeading
                eyebrow="Why it matters"
                title="Development that people can see themselves in."
                tone="green"
              />
              <p className="mt-5 leading-relaxed text-body">
                When an employee understands where they stand, what they are working toward and what
                the next step actually is, development stops feeling like something done to them. When
                a manager can see the same picture, coaching becomes possible. And when the
                organisation can see it across teams, skills planning becomes a decision rather than a
                guess.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                Growth Pathways sits alongside the training Prestige delivers — the same people, the
                same standards, applied to the planning layer rather than only the classroom.
              </p>
              <Link to="/contact" className="btn btn-outline mt-8">Talk to Us About Growth Pathways</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Relationship to Tutelage */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="How the two fit together"
              title="Prestige Tutelage delivers the learning. Growth Pathways connects it to the business."
            />
            <p className="mt-5 leading-relaxed text-body">
              You can engage Prestige Tutelage for training alone — many clients do. Growth Pathways is
              for organisations that want the wider frame: the gap analysis, the planning, the
              progression and the reporting joined up around the learning itself.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/programmes" className="btn btn-primary">See Our Programmes</Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Explore Prestige Growth Pathways."
        text="A short conversation is the fastest way to see whether the connected approach fits how your organisation works."
        primary={{ label: 'Explore Prestige Growth Pathways', to: '/contact' }}
        secondary={{ label: 'About Prestige', to: '/about' }}
      />
    </>
  )
}
