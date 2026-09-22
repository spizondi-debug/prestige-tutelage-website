/**
 * YES Programme management — page content.
 *
 * The B-BBEE recognition structure below is the one gazetted for the Youth
 * Employment Service: Government Gazette 41866 of 28 August 2018, read with
 * Practice Note 41975 of 12 October 2018. It is reproduced here because a
 * prospective client will look for it, not because Prestige can promise the
 * outcome — every tier depends on eligibility, absorption and verification,
 * which is why OUTCOME_QUALIFIER travels with it wherever it renders.
 *
 * Nothing here states a target figure for a particular company. Targets come
 * out of three calculations against a business's own headcount, payroll and
 * turnover, and the highest result applies — so a number on a marketing page
 * would be wrong for almost every reader.
 */

export const SCOPE_NOTE =
  'Programme rules, eligibility criteria and B-BBEE recognition requirements may change. Every client’s eligibility and targets must be assessed against the latest official YES requirements, B-BBEE Codes, gazettes and verification guidance.'

export const OUTCOME_QUALIFIER =
  'B-BBEE outcomes are not automatic or guaranteed. Recognition depends on meeting all applicable eligibility, implementation, absorption, documentary and verification requirements.'

export const FOOTER_TRUST_NOTICE =
  'Prestige Tutelage provides training, administration and implementation support. Final YES registration, B-BBEE recognition and verification outcomes remain subject to official requirements and the decisions of the relevant authorised bodies.'

export const GAZETTE_REFERENCE =
  'Government Gazette 41866 (28 August 2018), read with Practice Note 41975 (12 October 2018).'

/** What actually stops employers participating. Written from client conversations, not theory. */
export const challenges = [
  ['Working out the target', 'Three separate calculations sit behind a YES target, and the highest one applies. Getting it wrong in either direction is expensive.'],
  ['Reading the requirements', 'Eligibility, contract length, absorption and evidence rules are spread across a gazette, a practice note and updated guidance.'],
  ['Recruiting eligible youth', 'Reaching young people who qualify — and verifying that they do — takes more than posting a vacancy.'],
  ['Finding real work to do', 'A placement with no meaningful task fails the young person and produces evidence that does not stand up.'],
  ['Keeping the paperwork straight', 'Contracts, IDs, banking confirmations, attendance and exit records, per participant, for twelve months.'],
  ['Monitoring attendance and progress', 'Someone has to notice when a participant stops arriving, and act on it in time to help.'],
  ['Supporting supervisors', 'Line managers inherit a young person with no workplace experience and are rarely briefed on what is expected of them.'],
  ['Producing evidence that verifies', 'Records assembled at the end of the year rarely survive a verification review. They have to be built as you go.'],
]

export const benefits = [
  ['Youth employment impact', 'award', 'Twelve months of paid work experience for young people who have never had a payslip — the single strongest predictor of what happens to them next.'],
  ['Structured workplace experience', 'clipboard', 'Placements built around real tasks, a named supervisor and recorded progress, so the year produces capability rather than just attendance.'],
  ['Access to emerging talent', 'users', 'A twelve-month view of how someone works before any permanent decision is made. Employers who absorb are hiring people they already know.'],
  ['Transformation support', 'scale', 'Youth employment that sits inside your transformation strategy rather than beside it, with the evidence to show what was done.'],
  ['Programme administration', 'folder', 'Recruitment, contracting, records, queries and month-end all handled, so the programme does not land on an already-full HR desk.'],
  ['Audit-ready record management', 'shield', 'Evidence assembled as the programme runs — per participant, dated and complete — not reconstructed the week before verification.'],
]

/**
 * The gazetted recognition structure. Order matters: it is a ladder, and the
 * numbering is the ladder, not decoration.
 */
export const recognitionTiers = [
  {
    tier: 'Tier 1',
    requirement: 'YES target achieved, with 2.5% absorption',
    outcome: 'One B-BBEE recognition level up on the scorecard',
  },
  {
    tier: 'Tier 2',
    requirement: '1.5 times the YES target, with 5% absorption',
    outcome: 'One recognition level up, plus 3 bonus points on the overall scorecard',
  },
  {
    tier: 'Tier 3',
    requirement: 'Double the YES target, with 5% absorption',
    outcome: 'Two B-BBEE recognition levels up on the scorecard',
  },
]

export const recognitionNotes = [
  'A company must remain at or above the applicable scorecard sub-minimums to qualify for any enhancement.',
  'The work experience runs for twelve months, and absorption is measured after that period ends.',
  'Targets are calculated from your own headcount, payroll and turnover — there is no single figure that applies to every business.',
]

