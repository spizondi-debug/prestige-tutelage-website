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
    <footer className="border-t border-line tex tex-grain bg-midnight-deep text-white/80">
      <div className="container-px">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.15fr_2.2fr] lg:py-16">
          <div>
            <div className="inline-flex rounded-lg bg-paper px-5 py-3.5">
              <Logo className="h-12" />
            </div>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">
              Accredited learning, workforce development, recruitment, advisory, assessment and professional business support for South African organisations.
            </p>
            <p className="mt-5 text-sm text-white/60">
              {brand.credibility.join(' • ')}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-[0.95rem] transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="sm:col-span-2 xl:col-span-4">
              <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">Contact</h3>
              <div className="mt-4 flex flex-col gap-2 text-[0.95rem] sm:flex-row sm:flex-wrap sm:gap-x-8">
                <address className="not-italic leading-relaxed">
                  {brand.legalName}
                  <br />
                  {contact.addressLines.join(', ')}
                </address>
                <p className="leading-relaxed">
                  <a href={contact.phoneHref} className="transition-colors hover:text-white">{contact.phone}</a>
                  <br />
                  <a href={contact.emailHref} className="transition-colors hover:text-white">{contact.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.legalName}. All rights reserved.</p>
          <p>
            <a href={contact.websiteHref} className="transition-colors hover:text-white">{contact.website}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
