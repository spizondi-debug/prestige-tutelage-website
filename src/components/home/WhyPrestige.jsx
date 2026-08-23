import { SectionHeading } from '../Section.jsx'

export const whyPrestige = [
  { title: 'Practical', text: 'Training that translates into workplace capability.' },
  { title: 'Relevant', text: 'Solutions based on actual organisational needs.' },
  { title: 'Personal', text: 'Human learner and client support.' },
  { title: 'Flexible', text: 'Different delivery formats and programme structures.' },
  { title: 'Measurable', text: 'Clear learner progress, administration and outcomes.' },
  { title: 'Partnership-led', text: 'We work alongside the client rather than operating as a transactional course provider.' },
]

export default function WhyPrestige() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Prestige"
            title="The way we work is the difference."
            lead="Organisations keep working with Prestige because of how the work gets done — not just what is on the course list."
          />
          <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
            {whyPrestige.map((w) => (
              <div key={w.title} className="border-b border-line py-5">
                <dt className="font-display text-lg font-semibold text-ink">{w.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-body">{w.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
