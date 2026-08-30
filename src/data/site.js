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

/** Everything beyond training, grouped under Business Solutions. */
export const businessSolutionLinks = [
  { label: 'All Business Solutions', to: '/business-solutions', description: 'The full Prestige offering beyond training' },
  { label: 'B-BBEE Consultation', to: '/bbbee-consulting', description: 'Skills-development strategy and implementation' },
  { label: 'Recruitment', to: '/recruitment', description: 'Workforce sourcing and learner intakes' },
  { label: 'Assessment Centre', to: '/assessment-centre', description: 'Assessment, moderation and invigilation' },
  { label: 'Office & Training Venue Rental', to: '/office-rental', description: 'Professional space in Ferndale, Randburg' },
  { label: 'Skills Development Consulting', to: '/services#workforce-advisory', description: 'Gap analysis, needs analysis and planning' },
]

/**
 * Primary navigation. `children` renders as a dropdown; the main bar stays
 * short so it does not overload. Corporate Training now sits inside the
 * Programmes area of the site rather than taking a top-level slot.
 */
export const nav = [
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Short Courses', to: '/short-courses' },
  { label: 'Industries', to: '/industries' },
  { label: 'Growth Pathways', to: '/growth-pathways' },
  { label: 'Business Solutions', to: '/business-solutions', children: businessSolutionLinks },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const utilityNav = [
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Assessment Centre', to: '/assessment-centre' },
]

/** Full sitemap for the mobile menu and 404 page. */
export const allPages = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Short Courses', to: '/short-courses' },
  { label: 'Corporate Training', to: '/corporate-training' },
  { label: 'Business Solutions', to: '/business-solutions' },
  { label: 'B-BBEE Consultation', to: '/bbbee-consulting' },
  { label: 'Recruitment Services', to: '/recruitment' },
  { label: 'Office & Training Space Rental', to: '/office-rental' },
  { label: 'Assessment Centre', to: '/assessment-centre' },
  // One of the five Business Solutions the desktop dropdown lists — without
  // this, a mobile visitor has no way to reach it at all. Not linked to a
  // page of its own; it opens Services scrolled to the workforce-advisory
  // section, the same destination the dropdown uses.
  { label: 'Skills Development Consulting', to: '/services#workforce-advisory' },
  { label: 'Industries', to: '/industries' },
  { label: 'Prestige Growth Pathways', to: '/growth-pathways' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]
