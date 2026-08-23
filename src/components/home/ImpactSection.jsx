import SmartImage from '../SmartImage.jsx'

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
    <section className="border-y border-line bg-paper py-16 lg:py-24">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
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

          <div className="grid content-center gap-5">
            <div className="overflow-hidden rounded-lg border border-line">
              <SmartImage
                src="impact-graduation.jpg"
                alt="Learners celebrating at a Prestige graduation ceremony"
                label="graduation ceremony"
                className="aspect-[16/9] w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="overflow-hidden rounded-lg border border-line">
                <SmartImage
                  src="impact-workplace.jpg"
                  alt="Employee applying new skills on the job with a mentor observing"
                  label="workplace application of learning"
                  className="aspect-[4/3] w-full"
                />
              </div>
              <div className="overflow-hidden rounded-lg border border-line">
                <SmartImage
                  src="impact-youth.jpg"
                  alt="Young people in a workplace readiness session"
                  label="youth development session"
                  className="aspect-[4/3] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
