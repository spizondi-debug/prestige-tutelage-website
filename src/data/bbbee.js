// B-BBEE skills development consulting.
//
// COMPLIANCE — read before editing:
//   * Prestige is a skills-development consulting and implementation partner.
//     It is NOT presented as a B-BBEE verification agency. `SCOPE_STATEMENT`
//     must appear on the page and must not be softened or removed.
//   * Never promise specific B-BBEE points, scorecard outcomes, recognition
//     levels or tax deductions. Copy describes what Prestige does, not what
//     the client will score.
//   * Anything tied to legislation or codes is qualified, never asserted as a
//     guaranteed result.

export const SCOPE_STATEMENT =
  'Prestige Tutelage provides B-BBEE skills-development consulting and implementation support. Formal B-BBEE verification and scoring remain the responsibility of an appropriately accredited verification professional or agency.'

export const OUTCOME_QUALIFIER =
  'Outcomes depend on your organisation’s circumstances and on applicable legislation, codes and programme requirements. We do not guarantee scorecard results, recognition levels or specific point outcomes.'

export const bbbeeGroups = [
  {
    slug: 'strategy',
    title: 'Strategy & Advisory',
    lead: 'Work out what your skills-development spend should actually achieve before committing it.',
    services: [
      { name: 'B-BBEE Skills Development Advisory', text: 'Guidance on structuring skills-development initiatives that align with your transformation objectives.' },
      { name: 'Skills Development Strategy', text: 'A considered plan connecting business needs, workforce gaps and development priorities.' },
      { name: 'Skills Spend Planning', text: 'Planning how development budget is allocated across interventions, cohorts and years.' },
      { name: 'Training Intervention Planning', text: 'Designing the portfolio of interventions that balances impact, capacity and obligation.' },
      { name: 'Transformation-aligned Workforce Development', text: 'Development planning that serves transformation objectives and real capability at the same time.' },
    ],
  },
  {
    slug: 'learnerships',
    title: 'Learnership Planning',
    lead: 'The planning work that decides whether a learnership succeeds long before it starts.',
    services: [
      { name: 'Learnership Planning', text: 'Selecting qualifications, cohort sizes, timelines and delivery routes that fit your operation.' },
      { name: 'Employed Learnership Planning', text: 'Structuring 18.1 programmes around existing roles, release time and progression.' },
      { name: 'Unemployed Learnership Planning', text: 'Structuring 18.2 programmes including recruitment, stipends, hosting capacity and support.' },
      { name: 'Absorption & Employment-pathway Planning', text: 'Planning support for what happens to learners after the programme ends.' },
    ],
  },
  {
    slug: 'inclusion',
    title: 'Inclusion & Youth',
    lead: 'Programmes that open opportunity where it is most needed.',
    services: [
      { name: 'Disability Skills Development Planning', text: 'Planning inclusive programmes with appropriate support, accessibility and workplace arrangements.' },
      { name: 'Youth Development Programmes', text: 'Structured programmes moving young people toward employability and work experience.' },
      { name: 'CSI Skills-development Programme Design', text: 'Turning corporate social investment into credible, well-administered skills training.' },
      { name: 'Supplier & Enterprise Development Training', text: 'Training interventions supporting suppliers and small enterprises, where relevant to your programme.' },
    ],
  },
  {
    slug: 'evidence',
    title: 'Evidence & Reporting Support',
    lead: 'The administration that makes a programme defensible when someone asks for proof.',
    services: [
      { name: 'Learner Evidence Management', text: 'Structured collection, filing and retention of learner evidence across a programme.' },
      { name: 'Training Records', text: 'Complete, retrievable training records covering attendance, progress and completion.' },
      { name: 'Skills Development Reporting Support', text: 'Support in compiling the training information your reporting cycles require.' },
      { name: 'WSP / ATR Training Evidence Support', text: 'Support in assembling training evidence for Workplace Skills Plan and Annual Training Report submissions, where appropriate to your engagement.' },
    ],
  },
]

export const bbbeeProcess = [
  { name: 'Understand', text: 'Your transformation objectives, workforce profile and current development activity.' },
  { name: 'Plan', text: 'A skills-development plan matched to real gaps, capacity and budget.' },
  { name: 'Implement', text: 'Delivery of the learnerships, qualifications and programmes in the plan.' },
  { name: 'Evidence', text: 'Learner records, training evidence and reporting support throughout.' },
]
