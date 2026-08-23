import { useState } from 'react'
import { Link } from 'react-router-dom'

// Training Finder — a quiet, editorial selector (deliberately not a chatbot).
// Each goal maps to a recommendation with real destinations on this site.
const goals = [
  {
    id: 'upskill',
    label: 'Upskill current employees',
    recommendation: {
      title: 'Short courses and employed learnerships',
      text: 'Close immediate gaps with focused short courses, and build depth with employed (18.1) learnerships toward full qualifications.',
      links: [
        { label: 'Short Courses', to: '/short-courses' },
        { label: 'Programmes & Learnerships', to: '/programmes' },
      ],
    },
  },
  {
    id: 'learnership',
    label: 'Run a learnership',
    recommendation: {
      title: 'End-to-end learnership implementation',
      text: 'Prestige manages employed and unemployed learnerships fully — recruitment support, delivery, workplace monitoring, learner administration and reporting.',
      links: [
        { label: 'Programmes & Learnerships', to: '/programmes' },
        { label: 'Talk to Us', to: '/contact' },
      ],
    },
  },
  {
    id: 'managers',
    label: 'Develop managers',
    recommendation: {
      title: 'Management programmes and leadership short courses',
      text: 'Develop first-line and middle managers through accredited management learning plus practical courses in supervision, performance and coaching.',
      links: [
        { label: 'Management Programmes', to: '/programmes' },
        { label: 'Leadership & Management Courses', to: '/short-courses#leadership-management' },
      ],
    },
  },
  {
    id: 'performance',
    label: 'Improve workplace performance',
    recommendation: {
      title: 'Diagnose first, then a targeted intervention',
      text: 'Start with a skills gap or training needs analysis, then design training around the real constraint — that is our corporate training process.',
      links: [
        { label: 'Corporate Training', to: '/corporate-training' },
        { label: 'Workforce Strategy Services', to: '/services#workforce-strategy' },
      ],
    },
  },
  {
    id: 'youth',
    label: 'Train unemployed youth',
    recommendation: {
      title: 'Unemployed learnerships and workplace readiness',
      text: 'Structured 18.2 learnerships and workplace readiness programmes that move young people toward employability — with real support along the way.',
      links: [
        { label: 'Social Impact Services', to: '/services#social-impact' },
        { label: 'Workplace Readiness Courses', to: '/short-courses#workplace-readiness' },
      ],
    },
  },
  {
    id: 'qualification',
    label: 'Find an accredited qualification',
    recommendation: {
      title: 'Accredited programme areas',
      text: 'Browse programme areas across business, production, agriculture and community — and we will confirm the right qualification and level for your need.',
      links: [{ label: 'View Programmes', to: '/programmes' }],
    },
  },
  {
    id: 'short-courses',
    label: 'Run short courses',
    recommendation: {
      title: 'Practical short courses for teams',
      text: 'Choose from leadership, professional skills, HR, sales, administration and readiness courses — or have one built around your team.',
      links: [
        { label: 'Browse Short Courses', to: '/short-courses' },
        { label: 'Build a Course for My Team', to: '/contact' },
      ],
    },
  },
  {
    id: 'agriculture',
    label: 'Develop agricultural skills',
    recommendation: {
      title: 'Agricultural programmes',
      text: 'Animal, poultry and plant production programmes plus farm-team and supervisory development, delivered close to the operation.',
      links: [
        { label: 'Agricultural Programmes', to: '/programmes' },
        { label: 'Agriculture Industry Page', to: '/industries#agriculture-agriprocessing' },
      ],
    },
  },
  {
    id: 'csi',
    label: 'Implement a CSI programme',
    recommendation: {
      title: 'CSI skills programmes',
      text: 'Turn social investment into structured, credible skills training for communities and unemployed learners — designed and administered properly.',
      links: [
        { label: 'Social Impact Services', to: '/services#social-impact' },
        { label: 'Talk to Us', to: '/contact' },
      ],
    },
  },
  {
    id: 'assess',
    label: 'Assess candidates',
    recommendation: {
      title: 'Assessment Centre services',
      text: 'Registration, scheduling, invigilation, assessment, moderation and results processing — managed with integrity end to end.',
      links: [{ label: 'Assessment Centre', to: '/assessment-centre' }],
    },
  },
  {
    id: 'unsure',
    label: 'I’m not sure yet',
    recommendation: {
      title: 'Start with a conversation',
      text: 'Tell us what your organisation is dealing with. We will help you frame the need before proposing any training at all.',
      links: [{ label: 'Contact Prestige', to: '/contact' }],
    },
  },
]

export default function TrainingFinder() {
  const [selected, setSelected] = useState(null)
  const active = goals.find((g) => g.id === selected)

  return (
    <section id="training-finder" className="py-16 lg:py-24">
      <div className="container-px">
        <div className="overflow-hidden rounded-xl2 border border-line bg-paper shadow-soft">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-prestige-green" />
                <span className="text-sm font-semibold tracking-wide text-prestige-blue">Training finder</span>
              </div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink">
                Find the right training solution.
              </h2>
              <p className="mt-3 leading-relaxed text-body">What are you trying to achieve?</p>

              <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Select your goal">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelected(g.id)}
                    aria-pressed={selected === g.id}
                    className={`rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                      selected === g.id
                        ? 'border-prestige-blue bg-prestige-blue text-white'
                        : 'border-line bg-cream text-ink hover:border-prestige-blue/50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-start border-t border-line bg-sand/50 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              {active ? (
                <div aria-live="polite">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted">Our recommendation</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{active.recommendation.title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{active.recommendation.text}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {active.recommendation.links.map((l, i) => (
                      <Link key={l.to + l.label} to={l.to} className={i === 0 ? 'btn btn-primary' : 'btn btn-outline'}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted">How this works</p>
                  <p className="mt-3 font-display text-2xl font-semibold text-ink">
                    Select a goal to see our recommendation.
                  </p>
                  <p className="mt-3 leading-relaxed text-body">
                    We will point you to the most relevant Prestige programmes and services — and if
                    nothing fits neatly, we design around your need.
                  </p>
                  <ol className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {[
                      'Choose the goal closest to your situation.',
                      'See the programmes and services we would recommend.',
                      'Talk to us — we confirm the detail and scope it properly.',
                    ].map((s, i) => (
                      <li key={s} className="flex items-start gap-3 text-[0.95rem] text-body">
                        <span className="font-display font-semibold text-prestige-green">
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
