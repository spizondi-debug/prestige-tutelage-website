// Prestige Tutelage — site configuration (standalone project).

export const brand = {
  name: 'Prestige Tutelage',
  legalName: 'Prestige Tutelage (Pty) Ltd',
  tagline: 'Accredited training & workforce development',
  credibility: ['South African', 'Accredited Training', 'Level 1 B-BBEE'],
}

export const contact = {
  addressLines: ['64 Hill Street', 'Ferndale', 'Randburg', '2194'],
  phone: '010 065 0822',
  phoneHref: 'tel:+27100650822',
  email: 'info@prestigetutelage.co.za',
  emailHref: 'mailto:info@prestigetutelage.co.za',
  website: 'www.prestigetutelage.co.za',
  websiteHref: 'https://www.prestigetutelage.co.za',
}

export const servicesNav = [
  { label: 'All Services', to: '/services' },
  { label: 'Skills Development Consulting', to: '/services#workforce-advisory' },
  { label: 'B-BBEE Consultation', to: '/bbbee-consulting' },
  { label: 'Recruitment Services', to: '/recruitment' },
  { label: 'Office & Training Space Rental', to: '/office-rental' },
  { label: 'Assessment Centre', to: '/assessment-centre' },
]

// Primary navigation (desktop). Services uses a restrained dropdown so the
// broader business offering is visible without overloading the top level.
export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Short Courses', to: '/short-courses' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Services', to: '/services', children: servicesNav },
  { label: 'Industries', to: '/industries' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const utilityNav = [
  { label: 'Assessment Centre', to: '/assessment-centre' },
  { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
]

// Full sitemap for the mobile menu and footer.
export const allPages = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Short Courses', to: '/short-courses' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Services', to: '/services' },
  { label: 'B-BBEE Consultation', to: '/bbbee-consulting' },
  { label: 'Recruitment Services', to: '/recruitment' },
  { label: 'Office & Training Space Rental', to: '/office-rental' },
  { label: 'Industries', to: '/industries' },
  { label: 'Assessment Centre', to: '/assessment-centre' },
  { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]
