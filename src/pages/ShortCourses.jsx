import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import { shortCourseCategories, shortCoursePositioning, shortCourseNotes } from '../data/shortCourses.js'

export default function ShortCourses() {
  usePageMeta(
    'Short Courses',
    'Practical short courses from Prestige Tutelage in leadership, workplace skills, HR, sales, administration, workplace readiness and health, safety and compliance awareness.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Short courses"
        title={shortCoursePositioning}
        lead="Focused courses that close specific gaps in days, not months — delivered for teams at your workplace or arranged for individuals. Ideal alongside a longer qualification pathway, or on their own."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn btn-primary">Build a Course for My Team</Link>
          <a href="#catalogue" className="btn btn-outline">View the Catalogue</a>
        </div>
      </PageHeader>

      {/* Accredited vs non-accredited — stated plainly and early */}
      <section className="border-b border-line bg-paper py-12">
        <div className="container-px">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="border-l-2 border-prestige-blue/60 pl-5">
              <h2 className="font-sans font-semibold text-ink">Short courses (non-accredited)</h2>
              <p className="mt-2 leading-relaxed text-body">{shortCourseNotes.nonAccredited}</p>
            </div>
            <div className="border-l-2 border-prestige-green/60 pl-5">
              <h2 className="font-sans font-semibold text-ink">Accredited programmes</h2>
              <p className="mt-2 leading-relaxed text-body">
                {shortCourseNotes.accredited}{' '}
                <Link to="/programmes" className="font-semibold text-prestige-blue hover:underline">
                  See programme areas
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Catalogue"
            title="Seven course families, built for South African workplaces."
            lead="Every course is facilitated by practitioners and grounded in your team’s real work — the documents, customers, machines and pressures they deal with daily."
          />

          <div className="mt-12 space-y-12">
            {shortCourseCategories.map((cat) => (
              <div key={cat.slug} id={cat.slug} className="scroll-mt-28 border-t border-line pt-8">
                <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink">{cat.title}</h3>
                    <p className="mt-2 leading-relaxed text-body">{cat.blurb}</p>
                    {cat.note && <p className="mt-3 text-sm italic text-muted">{cat.note}</p>}
                  </div>
                  <ul className="grid gap-x-10 sm:grid-cols-2">
                    {cat.courses.map((c) => (
                      <li key={c} className="flex items-start gap-3 border-b border-line py-2.5 text-body">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How delivery works */}
      <section className="border-t border-line bg-sand/60 py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="How it works"
              title="Simple to arrange, serious in delivery."
            />
            <ol className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {[
                { t: 'Tell us the gap', d: 'A short conversation about the team, the problem and the outcome you need.' },
                { t: 'We shape the course', d: 'Content, examples and exercises tuned to your context — not a generic deck.' },
                { t: 'We deliver on-site or off-site', d: 'Scheduled around your operation, in a format that suits your people.' },
                { t: 'You get a clear record', d: 'Attendance, completion certificates and facilitator feedback, properly documented.' },
              ].map((s, i) => (
                <li key={s.t} className="border-b border-line py-5">
                  <span className="font-display text-lg font-semibold text-prestige-green">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-sans font-semibold text-ink">{s.t}</h3>
                  <p className="mt-1.5 leading-relaxed text-body">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTABand
        title="Build a course for my team."
        text="Tell us who needs developing and what has to change at work. We will put a practical course in front of you."
        primary={{ label: 'Build a Course for My Team', to: '/contact' }}
        secondary={{ label: 'See Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
