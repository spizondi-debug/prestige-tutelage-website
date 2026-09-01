import { useParams, Link, Navigate } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import CTABand from '../components/CTABand.jsx'
import HeroSlider from '../components/HeroSlider.jsx'
import { articleHeroes } from '../data/pageHeroes.js'
import { insights } from '../data/insights.js'
import CornerSwirl from '../components/CornerSwirl.jsx'

export default function InsightArticle() {
  const { slug } = useParams()
  const article = insights.find((a) => a.slug === slug)
  const related = insights.filter((a) => a.slug !== slug).slice(0, 3)

  // The excerpt alone lands around 110 characters, short of what a result
  // snippet will show. The category and publisher are appended only while
  // there is room, so a longer excerpt is never truncated to make space.
  const seoDescription = article
    ? [`${article.excerpt}`, `A Prestige Tutelage guide for South African employers on ${article.category.toLowerCase()}.`]
        .reduce((acc, part) => (acc && (acc + ' ' + part).length > 158 ? acc : acc ? acc + ' ' + part : part), '')
    : undefined
  usePageMeta(article?.title ?? 'Insight', seoDescription, { type: 'article' })

  if (!article) return <Navigate to="/insights" replace />

  const heroSlides = articleHeroes[article.category] ?? articleHeroes.default

  return (
    <>
      <article>
        <header className="tex tex-grid border-b border-line bg-cloud">
          <div className="container-px">
            <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
              <div className="max-w-2xl">
                <Link to="/insights" className="text-sm font-semibold text-prestige-blue-hover hover:underline">
                  ← All insights
                </Link>
                <p className="eyebrow mt-6">{article.category}</p>
                <h1 className="mt-4 font-display text-editorial font-semibold text-ink">
                  {article.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-body">{article.excerpt}</p>
                <p className="mt-5 text-sm text-muted">{article.minutes} min read</p>
              </div>

              <HeroSlider images={heroSlides} />
            </div>
          </div>
        </header>

        <div className="container-px">
          <div className="max-w-2xl py-12 lg:py-16">
            {article.body.map((block, i) => {
              if (block.h) {
                return (
                  <h2 key={i} className="mt-10 font-display text-2xl font-semibold text-ink first:mt-0">
                    {block.h}
                  </h2>
                )
              }
              if (block.list) {
                return (
                  <ul key={i} className="mt-5 space-y-3">
                    {block.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[1.05rem] leading-relaxed text-body">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="mt-5 text-[1.05rem] leading-relaxed text-body first:mt-0">
                  {block.p}
                </p>
              )
            })}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="relative overflow-hidden border-t border-line py-14">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
            More insights
          </h2>
          <div className="mt-6 grid gap-x-12 border-t border-line lg:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} to={`/insights/${a.slug}`} className="group border-b border-line py-5 lg:pr-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-prestige-blue-hover">{a.category}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue-hover">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
