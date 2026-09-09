import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'

const pillars = [
  {
    title: 'Accredited programmes & learnerships',
    text: 'Registered qualifications and structured learnerships that build real, recognised competence — for employed teams and unemployed learners.',
    to: '/programmes',
  },
  {
    title: 'Short courses',
    text: 'Focused, practical courses in leadership, professional skills, HR, sales, administration and workplace readiness.',
    to: '/short-courses',
  },
  {
    title: 'Corporate & workplace training',
    text: 'Training designed around your business — delivered on-site, embedded in real work and managed end to end.',
    to: '/corporate-training',
  },
  {
    title: 'Assessment & learner administration',
    text: 'A professional assessment centre plus the administration, moderation and reporting that give results integrity.',
    to: '/assessment-centre',
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What we do"
              title="One partner for the full journey of workforce development."
              lead="Prestige Tutelage works with organisations from the first skills conversation to the final assessment result — combining accredited learning, practical short courses and disciplined administration."
            />
            <Link to="/services" className="btn btn-outline mt-8">View All Services</Link>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {pillars.map((p) => (
              <Link key={p.title} to={p.to} className="group flex items-start justify-between gap-6 py-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-prestige-blue">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-body">{p.text}</p>
                </div>
                <span
                  className="mt-1.5 text-prestige-blue opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
