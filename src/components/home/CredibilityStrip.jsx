// Trust strip under the hero — factual positioning only, no invented metrics.
const points = [
  {
    title: 'Accredited training',
    text: 'Registered programmes with formal assessment, moderation and quality assurance behind every result.',
  },
  {
    title: 'Level 1 B-BBEE',
    text: 'A Level 1 B-BBEE contributor, supporting clients’ own transformation and skills development objectives.',
  },
  {
    title: 'Proudly South African',
    text: 'Built for South African workplaces — from the factory floor and the farm to the corporate office.',
  },
  {
    title: 'End-to-end delivery',
    text: 'One partner across analysis, delivery, learner administration, assessment and reporting.',
  },
]

export default function CredibilityStrip() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="container-px">
        <div className="grid gap-x-10 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {points.map((p) => (
            <div key={p.title} className="border-l-2 border-prestige-green/60 pl-5">
              <h2 className="font-sans text-[0.95rem] font-semibold text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
