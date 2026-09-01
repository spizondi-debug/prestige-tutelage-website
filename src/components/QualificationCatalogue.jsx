import { useState } from 'react'
import { Link } from 'react-router-dom'
import { qualifications, populatedAreas, AVAILABILITY_DISCLAIMER } from '../data/programmes.js'
import { iconFor } from '../data/programmeIcons.js'
import { coursePath } from '../lib/slug.js'
import { SectionHeading } from './Section.jsx'
import {
  LayoutGrid, ArrowRight, ChevronRight, GraduationCap, ShieldCheck,
  Briefcase, Factory, Settings2, Sprout, Users,
} from 'lucide-react'

/** Icon + colour treatment for each training area's sidebar badge. */
const AREA_STYLE = {
  'Business, Administration & Leadership': { icon: Briefcase, bg: 'bg-blue-100', text: 'text-blue-600' },
  'Manufacturing & Production': { icon: Factory, bg: 'bg-green-100', text: 'text-green-700' },
  'Engineering & Technical': { icon: Settings2, bg: 'bg-purple-100', text: 'text-purple-600' },
  'Agriculture & Agri-processing': { icon: Sprout, bg: 'bg-green-100', text: 'text-green-600' },
  'Education & Community Development': { icon: Users, bg: 'bg-orange-100', text: 'text-orange-600' },
}

/**
 * Thin decorative arcs in the header's top-right corner — quieter than the
 * dot swirl used elsewhere, so it sits behind the gradient button without
 * competing with it.
 */
function CatalogueHeaderArcs() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 hidden h-[26rem] w-[36rem] lg:block"
      viewBox="0 0 600 420"
      fill="none"
      aria-hidden="true"
    >
      <path d="M 600 420 A 380 380 0 0 0 220 40" stroke="#066DCE" strokeWidth="1.4" opacity="0.35" />
      <path d="M 600 420 A 300 300 0 0 0 300 120" stroke="#066DCE" strokeWidth="1.2" opacity="0.3" />
      <path d="M 600 420 A 230 230 0 0 0 370 190" stroke="#31B84A" strokeWidth="1.2" opacity="0.4" />
    </svg>
  )
}

/**
 * The full qualification catalogue: header, stat strip, an icon-badged
 * sidebar to filter by training area (single-select, click again to clear),
 * and every qualification as a row with its icon, SAQA ID / credits / area,
 * NQF pill and a link to its course page.
 *
 * Shared between the Programmes page and the Home page's qualifications
 * section so both stay visually and functionally identical — `id` and
 * `className` let each caller control the outer section's anchor and
 * background/spacing without touching the markup itself. `limit` caps how
 * many rows render after filtering — for a homepage teaser that points to
 * the full list elsewhere rather than reproducing it in full.
 */
export default function QualificationCatalogue({ id, className = '', limit }) {
  const [activeArea, setActiveArea] = useState(null)
  const filteredQualifications = activeArea ? qualifications.filter((q) => q.area === activeArea) : qualifications
  const shownQualifications = limit ? filteredQualifications.slice(0, limit) : filteredQualifications

  return (
    <section id={id} className={`relative overflow-hidden ${className}`.trim()}>
      <CatalogueHeaderArcs />
      <div className="container-px relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Qualifications"
              title="Business, production, agriculture and community."
              lead={`${qualifications.length} qualifications across ${populatedAreas.length} training areas — each listed with the SAQA ID and NQF level Prestige has verified.`}
            />
          </div>
          <button
            type="button"
            onClick={() => setActiveArea(null)}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-prestige-green px-6 py-3.5 text-sm font-semibold text-ink shadow-premium transition-colors duration-200 ease-prestige hover:bg-prestige-green-light hover:shadow-premium"
          >
            <LayoutGrid size={18} strokeWidth={2} aria-hidden="true" />
            Browse All Qualifications
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Stat strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-line py-5 text-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-prestige-blue-light text-prestige-blue-hover">
            <GraduationCap size={18} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold text-ink">{qualifications.length} qualifications</span>
          <span className="text-muted" aria-hidden="true">·</span>
          <span className="font-semibold text-ink">{populatedAreas.length} training areas</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-12">
          {/* Sidebar filter */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Filter by training area</p>
            <div className="mt-4 space-y-3">
              {populatedAreas.map((a) => {
                const style = AREA_STYLE[a]
                const Icon = style.icon
                const active = activeArea === a
                const count = qualifications.filter((q) => q.area === a).length
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setActiveArea(active ? null : a)}
                    aria-pressed={active}
                    className={`flex w-full min-h-[3.75rem] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep ${
                      active
                        ? 'border-prestige-blue-hover bg-paper shadow-premium'
                        : 'border-line bg-paper hover:border-prestige-blue/30'
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style.bg} ${style.text}`}>
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-ink">{a}</span>
                    <span className="shrink-0 text-xs font-semibold text-muted">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Flat list */}
          <div className="space-y-3">
            {shownQualifications.map((q) => {
              const Icon = iconFor(q)
              return (
                <Link
                  key={q.saqaId}
                  to={coursePath(q)}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4 shadow-soft transition-colors duration-200 ease-prestige hover:border-prestige-blue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-prestige-blue-light text-prestige-blue-hover">
                    <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-semibold text-ink group-hover:text-prestige-blue-hover">
                      {q.name}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-muted">
                      SAQA ID {q.saqaId}{q.credits ? ` · ${q.credits} credits` : ''} · {q.area}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full border border-prestige-blue/25 px-3 py-1 text-xs font-semibold text-prestige-blue-hover">
                      NQF {q.nqf}
                    </span>
                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-muted transition-transform duration-200 ease-prestige group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-2xl bg-prestige-blue-light/60 p-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-prestige-blue-hover">
            <ShieldCheck size={16} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-body">{AVAILABILITY_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  )
}
