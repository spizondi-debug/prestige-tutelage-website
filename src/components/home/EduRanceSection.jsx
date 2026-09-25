const EDURANCE = 'https://spizondi-debug.github.io/Edurance/'

const tools = [
  { label: 'Free APS calculator', href: `${EDURANCE}aps-calculator.html` },
  { label: 'University closing dates 2027', href: `${EDURANCE}universities-2027.html` },
  { label: 'NSFAS 2027 guide', href: `${EDURANCE}nsfas-2027.html` },
  { label: 'Bursaries for 2027', href: `${EDURANCE}bursaries-2027.html` },
]

/**
 * EduRanceSection — introduces EduRance, the free learner platform built by Prestige Tutelage.
 */
export default function EduRanceSection() {
  return (
    <section className="bg-paper" aria-labelledby="edurance-heading">
      <div className="container-px">
        <div className="grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-wider text-prestige-green">Our learner platform</p>
            <h2 id="edurance-heading" className="mt-2 font-display text-3xl font-semibold leading-tight text-midnight sm:text-4xl">
              EduRance: from school marks to a future
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-midnight/75">
              Built by Prestige Tutelage, EduRance helps Grade 8–12 learners calculate their APS, find courses, bursaries and
              learnerships they qualify for, and study with past papers, mock exams and AI tutoring. It is free for learners.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={EDURANCE} className="btn btn-green" target="_blank" rel="noopener">Visit EduRance</a>
              <a href={`${EDURANCE}for-schools.html`} className="btn border border-midnight/20 text-midnight transition-colors hover:border-midnight/50" target="_blank" rel="noopener">
                Tools for schools
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {tools.map((t) => (
              <li key={t.label}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener"
                  className="flex h-full items-center justify-between rounded-lg border border-midnight/10 bg-white px-5 py-4 font-semibold text-midnight shadow-soft transition-colors hover:border-prestige-green"
                >
                  {t.label}
                  <span aria-hidden="true" className="text-prestige-green">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
