import { useEffect, useRef, useState } from 'react'

/**
 * Motion primitives.
 *
 * Deliberately dependency-free: these are a few dozen lines of
 * IntersectionObserver and requestAnimationFrame rather than an animation
 * library, because everything the design needs — reveals, counters, scroll
 * progress — is cheap to express directly and the bundle stays small.
 * Performance is a brand attribute here, not an afterthought.
 *
 * Every hook honours prefers-reduced-motion by resolving to its finished state
 * immediately, so nothing animates at someone who asked it not to and no
 * content is ever hidden behind an animation that never runs.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(q.matches)
    apply()
    q.addEventListener('change', apply)
    return () => q.removeEventListener('change', apply)
  }, [])
  return reduced
}

/** True once the element has entered the viewport (fires once). */
export function useInView({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold, rootMargin])

  return [ref, seen]
}

/**
 * Scroll progress through an element, 0 → 1, measured from when its top
 * reaches the viewport top until its bottom does. Used for scroll-linked
 * storytelling. Returns 0 under reduced motion.
 */
export function useScrollProgress(ref, { enabled = true } = {}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    let frame = 0

    const measure = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const distance = r.height - window.innerHeight
      if (distance <= 0) return setProgress(0)
      setProgress(Math.min(1, Math.max(0, -r.top / distance)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, enabled])

  return progress
}

/** Counts up to `value` once visible. Resolves instantly under reduced motion. */
export function useCountUp(value, { duration = 1100 } = {}) {
  const [ref, seen] = useInView()
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (reduced) return setN(value)
    let frame = 0
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      // easeOutCubic — decelerates into place rather than stopping dead
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, reduced, value, duration])

  return [ref, n]
}

/** Particle budget scaled to the device, so phones are not asked to do desktop work. */
export function particleBudget() {
  if (typeof window === 'undefined') return 0
  const w = window.innerWidth
  const cores = navigator.hardwareConcurrency || 4
  if (w < 640) return 70
  if (w < 1024) return 140
  return cores <= 4 ? 190 : 260
}
