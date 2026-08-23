import { Link } from 'react-router-dom'
import { SectionHeading } from '../Section.jsx'
import SmartImage from '../SmartImage.jsx'

const capabilities = [
  'Assessment administration & scheduling',
  'Registered assessors & moderation',
  'Invigilation & evidence management',
  'Results processing, appeals & records',
]

export default function AssessmentSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Assessment Centre"
              title="Assessment built around quality, integrity and competence."
              lead="A professionally managed environment for candidate assessment — from registration and scheduling through moderation, results and records."
            />
            <ul className="mt-7 space-y-3">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 text-body">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <Link to="/assessment-centre" className="btn btn-primary mt-9">Enquire About Assessment Services</Link>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-xl2 bg-sand lg:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
              <SmartImage
                src="assessment-centre.jpg"
                alt="Candidates completing a written assessment under invigilation"
                label="candidates during an invigilated assessment"
                className="aspect-[5/4] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
