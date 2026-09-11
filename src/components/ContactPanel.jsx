import { Link } from 'react-router-dom'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo.jsx'
import { brand, contact } from '../data/site.js'

/**
 * ContactPanel — the contact block on the Contact page.
 *
 * Replaces a plain list of labels and values. The details were already links,
 * but they were body-coloured with only a hover change, so on a touch screen —
 * where there is no hover — nothing signalled that a number could be tapped.
 * Each row now has an icon, and the phone and email read as actions.
 *
 * The address is one <address> element and the rows are a <dl>: a label and its
 * value are a description pair, not a heading and a paragraph. That is what
 * lets a screen reader announce "Telephone, 010 065 0822" as one thing.
 *
 * The logo sits on a white card inside the blue panel rather than being
 * knocked out to white, because this is the full-colour original and the blue
 * would swallow the blue half of the mark.
 */
const rows = [
  {
    icon: MapPin,
    label: 'Office',
    // The one row that is not a link: an address is not an action, and
    // guessing a map URL for an address this project cannot verify would put a
    // wrong pin on the page.
    content: (
      <address className="not-italic leading-relaxed">
        {contact.addressLines[0]}, {contact.addressLines[1]}
        <br />
        {contact.addressLines[2]}, {contact.addressLines[3]}
      </address>
    ),
  },
  {
    icon: Phone,
    label: 'Telephone',
    href: contact.phoneHref,
    text: contact.phone,
    analytics: 'contact-telephone',
  },
  {
    icon: Mail,
    label: 'Email',
    href: contact.emailHref,
    text: contact.email,
    analytics: 'contact-email',
  },
  {
    icon: Globe,
    label: 'Website',
    href: contact.websiteHref,
    text: contact.website,
  },
]

export default function ContactPanel() {
  return (
    <aside className="overflow-hidden rounded-2xl border border-line bg-paper shadow-premium">
      {/* Blue panel */}
      <div className="bg-prestige-blue-hover px-7 py-8 text-white sm:px-8">
        <div className="inline-flex rounded-xl bg-white px-4 py-3">
          <Logo className="h-12" />
        </div>

        <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white">
          Let’s work together
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-white">
          Skills development that moves people and organisations forward.
        </h2>
        <span className="mt-5 block h-1 w-12 rounded-full bg-prestige-green" aria-hidden="true" />
        <p className="mt-5 leading-relaxed text-white">
          Speak to our team about accredited training, learnerships and tailored workforce solutions.
        </p>

        <Link
          to="#enquiry"
          data-analytics="contact-request-proposal"
          className="btn mt-7 w-full bg-white text-prestige-blue-hover hover:bg-prestige-blue-light focus-visible:outline-white"
        >
          Request a proposal
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Details */}
      <div className="px-7 py-8 sm:px-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-prestige-blue-hover">
          Contact Prestige
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Talk to our team</h2>
        <p className="mt-3 leading-relaxed text-body">
          We’ll help you identify the right programme and next steps for your organisation.
        </p>

        <dl className="mt-8 space-y-6">
          {rows.map(({ icon: Icon, label, href, text, content, analytics }) => (
            <div key={label} className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-prestige-blue-light text-prestige-blue-hover"
                aria-hidden="true"
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-ink">
                  {content ?? (
                    <a
                      href={href}
                      data-analytics={analytics}
                      className="break-words font-medium text-ink underline decoration-prestige-blue/40 underline-offset-4 transition-colors hover:text-prestige-blue-hover hover:decoration-prestige-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
                    >
                      {text}
                    </a>
                  )}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
          {brand.legalName} · {brand.credibility.join(' • ')}
        </p>
      </div>
    </aside>
  )
}
