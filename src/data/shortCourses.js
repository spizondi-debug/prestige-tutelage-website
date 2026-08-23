// Short course catalogue — professional development.
//
// COMPLIANCE — read before editing:
//   * These are professional development short courses, treated as
//     NON-NQF and NON-CREDIT-BEARING unless a specific course has been
//     verified otherwise. Never add a SAQA ID or NQF level here.
//   * Never describe these as accredited, and never describe the certificate
//     as a national qualification certificate.
//   * Safety courses are awareness and development interventions. Statutory
//     and certificated safety training carries `SAFETY_SCOPING_NOTE`.
//   * Wellbeing courses are workplace awareness, not clinical or medical
//     services — keep copy free of diagnostic or treatment language.

export const shortCoursePositioning = 'Practical learning for immediate workplace impact.'

export const STATUS_NOTE =
  'Prestige short courses are professional development interventions. They are non-NQF and non-credit-bearing unless a specific course has been confirmed otherwise in writing.'

export const CERTIFICATE_NOTE =
  'Learners receive a Prestige Tutelage Certificate of Attendance or Certificate of Completion, as appropriate to the course. This is not a national qualification certificate.'

export const SAFETY_SCOPING_NOTE =
  'Statutory and certificated safety training is scoped per engagement based on the organisation’s requirements and the applicable provider/assessment route.'

export const WELLBEING_NOTE =
  'Wellbeing courses build workplace awareness and manager confidence. They are not counselling, diagnosis or clinical treatment.'

/**
 * Delivery is scoped per engagement — no fixed duration is asserted for any
 * individual course.
 */
export const deliveryOptions = [
  'Half-day interventions',
  '1-day workshops',
  '2-day workshops',
  'Multi-session programmes',
  'Blended learning',
  'Workplace assignments',
  'Custom team sessions',
]

export const customisationOptions = [
  'Company case studies',
  'SOPs',
  'Workplace scenarios',
  'Role-specific exercises',
  'Manager involvement',
  'Practical workplace assignments',
  'Customised duration',
]

