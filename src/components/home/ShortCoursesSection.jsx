import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import {
  shortCourseCategories,
  shortCoursePositioning,
  coursesOf,
  totalShortCourses,
} from '../../data/shortCourses.js'

export default function ShortCoursesSection() {
  return (
    <section className="border-y border-line bg-sand/60 py-16 lg:py-24">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Short courses"
              title={shortCoursePositioning}
              lead={`${totalShortCourses} focused courses across ${shortCourseCategories.length} categories — delivered for teams at your workplace or arranged for individuals.`}
            />
            <p className="mt-5 leading-relaxed text-body">
              Professional development interventions: non-NQF and non-credit-bearing unless a
              specific course has been confirmed otherwise.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/short-courses" className="btn btn-primary">Browse Short Courses</Link>
              <Link to="/contact" className="btn btn-outline">Build a Course for My Team</Link>
            </div>
          </div>

          <ul className="grid content-start gap-x-10 sm:grid-cols-2">
            {shortCourseCategories.map((c) => (
              <li key={c.slug} className="border-b border-line py-4">
                <Link to={`/short-courses#${c.slug}`} className="group flex items-baseline justify-between gap-4">
                  <span className="font-sans font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                    {c.title}
                  </span>
                  <span className="shrink-0 text-sm text-muted">{coursesOf(c).length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
