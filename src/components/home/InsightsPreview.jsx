import { Link } from 'react-router-dom'
import { SectionHeading, Accent } from '../Section.jsx'
import { insights } from '../../data/insights.js'
import CornerSwirl from '../CornerSwirl.jsx'

export default function InsightsPreview() {
  const featured = insights.slice(0, 3)

  return (
    <section className="relative overflow-hidden border-t border-line bg-cloud py-20 lg:py-28">
      <CornerSwirl size="sm" />
      <div className="container-px relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Insights"
            title={<>Thinking on <Accent>skills development</Accent>, learnerships and workplace learning.</>}
            tone="blue"
          />
          <Link to="/insights" className="btn btn-outline shrink-0">All Insights</Link>
        </div>

        <div className="mt-10 grid gap-x-10 border-t border-line lg:grid-cols-3">
          {featured.map((a) => (
            <Link key={a.slug} to={`/insights/${a.slug}`} className="group border-b border-line py-6 lg:pr-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-prestige-blue-hover">{a.category}</p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue-hover">
                {a.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{a.excerpt}</p>
              <p className="mt-3 text-sm text-muted">{a.minutes} min read</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
