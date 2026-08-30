// Course outlines, keyed by SAQA ID.
//
// COMPLIANCE — read before editing:
//   * Everything here is supplied by Prestige. Module titles, descriptions,
//     topics and durations are NOT inferred from a qualification's name, its
//     NQF level or its credit value, and are never filled in by pattern.
//   * A qualification with no entry here is not a bug. The detail page renders
//     the facts that ARE verified — name, NQF level, SAQA ID, credits, who it
//     suits — and states that the module breakdown is available on request.
//     It must never show invented modules to fill the space.
//   * `durationMonths` is a delivery estimate supplied by Prestige, not a
//     registered attribute of the qualification. The page labels it as such.
//   * Module counts are derived from the array, never written by hand.
//
// Names, NQF levels, SAQA IDs and credits live in programmes.js and are the
// single source of truth; nothing here restates them.

/** Shown on every course page, under Assessment Approach. */
export const assessmentApproach = [
  {
    name: 'Formative Assessments',
    text: 'Knowledge activities, assignments, practical tasks and workplace evidence completed throughout the programme.',
  },
  {
    name: 'Summative Assessment',
    text: 'A final integrated assessment, including the External Integrated Summative Assessment (EISA), where applicable.',
  },
]

/**
 * Qualified once, shown on every course page. The module breakdown describes
 * what a programme covers; it is not a statement of current registration or
 * enrolment status, which `AVAILABILITY_DISCLAIMER` in programmes.js carries.
 */
export const OUTLINE_NOTE =
  'Module structure and duration are indicative of how Prestige Tutelage delivers this qualification. Final content, sequencing and the assessment schedule are confirmed in writing when your programme is scoped.'

/** Shown instead of modules where Prestige has not supplied a breakdown. */
export const OUTLINE_ON_REQUEST =
  'A full module breakdown for this qualification is available on request. We will send the outline, the delivery schedule and the assessment arrangements once we understand who you are training and where.'

export const courseOutlines = {
  // Occupational Certificate: Project Manager — SAQA ID 101869, NQF 5, 240 credits
  101869: {
    fullName: 'Occupational Certificate: Project Manager',
    durationMonths: 12,
    modules: [
      {
        title: 'Project Management Foundations',
        text: 'Core concepts, terminology and the project life cycle.',
        topics: [
          'What defines a project, and how it differs from operational work',
          'The project life cycle from initiation to closure',
          'Project management terminology and standard documentation',
          'Roles and responsibilities across a project team',
        ],
      },
      {
        title: 'Project Initiation and Scope',
        text: 'Defining objectives, deliverables and stakeholder requirements.',
        topics: [
          'Establishing project objectives and success criteria',
          'Identifying stakeholders and gathering requirements',
          'Defining deliverables and drawing the scope boundary',
          'Producing a project charter and securing sign-off',
        ],
      },
      {
        title: 'Project Planning and Scheduling',
        text: 'Developing practical project plans, schedules and milestones.',
        topics: [
          'Breaking scope down into a work breakdown structure',
          'Sequencing activities and identifying dependencies',
          'Estimating durations and setting milestones',
          'Building and baselining a workable project schedule',
        ],
      },
      {
        title: 'Cost and Resource Management',
        text: 'Budgeting, procurement and effective resource allocation.',
        topics: [
          'Estimating costs and building a project budget',
          'Allocating people, equipment and materials across the plan',
          'Procurement planning and managing suppliers',
          'Tracking spend against budget through delivery',
        ],
      },
      {
        title: 'Risk and Quality Management',
        text: 'Managing uncertainty and maintaining project quality standards.',
        topics: [
          'Identifying, analysing and prioritising project risks',
          'Planning responses and holding a live risk register',
          'Setting quality standards and acceptance criteria',
          'Quality assurance and control through the life cycle',
        ],
      },
      {
        title: 'Team and Stakeholder Leadership',
        text: 'Communication, team leadership, collaboration and conflict resolution.',
        topics: [
          'Building and leading a project team',
          'Planning and running project communication',
          'Managing stakeholder expectations and reporting upward',
          'Negotiation, collaboration and resolving conflict',
        ],
      },
      {
        title: 'Monitoring and Project Control',
        text: 'Tracking project progress, performance and corrective actions.',
        topics: [
          'Measuring progress against the baseline plan',
          'Performance reporting and project status meetings',
          'Managing change requests and scope control',
          'Identifying variances and taking corrective action',
        ],
      },
      {
        title: 'Project Closure and Evaluation',
        text: 'Project handover, close-out reporting and lessons learned.',
        topics: [
          'Completing deliverables and securing formal acceptance',
          'Handover to the operational owner',
          'Close-out reporting and releasing project resources',
          'Capturing lessons learned for the next project',
        ],
      },
    ],
  },
}

/** The outline for a qualification, or null where none has been supplied. */
export const outlineFor = (saqaId) => courseOutlines[saqaId] ?? null

/** How many qualifications currently carry a published module breakdown. */
export const outlinedCount = Object.keys(courseOutlines).length
