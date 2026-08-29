import { Link } from 'react-router-dom'

/**
 * ProgrammeCard — one qualification, as a wide landscape card.
 *
 * A deep-blue panel on the left carries a clipboard mark and a curved teal
 * accent; the content sits on white to its right. Below `sm` the panel becomes
 * a short band across the top so the card still reads on a narrow screen.
 *
 * Every fact shown comes from verified data. Fields that were not supplied are
 * omitted entirely: there is deliberately no fallback rendering, so an absent
 * credit value produces no "Credits" column rather than a dash or "N/A" — the
 * fact strip lays out by count, so two facts fill the row as evenly as three.
 */
function ClipboardMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-14 w-14" aria-hidden="true">
      <path
        d="M17 8h14M19 8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3M13 8h22a3 3 0 0 1 3 3v29a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3Z"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      <circle cx="18" cy="27" r="1.6" fill="currentColor" />
      <circle cx="18" cy="34" r="1.6" fill="currentColor" />
      <path d="M24 20h8M24 27h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="31" cy="34" r="6.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="m28.2 34 1.9 2 3.7-3.9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProgrammeCard({ q }) {
  const facts = [
    { label: 'NQF Level', value: q.nqf },
    { label: 'SAQA ID', value: q.saqaId },
    // Only present when Prestige supplied a verified credit value.
    ...(q.credits ? [{ label: 'Credits', value: q.credits }] : []),
  ]

  return (
    <article className="grid overflow-hidden rounded-2xl border border-line bg-paper shadow-premium transition-shadow hover:shadow-lifted sm:grid-cols-[9rem_1fr] lg:grid-cols-[13rem_1fr]">
      {/* Left panel: the mark, with a curved teal accent sweeping behind it. */}
      <div className="relative flex items-center justify-center overflow-hidden bg-navy py-7 text-white sm:py-0">
        <svg
          viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M-30 330 C 60 250, 140 170, 150 -30"
            stroke="#2DA22F" strokeOpacity="0.45" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="relative"><ClipboardMark /></span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-prestige-blue">{q.type}</p>

        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">{q.name}</h3>

        <dl className="mt-5 grid divide-y divide-prestige-blue/15 rounded-xl bg-prestige-blue/[0.07] px-5 py-4 sm:grid-flow-col sm:auto-cols-fr sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="py-2 text-center sm:px-3 sm:py-0">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy-lift">
                {f.label}
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-navy-lift">Suitable for</p>
        <p className="mt-2 leading-relaxed text-body">{q.forWho}</p>

        {q.note && (
          <p className="mt-4 border-l-2 border-prestige-blue/25 pl-4 text-sm leading-relaxed text-muted">
            {q.note}
          </p>
        )}

        <Link
          to={`/contact?programme=${encodeURIComponent(`${q.name} (SAQA ID ${q.saqaId})`)}`}
          className="group mt-6 flex w-full items-center justify-between gap-4 rounded-xl bg-navy px-6 py-4 font-semibold text-white transition-colors hover:bg-midnight"
        >
          Enquire About This Programme
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
               className="h-5 w-5 shrink-0 text-prestige-growth transition-transform duration-300 ease-prestige group-hover:translate-x-1">
            <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
