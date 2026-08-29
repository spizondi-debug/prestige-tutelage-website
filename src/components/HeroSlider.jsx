import { useCallback, useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * HeroSlider — the photograph panel in a page hero, cycling through a set.
 *
 * Cross-fades rather than sliding, so nothing moves horizontally and there is
 * no transform to fight the rounded frame. Advances on a timer, and stops the
 * moment a pointer or keyboard focus enters, so it never pulls a slide away
 * from someone who is looking at it.
 *
 * Under reduced motion the timer never starts: the first photograph stays put
 * and the dots still work, so the content remains reachable without animation.
 *
 * Only the first slide loads eagerly. The rest are lazy — a hero carousel
 * that fetches five full-size photographs before first paint is worse than no
 * carousel at all.
 */
export default function HeroSlider({
  images,
  interval = 5200,
  className = '',
  aspect = 'aspect-[5/4]',
}) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const count = images.length
  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (reduced || paused || count < 2) return undefined
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearTimeout(timer.current)
  }, [index, paused, reduced, count, interval])

  if (!count) return null

  return (
    <div
      className={`relative ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Prestige Tutelage photographs"
    >
      {/* A hairline of brand colour around the panel, drawn as a 1px gradient
          frame so it can run blue into green without a second element. */}
      <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(140deg,rgba(0,111,216,0.45),rgba(0,111,216,0.06)_45%,rgba(45,162,47,0.42))] p-px shadow-premium">
        <div className={`relative ${aspect} w-full overflow-hidden rounded-[15px]`}>
          {images.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-[900ms] ease-prestige"
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
        </div>
      </div>

      {count > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-midnight/55 px-3 py-2 backdrop-blur">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photograph ${i + 1} of ${count}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ease-prestige ${
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
