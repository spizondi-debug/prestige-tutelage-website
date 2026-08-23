import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { nav, utilityNav, allPages, contact } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-[0.925rem] font-medium transition-colors hover:text-prestige-blue ${
      isActive ? 'text-prestige-blue' : 'text-ink/80'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
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
              <li key={item.to} className={item.children ? 'group relative' : ''}>
                <NavLink to={item.to} className={linkClass}>
                  <span className="inline-flex items-center gap-1.5">
                    {item.label}
                    {item.children && <span aria-hidden="true" className="text-[0.7rem] text-muted">▾</span>}
                  </span>
                </NavLink>

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-line bg-paper p-2 shadow-xl">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) =>
                            `block px-4 py-3 text-sm font-medium transition-colors hover:bg-sand/70 hover:text-prestige-blue ${
                              isActive ? 'text-prestige-blue' : 'text-ink/80'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <Link to="/programmes" className="btn btn-primary px-5 py-2.5 text-sm">
              Explore Programmes
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