export const processSteps = [
  ['Business and eligibility assessment', 'We review your objectives, headcount, current B-BBEE position, operational capacity and readiness to host young people, and establish what the applicable target actually is.'],
  ['Programme design', 'An implementation plan covering targets, timelines, budget, roles, recruitment approach and the workplace requirements each placement has to meet.'],
  ['Youth recruitment and screening', 'Fair, documented recruitment: sourcing, eligibility verification, document collection and matching candidates to the work that is genuinely available.'],
  ['Workplace placement and onboarding', 'Placement into your own sites, or into an appropriate host organisation where internal capacity runs out, with induction for both the participant and the supervisor.'],
  ['Monitoring and youth support', 'Attendance, progress, documentation and problems — tracked monthly, escalated early, and supported while there is still time to fix them.'],
  ['Reporting and close-out', 'Structured programme records, progress reporting through the year, and close-out documentation prepared for your authorised stakeholders.'],
]

export const inclusions = [
  'Initial programme consultation',
  'Implementation planning',
  'Youth recruitment',
  'Applicant screening',
  'Eligibility and document verification',
  'Host-employer sourcing, where applicable',
  'Employer and host-site onboarding',
  'Youth induction',
  'Workplace-readiness support',
  'Supervisor and mentor guidance',
  'Attendance monitoring',
  'Progress tracking',
  'Issue escalation',
  'Evidence and document management',
  'Stakeholder reporting',
  'Programme close-out support',
]

export const hostChain = [
  ['Sponsoring organisation', 'Funds the opportunities and holds the YES commitment.'],
  ['Prestige Tutelage', 'Designs the programme, recruits and screens, coordinates placement, monitors progress and assembles the evidence.'],
  ['Host employer', 'Provides the workplace, the work itself and a named supervisor, subject to due diligence.'],
  ['Youth participant', 'Completes twelve months of structured, paid work experience with recorded progress.'],
]

export const whyUs = [
  ['Level 1 B-BBEE contributor', 'Your spend with us carries the recognition that a Level 1 supplier attracts.'],
  ['Black, women and youth owned', '100% black-owned, 80% women-owned and 60% youth-owned.'],
  ['Accredited training provider', 'We deliver registered qualifications, not only programme administration.'],
  ['Learnership and workplace expertise', 'Years of running workplace-based programmes where attendance, assessment and evidence all have to hold together.'],
  ['Employer and learner support', 'Two audiences, both supported — the supervisor who inherits a new participant, and the participant themselves.'],
  ['Structured monitoring and reporting', 'Monthly tracking with early escalation, so problems surface while they are still small.'],
  ['South African implementation experience', 'Programmes run in real South African workplaces, with the constraints those carry.'],
  ['Personal, responsive service', 'A named contact who knows your programme, rather than a ticket queue.'],
]

export const VISION =
  'To be a leading provider of innovative, accessible and industry-relevant skills-development solutions that empower individuals, strengthen organisations and contribute meaningfully to South Africa’s workforce development.'

export const VISION_LINE = 'Passion for Training. Purpose in Every Partnership.'

export const values = [
  ['Excellence', 'target', 'We maintain high standards in programme planning, training delivery, learner support, administration and reporting. Professionalism, continuous improvement and reliable execution guide every programme we manage.'],
  ['Integrity', 'shield', 'We act with honesty, transparency, accountability and respect. We build trusted relationships with employers, learners, host organisations and stakeholders.'],
  ['Inclusion', 'inclusion', 'We believe quality learning and workplace opportunities should be accessible. We treat every participant with dignity and provide responsive support that recognises individual needs.'],
  ['Innovation', 'spark', 'We use practical learning technology, improved delivery methods and forward-looking workforce solutions to create programmes that remain relevant in a changing economy.'],
  ['Impact', 'trend', 'We connect learning to practical application, workplace performance and career progression. Our focus is on creating meaningful results for young people, businesses and communities.'],
]

export const VALUES_CLOSING =
  'These values shape how Prestige Tutelage approaches YES Programme management — from ethical youth recruitment and supportive workplace placement to accurate monitoring, transparent reporting and meaningful programme outcomes.'

