import { Link, useParams } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import ModuleAccordion from '../components/ModuleAccordion.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import CTABand from '../components/CTABand.jsx'
import NotFound from './NotFound.jsx'
import { iconFor } from '../data/programmeIcons.js'
import { qualifications, AVAILABILITY_DISCLAIMER } from '../data/programmes.js'
import { outlineFor, assessmentApproach, OUTLINE_NOTE, OUTLINE_DRAFT_NOTE, OUTLINE_ON_REQUEST, SUPPLIED } from '../data/courseOutlines.js'

/**
 * CourseDetail — one qualification, in full.
 *
 * A single template for all 26 qualifications rather than a page each: the
 * facts come from programmes.js and the module breakdown, where Prestige has
 * supplied one, from courseOutlines.js. Adding a course outline is a data
 * change; it never needs a new component or a new route.
 *
 * A qualification without a supplied outline still gets a real page. It shows
 * every verified fact and says the breakdown is available on request, rather
 * than generating plausible-looking modules from the qualification's name —
 * which is the one thing this page must never do.
 */
export default function CourseDetail() {
  const { saqaId } = useParams()
  const q = qualifications.find((x) => x.saqaId === saqaId)

  usePageMeta(
    q ? `${q.name} — NQF ${q.nqf}` : 'Programme not found',
    q
      ? `${q.name}, SAQA ID ${q.saqaId}, NQF Level ${q.nqf}${q.credits ? `, ${q.credits} credits` : ''}. ${q.forWho}`
      : undefined,
  )

  if (!q) return <NotFound />

  const outline = outlineFor(q.saqaId)
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
      {/* Course header */}
      <section className="border-b border-line bg-paper">
        <div className="container-px py-10 lg:py-14">
          <Link
            to="/programmes#catalogue"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
                 className="h-4 w-4 transition-transform duration-300 ease-prestige group-hover:-translate-x-1">
              <path d="M19 12H6M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Programmes
          </Link>

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

              <h1 className="mt-6 font-display text-editorial font-semibold leading-tight text-prestige-green-deep">
                {outline?.fullName ?? q.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">{q.forWho}</p>
              <p className="mt-4 text-sm font-medium text-muted">{q.area}</p>
            </div>

            <div className="no-print flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to={enquiry} className="btn btn-primary">Enquire About This Course</Link>
              <button type="button" onClick={() => window.print()} className="btn btn-outline">
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

      {/* Course outline */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="max-w-3xl">
            <h2 className="font-display text-section font-semibold text-prestige-green-deep">Course Outline</h2>
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
      <section className="border-y border-line bg-cloud py-16 lg:py-20">
        <div className="container-px">
          <h2 className="font-display text-section font-semibold text-prestige-green-deep">Assessment Approach</h2>
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

      <CTABand
        title={`Talk to us about ${q.name}.`}
        text="Tell us who you are training and where, and we will confirm availability, delivery and the assessment arrangements in writing."
        primary={{ label: 'Enquire About This Course', to: enquiry }}
        secondary={{ label: 'Browse All Programmes', to: '/programmes#catalogue' }}
      />
    </>
  )
}
