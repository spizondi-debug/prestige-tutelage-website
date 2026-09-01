import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import LearningRoutes from '../components/LearningRoutes.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import ProgrammeCard from '../components/ProgrammeCard.jsx'
import {
  qualifications,
  populatedAreas,
  areaIntros,
  AVAILABILITY_DISCLAIMER,
  learnerships,
  technicalInterventions,
  customCorporate,
} from '../data/programmes.js'
import { totalShortCourses } from '../data/shortCourses.js'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'
import CornerSwirl from '../components/CornerSwirl.jsx'
import { assetUrl } from '../lib/asset.js'
import { LayoutGrid, ArrowRight, ChevronRight } from 'lucide-react'

/**
 * Short eyebrow, headline and anchor slug for each training area's teaser
 * block. Kept local to this page — the full area name from programmes.js
 * still drives the data (filtering, counts, `areaIntros`); these are purely
 * editorial trims for a tighter section header than the full area name allows.
 */
const AREA_META = {
  'Business, Administration & Leadership': {
    slug: 'business-admin-leadership',
    eyebrow: 'Business',
    title: 'Skills built for the office.',
  },
  'Manufacturing & Production': {
    slug: 'manufacturing-production',
    eyebrow: 'Manufacturing',
    title: 'Skills built for production.',
  },
  'Engineering & Technical': {
    slug: 'engineering-technical',
    eyebrow: 'Engineering',
    title: 'Skills built for the workshop.',
  },
  'Agriculture & Agri-processing': {
    slug: 'agriculture-agri-processing',
    eyebrow: 'Agriculture',
    title: 'Skills built for the land.',
  },
  'Education & Community Development': {
    slug: 'education-community-development',
    eyebrow: 'Education',
    title: 'Skills built for early learning.',
  },
}

/**
 * Decorative backdrop for a training-area teaser: the existing corner dot
 * swirl, with a few thin concentric arcs and marker dots layered on top for a
 * lightweight "blueprint" read. Worth the extra layer only here, where each
 * teaser is also a section anchor — everywhere else keeps the plain swirl.
 */
function AreaTeaserBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${assetUrl('images/bg-dots-blue.svg')})`,
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'clamp(360px, 55vw, 760px) clamp(360px, 55vw, 760px)',
          opacity: 0.7,
        }}
      />
      <svg
        className="absolute bottom-0 right-0 hidden h-[85%] w-[60%] sm:block"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMaxYMax meet"
      >
        <circle cx="400" cy="400" r="110" stroke="#066DCE" strokeWidth="1.3" opacity="0.5" />
        <circle cx="400" cy="400" r="200" stroke="#066DCE" strokeWidth="1.1" opacity="0.35" />
        <circle cx="400" cy="400" r="290" stroke="#31B84A" strokeWidth="1.1" opacity="0.4" />
        <circle cx="290" cy="400" r="3.5" fill="#066DCE" />
        <circle cx="400" cy="200" r="3" fill="#066DCE" />
        <circle cx="110" cy="400" r="3" fill="#31B84A" />
      </svg>
    </div>
  )
}

export default function Programmes() {
  usePageMeta(
    'Programmes & Qualifications',
    'Qualifications delivered by Prestige Tutelage across business administration, HR, project management, manufacturing and production, engineering, agriculture and early childhood development — with SAQA IDs and NQF levels stated. Accredited training provider in Randburg, South Africa.',
  )

  const firstAreaSlug = AREA_META[populatedAreas[0]].slug

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
      <section id="catalogue" className="scroll-mt-28 bg-cloud py-16 lg:py-20">
        <div className="container-px">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Qualifications"
                title="Business, production, agriculture and community."
                lead={`${qualifications.length} qualifications across ${populatedAreas.length} training areas — each listed with the SAQA ID and NQF level Prestige has verified.`}
              />
            </div>
            <a
              href={`#${firstAreaSlug}`}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-prestige-growth px-6 py-3.5 text-sm font-semibold text-white shadow-premium transition-transform duration-200 ease-prestige hover:-translate-y-0.5"
            >
              <LayoutGrid size={18} strokeWidth={2} aria-hidden="true" />
              Browse All Qualifications
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-12 space-y-16">
            {populatedAreas.map((a) => {
              const meta = AREA_META[a]
              const items = qualifications.filter((q) => q.area === a)
              return (
                <div key={a}>
                  <div
                    id={meta.slug}
                    className="relative scroll-mt-28 overflow-hidden rounded-[28px] border border-line bg-paper shadow-premium"
                  >
                    <AreaTeaserBackdrop />
                    <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:p-14">
                      <div className="max-w-md">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-prestige-blue-hover">
                          {meta.eyebrow}
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                          {meta.title}
                        </h3>
                        <p className="mt-5 leading-relaxed text-body">{areaIntros[a]}</p>
                        <p className="mt-6 text-sm font-semibold text-muted">
                          {items.length} {items.length === 1 ? 'qualification' : 'qualifications'} in this area
                        </p>
                        <a
                          href={`#${meta.slug}-list`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-hover"
                        >
                          Explore {meta.eyebrow} programmes
                          <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* One card per row on mobile, two on tablet, three on
                      large desktops. `items-stretch` is the default here, so
                      each card fills its row and finishes level with its
                      neighbours. */}
                  <div id={`${meta.slug}-list`} className="mt-8 scroll-mt-28 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((q) => <ProgrammeCard key={q.saqaId} q={q} />)}
                  </div>
                </div>
              )
            })}
          </div>

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
