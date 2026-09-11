import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import CTABand from '../components/CTABand.jsx'
import { insights, insightCategories } from '../data/insights.js'
import { pageHeroes } from '../data/pageHeroes.js'

export default function Insights() {
  usePageMeta(
    'Insights',
    'Practical thinking on South African skills development — occupational qualifications, learnerships, skills gap analysis, workplace training and manager development.',
  )

  const [category, setCategory] = useState('All')
  const shown = category === 'All' ? insights : insights.filter((a) => a.category === category)
  const [lead, ...rest] = shown

  return (
    <>
      <PageHeader
        images={pageHeroes.insights}
        eyebrow="Insights"
        title="Practical thinking on skills development."
        lead="Explainers and perspectives for employers, HR teams and skills development facilitators navigating qualifications, learnerships and workplace learning in South Africa."
      />

      <section className="py-12 lg:py-16">
        <div className="container-px">
          {/* Category filter */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4" aria-label="Filter by category">
            {insightCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`text-sm font-semibold transition-colors ${
                  category === c ? 'text-prestige-blue-hover' : 'text-body hover:text-prestige-blue-hover'
                }`}
              >
                {c}
              </button>
            ))}
          </nav>

          {shown.length === 0 ? (
            <p className="py-16 text-body">No articles in this category yet.</p>
          ) : (
            <>
              {/* Lead article */}
              <article className="border-b border-line py-10">
                <Link to={`/insights/${lead.slug}`} className="group grid gap-6 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-prestige-blue-hover">
                      {lead.category}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink transition-colors group-hover:text-prestige-blue-hover sm:text-4xl">
                      {lead.title}
                    </h2>
                  </div>
                  <div className="lg:pt-9">
                    <p className="text-lg leading-relaxed text-body">{lead.excerpt}</p>
                    <p className="mt-4 text-sm text-muted">{lead.minutes} min read</p>
                  </div>
                </Link>
              </article>

              {/* Rest */}
              <div className="grid gap-x-12 lg:grid-cols-2">
                {rest.map((a) => (
                  <article key={a.slug} className="border-b border-line py-7">
                    <Link to={`/insights/${a.slug}`} className="group block">
                      <p className="text-xs font-semibold uppercase tracking-wider text-prestige-blue-hover">
                        {a.category}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue-hover">
                        {a.title}
                      </h2>
                      <p className="mt-2 leading-relaxed text-body">{a.excerpt}</p>
                      <p className="mt-3 text-sm text-muted">{a.minutes} min read</p>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABand
        title="Turn thinking into a plan."
        text="If something here matches a challenge you are facing, we would be glad to talk it through properly."
      />
    </>
  )
}
