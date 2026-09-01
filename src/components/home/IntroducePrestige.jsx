import { Link } from 'react-router-dom'
import { Grip } from 'lucide-react'
import Reveal from '../Reveal.jsx'
import { useCountUp } from '../../lib/motion.js'
import { assetUrl } from '../../lib/asset.js'

/**
 * The handover from the cinematic hero into the editorial site.
 *
 * Proof points are limited to what Prestige has verified — B-BBEE level,
 * ownership, accredited delivery and national capability. No invented figures,
 * no learner counts, no percentages we cannot stand behind.
 *
 * The figures are Prestige blue. #066DCE rather than the brighter #087BE8:
 * both are legal at this size — these are 30-36px, so the 3.0:1 large-text
 * floor applies and #087BE8 clears it at 3.93:1 on Paper — but #066DCE is the
 * blue every other piece of text on the site uses, and at 4.82:1 it stays
 * legal if a card is ever set smaller.
 */

const proof = [
  { value: 1, prefix: 'Level ', label: 'B-BBEE contributor', ring: 'blue' },
  { value: 100, suffix: '%', label: 'Black owned', ring: 'green' },
  { label: 'Accredited', sub: 'learning programmes', ring: 'blue' },
  { label: 'National', sub: 'delivery capability', ring: 'green' },
]

// Full concentric-circle dot rings (as opposed to the section's corner-fan
// arcs) — a quiet bullseye tucked into a corner, mostly cropped by the
// panel or card's own rounded edge, positioned wherever that surface has
// the most open space so it never sits under the text.
const ringStyle = (color, position, size) => ({
  backgroundImage: `url(${assetUrl(`images/dots-rings-${color}.svg`)})`,
  backgroundPosition: position,
  backgroundRepeat: 'no-repeat',
  backgroundSize: size,
})

function BigValue({ item }) {
  const [ref, n] = useCountUp(item.value ?? 0)
  if (item.value == null) {
    return (
      <span className="block font-display text-3xl font-bold text-prestige-blue-hover sm:text-4xl">
        {item.label}
      </span>
    )
  }
  return (
    <span ref={ref} className="block font-display text-3xl font-bold text-prestige-blue-hover sm:text-4xl">
      {item.prefix}
      <span className="tabular-nums">{n}</span>
      {item.suffix}
    </span>
  )
}

export default function IntroducePrestige() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24 lg:py-32">
      {/* Concentric dot-arc swirls, matching the approved reference — blue
          fanning in from the top-right corner, green from the bottom-left.
          Two independent square images, each anchored to its own corner,
          rather than one image stretched to the section: a single stretched
          image distorts (and its "reach" as a fraction of the canvas stops
          short) whenever the section's own proportions differ from the
          image's — full-bleed-wide on desktop, narrow and very tall once
          the cards stack on mobile. A fixed square keeps each swirl's own
          proportions correct at every width. Sized large enough that their
          outer arcs meet around the panel rather than reading as two
          disconnected corner accents — a single continuous sweep, not two
          separate stamps — while the clamp() floor still scales both down
          gracefully on small screens. Decoration only; aria-hidden. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${assetUrl('images/bg-dots-blue.svg')}), url(${assetUrl('images/bg-dots-green.svg')})`,
          backgroundPosition: 'top right, bottom left',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: 'clamp(320px, 62vw, 940px) clamp(320px, 62vw, 940px), clamp(300px, 58vw, 880px) clamp(300px, 58vw, 880px)',
        }}
        aria-hidden="true"
      />
      <div className="container-px relative">
        <div
          className="relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-premium sm:p-10 lg:p-14"
          style={ringStyle('blue', 'bottom left', '340px 340px')}
        >
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_auto_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <h2 className="font-display text-editorial font-semibold text-prestige-green-deep">
                More than training.
              </h2>
            </Reveal>

            <span className="hidden w-px self-stretch bg-line lg:block" aria-hidden="true" />

            <Reveal delay={80}>
              <p className="max-w-xl text-lg leading-relaxed text-body">
                Prestige Tutelage is a workforce-development partner helping organisations build
                capable people, stronger talent pipelines and measurable skills-development outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/about" className="btn btn-outline">About Prestige</Link>
                <Link to="/programmes" className="btn btn-primary">Explore Programmes</Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 90}>
              <div
                className="relative h-full overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-premium"
                style={ringStyle(item.ring, 'bottom right', '200px 200px')}
              >
                <div className="relative flex items-start justify-between">
                  <span className="block h-0.5 w-8 rounded-full bg-prestige-green" aria-hidden="true" />
                  <Grip size={16} strokeWidth={2} className="text-line" aria-hidden="true" />
                </div>
                <div className="relative mt-5">
                  <BigValue item={item} />
                  <span className="mt-2 block text-body">{item.value == null ? item.sub : item.label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
