import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Training Finder — a quiet, editorial selector (deliberately not a chatbot).
 *
 * Each goal maps to one of Prestige's actual routes — a qualification, a
 * learnership, a short course, a corporate programme, an assessment service or
 * a custom intervention — and links to real destinations on this site.
 * `route` labels the kind of answer so the recommendation stays honest about
 * what is being proposed.
 */
const goals = [
  {
    id: 'upskill',
    label: 'Upskill current employees',
    route: 'Qualification + short courses',
    title: 'Short courses now, a qualification pathway alongside',
    text: 'Close immediate gaps with focused short courses, and build depth with employed (18.1) learnerships toward a qualification.',
    links: [
      { label: 'Short Courses', to: '/short-courses' },
      { label: 'Qualifications', to: '/programmes#catalogue' },
    ],
  },
  {
    id: 'learnership',
    label: 'Run a learnership',
    route: 'Learnership',
    title: 'End-to-end learnership implementation',
    text: 'Prestige can carry sourcing, screening, onboarding, learning agreements, delivery, workplace coordination, learner support, assessment and reporting.',
    links: [
      { label: 'How Learnerships Work', to: '/programmes#learnerships' },
      { label: 'Talk to Us', to: '/contact' },
    ],
  },
  {
    id: 'managers',
    label: 'Develop managers',
    route: 'Qualification + short courses',
    title: 'Management qualifications and leadership short courses',
    text: 'Generic Management (NQF 4) or the Office Supervisor and Project Manager qualifications, supported by practical courses in supervision, coaching and performance.',
    links: [
      { label: 'Management Qualifications', to: '/programmes#catalogue' },
      { label: 'Leadership Courses', to: '/short-courses#leadership-management' },
    ],
  },
  {
    id: 'performance',
    label: 'Improve workplace performance',
    route: 'Corporate programme',
    title: 'Diagnose first, then a targeted intervention',
    text: 'Start with a skills gap or training needs analysis, then design training around the real constraint — that is our corporate training process.',
    links: [
      { label: 'Corporate Training', to: '/corporate-training' },
      { label: 'Workforce Strategy', to: '/services#workforce-strategy' },
    ],
  },
  {
    id: 'production',
    label: 'Develop production teams',
    route: 'Qualification + custom intervention',
    title: 'Production qualifications and plant-specific training',
    text: 'Production Operator, Process Controller and Production Supervisor qualifications, plus customised interventions in 5S, Lean, root-cause analysis and visual management.',
    links: [
      { label: 'Manufacturing Qualifications', to: '/programmes#catalogue' },
      { label: 'Operational Excellence Courses', to: '/short-courses#operational-excellence' },
    ],
  },
  {
    id: 'agriculture',
    label: 'Develop agricultural skills',
    route: 'Qualification',
    title: 'Agriculture & agri-processing qualifications',
    text: 'Poultry, Animal and Plant Production and Horticulture qualifications for farm teams, supervisors, emerging farmers and agri-processing employers.',
    links: [
      { label: 'Agriculture Qualifications', to: '/programmes#catalogue' },
      { label: 'Agriculture Industry Page', to: '/industries#agriculture-agriprocessing' },
    ],
  },
  {
    id: 'youth',
    label: 'Train unemployed youth',
    route: 'Learnership + short courses',
    title: 'Unemployed learnerships and workplace readiness',
    text: 'Structured 18.2 learnerships combined with workplace readiness courses — CV development, interview preparation, employability and professional conduct.',
    links: [
      { label: 'Learnerships', to: '/programmes#learnerships' },
      { label: 'Workplace Readiness Courses', to: '/short-courses#workplace-readiness' },
    ],
  },
  {
    id: 'qualification',
    label: 'Find a qualification',
    route: 'Qualification',
    title: 'The full qualification catalogue',
    text: 'Filter by programme type, training area or NQF level. Every qualification shows the SAQA ID and NQF level Prestige has verified.',
    links: [{ label: 'Browse Qualifications', to: '/programmes#catalogue' }],
  },
  {
    id: 'short-courses',
    label: 'Run short courses',
    route: 'Short course',
    title: 'Practical short courses for teams',
    text: 'Leadership, communication, HR, sales, personal effectiveness, operational excellence, safety, workplace readiness and digital skills.',
    links: [
      { label: 'Browse Short Courses', to: '/short-courses' },
      { label: 'Build a Course for My Team', to: '/contact' },
    ],
  },
  {
    id: 'csi',
    label: 'Implement a CSI programme',
    route: 'Custom intervention',
    title: 'CSI skills programmes',
    text: 'Turn social investment into structured skills training for communities and unemployed learners — designed and administered properly.',
    links: [
      { label: 'Social Impact Services', to: '/services#social-impact' },
      { label: 'Talk to Us', to: '/contact' },
    ],
  },
  {
    id: 'assess',
    label: 'Assess candidates',
    route: 'Assessment service',
    title: 'Assessment Centre services',
    text: 'Registration, scheduling, invigilation, assessment, moderation, evidence management and results processing — managed end to end.',
    links: [{ label: 'Assessment Centre', to: '/assessment-centre' }],
  },
  {
    id: 'unsure',
    label: 'I’m not sure yet',
    route: 'Conversation',
    title: 'Start with a conversation',
    text: 'Tell us what your organisation is dealing with. We will help you frame the need before proposing any training at all.',
    links: [{ label: 'Contact Prestige', to: '/contact' }],
  },
]

export default function TrainingFinder() {
  const [selected, setSelected] = useState(null)
  const active = goals.find((g) => g.id === selected)

  return (
    // The programme explorer sits on Deep Navy — the one interactive
    // instrument on the homepage, given its own surface so it reads as a tool
    // rather than another content band.
    <section id="training-finder" className="bg-midnight py-16 lg:py-24">
      <div className="container-px">
        <div className="overflow-hidden rounded-lg border border-line-dark bg-navy">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="eyebrow-light">Training finder</p>
              <h2 className="mt-5 font-display text-section font-semibold leading-tight text-white">
                Find the right training solution.
              </h2>
              <p className="mt-3 leading-relaxed text-white/70">What are you trying to achieve?</p>

              <div className="mt-7 flex flex-wrap gap-2.5" role="group" aria-label="Select your goal">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelected(g.id)}
                    aria-pressed={selected === g.id}
                    className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                      selected === g.id
                        ? 'border-prestige-blue bg-prestige-blue text-white'
                        : 'border-line-dark bg-white/[0.04] text-white/85 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-start border-t border-line-dark bg-white/[0.03] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              {active ? (
                <div aria-live="polite">
                  <p className="text-sm font-semibold uppercase tracking-wider text-prestige-growth">
                    Recommended route · {active.route}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">{active.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/75">{active.text}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {active.links.map((l, i) => (
                      <Link
                        key={l.to + l.label}
                        to={l.to}
                        className={i === 0 ? 'btn btn-primary' : 'btn btn-ghost-light'}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                    How this works
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    Select a goal to see our recommendation.
                  </p>
                  <p className="mt-3 leading-relaxed text-white/75">
                    We will point you to the most relevant Prestige route — a qualification,
                    learnership, short course, corporate programme, assessment service or a custom
                    intervention designed around your need.
                  </p>
                  <ol className="mt-6 space-y-2.5 border-t border-line-dark pt-5">
                    {[
                      'Choose the goal closest to your situation.',
                      'See the route and programmes we would recommend.',
                      'Talk to us — we confirm availability and scope it properly.',
                    ].map((s, i) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-white/75">
                        <span className="font-display font-semibold text-prestige-growth">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