export const faqs = [
  ['What is the YES Programme?',
   'The Youth Employment Service is a business-led initiative, supported by government, that creates twelve-month paid work experiences for unemployed South African youth. Participating businesses fund and host the opportunities; the intention is that a year of real work experience changes what happens next for the young person.'],
  ['Which businesses can participate?',
   'Participation is open to registered South African businesses that meet the eligibility requirements and remain at or above the applicable B-BBEE scorecard sub-minimums. Whether your business qualifies, and on what basis, is assessed against the current official requirements during the initial consultation.'],
  ['Who qualifies as a YES youth participant?',
   'Broadly, unemployed South African youth within the qualifying age band who meet the eligibility criteria in force at the time. Eligibility is verified with documentation before placement — we do not place anyone whose eligibility cannot be evidenced.'],
  ['How are company targets determined?',
   'A YES target comes out of three separate calculations based on your headcount, payroll and turnover, and the highest of the three applies as the minimum. This is why no single figure applies to every business, and why the target is worked out before anything else in the programme is planned.'],
  ['Can youth be placed with external host employers?',
   'Yes, where internal capacity runs out. We assess and coordinate suitable host-placement opportunities with qualifying organisations, subject to due diligence, placement availability and the applicable YES requirements. The sponsoring organisation retains the commitment; the host provides the workplace and supervision.'],
  ['Can YES participation improve a company’s B-BBEE status?',
   'It can, where the applicable requirements are met. The gazetted structure allows a qualifying business that achieves its YES target with 2.5% absorption to move one recognition level; 1.5 times the target with 5% absorption adds three bonus points; and double the target with 5% absorption supports a two-level move. None of this is automatic — it depends on eligibility, implementation, absorption, documentation and verification.'],
  ['What records must participating employers maintain?',
   'Per participant: contracts, identity and eligibility documents, payment records, attendance, progress records and exit documentation, covering the full twelve months. These need to be built as the programme runs. Records assembled after the fact rarely survive a verification review.'],
  ['Does Prestige Tutelage recruit and screen candidates?',
   'Yes. We source candidates, verify eligibility, collect and check documents, and match young people to the work that is actually available. Recruitment is documented so the process itself can be evidenced.'],
  ['Can structured training be included?',
   'Yes. As an accredited training provider we can combine the work experience with registered qualifications or targeted short courses, subject to the applicable accreditation and enrolment route for the qualification concerned.'],
  ['How long does implementation take?',
   'It depends on the size of the intake and how ready the workplaces are. The assessment and design stages are usually the quickest part; recruitment, eligibility verification and workplace onboarding set the realistic start date. We give you a dated plan rather than an estimate.'],
  ['Does participation guarantee a B-BBEE level enhancement?',
   'No. Nobody can promise that, and you should be cautious of anyone who does. Recognition depends on meeting every applicable eligibility, implementation, absorption, documentary and verification requirement, and on the decisions of the relevant authorised bodies.'],
  ['How does our company get started?',
   'Request a consultation using the form on this page. We will discuss your objectives, work through eligibility and likely targets, and set out an implementation approach suited to your capacity.'],
]

/** Corporate enquiry — deliberately not a youth application form. */
export const yesFields = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'jobTitle', label: 'Job title', required: true },
  { name: 'company', label: 'Company name', required: true },
  { name: 'registration', label: 'Company registration number (optional)' },
  { name: 'industry', label: 'Industry', type: 'select', required: true,
    options: ['Manufacturing & production', 'Construction', 'Mining & resources', 'Agriculture & agri-processing',
      'Retail & wholesale', 'Financial & professional services', 'Transport & logistics', 'ICT & telecommunications',
      'Healthcare', 'Education & training', 'Public sector', 'Other'] },
  { name: 'headcount', label: 'Company size (total headcount)', type: 'select', required: true,
    options: ['Fewer than 50', '50 – 149', '150 – 499', '500 – 999', '1 000 or more'] },
  { name: 'turnover', label: 'Annual turnover range (optional)', type: 'select',
    options: ['Under R10 million', 'R10 – R50 million', 'R50 – R200 million', 'R200 – R500 million', 'Above R500 million', 'Prefer not to say'] },
  { name: 'bbbeeLevel', label: 'Current B-BBEE level (optional)', type: 'select',
    options: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8', 'Non-compliant', 'Not yet verified', 'Not sure'] },
  { name: 'opportunities', label: 'Youth opportunities being considered', type: 'select', required: true,
    options: ['Still working it out', '1 – 10', '11 – 25', '26 – 50', '51 – 100', 'More than 100'] },
  { name: 'province', label: 'Province', type: 'select', required: true,
    options: ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga',
      'Northern Cape', 'North West', 'Western Cape', 'Multiple provinces'] },
  { name: 'email', label: 'Work email address', type: 'email', required: true },
  { name: 'phone', label: 'Mobile number', type: 'tel', required: true },
  { name: 'contactPref', label: 'Preferred contact method', type: 'select', required: true,
    options: ['Email', 'Telephone call', 'WhatsApp', 'In-person meeting', 'Online meeting'] },
  { name: 'startDate', label: 'Desired implementation date', type: 'select', required: true,
    options: ['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'Still planning'] },
  { name: 'hosting', label: 'Do you need external host placements?', type: 'select', required: true,
    options: ['No — we can place everyone internally', 'Yes — we need host placements', 'Partly — some internal, some hosted', 'Not sure yet'] },
  { name: 'message', label: 'Message or additional requirements', type: 'textarea', rows: 4 },
]
