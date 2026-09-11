import { useCallback, useEffect, useRef, useState } from 'react'
import Photo from './Photo.jsx'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * ContentSlider — the photographic half of an editorial section.
 *
 * Unlike HeroSlider this one sits in the flow rather than filling a hero, so
 * it owns its own aspect box. Same behaviour otherwise: cross-fade, arrows,
 * dots, swipe, keyboard, pause on hover or focus, and a progress bar that
 * shows how long the current slide has left.
 *
 * The progress bar is driven by a CSS animation keyed to the slide index, so
 * it restarts on every change and pauses with the timer rather than drifting
 * out of step with it. Under reduced motion there is no timer, so the bar is
 * not rendered at all — a full bar that never moves would be a lie.
 */
export default function ContentSlider({
  images,
  interval = 6000,
  aspect = 'aspect-[4/3]',
  label = 'Prestige Tutelage photographs',
  className = '',
}) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touch = useRef(null)

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
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-prestige-blue-deep/90 ' +
    'text-white backdrop-blur transition-colors duration-200 hover:border-white/80 hover:bg-prestige-blue-deep/85 ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-premium ${aspect} ${className}`.trim()}
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
          className={`absolute inset-0 ${reduced ? '' : 'transition-opacity duration-[900ms] ease-prestige'}`}
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Photo src={img.src} alt={img.alt} position={img.position ?? 'center'} eager={i === 0} className="h-full w-full" />
        </div>
      ))}

      {count > 1 && (
        <>
          {/* Dots and the progress bar are white-on-image, and half the
              library has a pale floor or wall at the bottom of the frame.
              Without this scrim they disappear on exactly those slides. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-shadow/70 via-shadow/25 to-transparent"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-4">
            <button type="button" onClick={prev} aria-label="Previous photograph" className={`pointer-events-auto ${arrow}`}>
              <span aria-hidden="true" className="-mt-px">‹</span>
            </button>
            <button type="button" onClick={next} aria-label="Next photograph" className={`pointer-events-auto ${arrow}`}>
              <span aria-hidden="true" className="-mt-px">›</span>
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photograph ${i + 1} of ${count}`}
                aria-current={i === index}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-prestige focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  i === index ? 'bg-prestige-blue ring-2 ring-white/70' : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>

          {!reduced && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30">
              <div
                key={index}
                className="h-full bg-prestige-blue"
                style={{
                  animation: `slideProgress ${interval}ms linear forwards`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
