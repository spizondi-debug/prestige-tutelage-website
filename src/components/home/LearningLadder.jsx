import { Link } from 'react-router-dom'
import QualificationLattice from '../QualificationLattice.jsx'
import Reveal from '../Reveal.jsx'
import Disclaimer from '../Disclaimer.jsx'
import { qualifications, nqfLevels, AVAILABILITY_DISCLAIMER } from '../../data/programmes.js'
import { Accent } from '../Section.jsx'

/**
 * The NQF ladder as the homepage's educational centrepiece.
 *
 * Carries the Growth Pathways treatment — digital gradient, grain, edge light
 * — because it is the same idea told a different way: where a person is now,
 * and the route from there to where the organisation needs them.
 *
 * The object beside the copy is built from the real catalogue, so the shape
 * you see is the shape Prestige actually offers.
 */
export default function LearningLadder() {
  const low = Math.min(...nqfLevels)
  const high = Math.max(...nqfLevels)

  return (
    <section className="on-dark on-photo tex tex-grain tex-edge relative overflow-hidden bg-shadow py-20 text-white lg:py-28">
      {/* Holds the type on a readable field where the gradient runs brightest. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.72)_0%,rgba(7,26,43,0.50)_48%,rgba(7,26,43,0.24)_100%)]"
        aria-hidden="true"
      />

      <div className="container-px relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow-light">The learning ladder</p>
            <h2 className="mt-5 font-display text-editorial font-semibold text-white">
              Every qualification is <Accent>a rung</Accent>.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              South African qualifications are structured by NQF level — a national ladder from
              entry-level competence up to professional practice. Prestige delivers{' '}
              {qualifications.length} qualifications across NQF {low} to {high}, so a person can
              start where they are and keep climbing.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/90">
              Explore the structure beside this — each point is a real qualification, on the level
              it actually sits at.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/programmes#catalogue" className="btn btn-green">
                Browse the Qualifications
              </Link>
              <Link to="/programmes#learnerships" className="btn btn-ghost-light">
                How Learnerships Work
              </Link>
            </div>

            <Disclaimer className="mt-10 max-w-xl border-l-2 border-white/25 text-white/55">
              {AVAILABILITY_DISCLAIMER}
            </Disclaimer>
          </Reveal>

          <div className="relative">
            <QualificationLattice className="h-[26rem] w-full sm:h-[32rem] lg:h-[36rem]" />
            <p className="mt-2 text-center text-xs text-white/70 lg:mt-0">
              <span className="lg:hidden">Tap</span>
              <span className="hidden lg:inline">Hover</span> a point to see the qualification
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
