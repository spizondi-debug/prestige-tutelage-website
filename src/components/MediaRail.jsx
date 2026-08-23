import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * MediaRail — a horizontal, snap-scrolling row of tall tiles.
 *
 * The rail itself is the scroll container; the arrow controls are a
 * convenience on top of it, not the only way through. Touch, trackpad,
 * keyboard (tab moves focus into the next tile, which scrolls it into view)
 * and the arrows all work, so the controls are hidden from assistive tech and
 * from small screens where swiping is natural.
 */
export default function MediaRail({ children, label, light = false, className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = ref.current
    if (!el) return
    // 2px of slack: sub-pixel layout means scrollLeft rarely hits the exact end.
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const step = (dir) => {
    const el = ref.current
    if (!el) return
    // One tile plus its gap, so a click always lands on a snap point.
    const tile = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0
    const by = tile ? tile.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * by, behavior: reduced ? 'auto' : 'smooth' })
  }

  const arrow = light
    ? 'border-white/30 text-white hover:border-white hover:bg-white hover:text-ink disabled:opacity-25'
    : 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white disabled:opacity-25'

  return (
    <div className={className}>
      <div className="mb-6 hidden justify-end gap-2 lg:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-hidden="true"
          tabIndex={-1}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-default disabled:hover:bg-transparent ${arrow}`}
        >
          <span className="-mt-px text-lg">‹</span>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-hidden="true"
          tabIndex={-1}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 disabled:cursor-default disabled:hover:bg-transparent ${arrow}`}
        >
          <span className="-mt-px text-lg">›</span>
        </button>
      </div>

      {/* Negative margin + matching padding lets tiles bleed to the screen
          edge on mobile while still starting at the container gutter. The
          matching scroll-padding is not optional: snap positions align to the
          scrollport, not the padding box, so without it the container snaps
          the gutter away and the first tile sits flush against the edge. */}
      <ul
        ref={ref}
        aria-label={label}
        className="rail -mx-5 scroll-pl-5 px-5 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:scroll-pl-0 lg:px-0"
      >
        {children}
      </ul>
    </div>
  )
}

/**
 * RailTile — one tile in a MediaRail. Media on top, then a micro-label, a
 * title and one line. Photography where Prestige has it; a `fallback` node
 * (the Prestige Path panel) where it does not.
 */
export function RailTile({ children }) {
  return (
    <li className="w-[78vw] max-w-[22rem] sm:w-[19rem] lg:w-[21rem]">{children}</li>
  )
}
