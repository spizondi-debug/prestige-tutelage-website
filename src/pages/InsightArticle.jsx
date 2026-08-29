import { useParams, Link, Navigate } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import CTABand from '../components/CTABand.jsx'
import Photo from '../components/Photo.jsx'
import { insights } from '../data/insights.js'

/**
 * Which photograph opens an article, by category. Every entry is a real
 * Prestige or licensed photograph already in the library; a category with no
 * entry falls back to the graduate portrait rather than rendering nothing.
 */
const ARTICLE_HERO = {
  Qualifications: {
    src: 'certificates-cohort.jpg',
    alt: 'Prestige Tutelage learners holding their certificates of completion',
    position: 'center 30%',
  },
  Learnerships: {
    src: 'learner-cohort.jpg',
    alt: 'A Prestige Tutelage learner intake gathered outside the training venue',
    position: 'center 40%',
  },
  Leadership: {
    src: 'bbbee-consultation.jpg',
    alt: 'Two colleagues in conversation beside an office window',
    position: 'center 40%',
  },
  Delivery: {
    src: 'facilitator-session.jpg',
    alt: 'A Prestige Tutelage facilitator leading a session with learners',
    position: 'center 42%',
  },
  Industries: {
    src: 'workshop-training.jpg',
    alt: 'A learner in full protective equipment working with an angle grinder during practical training',
    position: 'center 30%',
  },
  Planning: {
    src: 'training-room.jpg',
    alt: 'A training room at Prestige Tutelage set up with a projector screen and boardroom seating',
    position: 'center',
  },
  default: {
    src: 'graduate-portrait-hero.jpg',
    alt: 'A Prestige Tutelage graduate in cap and gown on the steps after her graduation ceremony',
    position: 'center 22%',
  },
}

export default function InsightArticle() {
  const { slug } = useParams()
  const article = insights.find((a) => a.slug === slug)
  const related = insights.filter((a) => a.slug !== slug).slice(0, 3)

  usePageMeta(article?.title ?? 'Insight', article?.excerpt)

  if (!article) return <Navigate to="/insights" replace />

  const hero = ARTICLE_HERO[article.category] ?? ARTICLE_HERO.default

  return (
    <>
      <article>
        <header className="tex tex-grid border-b border-line bg-cloud">
          <div className="container-px">
            <div className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20">
              <div className="max-w-2xl">
                <Link to="/insights" className="text-sm font-semibold text-prestige-blue hover:underline">
                  ← All insights
                </Link>
                <p className="eyebrow mt-6">{article.category}</p>
                <h1 className="mt-4 font-display text-editorial font-semibold text-ink">
                  {article.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-body">{article.excerpt}</p>
                <p className="mt-5 text-sm text-muted">{article.minutes} min read</p>
              </div>

              <div className="relative">
                <div className="rounded-2xl bg-[linear-gradient(140deg,rgba(0,111,216,0.45),rgba(0,111,216,0.06)_45%,rgba(45,162,47,0.42))] p-px shadow-premium">
                  <Photo
                    src={hero.src}
                    alt={hero.alt}
                    eager
                    position={hero.position}
                    className="aspect-[4/3] w-full rounded-[15px]"
                  />
                </div>
              </div>
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
      <section className="border-t border-line py-14">
        <div className="container-px">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-muted">
            More insights
          </h2>
          <div className="mt-6 grid gap-x-12 border-t border-line lg:grid-cols-3">
            {related.map((a) => (
              <Link key={a.slug} to={`/insights/${a.slug}`} className="group border-b border-line py-5 lg:pr-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-prestige-blue">{a.category}</p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue">
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
