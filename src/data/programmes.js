// Prestige Tutelage programme architecture.
//
// COMPLIANCE — read before editing:
//   * Only SAQA IDs, NQF levels and credits supplied and verified by Prestige
//     appear here. Nothing is inferred, calculated or filled in by pattern.
//   * `credits` is omitted entirely where a credit value has not been supplied.
//     The UI must never render an empty or placeholder field.
//   * Nothing here asserts current registration or enrolment status. Availability
//     is qualified by `AVAILABILITY_DISCLAIMER` wherever programmes are listed.
//   * `type` describes what a programme is, not its current approval status.

/** Shown wherever programmes are listed. Do not reword without sign-off. */
export const AVAILABILITY_DISCLAIMER =
  'Programme availability is subject to current qualification registration, Prestige Tutelage’s applicable accreditation or approved delivery route, learner eligibility, workplace requirements and the relevant assessment and certification arrangements.'

/** Short form for cards and compact contexts. */
export const AVAILABILITY_SHORT =
  'Accredited / approved programme availability subject to current registration and enrolment conditions.'

export const PROGRAMME_TYPES = ['Occupational Qualification', 'Qualification']

export const TRAINING_AREAS = [
  'Business, Administration & Leadership',
  'Manufacturing & Production',
  'Engineering & Technical',
  'Agriculture & Agri-processing',
  'Education & Community Development',
]

const PRODUCTION_TECHNOLOGY_NOTE =
  'Production Technology delivery and learner registration are subject to confirmation of the applicable current accreditation, registration and enrolment route.'

const GENERIC_MANAGEMENT_NOTE =
  'Delivery subject to confirmation of the applicable Services SETA / MOU programme route.'

/**
 * Qualifications, keyed by SAQA ID (names repeat across NQF levels).
 * `credits` present only where Prestige supplied a verified credit value.
 */
