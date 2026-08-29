import { useCallback, useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * HeroSlider — the full-height photographic half of a page hero.
 *
 * Fills its container absolutely rather than sitting in a card, so the hero
 * can run the image to the edge of the viewport. Cross-fades: nothing moves
 * horizontally, so there is no transform to fight the section edges and no
 * reflow as slides change.
 *
 * Autoplay stops whenever a pointer is over the slider or focus is inside it,
 * so a slide is never pulled away from someone reading or operating it. Under
 * reduced motion the timer never starts and the transition collapses to an
 * instant swap — every slide is still reachable by arrow, dot, key or swipe.
 *
 * Only the first slide loads eagerly. The rest are lazy: a hero that fetches
 * five full photographs before first paint is worse than no hero.
 */
export default function HeroSlider({ images, interval = 5000, label = 'Prestige Tutelage photographs' }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)

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

  // Touch: a horizontal drag past the threshold moves one slide. Vertical
  // drags are left alone so the page still scrolls normally over the image.
  const onTouchStart = (e) => { touchX.current = e.changedTouches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 44) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  if (!count) return null

  const arrow =
    'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border ' +
    'border-white/30 bg-midnight/45 text-white backdrop-blur transition-colors duration-200 ' +
    'hover:border-white/70 hover:bg-midnight/70 focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-white'

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 ${reduced ? '' : 'transition-opacity duration-[1100ms] ease-prestige'}`}
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

      {/* A restrained brand wash, only strong enough to seat the controls and
          soften the join with the light half of the hero. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(7,26,43,0.30)_0%,rgba(7,26,43,0.06)_38%,rgba(0,111,216,0.05)_70%,rgba(45,162,47,0.10)_100%)]"
        aria-hidden="true"
      />

      {count > 1 && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6">
            <button type="button" onClick={prev} aria-label="Previous photograph" className={arrow}>
              <span aria-hidden="true" className="-mt-px text-lg">‹</span>
            </button>
            <button type="button" onClick={next} aria-label="Next photograph" className={arrow}>
              <span aria-hidden="true" className="-mt-px text-lg">›</span>
            </button>
          </div>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-midnight/50 px-3.5 py-2.5 backdrop-blur">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photograph ${i + 1} of ${count}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all duration-300 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  i === index ? 'w-7 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/85'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
