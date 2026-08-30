import { useState } from 'react'
import HeroSlider from './HeroSlider.jsx'

/**
 * The shared page hero: a full-bleed photographic slider with the copy laid
 * over it, left-aligned and vertically centred.
 *
 * Height is `calc(100svh - var(--nav-h))` — the navigation measures itself and
 * publishes its height, so the hero fills exactly the screen below it at every
 * breakpoint without hard-coded numbers. `svh` rather than `vh` because mobile
 * browsers count `vh` against the viewport with the URL bar retracted, which
 * pushes a "full screen" hero taller than the screen actually is.
 *
 * `data-dark-hero` marks the hero as a blue, photographic surface, so
 * the logo and links stay legible over the photograph.
 *
 * Everything the pages pass as `children` — CTAs, in-page navigation — was
 * written for a light background. Rather than edit fourteen pages, `.hero-dark`
 * restyles those descendants in one place; see src/index.css.
 *
 * Props
 *   eyebrow   small wide-tracked label above the title
 *   title     the h1
 *   lead      supporting paragraph
 *   images    slides ({ src, alt, position }); 3–5 reads best
 *   children  CTAs or in-page navigation, rendered under the lead
 */
export default function PageHeader({ eyebrow, title, lead, images, children }) {
  const [hovered, setHovered] = useState(false)
  const slides = images ?? []

  if (!slides.length) {
    return (
      <section className="tex tex-grid border-b border-line bg-cloud">
        <div className="container-px">
          <div className="max-w-3xl py-16 lg:py-24">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-5 font-display text-editorial font-semibold text-ink">{title}</h1>
            {lead && <p className="mt-6 text-lg leading-relaxed text-body">{lead}</p>}
            {children}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      data-dark-hero
      className="hero-dark relative isolate flex min-h-[42rem] items-center overflow-hidden bg-shadow text-white sm:min-h-[44rem] lg:min-h-[calc(100svh-var(--nav-h,7.5rem))]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <HeroSlider images={slides} hovered={hovered} />

      {/* The copy sits above the slider, but must not swallow clicks meant
          for the arrows at the screen edges — hence pointer-events-none here
          and auto on the copy block itself. */}
      <div className="container-px pointer-events-none relative z-10 w-full py-20 lg:py-24">
        <div className="pointer-events-auto max-w-2xl">
          {eyebrow && <p className="eyebrow-light">{eyebrow}</p>}
          <h1 className="mt-5 font-display text-hero font-semibold text-white">{title}</h1>
          {lead && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
