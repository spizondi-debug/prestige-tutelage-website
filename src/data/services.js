// The full Prestige service ecosystem.
//
// Groups are ordered as a client journey: learn, advise, staff, manage, assure,
// house, and give back. `to` links a group to its dedicated page where one
// exists. Prestige supports the B-BBEE skills development element from the
// employer side — it is not a verification agency (see data/bbbee.js).

export const serviceGroups = [
  {
    slug: 'learning-development',
    title: 'Learning & Development',
    lead: 'The training itself — qualifications, learnerships, short courses and programmes built for your teams.',
    to: '/programmes',
    toLabel: 'Programmes & Qualifications',
    services: [
      { name: 'Qualifications', text: 'Registered qualifications across business, production, engineering, agriculture and ECD.', to: '/programmes' },
      { name: 'Learnerships', text: 'Employed (18.1) and unemployed (18.2) programmes, implemented end to end.', to: '/programmes#learnerships' },
      { name: 'Short Courses', text: 'Practical professional development across ten categories.', to: '/short-courses' },
      { name: 'Corporate Training', text: 'Programmes designed around your objectives, operation and people.', to: '/corporate-training' },
    ],
  },
  {
    slug: 'workforce-advisory',
    title: 'Workforce Advisory',
    lead: 'Understand the capability your organisation actually needs before any training is booked.',
    to: '/bbbee-consulting',
    toLabel: 'B-BBEE Skills Consulting',
    services: [
      { name: 'Skills Gap Analysis', text: 'Identify where current capability falls short of what roles and plans require.' },
      { name: 'Training Needs Analysis', text: 'Translate business objectives into a prioritised, practical training plan.' },
      { name: 'Skills Development Consulting', text: 'Guidance on skills planning, spend, reporting cycles and delivery routes.' },
      { name: 'B-BBEE Skills Development Advisory', text: 'Structuring skills initiatives that support transformation objectives.', to: '/bbbee-consulting' },
    ],
  },
  {
    slug: 'talent',
    title: 'Talent',
    lead: 'Finding the people — including the learners who become your future workforce.',
    to: '/recruitment',
    toLabel: 'Recruitment Services',
    services: [
      { name: 'Recruitment', text: 'Sourcing, screening, shortlisting and interview support for employers.', to: '/recruitment' },
      { name: 'Learner Recruitment', text: 'Specialist intake recruitment for learnership cohorts.', to: '/recruitment#learnership-recruitment' },
      { name: 'Youth Talent Sourcing', text: 'Community, graduate and entry-level sourcing for youth programmes.', to: '/recruitment' },
    ],
  },
  {
    slug: 'programme-management',
    title: 'Programme Management',
    lead: 'The administration and coordination that keeps an intervention on track.',
    services: [
      { name: 'Learner Administration', text: 'Registrations, records, attendance and progress tracking handled properly.' },
      { name: 'Workplace Monitoring', text: 'Structured monitoring of workplace learning components and mentor support.' },
      { name: 'Training Project Management', text: 'One accountable contact managing schedules, venues, facilitators and reporting.' },
    ],
  },
  {
    slug: 'assessment-quality',
    title: 'Assessment & Quality',
    lead: 'Credible assessment, moderation and quality assurance behind every result.',
    to: '/assessment-centre',
    toLabel: 'Assessment Centre',
    services: [
      { name: 'Assessment Centre', text: 'A managed environment for candidate assessment at scale.', to: '/assessment-centre' },
      { name: 'Assessment', text: 'Planned, fair assessment of learner competence against clear outcomes.' },
      { name: 'Moderation', text: 'Independent moderation that protects the integrity of assessment decisions.' },
      { name: 'Invigilation', text: 'Controlled, professional invigilation of tests and examinations.' },
    ],
  },
  {
    slug: 'business-facilities',
    title: 'Business Facilities',
    lead: 'Professional space in Ferndale, Randburg — for training, meetings, interviews and short-term office use.',
    to: '/office-rental',
    toLabel: 'Office & Training Space',
    services: [
      { name: 'Training Room Rental', text: 'Rooms set up for groups who are there to learn.', to: '/office-rental#training-rooms' },
      { name: 'Meeting Space', text: 'Professional rooms for client meetings, interviews and planning sessions.', to: '/office-rental#meeting-rooms' },
      { name: 'Office Rental', text: 'Short-term office space for project teams, consultants and facilitators.', to: '/office-rental#office-space' },
    ],
  },
  {
    slug: 'social-impact',
    title: 'Social Impact',
    lead: 'Skills programmes that create real opportunity for youth, communities and unemployed learners.',
    services: [
      { name: 'CSI Skills Programmes', text: 'Corporate social investment translated into structured, credible skills training.' },
      { name: 'Youth Development', text: 'Work-readiness and skills programmes that move young people toward employment.' },
      { name: 'Community Training', text: 'Accessible training delivered into communities, not just boardrooms.' },
    ],
  },
]
