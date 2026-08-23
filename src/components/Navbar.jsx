import { useState } from 'react'
import Logo from './Logo.jsx'
import { nav } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur">
      <div className="container-px">
        <nav className="flex items-center justify-between gap-4 py-4">
          <Logo />

          <ul className="hidden items-center gap-6 xl:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-prestige-blue"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <a href="#programmes" className="btn btn-primary px-5 py-2.5 text-sm">
              Explore Programmes
            </a>
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
              <span className={`absolute left-0 bottom-0 h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-line bg-cream xl:hidden">
          <div className="container-px py-4">
            <ul className="flex flex-col divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-ink hover:text-prestige-blue"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#programmes" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
              Explore Programmes
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
