import { Link } from 'react-router-dom'
import { iconFor } from '../data/programmeIcons.js'

/**
 * ProgrammeCard — one qualification, as a portrait card in a 3-up grid.
 *
 * A bright Prestige-blue header carries a white line icon chosen for the
 * programme itself and the programme type; everything below sits on white.
 * The card is a flex column with the enquiry button pushed down by `mt-auto`,
 * so cards in a row finish level however long the description runs.
 *
 * Every fact shown comes from verified data. Fields that were not supplied are
 * omitted entirely: there is deliberately no fallback rendering, so an absent
 * credit value produces no "Credits" column rather than a dash or "N/A" — the
 * fact strip lays out by count, so two facts fill the row as evenly as three.
 *
 * Colour note: the header and the button use `prestige-blue` (#006FD8), the
 * site's primary-button blue, rather than #087BE8. White on #087BE8 measures
 * 4.19:1, which fails AA for the uppercase type label and the button text;
 * #006FD8 measures 4.92:1 and is the blue the rest of the site already uses.
 *
 * The pale fact panel is blue at 6% rather than 7%: the NQF/SAQA labels are
 * the same blue, and at 7% they land on 4.47:1 against their own panel — just
 * under AA for text that small. 6% reads the same and measures 4.53:1.
 */
export default function ProgrammeCard({ q }) {
  const Icon = iconFor(q)

  const facts = [
    { label: 'NQF Level', value: q.nqf },
    { label: 'SAQA ID', value: q.saqaId },
    // Only present when Prestige supplied a verified credit value.
    ...(q.credits ? [{ label: 'Credits', value: q.credits }] : []),
  ]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-premium transition duration-300 ease-prestige hover:-translate-y-1 hover:shadow-lifted">
      {/* Blue header: white icon, white type label. */}
      <div className="flex items-center gap-4 bg-prestige-blue px-6 py-5 text-white">
        <Icon size={40} strokeWidth={1.6} aria-hidden="true" className="shrink-0" />
        <p className="text-xs font-semibold uppercase tracking-[0.16em]">{q.type}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-tight text-ink">{q.name}</h3>

        <dl className="mt-5 grid divide-y divide-prestige-blue/15 rounded-xl bg-prestige-blue/[0.06] px-4 py-3 sm:grid-flow-col sm:auto-cols-fr sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="py-2 text-center sm:px-2 sm:py-1">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-prestige-blue">
                {f.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold tabular-nums text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-prestige-blue">Suitable for</p>
        <p className="mt-2 leading-relaxed text-body">{q.forWho}</p>

        {q.note && (
          <p className="mt-4 border-l-2 border-prestige-blue/25 pl-4 text-sm leading-relaxed text-muted">
            {q.note}
          </p>
        )}

        <div className="mt-auto pt-6">
          <Link
            to={`/contact?programme=${encodeURIComponent(`${q.name} (SAQA ID ${q.saqaId})`)}`}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-prestige-blue px-5 py-4 font-semibold text-white transition-colors hover:bg-prestige-blue-bright"
          >
            Enquire About This Programme
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
                 className="h-5 w-5 shrink-0 transition-transform duration-300 ease-prestige group-hover:translate-x-1">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
