import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import { Award, Briefcase, GraduationCap, Presentation, ShieldCheck, Target } from 'lucide-react'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import ProgrammeCard from '../components/ProgrammeCard.jsx'
import {
  qualifications,
  populatedAreas,
  areaIntros,
  nqfLevels,
  PROGRAMME_TYPES,
  AVAILABILITY_DISCLAIMER,
  learnerships,
  technicalInterventions,
  customCorporate,
} from '../data/programmes.js'
import { totalShortCourses } from '../data/shortCourses.js'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

const ALL = 'All'

/**
 * One filter column. Options render as pills of equal height, so a long label
 * like "Education & Community Development" wraps to its own row rather than
 * stretching its neighbours.
 *
 * The whole pill is the button, and the selected one carries a teal check that
 * sits proud of its top-right corner — a second signal beyond colour alone,
 * which matters for anyone who cannot separate the blue fill from the white
 * one. `aria-pressed` carries the same state for assistive tech.
 */
function FilterGroup({ label, options, value, onChange, formatter = (v) => v }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        {[ALL, ...options].map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`relative inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-all duration-200 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep ${
                active
                  ? 'border-prestige-blue-hover bg-prestige-blue-hover text-white shadow-premium'
                  : 'border-prestige-blue/15 bg-paper text-ink hover:border-prestige-blue/45 hover:bg-prestige-blue/[0.04]'
              }`}
            >
              {opt === ALL ? ALL : formatter(opt)}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-prestige-green ring-2 ring-paper"
                >
                  <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                    <path d="m3 6.2 2 2L9 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Programmes() {
  usePageMeta(
    'Programmes & Qualifications',
    'Qualifications delivered by Prestige Tutelage across business administration, HR, project management, manufacturing and production, engineering, agriculture and early childhood development — with SAQA IDs and NQF levels stated. Accredited training provider in Randburg, South Africa.',
  )

  const [type, setType] = useState(ALL)
  const [area, setArea] = useState(ALL)
  const [nqf, setNqf] = useState(ALL)

  const filtered = useMemo(
    () =>
      qualifications.filter(
        (q) =>
          (type === ALL || q.type === type) &&
          (area === ALL || q.area === area) &&
          (nqf === ALL || q.nqf === nqf),
      ),
    [type, area, nqf],
  )

  const areasShown = populatedAreas.filter((a) => filtered.some((q) => q.area === a))
  const filtersActive = type !== ALL || area !== ALL || nqf !== ALL
  const reset = () => { setType(ALL); setArea(ALL); setNqf(ALL) }

  return (
    <>
      <PageHeader
        images={pageHeroes.programmes}
        eyebrow="Programmes & qualifications"
        title={<>Learning that maps onto <Accent>real occupations</Accent>.</>}
        lead="Prestige Tutelage delivers qualifications across business and administration, manufacturing and production, engineering, agriculture and early childhood development — as full qualifications, through learnerships, or as part of a wider workforce plan."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="On this page">
          {[
            ['#catalogue', 'Qualifications'],
            ['#learnerships', 'Learnerships'],
            ['#technical', 'Technical interventions'],
            ['#custom', 'Custom corporate'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-hover">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      {/* Delivery routes — the qualification counterpart to the same section on
          Short Courses, so either page states the fork and points at the other
          branch. Route 01 here sends a visitor who actually wants a short
          course there rather than making them hunt for it in the catalogue
          below, which lists qualifications only. */}
      <section className="border-b border-line bg-mist/50 py-14 lg:py-16">
        <div className="container-px">
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Short courses */}
            <div className="flex flex-col rounded-2xl border-l-4 border-prestige-blue bg-paper p-7 shadow-premium lg:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Route 01 · Non-credit-bearing
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-prestige-blue-light text-prestige-blue-hover">
                  <Presentation size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-semibold leading-snug text-ink">
                  Professional short courses
                </h2>
              </div>
              <p className="mt-5 leading-relaxed text-body">
                Focused, practical courses for immediate workplace impact — non-NQF and non-credit-bearing
                unless a specific course has been confirmed otherwise in writing.
              </p>
              <div className="pt-7">
                <Link to="/short-courses" className="btn btn-outline w-full sm:w-auto">
                  Explore short courses
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Qualifications */}
            <div className="flex flex-col rounded-2xl border-l-4 border-prestige-green bg-prestige-green-pale p-7 shadow-premium lg:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Route 02 · SAQA &amp; NQF aligned
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper text-prestige-green-deep">
                  <GraduationCap size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-semibold leading-snug text-ink">
                  Qualifications &amp; accredited programmes
                </h2>
              </div>
              <p className="mt-5 leading-relaxed text-body">
                Prestige delivers qualifications with stated SAQA IDs and NQF levels through structured
                programmes, learnerships and focused skills programmes.
              </p>

              <div className="mt-6 grid gap-5 border-t border-prestige-green/25 pt-6 sm:grid-cols-3">
                {[
                  { icon: Award, t: 'Full qualifications', d: 'Structured learning toward a qualification, with formal assessment and moderation.' },
                  { icon: Briefcase, t: 'Learnerships', d: 'Qualification-linked programmes combining classroom learning with structured workplace experience.' },
                  { icon: Target, t: 'Skills programmes', d: 'Focused components for organisations that need targeted capability quickly.' },
                ].map((x) => (
                  <div key={x.t} className="border-l-2 border-prestige-green/50 pl-4">
                    <x.icon size={18} strokeWidth={1.8} aria-hidden="true" className="text-prestige-green-deep" />
                    <h3 className="mt-2 font-sans text-sm font-semibold text-ink">{x.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{x.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <a href="#catalogue" className="btn btn-primary w-full sm:w-auto">
                  View the qualification catalogue
                </a>
              </div>

              <p className="mt-7 flex items-start gap-3 rounded-xl bg-paper p-4 text-sm leading-relaxed text-body">
                <ShieldCheck size={17} strokeWidth={1.9} aria-hidden="true" className="mt-0.5 shrink-0 text-prestige-green-deep" />
                {AVAILABILITY_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue with filters */}
      <section id="catalogue" className="scroll-mt-28 bg-cloud py-16 lg:py-20">
        <div className="container-px">
          <SectionHeading
            eyebrow="Qualification catalogue"
            title="Find the right qualification."
            lead="Filter by what you need, the area you work in, or the NQF level you are targeting. Every qualification below shows the detail Prestige has verified."
          />

          {/* One panel holds the three filter columns and the result row. */}
          <div className="mt-10 overflow-hidden rounded-[20px] border border-line bg-paper shadow-premium">
            {/* Brand hairline across the top edge. */}
            <div className="h-[3px] w-full bg-[linear-gradient(to_right,#006FD8_0%,#0089E6_45%,#2DA22F_100%)]" aria-hidden="true" />

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3 lg:gap-10">
              <FilterGroup label="Programme type" options={PROGRAMME_TYPES} value={type} onChange={setType} />
              <FilterGroup label="Training area" options={populatedAreas} value={area} onChange={setArea}
                formatter={(a) => a.replace(' & Agri-processing', '').replace(', Administration & Leadership', '')} />
              <FilterGroup label="NQF level" options={nqfLevels} value={nqf} onChange={setNqf}
                formatter={(n) => `NQF ${n}`} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-5 sm:px-8">
              <p className="text-sm text-body" role="status" aria-live="polite">
                Showing <span className="font-semibold text-ink">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'programme' : 'programmes'}
              </p>
              {filtersActive && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-3 py-1.5 text-sm font-semibold text-prestige-blue-hover transition-colors hover:bg-prestige-blue/[0.06] hover:text-prestige-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 border border-line bg-paper p-10 text-center">
              <p className="font-display text-xl font-semibold text-ink">
                No qualifications match that combination.
              </p>
              <p className="mt-2 leading-relaxed text-body">
                Try a broader filter — or tell us what you need and we will advise on the right route.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={reset} className="btn btn-outline">Clear Filters</button>
                <Link to="/contact" className="btn btn-primary">Talk to Us</Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 space-y-14">
              {areasShown.map((a) => {
                const items = filtered.filter((q) => q.area === a)
                return (
                  <div key={a}>
                    <div className="flex flex-col gap-2 border-b border-line pb-4">
                      <h3 className="font-display text-2xl font-semibold text-ink">{a}</h3>
                      <p className="max-w-3xl leading-relaxed text-body">{areaIntros[a]}</p>
                    </div>
                    {/* One card per row on mobile, two on tablet, three on
                        large desktops. `items-stretch` is the default here, so
                        each card fills its row and finishes level with its
                        neighbours. */}
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {items.map((q) => <ProgrammeCard key={q.saqaId} q={q} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <Disclaimer className="mt-12">{AVAILABILITY_DISCLAIMER}</Disclaimer>
        </div>
      </section>

      {/* Learnerships */}
      <section id="learnerships" className="scroll-mt-28 border-y border-line bg-mist/60 py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Learnerships"
                title="Work-based learning, managed properly."
                lead={learnerships.intro}
              />
              <div className="mt-8 space-y-6">
                {[learnerships.employed, learnerships.unemployed].map((l) => (
                  <div key={l.title} className="border-l-2 border-prestige-green/60 pl-5">
                    <h3 className="font-sans font-semibold text-ink">{l.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-body">{l.text}</p>
                  </div>
                ))}
              </div>
              <Disclaimer className="mt-7">{learnerships.contributionNote}</Disclaimer>
              <Link to="/contact" className="btn btn-primary mt-8">Discuss a Learnership</Link>
            </div>

            <div>
              <ContentSlider
                images={sectionSliders.programmesLearnerships}
                aspect="aspect-[5/4]"
                label="Learners completing Prestige Tutelage learnerships"
              />
              <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-wider text-muted">
                What Prestige can carry for you
              </h3>
              <ul className="mt-4 grid gap-x-8 border-t border-line sm:grid-cols-2">
                {learnerships.support.map((s) => (
                  <li key={s} className="flex items-start gap-3 border-b border-line py-2.5 text-[0.95rem] text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Customised technical interventions */}
      <section id="technical" className="scroll-mt-28 py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Technical interventions"
                title="Customised technical training for your plant."
                lead={technicalInterventions.lead}
              />
              <Disclaimer className="mt-6">{technicalInterventions.note}</Disclaimer>
            </div>
            <ul className="grid content-start gap-x-10 border-t border-line sm:grid-cols-2">
              {technicalInterventions.items.map((i) => (
                <li key={i} className="flex items-start gap-3 border-b border-line py-3 text-body">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Short courses pointer + custom corporate */}
      <section id="custom" className="scroll-mt-28 border-t border-line bg-paper py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Short courses"
                title="Professional development, alongside the qualifications."
                lead={`${totalShortCourses} practical short courses across leadership, communication, HR, sales, personal effectiveness, operational excellence, safety, workplace readiness and digital skills.`}
              />
              <p className="mt-5 leading-relaxed text-body">
                Short courses are professional development interventions — non-NQF and
                non-credit-bearing unless a specific course has been confirmed otherwise. They work
                well on their own, or alongside a qualification pathway.
              </p>
              <Link to="/short-courses" className="btn btn-outline mt-7">Browse Short Courses</Link>
            </div>

            <div>
              <SectionHeading
                eyebrow="Custom corporate programmes"
                title="When nothing off the shelf fits."
                lead={customCorporate.lead}
              />
              <ul className="mt-6 border-t border-line">
                {customCorporate.items.map((i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-line py-3 text-body">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn-primary mt-7">Design a Programme With Us</Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which programme fits?"
        text="Tell us the roles and gaps you are working with, and we will advise on the right qualification, learnership or blend — including what is currently available."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
