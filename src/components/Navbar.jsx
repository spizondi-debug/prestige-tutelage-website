import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { nav, utilityNav, allPages, contact } from '../data/site.js'

/** Desktop dropdown — opens on hover or focus, closes on Escape, outside click or navigation. */
function ServicesMenu({ item, linkClass }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  // After navigating from the menu the cursor is left sitting on the trigger,
  // so the panel would immediately reopen on the next mouseenter. Suppress
  // reopening briefly until the pointer genuinely returns.
  const suppress = useRef(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    suppress.current = true
    const t = setTimeout(() => { suppress.current = false }, 400)
    return () => clearTimeout(t)
  }, [pathname])

  const openMenu = () => { if (!suppress.current) setOpen(true) }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !wrap.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={() => setOpen(false)}
      onFocus={openMenu}
      onBlur={(e) => !wrap.current?.contains(e.relatedTarget) && setOpen(false)}
    >
      <NavLink
        to={item.to}
        className={({ isActive }) => `${linkClass({ isActive })} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <svg
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </NavLink>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3">
          <ul className="overflow-hidden rounded-lg border border-line bg-paper shadow-premium">
            {item.children.map((c, i) => (
              <li key={c.to} className={i ? 'border-t border-line' : ''}>
                <Link to={c.to} className="group block px-5 py-3.5 transition-colors hover:bg-mist/60">
                  <span className="block font-sans text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-prestige-blue-hover">
                    {c.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const headerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  // Publish the header's real height as --nav-h so a hero can size itself to
  // exactly the space left below it. Measured rather than hard-coded: the
  // utility bar disappears below lg and the row height changes with it.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return undefined
    const write = () =>
      document.documentElement.style.setProperty('--nav-h', `${Math.round(el.offsetHeight)}px`)
    write()
    const ro = new ResizeObserver(write)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Nav labels stay white and green does the accenting as a rule under the
  // label, not as the label's colour. Measured: at 14.8px these links need
  // 4.5:1, and no green reaches that on blue — the brand green is 1.98:1 on
  // this bar and even the lifted `green-light` is 3.35:1. As an underline it
  // is a non-text UI component, which needs 3:1, so it passes there.
  const linkClass = ({ isActive }) =>
    `relative text-[0.925rem] font-medium text-white transition-colors
     after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full
     after:origin-left after:bg-prestige-green-light after:transition-transform
     after:duration-300 after:ease-prestige hover:after:scale-x-100 ${
       isActive ? 'after:scale-x-100' : 'after:scale-x-0'
     }`

  // Opaque blue, never glass. The header is stacked above the hero rather
  // than overlaying it, so a translucent fill composites over the Cloud body
  // behind the page — which is what once painted the bar rgb(76,97,118) and
  // dropped the nav labels to 2.0:1. Glass needs something dark behind it;
  // here there is nothing. `.glass` remains for real overlays.
  //
  // Both bars are blue, so there is no strip of another colour anywhere in
  // the header, above the nav or below it. Neither is #087BE8: white on it is
  // 4.19:1, which is fine for a headline but not for a 14.8px nav label. The
  // nav takes #066DCE (5.14:1) and the utility bar above it #0559A8 (7.00:1),
  // which also gives the two bars a readable edge without a border colour.
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/15 bg-prestige-blue-hover"
    >
      {/* Utility bar — contact + secondary destinations */}
      <div className="hidden border-b border-white/15 bg-prestige-blue-deep lg:block">
        <div className="container-px">
          <div className="flex items-center justify-between py-1.5 text-[0.8rem] text-white">
            <div className="flex items-center gap-5">
              <a href={contact.phoneHref} className="decoration-prestige-green-light underline-offset-4 hover:underline">{contact.phone}</a>
              <a href={contact.emailHref} className="decoration-prestige-green-light underline-offset-4 hover:underline">{contact.email}</a>
            </div>
            <div className="flex items-center gap-5">
              {utilityNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-medium decoration-prestige-green-light underline-offset-4 hover:underline ${isActive ? 'underline' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-px">
        <nav className="flex items-center justify-between gap-4 py-3" aria-label="Main">
          {/* Full colour on white; on blue the logo is knocked out to solid
              white so both the mark and the wordmark stay visible. */}
          <span className="[&_img]:brightness-0 [&_img]:invert"><Logo className="h-12 sm:h-14" /></span>

          <ul className="hidden items-center gap-6 xl:flex">
            {nav.map((item) => (
              <li key={item.to}>
                {item.children ? (
                  <ServicesMenu item={item} linkClass={linkClass} />
                ) : (
                  <NavLink to={item.to} className={linkClass}>{item.label}</NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <Link
              to="/contact"
              className="btn bg-white px-5 py-2.5 text-sm text-prestige-blue-hover hover:bg-prestige-blue-light focus-visible:outline-white"
            >
              Let’s Talk
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/40 text-white xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile navigation takes the deeper blue for the same reason the
          utility bar does: these are 16px links, and white on #087BE8 is
          4.19:1. On #066DCE they are 5.14:1. */}
      {open && (
        <div className="on-dark max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/15 bg-prestige-blue-deep xl:hidden">
          <div className="container-px py-4">
            <ul className="flex flex-col divide-y divide-white/15">
              {allPages.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block border-l-2 py-3 pl-3 text-base font-medium text-white transition-colors ${isActive ? 'border-prestige-green-light' : 'border-transparent hover:border-white/50'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn mt-4 w-full bg-white text-prestige-blue-hover hover:bg-prestige-blue-light"
            >
              Request a Proposal
            </Link>
            <p className="mt-4 text-sm text-white/85">
              <a href={contact.phoneHref} className="transition-colors hover:text-prestige-green-light">{contact.phone}</a>
              {' · '}
              <a href={contact.emailHref} className="transition-colors hover:text-prestige-green-light">{contact.email}</a>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
