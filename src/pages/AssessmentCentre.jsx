import { Link } from 'react-router-dom'
import {
  BadgeCheck, ShieldCheck, Target, Users, GraduationCap, User, Building2, ChevronDown, Info,
  UserCheck, CalendarDays, ClipboardList, Scale, Folder, BarChart3, MessageCircle, Archive,
} from 'lucide-react'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import { pageHeroes } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

// Scope is confirmed per engagement — no approval for specific qualifications
// or assessment-centre scope is asserted anywhere on this page.
const SCOPE_NOTE =
  'Scope of assessment, the applicable qualifications and the relevant quality-assurance arrangements are confirmed in writing per engagement.'

/** Colour treatment per pathway card — alternating green/blue, same rhythm as LearningRoutes. */
const TONE = {
  green: {
    edge: 'bg-prestige-green',
    iconBg: 'bg-prestige-green-pale',
    iconText: 'text-prestige-green-deep',
    label: 'text-prestige-green-deep',
    dot: 'bg-prestige-green',
    link: 'text-prestige-green-deep hover:text-prestige-green-deeper',
  },
  blue: {
    edge: 'bg-prestige-blue',
    iconBg: 'bg-prestige-blue-light',
    iconText: 'text-prestige-blue-hover',
    label: 'text-prestige-blue-hover',
    dot: 'bg-prestige-blue',
    link: 'text-prestige-blue-hover hover:text-prestige-blue-deep',
  },
}

const pathways = [
  {
    who: 'Employers',
    icon: Users,
    tone: 'green',
    text: 'Confirming competence across teams — for qualifications, learnerships or internal standards — with records that survive audit.',
    needs: ['Assessment planning for a cohort', 'Moderation of internal assessment decisions', 'Evidence and record management', 'Results and reporting'],
    cta: { label: 'Discuss an Employer Assessment', to: '/contact?interest=Assessment%20Centre' },
  },
  {
    who: 'Training Providers',
    icon: GraduationCap,
    tone: 'blue',
    text: 'Independent assessment and moderation capacity when your own is stretched, or when a separation of duties is required.',
    needs: ['External moderation', 'Assessor capacity', 'Invigilation services', 'Assessment centre facilities'],
    cta: { label: 'Discuss Provider Support', to: '/contact?interest=Assessment%20Centre' },
  },
  {
    who: 'Candidates',
    icon: User,
    tone: 'green',
    text: 'A fair, well-run assessment with clear expectations, proper support and a transparent appeals route.',
    needs: ['Registration and scheduling', 'What to expect on the day', 'Results processing', 'Queries and appeals'],
    cta: { label: 'Candidate Enquiry', to: '/contact?interest=Assessment%20Centre' },
  },
]

const capabilities = [
  { name: 'Candidate Registration', text: 'Accurate capture and verification of candidate details before any assessment begins.', icon: UserCheck },
  { name: 'Assessment Scheduling', text: 'Planned assessment calendars that fit operational realities and give candidates fair notice.', icon: CalendarDays },
  { name: 'Assessment Administration', text: 'Venue, materials, controls and logistics managed so the assessment runs without incident.', icon: ClipboardList },
  { name: 'Assessors', text: 'Registered, briefed assessors applying agreed criteria consistently across candidates.', icon: User },
  { name: 'Moderation', text: 'Independent moderation of assessment decisions to confirm fairness and consistency.', icon: Scale },
  { name: 'Invigilation', text: 'Controlled invigilation that protects the integrity of every sitting.', icon: ShieldCheck },
  { name: 'Evidence Management', text: 'Secure collection, filing and retention of portfolios and assessment evidence.', icon: Folder },
  { name: 'Results Processing', text: 'Timely, accurate processing and release of results through the correct channels.', icon: BarChart3 },
  { name: 'Appeals', text: 'A clear, documented route for candidates to query or appeal an assessment decision.', icon: MessageCircle },
  { name: 'Quality Assurance', text: 'Internal quality checks across assessment design, delivery and record-keeping.', icon: BadgeCheck },
  { name: 'Record Management', text: 'Complete, retrievable records that stand up to audit and verification.', icon: Archive },
  { name: 'Occupational Qualification Support', text: 'Support for candidates and employers navigating occupational qualification assessment requirements.', icon: GraduationCap },
]

/** Every three capabilities above form one stage of the assessment journey. */
const capabilityStages = [
  { label: 'Candidate and planning', tone: 'green', icon: CalendarDays },
  { label: 'Assessment delivery', tone: 'blue', icon: Users },
  { label: 'Evidence, results and quality', tone: 'blue', icon: BarChart3 },
  { label: 'Quality and records', tone: 'blue', icon: BadgeCheck },
]

const principles = [
  { t: 'Quality', d: 'Every assessment is designed, delivered and moderated to a standard we can defend.', icon: BadgeCheck },
  { t: 'Integrity', d: 'Controls, invigilation and evidence handling that leave no doubt about a result.', icon: ShieldCheck },
  { t: 'Competence', d: 'We assess what a person can actually do — not what they can recite.', icon: Target },
]

