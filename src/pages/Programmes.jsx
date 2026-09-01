import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import LearningRoutes from '../components/LearningRoutes.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import {
  qualifications,
  populatedAreas,
  AVAILABILITY_DISCLAIMER,
  learnerships,
  technicalInterventions,
  customCorporate,
} from '../data/programmes.js'
import { iconFor } from '../data/programmeIcons.js'
import { coursePath } from '../lib/slug.js'
import { totalShortCourses } from '../data/shortCourses.js'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'
import CornerSwirl from '../components/CornerSwirl.jsx'
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
 * Thin decorative arcs in the catalogue header's top-right corner — quieter
 * than the dot swirl used elsewhere, so it sits behind the gradient button
 * without competing with it.
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

export default function Programmes() {
  usePageMeta(
    'Programmes & Qualifications',
    'Qualifications delivered by Prestige Tutelage across business administration, HR, project management, manufacturing and production, engineering, agriculture and early childhood development — with SAQA IDs and NQF levels stated. Accredited training provider in Randburg, South Africa.',
  )

  const [activeArea, setActiveArea] = useState(null)
  const shownQualifications = activeArea ? qualifications.filter((q) => q.area === activeArea) : qualifications

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

      <LearningRoutes
        route1={{
          badge: 'Route 01',
          title: 'Professional short courses',
          lead: 'Focused, practical courses for immediate workplace impact.',
          detail: 'Non-NQF and non-credit-bearing unless a specific course has been confirmed otherwise in writing.',
          cta: { label: 'Explore short courses', to: '/short-courses' },
        }}
        route2={{
          badge: 'Route 02',
          title: 'Qualifications & accredited programmes',
          lead: 'Structured programmes and learnerships that combine guided learning, workplace experience and formal assessment.',
          tiles: [
            { name: 'Full qualifications', text: 'Structured learning toward a qualification, with formal assessment and moderation.' },
            { name: 'Learnerships', text: 'Qualification-linked programmes combining classroom learning with structured workplace experience.' },
            { name: 'Skills programmes', text: 'Focused components for organisations that need targeted capability quickly.' },
          ],
          detail: AVAILABILITY_DISCLAIMER,
          cta: { label: 'View the qualification catalogue', href: '#catalogue' },
        }}
      />

      {/* Catalogue */}
      <section id="catalogue" className="relative scroll-mt-28 overflow-hidden bg-cloud py-16 lg:py-20">
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
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-prestige-growth px-6 py-3.5 text-sm font-semibold text-white shadow-premium transition-transform duration-200 ease-prestige hover:-translate-y-0.5"
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
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep ${
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
                    <h3 className="font-sans font-semibold text-prestige-blue-hover">{l.title}</h3>
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
      <section id="custom" className="relative scroll-mt-28 overflow-hidden border-t border-line bg-paper py-16 lg:py-20">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
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
