import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import ModuleAccordion from '../components/ModuleAccordion.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import CTABand from '../components/CTABand.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import StructuredData, {
  graphOf, organisationNode, websiteNode, breadcrumbNode, webPageNode, faqNode, courseNode,
} from '../components/StructuredData.jsx'
import NotFound from './NotFound.jsx'
import { iconFor } from '../data/programmeIcons.js'
import { AVAILABILITY_DISCLAIMER } from '../data/programmes.js'
import {
  outlineFor, assessmentApproach, ENTRY_REQUIREMENTS,
  OUTLINE_NOTE, OUTLINE_DRAFT_NOTE, OUTLINE_ON_REQUEST, SUPPLIED,
} from '../data/courseOutlines.js'
import { resolveCourse, coursePath } from '../lib/slug.js'
import { courseSeo, courseFaqs, relatedCourses } from '../lib/seo.js'
import CornerSwirl from '../components/CornerSwirl.jsx'

/**
 * CourseDetail — one qualification, in full, at its own indexable URL.
 *
 * A single template for all 26 qualifications rather than a page each: the
 * facts come from programmes.js, the module breakdown from courseOutlines.js
 * and the metadata, FAQs and structured data are generated from both. Adding a
 * course is a data change; it never needs a component or a route.
 *
 * The route accepts a SAQA ID as well as a slug so that /programmes/101869,
 * which shipped before slugs existed, still resolves — but it redirects rather
 * than rendering, so the same content is never served at two URLs. That is a
 * duplicate-content problem, not a cosmetic one.
 *
 * Headings: one H1 (the qualification), H2 per section, H3 per item inside a
 * section. Nothing here is a heading for visual weight alone.
 */
