import HeroSlider from './HeroSlider.jsx'

/**
 * The shared page hero: copy on the left, a full-height photographic slider
 * filling the right half and running to the edge of the viewport.
 *
 * The bleed is done with `lg:mr-[calc(100%-50vw)]` on the image column. That
 * margin is exactly the distance from the container's right edge to the
 * viewport's, so the column ends flush with the screen while the copy stays
 * on the same grid as every other section on the page — no full-width wrapper
 * and no duplicated gutter maths.
 *
 * Below lg the grid collapses and the slider sits under the copy at a shorter
 * height, which is the order the markup is already in.
 *
 * Props
 *   eyebrow   small wide-tracked label above the title
 *   title     the h1
 *   lead      supporting paragraph
 *   images    slides ({ src, alt, position }); 3–5 reads best
 *   badge     small factual label pinned to the image
 *   children  CTAs or in-page navigation, rendered under the lead
 */
export default function PageHeader({ eyebrow, title, lead, images, badge, children }) {
  const slides = images ?? []
  const hasImage = slides.length > 0

  if (!hasImage) {
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
    <section className="tex tex-grid border-b border-line bg-cloud">
      <div className="container-px">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="flex items-center py-14 lg:py-20 lg:pr-14 xl:pr-20">
            <div className="w-full">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h1 className="mt-5 font-display text-editorial font-semibold text-ink">{title}</h1>
              {lead && <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{lead}</p>}
              {children}
            </div>
          </div>

          {/* The image half, bled to the right edge of the viewport. */}
          <div className="relative -mx-5 h-[22rem] sm:-mx-8 sm:h-[24rem] lg:mx-0 lg:ml-0 lg:h-auto lg:min-h-[42rem] lg:mr-[calc(100%-50vw)]">
            <HeroSlider images={slides} />
            {badge && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-paper/95 px-4 py-2 text-xs font-semibold tracking-[0.02em] text-ink shadow-soft backdrop-blur">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
