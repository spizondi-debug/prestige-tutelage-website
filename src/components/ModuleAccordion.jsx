import { useEffect, useId, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/motion.js'

/**
 * ModuleAccordion — the course outline, one module per row.
 *
 * Each row is a real <button> inside a heading, with aria-expanded and
 * aria-controls pointing at its panel, so a screen reader announces the state
 * and the whole thing works from the keyboard without any extra key handling:
 * Tab moves between modules, Enter and Space toggle. Arrow keys are added on
 * top of that because a list this long is quicker to walk that way.
 *
 * The panel animates on grid-template-rows rather than max-height. A
 * max-height transition has to guess a value taller than the content, which
 * makes the close look fast then stall; `0fr` to `1fr` animates to the real
 * height, so open and close take the same time whatever the module contains.
 * Under reduced motion the panel just appears.
 */
export default function ModuleAccordion({ modules, label = 'Course modules' }) {
  const reduced = usePrefersReducedMotion()
  // Only one module is open to begin with, as briefed.
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const btnRefs = useRef([])

  useEffect(() => { btnRefs.current = btnRefs.current.slice(0, modules.length) }, [modules.length])

  const onKeyDown = (e, i) => {
    const last = modules.length - 1
    const to =
      e.key === 'ArrowDown' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowUp' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (to === null) return
    e.preventDefault()
    btnRefs.current[to]?.focus()
  }

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper shadow-premium" role="group" aria-label={label}>
      {modules.map((m, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const btnId = `${baseId}-button-${i}`
        return (
          <div key={m.title}>
            <h3>
              <button
                id={btnId}
                ref={(el) => { btnRefs.current[i] = el }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-prestige-blue-light focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-prestige-blue-deep sm:gap-5 sm:px-7 sm:py-6"
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-semibold tabular-nums transition-colors ${
                    isOpen ? 'bg-prestige-blue-hover text-white' : 'bg-prestige-blue-light text-prestige-blue-hover'
                  }`}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold leading-snug text-prestige-green-deep">
                    {m.title}
                  </span>
                  <span className="mt-1 block leading-relaxed text-body">{m.text}</span>
                </span>

                <svg
                  viewBox="0 0 24 24" fill="none" aria-hidden="true"
                  className={`mt-1.5 h-5 w-5 shrink-0 text-prestige-blue-hover transition-transform duration-300 ease-prestige ${isOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen && reduced}
              className={`grid ${reduced ? '' : 'transition-[grid-template-rows] duration-300 ease-prestige'}`}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-6 pl-[4.25rem] sm:px-7 sm:pb-7 sm:pl-[4.75rem]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-prestige-blue-hover">
                    Key topics covered
                  </p>
                  <ul className="mt-3 grid gap-x-10 sm:grid-cols-2">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-start gap-3 border-b border-line py-2.5 leading-relaxed text-body">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