export default function CourseDetail() {
  const { slug } = useParams()
  const hit = resolveCourse(slug)
  const q = hit?.q

  const seo = q ? courseSeo(q) : { title: 'Programme not found' }
  // noindex when the slug does not resolve. This page renders <NotFound/>,
  // whose own usePageMeta runs FIRST — a child effect fires before its
  // parent's — so without this the parent would immediately overwrite the
  // child's noindex and every mistyped course URL would be indexable.
  usePageMeta(seo.title, seo.description, { type: 'article', noindex: !q })

  const outline = q ? outlineFor(q.saqaId) : null
  const faqs = useMemo(() => (q ? courseFaqs(q) : []), [q])
  const related = useMemo(() => (q ? relatedCourses(q) : []), [q])

  const path = q ? coursePath(q) : ''
  const trail = q
    ? [
        { name: 'Home', path: '/' },
        { name: 'Programmes', path: '/programmes' },
        { name: q.name, path },
      ]
    : []

  const graph = useMemo(
    () =>
      q
        ? graphOf(
            organisationNode(),
            websiteNode(),
            webPageNode(path, seo.title, seo.description),
            breadcrumbNode(trail),
            courseNode(q, outline, path),
            faqNode(faqs),
          )
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, outline, faqs, path, seo.title, seo.description],
  )

  if (!hit) return <NotFound />
  // A SAQA ID resolves, but only the slug is canonical.
  if (!hit.canonical) return <Navigate to={path} replace />

  const Icon = iconFor(q)
  const enquiry = `/contact?programme=${encodeURIComponent(`${q.name} (SAQA ID ${q.saqaId})`)}`

  // Only facts Prestige has verified. A missing value produces no cell.
  const facts = [
    { label: 'NQF Level', value: q.nqf },
    { label: 'SAQA ID', value: q.saqaId },
    ...(q.credits ? [{ label: 'Credits', value: q.credits }] : []),
    ...(outline?.durationMonths ? [{ label: 'Duration', value: `${outline.durationMonths} months` }] : []),
    ...(outline?.modules ? [{ label: 'Modules', value: outline.modules.length }] : []),
  ]

  return (
    <>
      <StructuredData graph={graph} id={`ld-course-${q.saqaId}`} />

      {/* Course header */}
      <section className="relative overflow-hidden border-b border-line bg-paper" aria-labelledby="course-title">
        <CornerSwirl size="sm" />
        <div className="container-px relative py-8 lg:py-12">
          <Breadcrumbs trail={trail} />

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-prestige-blue-hover text-white">
                  <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-prestige-blue-hover">
                  {q.type}
                </p>
              </div>

              <h1 id="course-title" className="mt-6 font-display text-editorial font-semibold leading-tight text-prestige-green-deep">
                {outline?.fullName ?? q.name}
              </h1>
              {outline?.purpose && (
                <p className="mt-5 text-lg leading-relaxed text-body">{outline.purpose}</p>
              )}
              <p className="mt-4 text-sm font-medium text-muted">
                {q.area} · Accredited delivery from Prestige Tutelage, Randburg, Johannesburg
              </p>
            </div>

            <div className="no-print flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to={enquiry} className="btn btn-primary" data-analytics="course-enquiry">
                Enquire About This Course
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline"
                data-analytics="course-outline-download"
              >
                Download Course Outline
              </button>
            </div>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="bg-prestige-blue-light px-5 py-5 text-center">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-prestige-blue-hover">
                  {f.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          {q.note && <Disclaimer className="mt-6">{q.note}</Disclaimer>}
        </div>
      </section>

      {/* Who it suits + accreditation */}
      <section className="py-14 lg:py-16" aria-labelledby="course-suitability">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 id="course-suitability" className="font-display text-section font-semibold text-prestige-green-deep">
                Who this qualification suits
              </h2>
              <p className="mt-4 leading-relaxed text-body">{q.forWho}</p>

              {outline?.outcomes && (
                <>
                  <h3 className="mt-8 font-display text-lg font-semibold text-ink">
                    Where it leads in the workplace
                  </h3>
                  <ul className="mt-4 grid border-t border-line">
                    {outline.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 border-b border-line py-2.5 leading-relaxed text-body">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              <h2 className="font-display text-section font-semibold text-prestige-green-deep">
                Accreditation and entry
              </h2>
              <p className="mt-4 leading-relaxed text-body">
                Prestige Tutelage delivers this qualification with formal assessment, moderation and
                quality assurance behind every result. Availability is subject to current qualification
                registration, our applicable accreditation or approved delivery route, and the relevant
                assessment and certification arrangements — all confirmed in writing when we scope your
                intervention. Read more about{' '}
                <Link to="/about" className="font-semibold text-prestige-blue-hover underline underline-offset-4">
                  how Prestige is accredited
                </Link>{' '}
                or about our{' '}
                <Link to="/assessment-centre" className="font-semibold text-prestige-blue-hover underline underline-offset-4">
                  assessment and moderation capability
                </Link>
                .
              </p>

              <h3 className="mt-8 font-display text-lg font-semibold text-ink">Entry requirements</h3>
              <ul className="mt-4 grid border-t border-line">
                {ENTRY_REQUIREMENTS.map((e) => (
                  <li key={e} className="flex items-start gap-3 border-b border-line py-2.5 leading-relaxed text-body">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-blue" aria-hidden="true" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course outline */}
      <section className="border-t border-line bg-cloud py-16 lg:py-20" aria-labelledby="course-outline">
        <div className="container-px">
          <div className="max-w-3xl">
            <h2 id="course-outline" className="font-display text-section font-semibold text-prestige-green-deep">
              Course Outline
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-body">
              {outline
                ? 'Select a module to view the key learning areas covered in this qualification.'
                : 'What this qualification covers, and how it is delivered.'}
            </p>
          </div>

          <div className="mt-10">
            {outline ? (
              <ModuleAccordion modules={outline.modules} label={`${q.name} modules`} />
            ) : (
              <div className="max-w-3xl rounded-2xl border border-line bg-paper p-7 shadow-premium sm:p-9">
                <p className="leading-relaxed text-body">{OUTLINE_ON_REQUEST}</p>
                <Link to={enquiry} className="btn btn-primary mt-7">Request the Course Outline</Link>
              </div>
            )}
          </div>

          {outline && (
            <Disclaimer className="mt-8">
              {outline.source === SUPPLIED ? OUTLINE_NOTE : OUTLINE_DRAFT_NOTE}
            </Disclaimer>
          )}
        </div>
      </section>

      {/* Assessment approach */}
      <section className="border-y border-line py-16 lg:py-20" aria-labelledby="course-assessment">
        <div className="container-px">
          <h2 id="course-assessment" className="font-display text-section font-semibold text-prestige-green-deep">
            Assessment Approach
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {assessmentApproach.map((a) => (
              <div key={a.name} className="rounded-2xl border border-line bg-paper p-7 shadow-premium sm:p-8">
                <span className="mb-5 block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-ink">{a.name}</h3>
                <p className="mt-3 leading-relaxed text-body">{a.text}</p>
              </div>
            ))}
          </div>
          <Disclaimer className="mt-8">{AVAILABILITY_DISCLAIMER}</Disclaimer>
        </div>
      </section>

      {/* FAQs — every answer here is the one the structured data carries. */}
      <section className="bg-cloud py-16 lg:py-20" aria-labelledby="course-faqs">
        <div className="container-px">
          <h2 id="course-faqs" className="font-display text-section font-semibold text-prestige-green-deep">
            Frequently asked questions
          </h2>
          <dl className="mt-10 max-w-4xl divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.question} className="py-6">
                <dt className="font-display text-lg font-semibold leading-snug text-prestige-blue-hover">{f.question}</dt>
                <dd className="mt-2 leading-relaxed text-body">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Related programmes — internal links with descriptive anchors. */}
      {related.length > 0 && (
        <section className="border-t border-line py-16 lg:py-20" aria-labelledby="course-related">
          <div className="container-px">
            <h2 id="course-related" className="font-display text-section font-semibold text-prestige-green-deep">
              Related qualifications
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-body">
              Other accredited programmes Prestige Tutelage delivers in {q.area.toLowerCase()} and at
              similar NQF levels.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.saqaId}>
                  <Link
                    to={coursePath(r)}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-premium transition duration-300 ease-prestige hover:-translate-y-1 hover:border-prestige-green/60 hover:shadow-lifted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
                  >
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-prestige-blue-hover">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      NQF Level {r.nqf} · SAQA ID {r.saqaId}
                      {r.credits ? ` · ${r.credits} credits` : ''}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-body">{r.forWho}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/programmes#catalogue" className="btn btn-outline mt-10">
              Browse all accredited qualifications
            </Link>
          </div>
        </section>
      )}

      <CTABand
        title={`Talk to us about ${q.name}.`}
        text="Tell us who you are training and where, and we will confirm availability, delivery and the assessment arrangements in writing."
        primary={{ label: 'Enquire About This Course', to: enquiry }}
        secondary={{ label: 'Browse All Programmes', to: '/programmes#catalogue' }}
      />
    </>
  )
}
