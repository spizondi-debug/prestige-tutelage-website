import { Link } from 'react-router-dom'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'
import MediaRail, { RailTile } from '../MediaRail.jsx'
import { industries } from '../../data/industries.js'

/**
 * Industries, as a dark full-bleed band.
 *
 * No sector photography exists — no farm, warehouse, retail floor or plant —
 * so this section stays deliberately typographic on the house dark surface
 * rather than borrowing stock that would misrepresent where Prestige works.
 * The Path runs quietly behind it. When real sector photography arrives, each
 * tile takes a photograph in place of its number.
 */
export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-white lg:py-28">
      <PrestigePath
        stage={2.1}
        intensity={0.42}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,10,19,0.82),rgba(6,10,19,0.55)_45%,rgba(6,10,19,0.9))]"
        aria-hidden="true"
      />

      <div className="container-px relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow-light">Industries</p>
            <h2 className="mt-5 max-w-2xl font-display text-editorial font-semibold text-white">
              Grounded in the sectors that carry the economy.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              From the production line to the farm gate to the boardroom, Prestige designs
              training for the realities of each sector.
            </p>
          </Reveal>
          <Link to="/industries" className="btn btn-ghost-light shrink-0">All Industries</Link>
        </div>

        <MediaRail label="Industries Prestige Tutelage serves" light className="mt-14">
          {industries.map((ind, i) => (
            <RailTile key={ind.slug}>
              <Link
                to={`/industries#${ind.slug}`}
                className="group flex h-full flex-col border-t border-white/20 pt-5 transition-colors hover:border-prestige-green-lit"
              >
                <span className="font-display text-sm font-semibold text-prestige-green-lit">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-white">
                  {ind.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-white/70">
                  {ind.offerings[0]}
                </p>
                <span className="chev mt-6 text-white">
                  <span className="chev-label">Sector detail</span>
                  <span aria-hidden="true" className="transition-transform duration-500 ease-prestige group-hover:translate-x-1">›</span>
                </span>
              </Link>
            </RailTile>
          ))}
        </MediaRail>
      </div>
    </section>
  )
}
