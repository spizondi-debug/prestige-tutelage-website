/**
 * Learnership application — form definition.
 *
 * Fields are declared here and rendered by a loop, so the page file stays
 * about behaviour (steps, validation, conditional logic) rather than markup.
 *
 * `showIf` receives the current values and returns whether the field applies.
 * A hidden field is never validated and never submitted.
 *
 * On documents: this site has no backend, so a file input could not deliver
 * anything. Rather than render upload controls that silently discard a
 * learner's certified ID copy, step 7 lists what is needed and asks for it by
 * email against the reference number. That is the honest behaviour on the
 * current architecture, and it is what a learner can actually act on.
 */

import { qualifications } from './programmes.js'

/** Programme options, built from the registered record so they cannot drift. */
export const programmeOptions = [
  ...qualifications
    .map((q) => `${q.name} — NQF ${q.nqf} (SAQA ${q.saqaId})`)
    .sort((a, b) => a.localeCompare(b)),
  'Another programme / not sure yet',
]

export const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
]

const LANGUAGES = [
  'Afrikaans', 'English', 'isiNdebele', 'isiXhosa', 'isiZulu', 'Sepedi',
  'Sesotho', 'Setswana', 'siSwati', 'Tshivenda', 'Xitsonga',
  'South African Sign Language', 'Other',
]

