import { useCallback, useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * HeroSlider — the full-bleed photographic background of a page hero.
 *
 * Fills its container absolutely and sits behind the hero copy, so the
 * photograph runs the whole width of the screen with the heading over it.
 * Cross-fades: nothing moves horizontally, so there is no transform to fight
 * the section edges and no reflow as slides change.
 *
 * Autoplay stops whenever a pointer is over the hero or focus is inside it,
 * so a slide is never pulled away from someone reading or operating it. Under
 * reduced motion the timer never starts and the fade collapses to an instant
 * swap — every slide stays reachable by arrow, dot, key or swipe.
 *
 * Only the first slide loads eagerly. The rest are lazy: a full-screen hero
 * that fetches five photographs before first paint is worse than no hero.
 */
export default function HeroSlider({
  images,
  interval = 5600,
  label = 'Prestige Tutelage photographs',
  // Hover pause is owned by the hero section, not this component: the copy
  // sits over the photograph as a sibling, so a pointer on the heading never
  // enters this subtree and autoplay would keep running under the reader.
  hovered = false,
}) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [focusWithin, setFocusWithin] = useState(false)
  const touch = useRef(null)
  const paused = hovered || focusWithin

  const count = images.length
  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    if (reduced || paused || count < 2) return undefined
    const t = setTimeout(next, interval)
    return () => clearTimeout(t)
  }, [index, paused, reduced, count, interval, next])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  // A horizontal drag past the threshold moves one slide. Vertical drags are
  // left alone so the page still scrolls normally over a full-screen hero.
  const onTouchStart = (e) => {
    const t = e.changedTouches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)()
    touch.current = null
  }

  if (!count) return null

  const arrow =
    'pointer-events-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border ' +
    'border-white/35 bg-midnight/40 text-white backdrop-blur transition-colors duration-200 ' +
    'hover:border-white/80 hover:bg-midnight/70 focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-white'

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={() => setFocusWithin(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 ${reduced ? '' : 'transition-opacity duration-[1200ms] ease-prestige'}`}
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Photo
            src={img.src}
            alt={img.alt}
            position={img.position ?? 'center'}
            eager={i === 0}
            className="h-full w-full"
          />
        </div>
      ))}

      {/* Readability wash. Heavier on the left where the copy sits, thinning
          out to the right so the photograph is still clearly a photograph. A
          second vertical pass seats the navigation and the controls. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.90)_0%,rgba(7,26,43,0.78)_32%,rgba(7,26,43,0.50)_62%,rgba(7,26,43,0.34)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,26,43,0.45)_0%,transparent_28%,transparent_62%,rgba(7,26,43,0.55)_100%)]"
        aria-hidden="true"
      />

      {count > 1 && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6 lg:px-10">
            <button type="button" onClick={prev} aria-label="Previous photograph" className={arrow}>
              <span aria-hidden="true" className="-mt-px text-xl">‹</span>
            </button>
            <button type="button" onClick={next} aria-label="Next photograph" className={arrow}>
              <span aria-hidden="true" className="-mt-px text-xl">›</span>
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-7 flex justify-center sm:bottom-9">
            <div className="flex items-center gap-2.5 rounded-full bg-midnight/55 px-4 py-3 backdrop-blur">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show photograph ${i + 1} of ${count}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
