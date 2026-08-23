import { Link } from 'react-router-dom'
import HeroMedia from '../HeroMedia.jsx'
import Reveal from '../Reveal.jsx'
import { realPrestigeMedia } from '../../data/media.js'

/**
 * The human anchor. After the Path, the explorer and the ecosystem, the site
 * needs to come back to people — one full-width genuine Prestige photograph,
 * a short label and a single statement. No cards, no grid, no decoration.
 *
 * Takes video the moment footage exists (see src/data/media.js); until then it
 * renders the facilitator photograph.
 */
export default function RealPrestige() {
  return (
    <section className="relative bg-night text-white">
      <div className="relative h-[70vh] min-h-[26rem] w-full overflow-hidden lg:h-[82vh]">
        <HeroMedia media={realPrestigeMedia} className="h-full w-full" />
        {/* Grounding gradient so the type sits on a readable field */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,10,19,0.94)_0%,rgba(6,10,19,0.55)_45%,rgba(6,10,19,0.15)_100%)]"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-px pb-12 lg:pb-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prestige-green-lit">
                Real people. Real development.
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-editorial font-semibold text-white">
                Training that leaves the classroom and enters the workplace.
              </h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/corporate-training" className="btn btn-green">
                  See How We Deliver
                </Link>
                <Link
                  to="/about"
                  className="btn border border-white/25 text-white transition-colors hover:border-white/60"
                >
                  About Prestige
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