export const shortCourseCategories = [
  {
    slug: 'leadership-management',
    title: 'Leadership & Management',
    area: 'Leadership',
    blurb: 'Equip supervisors and managers to lead people, performance and priorities.',
    courses: [
      'Leadership Development',
      'Supervisory Skills',
      'Team Leadership',
      'Coaching & Mentoring',
      'Performance Management',
      'Manager as Coach',
      'Change Management',
      'Conflict Management',
      'Succession & Knowledge Transfer',
      'Time Management',
      'Problem Solving & Decision Making',
      'Critical Thinking',
      'Team Leader Development',
    ],
  },
  {
    slug: 'communication-customer-experience',
    title: 'Communication & Customer Experience',
    area: 'Business',
    blurb: 'Sharpen how your people write, speak, present and handle customers.',
    courses: [
      'Effective Communication',
      'Business Communication',
      'Business Writing',
      'Report Writing',
      'Presentation Skills',
      'Meeting Management',
      'Telephone Skills',
      'Customer Service Excellence',
      'Customer Experience',
      'Handling Difficult Customers',
      'Negotiation Skills',
      'Difficult Conversations',
      'Empathy Training',
    ],
  },
  {
    slug: 'human-resources',
    title: 'Human Resources',
    area: 'HR',
    blurb: 'Practical HR capability for administrators, officers and line managers.',
    courses: [
      'HR Fundamentals',
      'Recruitment & Selection',
      'Employee Relations',
      'Performance Management',
      'Workplace Discipline',
      'Onboarding & Induction',
      'Workforce Planning',
      'Skills Administration',
      'Diversity & Inclusion',
      'Disability Awareness',
      'Workplace Ethics',
    ],
  },
  {
    slug: 'sales-commercial',
    title: 'Sales & Commercial Skills',
    area: 'Business',
    blurb: 'Build confident, customer-centred sales and service teams.',
    courses: [
      'Sales Fundamentals',
      'Consultative Selling',
      'Account Management',
      'Negotiation Skills',
      'Customer Engagement',
      'Sales Communication',
      'Customer Service',
      'Service Recovery',
    ],
  },
  {
    slug: 'personal-effectiveness',
    title: 'Personal Effectiveness',
    area: 'Business',
    blurb: 'The individual disciplines that lift how any role performs.',
    courses: [
      'Time Management',
      'Personal Productivity',
      'Problem Solving',
      'Decision Making',
      'Critical Thinking',
      'Emotional Intelligence',
      'Adaptability & Resilience',
      'Attention to Detail',
      'Professionalism',
      'Personal Mastery',
    ],
  },
  {
    slug: 'workplace-culture-wellbeing',
    title: 'Workplace Culture & Wellbeing',
    area: 'Workplace Readiness',
    blurb: 'Build teams that work well together and workplaces people can thrive in.',
    courses: [
      'Team Building',
      'Conflict Resolution',
      'Stress Management',
      'Mental Health Awareness',
      'Diversity, Equity & Inclusion',
      'Workplace Ethics',
      'Inclusive Workplace Awareness',
      'Work Readiness',
    ],
    note: WELLBEING_NOTE,
  },
  {
    slug: 'operational-excellence',
    title: 'Operational Excellence',
    area: 'Manufacturing',
    blurb: 'Practical improvement disciplines for production and process environments.',
    courses: [
      'Lean Manufacturing',
      '5S Workplace Organisation',
      'Continuous Improvement',
      'Visual Management',
      'Root Cause Analysis',
      'Waste Reduction / TIMWOODS',
      'Performance Measurement',
      'Quality Awareness',
      'Production Reporting',
    ],
  },
  {
    slug: 'safety-quality',
    title: 'Safety & Quality',
    area: 'Safety',
    blurb: 'Awareness and development that strengthens safety and quality culture.',
    courses: [
      'Workplace Health & Safety Awareness',
      'Leadership for Safety',
      'Risk Assessment',
      'Incident Investigation',
      'SHE Representative Development',
      'Safety Culture',
      'Quality Awareness',
      'Workplace Hygiene',
      'Introduction to Workplace Compliance',
    ],
    note: SAFETY_SCOPING_NOTE,
  },
  {
    slug: 'workplace-readiness',
    title: 'Workplace Readiness',
    area: 'Workplace Readiness',
    blurb: 'Prepare young people and new entrants for the world of work.',
    courses: [
      'CV Development',
      'Interview Preparation',
      'Career Readiness',
      'Employability Skills',
      'Workplace Behaviour',
      'Professional Conduct',
      'Financial Literacy',
      'Digital Literacy',
      'Teamwork',
      'Communication',
      'Workplace Etiquette',
    ],
  },
  {
    slug: 'microsoft-digital',
    title: 'Microsoft & Digital Skills',
    area: 'Digital',
    blurb: 'Practical digital capability for the modern workplace.',
    groups: [
      {
        name: 'Microsoft',
        courses: [
          'Microsoft Word',
          'Microsoft Excel — Beginner',
          'Microsoft Excel — Intermediate',
          'Microsoft Excel — Advanced',
          'Microsoft PowerPoint',
          'Microsoft Outlook',
          'Microsoft Teams',
          'Power BI',
        ],
      },
      {
        name: 'Digital Skills',
        courses: [
          'Digital Literacy',
          'Data Analysis',
          'Digital Workplace Skills',
          'Dashboard Literacy',
          'Digital Reporting',
          'Online Collaboration',
          'Digital Administration',
          'AI in the Workplace',
        ],
      },
      {
        name: 'Digital Marketing',
        courses: [
          'Digital Marketing Fundamentals',
          'Social Media Marketing',
          'Search Engine Optimisation',
          'Content Marketing',
          'Google Ads Fundamentals',
        ],
      },
    ],
  },
]

/** Flattened course list per category, whether grouped or not. */
export const coursesOf = (cat) =>
  cat.groups ? cat.groups.flatMap((g) => g.courses) : cat.courses

export const totalShortCourses = shortCourseCategories.reduce(
  (n, c) => n + coursesOf(c).length,
  0,
)

export const shortCourseAreas = [...new Set(shortCourseCategories.map((c) => c.area))].sort()
