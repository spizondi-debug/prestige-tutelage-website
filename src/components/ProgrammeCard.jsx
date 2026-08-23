import { Link } from 'react-router-dom'

/**
 * ProgrammeCard — one qualification.
 *
 * Every fact shown comes from verified data. Fields that were not supplied are
 * omitted entirely: there is deliberately no fallback rendering, so an absent
 * credit value produces no "Credits" row rather than a dash or "N/A".
 */
export default function ProgrammeCard({ q }) {
  const facts = [
    { label: 'NQF Level', value: q.nqf },
    { label: 'SAQA ID', value: q.saqaId },
    // Only present when Prestige supplied a verified credit value.
    ...(q.credits ? [{ label: 'Credits', value: q.credits }] : []),
  ]

  return (
    <article className="flex flex-col border border-line bg-paper p-6 transition-colors hover:border-prestige-blue/40">
      <p className="text-xs font-semibold uppercase tracking-wider text-prestige-green">{q.type}</p>

      <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">{q.name}</h3>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-3">
        {facts.map((f) => (
          <div key={f.label} className="flex items-baseline gap-1.5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{f.label}</dt>
            <dd className="font-sans text-sm font-semibold tabular-nums text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Suitable for</p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-body">{q.forWho}</p>
      </div>

      {q.note && (
        <p className="mt-4 border-l-2 border-prestige-blue/25 pl-4 text-sm leading-relaxed text-muted">
          {q.note}
        </p>
      )}

      <Link
        to={`/contact?programme=${encodeURIComponent(`${q.name} (SAQA ID ${q.saqaId})`)}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep"
      >
        Enquire About This Programme
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