export const steps = [
  {
    key: 'programme',
    title: 'Programme',
    lead: 'Which learnership you are applying for.',
    fields: [
      { name: 'programme', label: 'Learnership applied for', type: 'select', options: programmeOptions, required: true },
      { name: 'otherProgramme', label: 'Which programme interests you?', required: true,
        showIf: (v) => v.programme === 'Another programme / not sure yet' },
      { name: 'learnerType', label: 'Are you employed or unemployed?', type: 'select', required: true, half: true,
        options: ['Unemployed', 'Employed', 'I am not sure'] },
      { name: 'location', label: 'Preferred training location', type: 'select', required: true, half: true,
        options: ['Randburg, Gauteng', 'At my workplace', 'No preference'] },
      { name: 'heard', label: 'How did you hear about this?', type: 'select', required: true, half: true,
        options: ['Prestige Tutelage website', 'Facebook', 'TikTok', 'LinkedIn', 'WhatsApp',
          'My employer', 'A friend or family member', 'Labour centre or community notice', 'Other'] },
      { name: 'appliedBefore', label: 'Have you applied to Prestige before?', type: 'select', required: true, half: true,
        options: ['No', 'Yes, this year', 'Yes, in a previous year'] },
      { name: 'commitment', label: 'Can you attend the full programme and travel to the venue?', type: 'select', required: true,
        options: ['Yes, to both', 'Yes, but transport may be difficult', 'I need to discuss this'] },
    ],
  },
  {
    key: 'personal',
    title: 'About you',
    lead: 'Use your names exactly as they appear on your ID.',
    fields: [
      { name: 'firstNames', label: 'Full names (as on ID)', required: true, half: true },
      { name: 'surname', label: 'Surname', required: true, half: true },
      { name: 'idType', label: 'Identification', type: 'select', required: true, half: true,
        options: ['South African ID', 'Passport'] },
      { name: 'idNumber', label: 'South African ID number', required: true, half: true, mono: true,
        hint: 'We check the standard ID checksum and read your date of birth and age from it.',
        showIf: (v) => v.idType !== 'Passport' },
      { name: 'passport', label: 'Passport number', required: true, half: true, mono: true,
        showIf: (v) => v.idType === 'Passport' },
      { name: 'dob', label: 'Date of birth', type: 'date', required: true, half: true },
      { name: 'gender', label: 'Gender', type: 'select', required: true, half: true,
        options: ['Female', 'Male', 'Prefer to self-describe', 'Prefer not to say'] },
      { name: 'nationality', label: 'Nationality', type: 'select', required: true, half: true,
        options: ['South African', 'Permanent resident', 'Other, with a valid permit'] },
      { name: 'populationGroup', label: 'Population group', type: 'select', required: true, half: true,
        options: ['African', 'Coloured', 'Indian', 'White', 'Other'],
        hint: 'Required for SETA and Employment Equity reporting. It is not used to decide your application.' },
      { name: 'homeLanguage', label: 'Home language', type: 'select', required: true, half: true, options: LANGUAGES },
      { name: 'mobile', label: 'Mobile number', type: 'tel', required: true, half: true, mono: true },
      { name: 'email', label: 'Email address', type: 'email', required: true, half: true },
      { name: 'address', label: 'Residential address', type: 'textarea', rows: 2, required: true },
      { name: 'city', label: 'City, town or township', required: true, half: true },
      { name: 'province', label: 'Province', type: 'select', required: true, half: true, options: PROVINCES },
      { name: 'postal', label: 'Postal code', required: true, half: true, mono: true },
      { name: 'emergencyName', label: 'Emergency contact name', required: true, half: true },
      { name: 'emergencyRelation', label: 'Their relationship to you', required: true, half: true },
      { name: 'emergencyPhone', label: 'Emergency contact number', type: 'tel', required: true, half: true, mono: true },
    ],
  },
  {
    key: 'education',
    title: 'Education',
    lead: 'What you have completed so far.',
    fields: [
      { name: 'grade', label: 'Highest school grade completed', type: 'select', required: true, half: true,
        options: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12 (Matric)', 'Did not complete Grade 8'] },
      { name: 'qualification', label: 'Highest qualification obtained', type: 'select', required: true, half: true,
        options: ['None yet', 'National Senior Certificate (Matric)', 'National Certificate (Vocational)',
          'Higher Certificate', 'Diploma', 'Degree', 'Postgraduate qualification'] },
      { name: 'institution', label: 'School, college or institution', required: true, half: true },
      { name: 'yearCompleted', label: 'Year completed', required: true, half: true, mono: true },
      { name: 'maths', label: 'Mathematics or Maths Literacy result', type: 'select', required: true, half: true,
        options: ['Mathematics — 50% or above', 'Mathematics — 40–49%', 'Mathematics — below 40%',
          'Maths Literacy — 50% or above', 'Maths Literacy — 40–49%', 'Maths Literacy — below 40%',
          'Did not take either'] },
      { name: 'english', label: 'English result', type: 'select', required: true, half: true,
        options: ['50% or above', '40–49%', 'Below 40%', 'Did not take English'] },
      { name: 'previousLearnership', label: 'Have you done a learnership before?', type: 'select', required: true, half: true,
        options: ['No', 'Yes, completed', 'Started but did not complete'] },
      { name: 'previousDetail', label: 'Which programme, provider and year?', half: true,
        showIf: (v) => v.previousLearnership && v.previousLearnership !== 'No' },
      { name: 'currentlyStudying', label: 'Are you registered for another programme now?', type: 'select', required: true, half: true,
        options: ['No', 'Yes'] },
      { name: 'computerLiteracy', label: 'Computer literacy', type: 'select', required: true, half: true,
        options: ['None', 'Basic — email and browsing', 'Intermediate — Word, Excel, email', 'Advanced'] },
      { name: 'access', label: 'What do you have access to?', type: 'select', required: true, half: true,
        options: ['A smartphone only', 'A smartphone and reliable internet',
          'A computer and internet', 'None of these reliably'] },
      { name: 'licence', label: "Driver's licence", type: 'select', required: true, half: true,
        options: ['None', "Learner's licence", 'Code A', 'Code B', 'Code C1', 'Code C', 'Code EB', 'Code EC'] },
    ],
  },
  {
    key: 'work',
    title: 'Work',
    lead: 'Your current situation. Unemployed applicants are eligible for most of our learnerships.',
    fields: [
      { name: 'employmentStatus', label: 'Current employment status', type: 'select', required: true,
        options: ['Unemployed', 'Employed', 'Self-employed', 'Studying full-time', 'On another learnership or internship'] },
      { name: 'employer', label: 'Employer name', required: true, half: true,
        showIf: (v) => v.employmentStatus === 'Employed' },
      { name: 'position', label: 'Your position', required: true, half: true,
        showIf: (v) => v.employmentStatus === 'Employed' },
      { name: 'employerContact', label: 'Employer contact person and number', half: true,
        showIf: (v) => v.employmentStatus === 'Employed' },
      { name: 'noticePeriod', label: 'Notice period', type: 'select', half: true,
        options: ['None', 'One week', 'Two weeks', 'One month', 'Longer than a month'],
        showIf: (v) => v.employmentStatus === 'Employed' },
      { name: 'stipend', label: 'Are you receiving a stipend or funded placement?', type: 'select', required: true, half: true,
        options: ['No', 'Yes'] },
      { name: 'workExperience', label: 'Previous work experience', type: 'textarea', rows: 3,
        hint: 'Include volunteer, casual or informal work — it counts.' },
      { name: 'startDate', label: 'When could you start?', type: 'select', required: true, half: true,
        options: ['Immediately', 'Within two weeks', 'Within a month', 'Longer than a month'] },
      { name: 'attendanceRisk', label: 'Anything that may affect your attendance?', type: 'select', required: true, half: true,
        options: ['No', 'Yes'] },
      { name: 'attendanceDetail', label: 'Please tell us more', type: 'textarea', rows: 2,
        showIf: (v) => v.attendanceRisk === 'Yes' },
    ],
  },
  {
    key: 'support',
    title: 'Support',
    lead: 'We ask this so we can arrange the support you need, and because the SETA requires it for reporting. It is confidential and does not count against your application.',
    fields: [
      { name: 'disability', label: 'Do you have a disability?', type: 'select', required: true, half: true,
        options: ['No', 'Yes', 'Prefer not to say'] },
      { name: 'disabilityType', label: 'Nature of disability', type: 'select', half: true,
        options: ['Sight', 'Hearing', 'Communication', 'Physical or mobility', 'Intellectual or learning',
          'Emotional or psychosocial', 'Multiple', 'Other', 'Prefer not to specify'],
        showIf: (v) => v.disability === 'Yes' },
      { name: 'supportNeeded', label: 'What support would help you?', type: 'textarea', rows: 3,
        hint: 'For example: a venue you can reach in a wheelchair, notes in large print, extra time in assessments.',
        showIf: (v) => v.disability === 'Yes' },
    ],
  },
  {
    key: 'motivation',
    title: 'Motivation',
    lead: 'In your own words. Short and honest beats long and polished.',
    fields: [
      { name: 'why', label: 'Why do you want this learnership?', type: 'textarea', rows: 3, required: true, max: 600 },
      { name: 'hope', label: 'What do you hope to achieve?', type: 'textarea', rows: 3, required: true, max: 600 },
      { name: 'strengths', label: 'What experience, skills or strengths would you bring?', type: 'textarea', rows: 3, required: true, max: 700 },
      { name: 'goals', label: 'Where would you like your career to go?', type: 'textarea', rows: 3, required: true, max: 500 },
    ],
  },
]

export const documents = [
  ['Certified copy of your SA ID or valid passport', true],
  ['Your CV', true],
  ['Your highest school certificate or results', true],
  ['Any qualification certificates', false],
  ['Proof of your residential address', false],
  ['Proof of disability, if you are asking for support', false],
]

export const consents = [
  ['consentProcessing', 'I consent to Prestige Tutelage processing my personal information for the purposes described above.'],
  ['consentTrue', 'The information I have given is true and correct.'],
  ['consentFalse', 'I understand that false information may disqualify me, or end my place on the programme.'],
  ['consentNoGuarantee', 'I understand that applying does not guarantee selection or placement.'],
  ['consentVerify', 'I authorise Prestige Tutelage to verify my identity, qualifications and employment status.'],
  ['consentComply', 'If selected, I agree to the attendance, conduct, assessment and workplace requirements.'],
]

export const POPIA_POINTS = [
  'We collect your information to recruit for and administer this learnership: checking eligibility, statutory reporting, programme administration, funder and SETA requirements, and workplace placement.',
  'We share it only where necessary, and only with authorised parties — the relevant SETA, the QCTO, a host employer, a funder, an assessment centre or a regulatory body.',
  'We keep it only for the operational and legal period required.',
  'You may ask to see the information we hold about you, or ask us to correct it.',
  'Giving us this information is voluntary, but we cannot process an incomplete application.',
]
