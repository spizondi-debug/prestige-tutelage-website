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

/** Services that live under the Services dropdown. */
export const serviceLinks = [
  { label: 'All Services', to: '/services', description: 'The full Prestige workforce ecosystem' },
  { label: 'Skills Development Consulting', to: '/services#workforce-advisory', description: 'Gap analysis, needs analysis and planning' },
  { label: 'B-BBEE Consultation', to: '/bbbee-consulting', description: 'Skills-development strategy and implementation' },
  { label: 'Recruitment Services', to: '/recruitment', description: 'Talent sourcing, screening and learner intakes' },
  { label: 'Office & Training Space Rental', to: '/office-rental', description: 'Flexible space in Ferndale, Randburg' },
  { label: 'Assessment Centre', to: '/assessment-centre', description: 'Assessment, moderation and invigilation' },
]

/**
 * Primary navigation. `children` renders as a dropdown; the main bar stays
 * short so it does not overload.
 */
export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Short Courses', to: '/short-courses' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Services', to: '/services', children: serviceLinks },
  { label: 'Industries', to: '/industries' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const utilityNav = [
  { label: 'Assessment Centre', to: '/assessment-centre' },
  { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
]

/** Full sitemap for the mobile menu and 404 page. */
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
  { label: 'Assessment Centre', to: '/assessment-centre' },
  { label: 'Industries', to: '/industries' },
  { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]
