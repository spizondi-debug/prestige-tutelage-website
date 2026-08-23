import { useRef } from 'react'
import { Link } from 'react-router-dom'
import PrestigePath from '../PrestigePath.jsx'
import { useScrollProgress, usePrefersReducedMotion } from '../../lib/motion.js'

/**
 * The opening experience: a full-screen cinematic hero whose Prestige Path
 * transforms through four stages as the visitor scrolls, then hands over to
 * the editorial site.
 *
 * The stage lines are real headings in the DOM at all times — the animation
 * only changes their opacity — so the story is readable to search engines,
 * screen readers and anyone with JavaScript or motion disabled. Under reduced
 * motion the whole thing collapses into a single readable panel with the four
 * statements listed, no sticky scroll and no animation.
 */

const stages = [
  { line: 'Potential exists everywhere.' },
  { line: 'We turn potential into capability.' },
  { line: 'And capability into growth.' },
  { line: 'This is Prestige Tutelage.' },
]

export default function CinematicHero() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const progress = useScrollProgress(ref, { enabled: !reduced })

  // 0 → 3 across the scroll, so the Path evolves continuously.
  const stage = Math.min(3, progress * 3.15)
  // The headline holds the screen, then yields to the stage statements.
  const introOut = Math.min(1, Math.max(0, (progress - 0.06) / 0.14))

  if (reduced) {
    return (
      <section className="relative overflow-hidden bg-night text-white">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <PrestigePath stage={3} className="h-full w-full" />
        </div>
        <div className="container-px relative">
          <div className="max-w-3xl py-24">
            <Intro />
            <ol className="mt-14 space-y-3 border-t border-night-line pt-8">
              {stages.map((s) => (
                <li key={s.line} className="font-display text-2xl font-semibold text-white/90">
                  {s.line}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} data-dark-hero className="relative bg-night text-white" style={{ height: '420vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* The Prestige Path */}
        <div className="absolute inset-0" aria-hidden="true">
          <PrestigePath stage={stage} className="h-full w-full" />
          {/* Grounding vignette so type always sits on a readable field */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,rgba(6,10,19,0.82)_100%)]" />
        </div>

        {/* Opening headline */}
        <div
          className="container-px absolute inset-0 flex items-center"
          style={{ opacity: 1 - introOut, transform: `translateY(${introOut * -28}px)` }}
        >
          <Intro />
        </div>

        {/* Stage statements */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="container-px w-full">
            <div className="relative h-[9rem] max-w-4xl">
              {stages.map((s, i) => {
                // Each statement owns a quarter of the scroll and crossfades.
                const centre = (i + 0.62) / 4
                const d = Math.abs(progress - centre)
                const o = Math.max(0, 1 - d / 0.115) * introOut
                return (
                  <h2
                    key={s.line}
                    className="absolute inset-x-0 top-0 font-display text-statement font-semibold text-white"
                    style={{ opacity: o, transform: `translateY(${(1 - o) * 16}px)` }}
                  >
                    {s.line}
                  </h2>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div
          className="absolute inset-x-0 bottom-8 flex justify-center"
          style={{ opacity: 1 - Math.min(1, progress * 6) }}
        >
          <span className="text-sm font-medium tracking-wide text-white/60">Discover Prestige ↓</span>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-10 bg-prestige-green-lit" />
        <span className="text-sm font-semibold tracking-wide text-white/75">
          Accredited training &amp; workforce development
        </span>
      </div>

      <h1 className="font-display text-statement font-semibold text-white">
        Building the workforce behind tomorrow.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
        Accredited learning, workforce development and business solutions that turn potential into
        capability.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link to="/programmes" className="btn btn-green">Explore Our Programmes</Link>
        <Link
          to="/contact"
          className="btn border border-white/25 text-white transition-colors hover:border-white/60"
        >
          Partner With Prestige
        </Link>
      </div>
    </div>
  )
}
