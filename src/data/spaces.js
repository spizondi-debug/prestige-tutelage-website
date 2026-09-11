// Office & training space rental, Ferndale, Randburg.
//
// COMPLIANCE — read before editing:
//   * NOTHING about the premises is asserted: no capacities, prices, square
//     metres, Wi-Fi, catering, parking, equipment, opening hours, rental
//     periods or accessibility features. None of it has been verified.
//   * `DETAILS_ON_ENQUIRY` carries that everywhere. Add a fact here only once
//     Prestige has confirmed it in writing.
//   * Each category lists what the space suits — a description of use, not a
//     specification of the room.

export const DETAILS_ON_ENQUIRY =
  'Contact Prestige for current room options, capacity, facilities, availability and pricing.'

export const spaceCategories = [
  {
    slug: 'training-rooms',
    title: 'Training Rooms',
    lead: 'Space set up for groups who are there to learn.',
    suitableFor: ['Training', 'Workshops', 'Assessments', 'Induction sessions', 'Team development'],
  },
  {
    slug: 'meeting-rooms',
    title: 'Meeting Rooms',
    lead: 'A professional room for conversations that matter.',
    suitableFor: ['Client meetings', 'Interviews', 'Workshops', 'Planning sessions'],
  },
  {
    slug: 'office-space',
    title: 'Office Space',
    lead: 'Somewhere to work when you need it, without a long lease.',
    suitableFor: [
      'Short-term office use',
      'Project teams',
      'Consultants',
      'Facilitators',
      'Temporary business requirements',
    ],
  },
  {
    slug: 'assessment-space',
    title: 'Assessment & Examination Space',
    lead: 'Controlled space for assessment, where the conditions matter as much as the room.',
    suitableFor: ['Controlled assessment sessions', 'Invigilation', 'Candidate assessments'],
  },
]

/** Space enquiry form fields. */
export const spaceFields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'company', label: 'Company' },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'telephone', label: 'Telephone', type: 'tel' },
  {
    name: 'space',
    label: 'Space required',
    type: 'select',
    required: true,
    options: [
      'Training room',
      'Meeting room',
      'Office space',
      'Assessment / examination space',
      'Not sure — please advise',
    ],
  },
  { name: 'attendees', label: 'Number of attendees' },
  { name: 'date', label: 'Preferred date', type: 'date' },
  { name: 'startTime', label: 'Start time', type: 'time' },
  { name: 'endTime', label: 'End time', type: 'time' },
  { name: 'purpose', label: 'Purpose' },
  { name: 'requirements', label: 'Additional requirements', type: 'textarea', rows: 4 },
]
