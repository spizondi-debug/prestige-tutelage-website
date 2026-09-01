import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading, Accent } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import LearningRoutes from '../components/LearningRoutes.jsx'
import {
  shortCourseCategories,
  shortCoursePositioning,
  coursesOf,
  totalShortCourses,
  deliveryOptions,
  customisationOptions,
  STATUS_NOTE,
  CERTIFICATE_NOTE,
} from '../data/shortCourses.js'
import { pageHeroes } from '../data/pageHeroes.js'
import { CountIcon, iconForCategory } from '../data/shortCourseIcons.js'
import { ArrowUpRight, Users, Calendar, Laptop, ClipboardList } from 'lucide-react'

/** Icon for each delivery-format tile, in list order. */
const deliveryIcons = [Users, Calendar, Calendar, Users, Laptop, ClipboardList, Users]

/**
 * The eyebrow label — the leading half of the category title, so "Leadership &
 * Management" numbers as "01 · LEADERSHIP" without a second field in the data
 * to keep in step with the title. Titles without an ampersand are already
 * short enough to use whole.
 */
const shortLabel = (title) => title.split(' & ')[0]

/**
 * One course in the catalogue, as a link to a prefilled enquiry.
 *
 * The arrow is not decoration. Short courses have no detail page — the
 * catalogue is the detail — so the only honest destination for a course is
 * the enquiry form with that course already filled in. Contact reads ?course=
 * and sets the interest to "Short Course" with the name in the message, so a
 * visitor who clicks "Report Writing" does not have to retype it.
 */
