import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import MediaRail, { RailTile } from '../MediaRail.jsx'
import { industries } from '../../data/industries.js'
import { Accent } from '../Section.jsx'

/**
 * Industries, on White — the brightest surface in the homepage rhythm, sitting
 * between two darker bands.
 *
 * No sector photography exists — no farm, warehouse, retail floor or plant —
 * so this section stays deliberately typographic rather than borrowing stock
 * that would misrepresent where Prestige works. When real sector photography
 * arrives, each tile takes a photograph in place of its number.
 */
export default function IndustriesSection() {
  return (
    <section className="tex tex-grid border-t border-line bg-paper py-20 lg:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Industries</p>
            <h2 className="mt-5 max-w-2xl font-display text-editorial font-semibold text-ink">
              Grounded in the sectors that <Accent>carry the economy</Accent>.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
              From the production line to the farm gate to the boardroom, Prestige designs
              training for the realities of each sector.
            </p>
          </Reveal>
          <Link to="/industries" className="btn btn-outline shrink-0">All Industries</Link>
        </div>

        <MediaRail label="Industries Prestige Tutelage serves" className="mt-14">
          {industries.map((ind, i) => (
            <RailTile key={ind.slug}>
              <Link
                to={`/industries#${ind.slug}`}
                className="group flex h-full flex-col border-t border-line pt-5 transition-colors hover:border-prestige-green"
              >
                <span className="font-display text-sm font-semibold text-prestige-blue">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink">
                  {ind.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-body">
                  {ind.offerings[0]}
                </p>
                <span className="chev mt-6 text-prestige-blue">
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
