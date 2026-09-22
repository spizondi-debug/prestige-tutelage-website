// Recruitment services.
//
// COMPLIANCE — read before editing:
//   * Regulated checks (criminal, credit, qualification verification) are
//     COORDINATED by Prestige with appropriate providers, not performed by it.
//     Keep `CHECKS_QUALIFIER` on the page and keep the verbs as "coordination".
//   * Never claim licences, professional memberships, database sizes, candidate
//     numbers, placement rates or time-to-hire. None of that is verified.
//   * Role categories below are the areas Prestige recruits for. Do not extend
//     without confirmation.

export const CHECKS_QUALIFIER =
  'Pre-employment checks are arranged with appropriate providers and carried out where legally permissible and agreed with you in advance. Prestige coordinates these checks; it does not itself perform regulated verification.'

export const recruitmentGroups = [
  {
    slug: 'talent-sourcing',
    title: 'Talent Sourcing',
    lead: 'Reaching the right people — including the ones who are not already applying.',
    services: [
      'Candidate sourcing',
      'Job advertising support',
      'Candidate database sourcing',
      'Community and youth sourcing',
      'Graduate / entry-level sourcing',
    ],
  },
  {
    slug: 'screening',
    title: 'Screening & Shortlisting',
    lead: 'Turning a pile of applications into a shortlist you can act on.',
    services: [
      'CV screening',
      'Minimum-requirement checks',
      'Candidate shortlisting',
      'Telephone screening',
      'Structured candidate evaluation',
    ],
  },
  {
    slug: 'interview-support',
    title: 'Interview Support',
    lead: 'The coordination that keeps a hiring process moving and consistent.',
    services: [
      'Interview coordination',
      'Structured interview guides',
      'Candidate scheduling',
      'Interview administration',
    ],
  },
  {
    slug: 'pre-employment',
    title: 'Pre-employment Support',
    lead: 'Arranged with appropriate providers, where legally permissible and agreed with you.',
    services: [
      'Reference checks',
      'Qualification verification coordination',
      'Identity and document verification coordination',
      'Background-check coordination',
    ],
    note: CHECKS_QUALIFIER,
  },
]

export const learnerRecruitment = {
  lead:
    'Recruiting for a learnership is not ordinary recruitment. Candidates are often entering the workplace for the first time, documentation is rarely complete, and the programme depends on getting the intake right. This is where Prestige is strongest — because we also run the programmes.',
  services: [
    'Unemployed learner sourcing',
    'Employed learner screening',
    'Learnership candidate recruitment',
    'Youth programme recruitment',
    'Disability-inclusive recruitment support',
    'Learner onboarding',
    'Documentation collection',
    'Induction coordination',
  ],
}

export const roleCategories = [
  'Entry-level roles',
  'Administrative and office roles',
  'HR roles',
  'Supervisory roles',
  'Manufacturing and production roles',
  'Agricultural roles',
  'Graduates and youth talent',
]

export const engagementTypes = [
  { name: 'Permanent recruitment', text: 'Sourcing, screening and shortlisting for permanent appointments.' },
  { name: 'Project-based recruitment', text: 'Volume or time-bound intakes for a specific project or programme.' },
  { name: 'Learnership & youth intakes', text: 'End-to-end recruitment for learnership cohorts and youth programmes.' },
]

/** Vacancy enquiry form fields. */
export const vacancyFields = [
  { name: 'company', label: 'Company', required: true },
  { name: 'contact', label: 'Contact person', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'telephone', label: 'Telephone', type: 'tel' },
  { name: 'position', label: 'Position title', required: true },
  { name: 'vacancies', label: 'Number of vacancies' },
  {
    name: 'employmentType',
    label: 'Employment type',
    type: 'select',
    options: ['Permanent', 'Fixed-term contract', 'Project-based', 'Learnership', 'Internship / graduate'],
  },
  { name: 'location', label: 'Location' },
  { name: 'experience', label: 'Required experience' },
  { name: 'qualifications', label: 'Required qualifications' },
  { name: 'startDate', label: 'Desired start date', type: 'date' },
  { name: 'notes', label: 'Additional information', type: 'textarea', rows: 5 },
]