function CourseList({ courses }) {
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((c) => (
        <li key={c} className="border-b border-line">
          <Link
            to={`/contact?course=${encodeURIComponent(c)}`}
            className="group/course flex items-start gap-3 py-3 text-[0.95rem] text-body transition-colors hover:text-prestige-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
            <span className="flex-1">{c}</span>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="mt-1 shrink-0 text-prestige-blue-hover/50 transition-all duration-200 group-hover/course:text-prestige-blue-hover group-hover/course:translate-x-0.5 group-hover/course:-translate-y-0.5"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function ShortCourses() {
  usePageMeta(
    'Short Courses',
    `${totalShortCourses} practical corporate short courses from Prestige Tutelage — leadership and supervisory skills, business communication, HR, sales, personal effectiveness, lean and operational excellence, safety awareness, workplace readiness, Microsoft Office, Excel and digital skills. Delivered on-site across South Africa.`,
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.shortCourses}
        eyebrow="Short courses & professional development"
        title={<>Practical learning for <Accent>immediate workplace impact</Accent>.</>}
        lead={`${totalShortCourses} focused courses that close specific gaps in days, not months — delivered for teams at your workplace, or arranged for individuals. Ideal alongside a qualification pathway, or on their own.`}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn btn-primary">Build a Course for My Team</Link>
          <a href="#catalogue" className="btn btn-outline">View the Catalogue</a>
        </div>
      </PageHeader>

      <LearningRoutes
        route1={{
          badge: 'Short courses',
          title: 'Professional short courses',
          lead: 'Focused, practical courses for immediate workplace impact.',
          detail: [STATUS_NOTE, CERTIFICATE_NOTE],
        }}
        route2={{
          badge: 'Qualifications',
          title: 'Qualifications & accredited programmes',
          lead: 'Structured programmes and learnerships that combine guided learning, workplace experience and formal assessment.',
          cta: { label: 'See programmes & qualifications', to: '/programmes' },
        }}
      />

      {/* Category quick-nav */}
      <section className="border-b border-line py-8">
        <div className="container-px">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Jump to a category</p>
          <nav className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-label="Short course categories">
            {shortCourseCategories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-hover"
              >
                {c.title}
                <span className="ml-1.5 font-normal text-muted">{coursesOf(c).length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-28 py-16 lg:py-20">
        <div className="container-px">
          <div className="space-y-8">
            {shortCourseCategories.map((cat, i) => {
              const Icon = iconForCategory(cat.slug)
              return (
                <article
                  key={cat.slug}
                  id={cat.slug}
                  className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-paper shadow-premium"
                >
                  <div className="border-l-4 border-prestige-blue lg:grid lg:grid-cols-[20rem_1fr]">
                    {/* Category */}
                    <div className="bg-prestige-blue-light p-7 lg:p-8">
                      <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-prestige-blue-hover">
                        <Icon size={17} strokeWidth={1.9} aria-hidden="true" className="shrink-0" />
                        {String(i + 1).padStart(2, '0')} · {shortLabel(cat.title)}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-prestige-green-deep">
                        {cat.title}
                      </h2>
                      <p className="mt-3 leading-relaxed text-body">{cat.blurb}</p>
                      <p className="mt-5 flex items-center gap-2.5 text-sm font-semibold text-prestige-green-deep">
                        <CountIcon size={16} strokeWidth={1.9} aria-hidden="true" className="shrink-0" />
                        {coursesOf(cat).length} courses
                      </p>
                      {cat.note && <Disclaimer className="mt-5">{cat.note}</Disclaimer>}
                    </div>

                    {/* Courses */}
                    <div className="p-7 lg:p-8">
                      {cat.groups ? (
                        <div className="space-y-8">
                          {cat.groups.map((g) => (
                            <div key={g.name}>
                              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                                {g.name}
                              </h3>
                              <div className="mt-3">
                                <CourseList courses={g.courses} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <CourseList courses={cat.courses} />
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <Disclaimer className="mt-12">{STATUS_NOTE}</Disclaimer>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Connector — desktop only */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block"
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-prestige-blue" />
              <span className="absolute inset-y-2.5 left-1/2 w-px -translate-x-1/2 bg-line" />
              <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper bg-prestige-green">
                <span className="h-2 w-2 rounded-full bg-paper" />
              </span>
              <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-prestige-green" />
            </div>

            <div className="rounded-2xl border border-line bg-paper p-7 shadow-premium sm:p-9">
              <SectionHeading
                eyebrow="Delivery"
                title="Scoped around your operation, not a fixed timetable."
                lead="Course length depends on the depth you need, the size of the group and how much workplace application you want built in. We confirm the format when we scope the intervention."
              />
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {deliveryOptions.map((d, i) => {
                  const Icon = deliveryIcons[i]
                  return (
                    <li
                      key={d}
                      className="flex items-center gap-3 rounded-xl border border-line bg-cloud/60 px-4 py-3 text-sm font-medium text-ink"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-prestige-green-pale text-prestige-green-deep">
                        <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      {d}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-prestige-green-pale/60 p-7 sm:p-9">
              <SectionHeading
                eyebrow="Customisation"
                title="Need something specific?"
                lead="We can design a practical short course around your organisation’s workforce, industry, policies, systems and performance challenges."
              />
              <ul className="mt-7 grid gap-x-10 border-t border-line sm:grid-cols-2">
                {customisationOptions.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-b border-line py-2.5 text-body">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary mt-7">Build a Course for My Team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading eyebrow="How it works" title="Simple to arrange, serious in delivery." />
            <ol className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {[
                { t: 'Tell us the gap', d: 'A short conversation about the team, the problem and the outcome you need.' },
                { t: 'We shape the course', d: 'Content, examples and exercises tuned to your context — not a generic deck.' },
                { t: 'We deliver on-site or off-site', d: 'Scheduled around your operation, in a format that suits your people.' },
                { t: 'You get a clear record', d: 'Attendance, certificates and facilitator feedback, properly documented.' },
              ].map((s, i) => (
                <li key={s.t} className="border-b border-line py-5">
                  <span className="font-display text-lg font-semibold text-prestige-blue-hover">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-sans font-semibold text-prestige-blue-hover">{s.t}</h3>
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
