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
          <ul className="overflow-hidden rounded-lg border border-line bg-paper shadow-card">
            {item.children.map((c, i) => (
              <li key={c.to} className={i ? 'border-t border-line' : ''}>
                <Link to={c.to} className="group block px-5 py-3.5 transition-colors hover:bg-sand/60">
                  <span className="block font-sans text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-prestige-blue">
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
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    `text-[0.925rem] font-medium transition-colors hover:text-prestige-blue ${
      isActive ? 'text-prestige-blue' : 'text-ink/80'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
      {/* Utility bar — contact + secondary destinations */}
      <div className="hidden border-b border-line/70 bg-sand/50 lg:block">
        <div className="container-px">
          <div className="flex items-center justify-between py-1.5 text-[0.8rem] text-body">
            <div className="flex items-center gap-5">
              <a href={contact.phoneHref} className="transition-colors hover:text-prestige-blue">{contact.phone}</a>
              <a href={contact.emailHref} className="transition-colors hover:text-prestige-blue">{contact.email}</a>
            </div>
            <div className="flex items-center gap-5">
              {utilityNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-medium transition-colors hover:text-prestige-blue ${isActive ? 'text-prestige-blue' : ''}`
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
          <Logo className="h-12 sm:h-14" />

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
            <Link to="/contact" className="btn btn-primary px-5 py-2.5 text-sm">
              Request a Proposal
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-cream xl:hidden">
          <div className="container-px py-4">
            <ul className="flex flex-col divide-y divide-line">
              {allPages.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-base font-medium hover:text-prestige-blue ${isActive ? 'text-prestige-blue' : 'text-ink'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
              Request a Proposal
            </Link>
            <p className="mt-4 text-sm text-muted">
              <a href={contact.phoneHref} className="hover:text-prestige-blue">{contact.phone}</a>
              {' · '}
              <a href={contact.emailHref} className="hover:text-prestige-blue">{contact.email}</a>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
