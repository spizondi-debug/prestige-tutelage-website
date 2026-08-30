import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { brand, contact } from '../data/site.js'

const columns = [
  {
    heading: 'Training',
    links: [
      { label: 'Programmes & Qualifications', to: '/programmes' },
      { label: 'Learnerships', to: '/programmes#learnerships' },
      { label: 'Short Courses', to: '/short-courses' },
      { label: 'Corporate Training', to: '/corporate-training' },
    ],
  },
  {
    heading: 'Business Services',
    links: [
      { label: 'All Services', to: '/services' },
      { label: 'Skills Development Consulting', to: '/services#workforce-advisory' },
      { label: 'B-BBEE Consultation', to: '/bbbee-consulting' },
      { label: 'Recruitment Services', to: '/recruitment' },
      { label: 'Office & Training Space', to: '/office-rental' },
      { label: 'Assessment Centre', to: '/assessment-centre' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Industries', to: '/industries' },
      { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="tex tex-grain bg-prestige-blue-deep text-white/90">
      <div className="container-px">
        <div className="grid gap-12 py-16 lg:grid-cols-[0.85fr_2.6fr] lg:gap-16">
          <div>
            {/* Knocked out to white, like the header — the brief asks for a
                white logo on the blue footer rather than a white plate. */}
            <div className="inline-flex [&_img]:brightness-0 [&_img]:invert">
              <Logo className="h-12" />
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
              Accredited learning, workforce development, recruitment, advisory, assessment and professional business support for South African organisations.
            </p>
            <p className="mt-5 text-sm text-white/85">
              {brand.credibility.join(' • ')}
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-[0.95rem] decoration-prestige-green-light underline-offset-4 transition-colors hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                Contact
              </h3>
              <address className="mt-4 not-italic text-[0.95rem] leading-relaxed">
                {brand.legalName}
                <br />
                {contact.addressLines.join(', ')}
              </address>
              <p className="mt-3 text-[0.95rem] leading-relaxed">
                <a href={contact.phoneHref} className="decoration-prestige-green-light underline-offset-4 transition-colors hover:text-white hover:underline">{contact.phone}</a>
                <br />
                <a href={contact.emailHref} className="decoration-prestige-green-light underline-offset-4 transition-colors hover:text-white hover:underline">{contact.email}</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/30 py-6 text-sm text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <p>
            <a href={contact.websiteHref} className="decoration-prestige-green-light underline-offset-4 transition-colors hover:text-white hover:underline">{contact.website}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