export default function AssessmentCentre() {
  usePageMeta(
    'Assessment Centre',
    'Assessment centre services in Johannesburg — candidate registration, assessment scheduling, assessors, moderation, invigilation, evidence management, results processing and quality assurance from Prestige Tutelage, Randburg.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.assessment}
        eyebrow="Assessment Centre"
        title={<>Assessment built around <Accent>quality, integrity and competence</Accent>.</>}
        lead="A certificate is only worth the process behind it. Prestige operates a professionally managed assessment capability — from candidate registration through moderation, results and records."
      >
        <Link to="/contact" className="btn btn-primary mt-8">Enquire About Assessment Services</Link>
      </PageHeader>

      {/* Three principles */}
      <section className="border-b border-line bg-mist/50 py-12 lg:py-16">
        <div className="container-px">
          <div className="grid gap-5 sm:grid-cols-3">
            {principles.map((p) => (
              <div key={p.t} className="rounded-2xl bg-paper p-7 shadow-premium">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-prestige-green/40 text-prestige-green-deep">
                  <p.icon size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-ink">{p.t}</h2>
                <p className="mt-2 leading-relaxed text-body">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything an assessment requires, handled in one place."
            lead="Employers, providers and candidates deal with a single, accountable assessment operation rather than a chain of hand-offs."
          />
          <dl className="mt-12 border-t border-line">
            {capabilityStages.map((stage, si) => {
              const items = capabilities.slice(si * 3, si * 3 + 3)
              const tone = TONE[stage.tone]
              return (
                <div key={stage.label} className="grid gap-6 border-b border-line py-8 lg:grid-cols-[13rem_1fr] lg:gap-10">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.edge} text-sm font-bold text-white`}>
                      {si + 1}
                    </span>
                    <p className={`text-sm font-bold uppercase leading-snug tracking-wide ${tone.label}`}>
                      {stage.label}
                    </p>
                    <div className="relative hidden pl-[14px] lg:mt-3 lg:block">
                      <span className="absolute left-[14px] -top-2 h-5 border-l border-dashed border-prestige-blue/30" aria-hidden="true" />
                      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${tone.iconBg} ${tone.iconText}`}>
                        <stage.icon size={20} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
                    {items.map((c, i) => (
                      <div key={c.name} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-8' : ''}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-prestige-blue-light text-prestige-blue-hover">
                          <c.icon size={19} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <dt className="mt-3 font-sans font-semibold text-prestige-blue-hover">{c.name}</dt>
                        <dd className="mt-1.5 leading-relaxed text-body">{c.text}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </dl>
        </div>
      </section>

      {/* Who uses it */}
      <section className="border-y border-line bg-mist/60 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Who we assess for"
            title={<>Three routes in — <Accent>employers, providers and candidates</Accent>.</>}
            lead="Each comes to the assessment centre with different needs. Find yours below."
            tone="ink"
            center
          />

          {/* Hub-and-spoke connector — desktop only, aligned to the card
              grid below via matching grid-cols-3 so the arms always land on
              the outer cards' centres regardless of container width. */}
          <div className="relative mt-10 hidden lg:grid lg:grid-cols-3" aria-hidden="true">
            <div className="relative h-16">
              <span className="absolute inset-y-1/2 left-1/2 right-0 border-t border-dashed border-prestige-blue/40" />
              <ChevronDown size={16} strokeWidth={2} className="absolute left-1/2 top-1/2 mt-1 -translate-x-1/2 text-prestige-blue/50" />
            </div>
            <div className="flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-prestige-blue-light text-prestige-blue-hover shadow-premium">
                <Building2 size={26} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </div>
            <div className="relative h-16">
              <span className="absolute inset-y-1/2 left-0 right-1/2 border-t border-dashed border-prestige-blue/40" />
              <ChevronDown size={16} strokeWidth={2} className="absolute left-1/2 top-1/2 mt-1 -translate-x-1/2 text-prestige-blue/50" />
            </div>
          </div>

          <div className="mt-4 grid gap-5 lg:mt-0 lg:grid-cols-3">
            {pathways.map((p) => {
              const tone = TONE[p.tone]
              const Icon = p.icon
              return (
                <article key={p.who} className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper p-7 shadow-premium">
                  <span className={`absolute inset-x-0 top-0 h-1 ${tone.edge}`} aria-hidden="true" />
                  <div className="flex items-center gap-4">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone.iconBg} ${tone.iconText}`}>
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-ink">{p.who}</h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-body">{p.text}</p>

                  <h4 className={`mt-6 text-xs font-semibold uppercase tracking-wider ${tone.label}`}>
                    Typically needing
                  </h4>
                  <ul className="mt-3 flex-1 border-t border-line">
                    {p.needs.map((n) => (
                      <li key={n} className="flex items-start gap-3 border-b border-line py-2.5 text-[0.95rem] text-body">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
                        {n}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={p.cta.to}
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${tone.link}`}
                  >
                    {p.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              )
            })}
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-2xl bg-prestige-blue-light/60 p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-prestige-blue-hover">
              <Info size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-body">{SCOPE_NOTE}</p>
          </div>
        </div>
      </section>

      <CTABand
        title="Enquire about assessment services."
        text="Tell us how many candidates, which qualifications and your timelines. We will come back with a clear assessment plan."
        primary={{ label: 'Enquire About Assessment Services', to: '/contact' }}
        secondary={{ label: 'Assessment & Quality Services', to: '/services#assessment-quality' }}
      />
    </>
  )
}
