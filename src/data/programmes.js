// Programme areas offered by Prestige Tutelage.
//
// CONTENT INTEGRITY: qualification detail is only displayed once verified with
// Prestige. Areas carrying a `qualifications` array below have been confirmed
// (SAQA ID, NQF level and credits as supplied); areas without one are described
// without inventing detail. To add a verified qualification, append it to the
// relevant area — it renders automatically on the Programmes page, in the
// qualifications table and on the homepage.

/** Verified registered qualifications, in the order supplied by Prestige. */
export const qualifications = [
  { name: 'Management Assistant', saqaId: '101876', nqf: 5, credits: 316, area: 'office-administration' },
  { name: 'Human Resource Management Administrator', saqaId: '121150', nqf: 5, credits: 120, area: 'human-resources' },
  { name: 'Human Resource Management Officer', saqaId: '121151', nqf: 6, credits: 134, area: 'human-resources' },
  { name: 'Office Supervisor', saqaId: '118740', nqf: 5, credits: 240, area: 'office-administration' },
  { name: 'Marketing Coordinator', saqaId: '118706', nqf: 5, credits: 175, area: 'marketing' },
  { name: 'Project Manager', saqaId: '101869', nqf: 5, credits: 240, area: 'project-management' },
  { name: 'Early Childhood Development Practitioner', saqaId: '97542', nqf: 4, credits: 131, area: 'early-childhood-development' },
]

/** Qualifications belonging to a programme area, or [] if none are verified. */
export const qualificationsFor = (slug) => qualifications.filter((q) => q.area === slug)

export const programmeAreas = [
  {
    slug: 'project-management',
    title: 'Project Management',
    group: 'Business & Management',
    summary:
      'Structured project management learning that equips coordinators, team leaders and project staff to plan, run and close projects with discipline.',
    forWho: 'Project coordinators, team leaders, administrators moving into project roles.',
  },
  {
    slug: 'human-resources',
    title: 'Human Resources',
    group: 'Business & Management',
    summary:
      'Human resources programmes covering the practical foundations of HR practice, employee relations and people administration in South African workplaces.',
    forWho: 'HR administrators, HR officers, practitioners building a formal foundation.',
  },
  {
    slug: 'marketing',
    title: 'Marketing',
    group: 'Business & Management',
    summary:
      'Marketing programmes that build practical capability in marketing principles, customer insight and campaign coordination.',
    forWho: 'Marketing assistants, coordinators and staff moving into marketing roles.',
  },
  {
    slug: 'office-administration',
    title: 'Office & Administration',
    group: 'Business & Management',
    summary:
      'Administration programmes that professionalise office support — from records and correspondence to coordination and executive support.',
    forWho: 'Administrators, office coordinators, receptionists and support staff.',
  },
  {
    slug: 'management',
    title: 'Management',
    group: 'Business & Management',
    summary:
      'Management development for first-line and middle managers: leading teams, managing performance and translating operational plans into results.',
    forWho: 'Supervisors, first-line managers and high-potential employees.',
  },
  {
    slug: 'production-technology',
    title: 'Production Technology',
    group: 'Technical & Production',
    summary:
      'Production technology learning for manufacturing and process environments, building the technical and operational discipline production teams depend on.',
    forWho: 'Operators, production team members and technical staff.',
  },
  {
    slug: 'early-childhood-development',
    title: 'Early Childhood Development',
    group: 'Education & Community',
    summary:
      'Early childhood development programmes that prepare practitioners to support young children’s learning, care and development.',
    forWho: 'ECD practitioners, assistants and community-based educators.',
  },
  {
    slug: 'animal-production',
    title: 'Animal Production',
    group: 'Agriculture',
    summary:
      'Animal production programmes covering livestock husbandry, animal health awareness and the daily disciplines of productive animal enterprises.',
    forWho: 'Farm workers, livestock attendants and emerging farmers.',
  },
  {
    slug: 'poultry-production',
    title: 'Poultry Production',
    group: 'Agriculture',
    summary:
      'Focused poultry production learning — housing, feeding, flock health and production routines for broiler and layer operations.',
    forWho: 'Poultry farm teams, supervisors and emerging poultry producers.',
  },
  {
    slug: 'plant-production',
    title: 'Plant Production',
    group: 'Agriculture',
    summary:
      'Plant production programmes covering soil preparation, planting, crop maintenance and harvesting practice for commercial and emerging operations.',
    forWho: 'Crop farm workers, horticultural teams and emerging growers.',
  },
  {
    slug: 'agricultural-programmes',
    title: 'Agricultural Programmes',
    group: 'Agriculture',
    summary:
      'Broader agricultural skills development for farming enterprises and agri-processing employers, including mixed-farming and farm-management learning.',
    forWho: 'Agricultural employers, co-operatives and rural development programmes.',
  },
  {
    slug: 'custom-corporate',
    title: 'Custom Corporate Programmes',
    group: 'Custom',
    summary:
      'Programmes designed around a specific organisation’s context — combining accredited components, short courses and workplace learning into one intervention.',
    forWho: 'Employers with specific capability gaps that off-the-shelf training does not fit.',
  },
]

export const programmeGroups = [
  'Business & Management',
  'Technical & Production',
  'Agriculture',
  'Education & Community',
  'Custom',
]

export const learnerships = {
  intro:
    'A learnership is a structured, work-based route to a registered qualification. It combines classroom learning with real workplace experience under a formal agreement between the learner, the employer and the training provider.',
  employed: {
    title: 'Employed learnerships (18.1)',
    text: 'Develop your existing employees toward a full qualification while they continue working — building capability, retention and progression inside the business.',
  },
  unemployed: {
    title: 'Unemployed learnerships (18.2)',
    text: 'Bring unemployed learners into a structured programme that combines learning with workplace experience — a practical route to employability and a meaningful contribution to transformation and skills development goals.',
  },
  employerNote:
    'Learnerships can support an employer’s skills development planning, B-BBEE skills development element and sector obligations. Prestige manages implementation end to end: recruitment support, induction, training delivery, workplace monitoring, learner support and administration.',
}
