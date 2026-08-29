import Photo from './Photo.jsx'

/**
 * The shared page hero. One component, used by every interior page.
 *
 * With an `image` it renders the split layout: copy on the left, a photograph
 * panel on the right taking roughly 46% of the row. Below `lg` the grid
 * collapses to one column and the photograph sits under the text, which is
 * the order the markup is already in — no reordering needed.
 *
 * Props
 *   eyebrow        small wide-tracked label above the title
 *   title          the h1
 *   lead           supporting paragraph
 *   image          filename in public/images (omit for a text-only hero)
 *   imageAlt       required whenever `image` is set
 *   imagePosition  CSS object-position, to keep faces out of the crop
 *   imageAspect    Tailwind aspect ratio for the panel
 *   badge          small factual label pinned to the photograph
 *   children       CTAs or in-page navigation, rendered under the lead
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  imagePosition = 'center',
  imageAspect = 'aspect-[4/3]',
  badge,
  children,
}) {
  const hasImage = Boolean(image)

  return (
    <section className="tex tex-grid border-b border-line bg-cloud">
      <div className="container-px">
        <div
          className={
            hasImage
              ? 'grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-20'
              : 'max-w-3xl py-16 lg:py-24'
          }
        >
          <div className={hasImage ? 'max-w-2xl' : ''}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-5 font-display text-editorial font-semibold text-ink">{title}</h1>
            {lead && <p className="mt-6 text-lg leading-relaxed text-body">{lead}</p>}
            {children}
          </div>

          {hasImage && (
            <div className="relative">
              {/* A hairline of brand colour around the panel, drawn as a 1px
                  gradient frame rather than a border so it can run blue into
                  green without a second element. */}
              <div className="rounded-2xl bg-[linear-gradient(140deg,rgba(0,111,216,0.45),rgba(0,111,216,0.06)_45%,rgba(45,162,47,0.42))] p-px shadow-premium">
                <Photo
                  src={image}
                  alt={imageAlt}
                  eager
                  position={imagePosition}
                  className={`${imageAspect} w-full rounded-[15px]`}
                />
              </div>

              {badge && (
                <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-semibold tracking-[0.02em] text-ink shadow-soft backdrop-blur">
                  {badge}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