export const qualifications = [
  // ---- Occupational qualifications (QCTO) ----
  {
    saqaId: '101876',
    name: 'Management Assistant',
    icon: 'calendar',
    nqf: 5,
    credits: 316,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'Senior administrators, executive assistants and office professionals taking on broader management support responsibilities.',
  },
  {
    saqaId: '121150',
    name: 'Human Resource Management Administrator',
    icon: 'people',
    nqf: 5,
    credits: 120,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'HR administrators and assistants building a formal foundation in human resource practice and people administration.',
  },
  {
    saqaId: '121151',
    name: 'Human Resource Management Officer',
    icon: 'badge',
    nqf: 6,
    credits: 134,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'HR officers and practitioners progressing into broader generalist and advisory responsibilities.',
  },
  {
    saqaId: '118740',
    name: 'Office Supervisor',
    icon: 'office',
    nqf: 5,
    credits: 240,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'Office coordinators and senior administrators supervising administrative teams and office operations.',
  },
  {
    saqaId: '118706',
    name: 'Marketing Coordinator',
    icon: 'megaphone',
    nqf: 5,
    credits: 175,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'Marketing assistants and coordinators responsible for campaign coordination, customer insight and marketing administration.',
  },
  {
    saqaId: '101869',
    name: 'Project Manager',
    icon: 'clipboard',
    nqf: 5,
    credits: 240,
    type: 'Occupational Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'Project coordinators, team leaders, administrators and employees progressing into project-management responsibilities.',
  },
  {
    saqaId: '97542',
    name: 'Early Childhood Development Practitioner',
    icon: 'childhood',
    nqf: 4,
    credits: 131,
    type: 'Occupational Qualification',
    area: 'Education & Community Development',
    forWho:
      'ECD practitioners, assistants and community-based educators supporting young children’s learning, care and development.',
  },

  // ---- Business & management ----
  {
    saqaId: '57712',
    name: 'Generic Management',
    icon: 'leadership',
    nqf: 4,
    credits: 150,
    type: 'Qualification',
    area: 'Business, Administration & Leadership',
    forWho:
      'Supervisors, team leaders and first-line managers building a broad foundation in managing people and work.',
    note: GENERIC_MANAGEMENT_NOTE,
  },

  // ---- Manufacturing & production ----
  {
    saqaId: '115723',
    name: 'Production Supervisor',
    icon: 'factory',
    nqf: 5,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Shift leaders and supervisors accountable for production teams, output and standards.',
  },
  {
    saqaId: '120037',
    name: 'Production Operator',
    icon: 'machine',
    nqf: 3,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Machine and line operators in manufacturing and process environments.',
  },
  {
    saqaId: '102580',
    name: 'Production Process Machine Operator & Assembler',
    icon: 'assembly',
    nqf: 3,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Operators and assemblers working on production machinery and assembly processes.',
  },
  {
    saqaId: '119977',
    name: 'Production Process Controller',
    icon: 'controls',
    nqf: 4,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Process controllers monitoring and adjusting production processes against specification.',
  },
  {
    saqaId: '58781',
    name: 'Production Technology',
    icon: 'technology',
    nqf: 2,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Entry-level production staff building foundational technical and operational discipline.',
    note: PRODUCTION_TECHNOLOGY_NOTE,
  },
  {
    saqaId: '58785',
    name: 'Production Technology',
    icon: 'technology',
    nqf: 3,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Production team members consolidating technical competence on the line.',
    note: PRODUCTION_TECHNOLOGY_NOTE,
  },
  {
    saqaId: '58779',
    name: 'Production Technology',
    icon: 'technology',
    nqf: 4,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Experienced production staff progressing toward technical and leading-hand responsibilities.',
    note: PRODUCTION_TECHNOLOGY_NOTE,
  },
  {
    saqaId: '103156',
    name: 'Lathe Operator',
    icon: 'lathe',
    nqf: 3,
    type: 'Qualification',
    area: 'Manufacturing & Production',
    forWho: 'Machinists and workshop staff operating lathes in engineering and manufacturing settings.',
  },

  // ---- Engineering & technical ----
  {
    saqaId: '104461',
    name: 'Engine Workshop Maintenance Mechanic',
    icon: 'mechanic',
    nqf: 5,
    type: 'Qualification',
    area: 'Engineering & Technical',
    forWho: 'Mechanics and workshop technicians maintaining and overhauling engines.',
  },
  {
    saqaId: '110318',
    name: 'Injection Moulding Machine Setter',
    icon: 'settings',
    nqf: 5,
    type: 'Qualification',
    area: 'Engineering & Technical',
    forWho: 'Setters and technicians responsible for injection moulding machine set-up and optimisation.',
  },
  {
    saqaId: '103018',
    name: 'Manufacturing Workshop Assistant',
    icon: 'workshop',
    nqf: 3,
    type: 'Qualification',
    area: 'Engineering & Technical',
    forWho: 'Workshop assistants supporting manufacturing and engineering operations.',
  },
  {
    saqaId: '102159',
    name: 'Metal Manufacturing Melting & Refining Process Controller',
    icon: 'furnace',
    nqf: 4,
    type: 'Qualification',
    area: 'Engineering & Technical',
    forWho: 'Process controllers in metal melting, casting and refining operations.',
  },

  // ---- Agriculture & agri-processing ----
  {
    saqaId: '49578',
    name: 'Poultry Production',
    icon: 'poultry',
    nqf: 3,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Poultry farm teams and supervisors managing housing, feeding, flock health and production routines.',
  },
  {
    saqaId: '49048',
    name: 'Animal Production',
    icon: 'livestock',
    nqf: 3,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Livestock attendants and farm workers responsible for daily animal husbandry.',
  },
  {
    saqaId: '48979',
    name: 'Animal Production',
    icon: 'livestock',
    nqf: 4,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Experienced livestock staff and emerging farmers taking on supervisory responsibility.',
  },
  {
    saqaId: '48975',
    name: 'Plant Production',
    icon: 'crops',
    nqf: 2,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Entry-level crop and farm workers learning soil preparation, planting and crop maintenance.',
  },
  {
    saqaId: '49009',
    name: 'Plant Production',
    icon: 'crops',
    nqf: 4,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Senior crop staff, section leaders and emerging growers managing production areas.',
  },
  {
    saqaId: '66589',
    name: 'Horticulture',
    icon: 'horticulture',
    nqf: 2,
    type: 'Qualification',
    area: 'Agriculture & Agri-processing',
    forWho: 'Horticultural and nursery staff working with plants, propagation and growing operations.',
  },
]

