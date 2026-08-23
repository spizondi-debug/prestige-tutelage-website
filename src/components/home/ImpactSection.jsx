import Photo from '../Photo.jsx'

// Impact framing without fabricated case studies or statistics: the outcomes
// Prestige designs for. Verified client stories can replace/extend this later.
const outcomes = [
  {
    who: 'For organisations',
    text: 'Supervisors who lead, teams that hit standard, and skills development spend that shows up in operations — not just on a compliance report.',
  },
  {
    who: 'For learners',
    text: 'Recognised qualifications, real workplace competence and the confidence that comes from being backed properly through a programme.',
  },
  {
    who: 'For communities',
    text: 'Unemployed youth moving into structured learning and workplace experience — a first credible step into the economy.',
  },
]

export default function ImpactSection() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="container-px">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-blue">Impact</span>
            </div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              We measure success where it matters: in the workplace.
            </h2>
            <div className="mt-8 space-y-6">
              {outcomes.map((o) => (
                <div key={o.who} className="border-l-2 border-prestige-green/60 pl-5">
                  <h3 className="font-sans font-semibold text-ink">{o.who}</h3>
                  <p className="mt-1.5 leading-relaxed text-body">{o.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Client references and programme results are shared on request during proposals.
            </p>
          </div>

          <figure className="flex flex-col">
            <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
              <Photo
                src="graduates-together.jpg"
                alt="Graduates sharing a moment together after their ceremony"
                className="aspect-[3/2] w-full"
              />
            </div>
            <figcaption className="mt-4 border-l-2 border-prestige-green/60 pl-4 text-sm leading-relaxed text-muted">
              Every qualification represents a person whose working life changed — and an employer
              with capability it did not have before.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