/** NQF levels actually present in the catalogue, ascending. */
export const nqfLevels = [...new Set(qualifications.map((q) => q.nqf))].sort((a, b) => a - b)

export const qualificationsIn = (area) => qualifications.filter((q) => q.area === area)

/** Areas that carry at least one qualification, in display order. */
export const populatedAreas = TRAINING_AREAS.filter((a) => qualificationsIn(a).length > 0)

/**
 * Who each area is typically delivered for — used as editorial lead-ins rather
 * than claims about the programmes themselves.
 */
export const areaIntros = {
  'Business, Administration & Leadership':
    'Qualifications for the administrative, HR, marketing, project and management roles that keep organisations running.',
  'Manufacturing & Production':
    'Production and process qualifications for operators, controllers and the supervisors who lead them.',
  'Engineering & Technical':
    'Technical qualifications for workshop, maintenance and process environments.',
  'Agriculture & Agri-processing':
    'Practical qualifications for farm workers, poultry teams, supervisors, emerging farmers, agricultural employers, agri-processing organisations and CSI or rural development programmes.',
  'Education & Community Development':
    'Qualifications supporting early childhood development practitioners and community-based education.',
}

/** Customised technical interventions — deliberately NOT presented as qualifications. */
export const technicalInterventions = {
  lead:
    'Alongside the qualifications above, Prestige designs customised technical interventions around a plant’s own equipment, standards and problems.',
  items: [
    'Machine operation',
    'First-line maintenance',
    '5S',
    'Lean Manufacturing',
    'Root-cause analysis',
    'Visual management',
    'Quality awareness',
    'Production reporting',
  ],
  note:
    'These are customised workplace interventions designed around your operation. They are not separate accredited qualifications.',
}

export const learnerships = {
  intro:
    'A learnership is a structured, work-based route to a registered qualification. It combines classroom learning with real workplace experience under a formal agreement between the learner, the employer and the training provider.',
  employed: {
    title: 'Employed learnerships — 18.1',
    text: 'Upskill existing employees toward recognised qualifications while they continue working — building capability, retention and progression inside the business.',
  },
  unemployed: {
    title: 'Unemployed learnerships — 18.2',
    text: 'Create structured learning and workplace opportunities for unemployed learners, combining classroom learning with real workplace exposure.',
  },
  /** What Prestige can carry on an employer's behalf. */
  support: [
    'Learner sourcing',
    'Screening',
    'Onboarding',
    'Learning agreements',
    'Induction',
    'Classroom delivery',
    'Workplace coordination',
    'Attendance management',
    'Learner support',
    'Assessments',
    'Workplace monitoring',
    'Evidence administration',
    'Reporting',
  ],
  /** Deliberately conservative: no tax or B-BBEE guarantees. */
  contributionNote:
    'Learnerships may contribute to an organisation’s broader skills-development and transformation objectives, subject to applicable legislation, codes and programme requirements.',
}

export const customCorporate = {
  lead:
    'Where an off-the-shelf programme does not fit, Prestige designs the intervention around your organisation — combining qualification components, short courses and structured workplace learning into one plan.',
  items: [
    'Blended qualification and short-course pathways',
    'Role-specific programmes built from your own processes and standards',
    'Multi-site and multi-shift delivery planning',
    'Programmes designed around CSI, youth and community objectives',
  ],
}
