// Course outlines, keyed by SAQA ID.
//
// COMPLIANCE — read before editing:
//   * Every entry carries a `source`. One is SUPPLIED by Prestige; the other
//     25 are DRAFTED — written from the occupation's subject matter for this
//     site, not transcribed from the registered SAQA curriculum, which is not
//     reachable from this project. The course page says so on the page itself
//     for a drafted outline. Check them against the registered unit standards
//     and have Prestige sign them off before the site goes public.
//   * No entry here restates a regulated fact. SAQA IDs, NQF levels and
//     credits live in programmes.js and are never copied, inferred or
//     recalculated here.
//   * `durationMonths` appears ONLY where Prestige supplied it. It is not
//     estimated from credits or level — a wrong duration is the single most
//     misleading thing this file could carry, so a missing one renders no
//     cell at all.
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

/**
 * Shown under a DRAFTED outline. The visitor is told plainly what they are
 * reading; the alternative is presenting a draft as the registered curriculum,
 * which is the failure mode this whole file is arranged to prevent.
 */
export const OUTLINE_DRAFT_NOTE =
  'This module breakdown describes the subject areas this qualification covers and how Prestige Tutelage structures its delivery. It is not a reproduction of the registered curriculum: the registered unit standards, exit level outcomes and assessment criteria are confirmed in writing when your programme is scoped.'

/**
 * Entry requirements.
 *
 * Deliberately NOT per-course. A qualification's registered entry requirements
 * are a regulated attribute set by the QCTO or the relevant quality council,
 * and this project cannot reach the registry to read them. Writing a plausible
 * "NQF 4 or equivalent" per course would be inventing a regulated fact, which
 * is the one thing the whole data layer is arranged to prevent. What is stated
 * here is true of every Prestige programme and commits to confirming the rest
 * in writing.
 */
export const ENTRY_REQUIREMENTS = [
  'Entry requirements are set by the qualification itself, and Prestige confirms them against the registered requirements for each learner before enrolment.',
  'Employed learners are usually nominated by their employer as part of a workplace skills plan; unemployed learners are recruited into a funded or sponsored intake.',
  'Where a qualification requires a workplace component, Prestige confirms the workplace, the mentor and the logbook arrangements with the employer before the programme starts.',
  'Recognition of Prior Learning may be available depending on the qualification and the learner’s evidence. Ask us and we will tell you whether it applies here.',
]

/** Shown instead of modules where Prestige has not supplied a breakdown. */
export const OUTLINE_ON_REQUEST =
  'A full module breakdown for this qualification is available on request. We will send the outline, the delivery schedule and the assessment arrangements once we understand who you are training and where.'

/**
 * Where an outline came from. This is not decoration: it drives the notice the
 * course page shows, and it is the difference between a fact and a draft.
 *
 *   SUPPLIED — given to us by Prestige. Publish as is.
 *   DRAFTED  — written for this site from the occupation's subject matter,
 *              NOT transcribed from the qualification's registered SAQA
 *              curriculum, which is not reachable from this project. Accurate
 *              to the trade and honest about its scope, but it must be checked
 *              against the registered unit standards and signed off by Prestige
 *              before the site goes to a public domain.
 *
 * Nothing in either case touches a regulated fact: SAQA IDs, NQF levels and
 * credits live in programmes.js and are never restated or inferred here.
 */
export const SUPPLIED = 'supplied'
export const DRAFTED = 'drafted'

export const courseOutlines = {
  // Occupational Certificate: Project Manager — SAQA ID 101869, NQF 5, 240 credits
  101869: {
    fullName: 'Occupational Certificate: Project Manager',
    source: SUPPLIED,
    durationMonths: 12,
    purpose: 'Prepare project practitioners to plan, run and close projects to scope, time and cost — and to lead the people and stakeholders a project depends on.',
    outcomes: [
      'Project manager or project coordinator',
      'Project administrator or project office support',
      'Team leader running delivery projects',
      'Progression toward programme or portfolio roles',
    ],
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

  101876: {
    fullName: 'Occupational Certificate: Management Assistant',
    source: DRAFTED,
    purpose: 'Prepare experienced administrators to carry senior management support — running an executive\'s diary, correspondence, records and finances to a standard the business can rely on without supervision.',
    outcomes: [
      'Executive or personal assistant to a senior manager',
      'Senior administrator in a corporate or public-sector office',
      'Office coordinator with responsibility for systems and records',
      'Progression into office supervision or operations support',
    ],
    modules: [
      {
        title: 'Business Communication and Correspondence',
        text: 'Professional writing, records and the documents an office runs on.',
        topics: [
          'Business writing: letters, memoranda, reports and minutes',
          'Managing correspondence and document version control',
          'Editing and proofreading for a professional standard',
          'Confidentiality and the handling of sensitive material',
        ],
      },
      {
        title: 'Executive and Diary Support',
        text: 'Supporting a manager\'s time, travel and commitments.',
        topics: [
          'Managing diaries, appointments and competing priorities',
          'Preparing agendas, packs and briefing notes',
          'Travel, accommodation and itinerary coordination',
          'Screening and routing enquiries on a manager\'s behalf',
        ],
      },
      {
        title: 'Meetings, Minutes and Follow-up',
        text: 'Preparing, recording and carrying meetings through to action.',
        topics: [
          'Preparing and circulating meeting documentation',
          'Taking accurate minutes under time pressure',
          'Recording resolutions and tracking action items',
          'Following up outstanding items to completion',
        ],
      },
      {
        title: 'Office Systems and Records Management',
        text: 'Filing, retrieval and the systems that keep information findable.',
        topics: [
          'Designing and maintaining a filing and retrieval system',
          'Electronic document management and naming conventions',
          'Retention, archiving and secure disposal',
          'Data protection obligations in day-to-day administration',
        ],
      },
      {
        title: 'Financial Administration Support',
        text: 'Petty cash, procurement paperwork and basic financial control.',
        topics: [
          'Petty cash, expense claims and reconciliation',
          'Raising requisitions, orders and invoices',
          'Supporting budget monitoring and expenditure reports',
          'Basic financial controls and separation of duties',
        ],
      },
      {
        title: 'Coordinating Projects and Events',
        text: 'Running the logistics behind internal projects and events.',
        topics: [
          'Planning and coordinating internal events and functions',
          'Supplier liaison, quotations and bookings',
          'Tracking timelines, budgets and deliverables',
          'Post-event reporting and reconciliation',
        ],
      },
      {
        title: 'Professional Conduct and Working Relationships',
        text: 'Behaving, communicating and problem-solving as a senior support professional.',
        topics: [
          'Professional presence, discretion and business etiquette',
          'Building working relationships across departments',
          'Handling difficult conversations and complaints',
          'Managing own workload, deadlines and development',
        ],
      },
      {
        title: 'Business Technology and Digital Tools',
        text: 'The software an office professional is expected to be fluent in.',
        topics: [
          'Word processing, spreadsheets and presentation software',
          'Shared drives, collaboration tools and version control',
          'Digital calendars, task tools and workflow',
          'Producing professional documents and templates',
        ],
      },
    ],
  },

  102159: {
    fullName: 'Occupational Certificate: Metal Manufacturing Melting and Refining Process Controller',
    source: DRAFTED,
    purpose: 'Prepare controllers to run a melting and refining operation — charge, furnace, chemistry and safety — in one of the most demanding environments in manufacturing.',
    outcomes: [
      'Melting and refining process controller',
      'Furnace operator in a foundry or smelter',
      'Metallurgical process operator',
      'Progression toward furnace or plant supervision',
    ],
    modules: [
      {
        title: 'Melting and Refining Fundamentals',
        text: 'The metallurgy behind the process you control.',
        topics: [
          'Metals, alloys and their behaviour at temperature',
          'The melting and refining process stage by stage',
          'Furnace types, construction and operation',
          'Fluxes, additives and refractory basics',
        ],
      },
      {
        title: 'Charge Preparation and Furnace Operation',
        text: 'Getting the right material in, under control.',
        topics: [
          'Charge calculation and material selection',
          'Charging procedures and sequence',
          'Furnace start-up, operation and temperature control',
          'Tapping, pouring and transfer operations',
        ],
      },
      {
        title: 'Process Monitoring and Chemistry Control',
        text: 'Steering the melt to specification.',
        topics: [
          'Sampling and analysis procedures',
          'Interpreting chemical analysis results',
          'Adjusting composition within specification',
          'Temperature measurement and control',
        ],
      },
      {
        title: 'Quality, Specification and Non-conformance',
        text: 'Proving and protecting the product.',
        topics: [
          'Product specifications and metallurgical standards',
          'In-process verification and record-keeping',
          'Handling out-of-specification heats',
          'Traceability from charge to cast product',
        ],
      },
      {
        title: 'Safety in a High-Temperature Environment',
        text: 'The specific hazards of molten metal.',
        topics: [
          'Molten metal, moisture and explosion hazards',
          'Heat, fume and radiation protection',
          'Personal protective equipment for hot work',
          'Emergency procedures, spills and evacuation',
        ],
      },
      {
        title: 'Energy, Efficiency and Reporting',
        text: 'Running the furnace economically.',
        topics: [
          'Energy consumption and cost per tonne',
          'Yield, losses and slag management',
          'Refractory life and furnace availability',
          'Shift reporting and production records',
        ],
      },
      {
        title: 'Refractory and Furnace Maintenance',
        text: 'Looking after the vessel that holds the melt.',
        topics: [
          'Refractory materials, wear and inspection',
          'Patching, repair and relining decisions',
          'Furnace availability and campaign life',
          'Planning maintenance around the production schedule',
        ],
      },
      {
        title: 'Casting, Cooling and Product Handling',
        text: 'What happens after the tap.',
        topics: [
          'Pouring, casting and mould preparation',
          'Controlled cooling and solidification',
          'Handling, marking and storing cast product',
          'Defects introduced after the melt',
        ],
      },
    ],
  },

  102580: {
    fullName: 'Occupational Certificate: Production Process Machine Operator and Assembler',
    source: DRAFTED,
    purpose: 'Prepare operators to set up and run a production machine and to assemble product to specification, repeatably and to tolerance.',
    outcomes: [
      'Machine operator in a production plant',
      'Assembly operative or line assembler',
      'Set-up and changeover operator',
      'Progression toward machine setting or line leading',
    ],
    modules: [
      {
        title: 'Machine Operation Fundamentals',
        text: 'Setting up and running a production machine.',
        topics: [
          'Machine components, controls and functions',
          'Set-up, first-off checks and approval to run',
          'Operating parameters and adjustments within limits',
          'Changeovers and product change procedures',
        ],
      },
      {
        title: 'Assembly Operations',
        text: 'Building product to specification, repeatably.',
        topics: [
          'Reading assembly drawings and work instructions',
          'Assembly sequence, fits and fastening methods',
          'Using jigs, fixtures and assembly aids',
          'Sub-assembly and final assembly checks',
        ],
      },
      {
        title: 'Measurement and Quality Control',
        text: 'Proving the product meets the specification.',
        topics: [
          'Using measuring instruments correctly',
          'Tolerances, gauges and go/no-go checks',
          'In-process and final inspection',
          'Recording results and handling rejects',
        ],
      },
      {
        title: 'Tooling, Consumables and Materials',
        text: 'Working with the right tool and material for the job.',
        topics: [
          'Selecting, fitting and caring for tooling',
          'Material types, properties and handling',
          'Consumable control and waste reduction',
          'Storage and identification of parts',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Fault Finding and Basic Maintenance',
        text: 'Reacting correctly when the machine misbehaves.',
        topics: [
          'Systematic fault finding at operator level',
          'Common machine and assembly faults',
          'Autonomous maintenance tasks',
          'Escalation and maintenance handover',
        ],
      },
      {
        title: 'Changeovers and Set-up Efficiency',
        text: 'Losing as little production as possible between jobs.',
        topics: [
          'Planning and preparing for a changeover',
          'Sequencing set-up tasks to reduce downtime',
          'Verifying the first-off before running',
          'Recording changeover times and problems',
        ],
      },
      {
        title: 'Packaging, Labelling and Dispatch Readiness',
        text: 'Finishing the job properly.',
        topics: [
          'Packing to specification and protecting product',
          'Labelling, identification and batch marking',
          'Preparing finished goods for stores or dispatch',
          'Documentation that travels with the product',
        ],
      },
    ],
  },

  103018: {
    fullName: 'Occupational Certificate: Manufacturing Workshop Assistant',
    source: DRAFTED,
    purpose: 'Build a reliable workshop assistant: someone who handles material safely, uses tools correctly and supports the trades without needing to be watched.',
    outcomes: [
      'Manufacturing workshop assistant',
      'Fabrication or workshop general worker',
      'Stores and materials assistant',
      'Progression toward trade assistant or operator roles',
    ],
    modules: [
      {
        title: 'Working in a Manufacturing Workshop',
        text: 'How a workshop runs and how to be useful in it.',
        topics: [
          'Workshop layout, sections and workflow',
          'Roles, instructions and lines of communication',
          'Housekeeping and workplace organisation',
          'Workplace conduct, timekeeping and teamwork',
        ],
      },
      {
        title: 'Hand Tools and Workshop Equipment',
        text: 'Using tools correctly and looking after them.',
        topics: [
          'Identifying and selecting hand tools',
          'Correct and safe use of common tools',
          'Portable power tools and their hazards',
          'Tool care, storage and issue control',
        ],
      },
      {
        title: 'Materials and Materials Handling',
        text: 'Moving and preparing material without damage.',
        topics: [
          'Common workshop materials and their properties',
          'Safe manual handling and lifting',
          'Using trolleys, hoists and handling equipment',
          'Identification, marking and storage of stock',
        ],
      },
      {
        title: 'Basic Fabrication Support',
        text: 'Assisting the trades who do the work.',
        topics: [
          'Measuring, marking out and cutting to size',
          'Preparing material and joint surfaces',
          'Assisting with assembly and fitting',
          'Deburring, cleaning and finishing',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Quality and Work Standards',
        text: 'Doing it right the first time.',
        topics: [
          'Following work instructions and drawings',
          'Checking your own work before passing it on',
          'Recognising and reporting defects',
          'Reducing waste and rework',
        ],
      },
      {
        title: 'Basic Measurement and Marking Out',
        text: 'Working to a size rather than by eye.',
        topics: [
          'Reading a tape, rule and basic measuring tools',
          'Units, conversions and reading a simple drawing',
          'Marking out to size on material',
          'Checking your measurement before cutting',
        ],
      },
      {
        title: 'Working Effectively in a Team',
        text: 'Being someone the workshop can rely on.',
        topics: [
          'Following instructions and confirming understanding',
          'Communicating with tradespeople and supervisors',
          'Timekeeping, attendance and workplace conduct',
          'Asking for help at the right moment',
        ],
      },
    ],
  },

  103156: {
    fullName: 'Occupational Certificate: Lathe Operator',
    source: DRAFTED,
    purpose: 'Prepare turners to set up a lathe, machine components to drawing and tolerance, and prove the work with proper measurement.',
    outcomes: [
      'Lathe operator or turner',
      'Machine shop operative',
      'Toolroom support',
      'Progression toward machinist or setter-operator',
    ],
    modules: [
      {
        title: 'Turning Fundamentals',
        text: 'The lathe, its parts and what it does.',
        topics: [
          'Lathe types, components and controls',
          'Work-holding: chucks, collets and centres',
          'Cutting principles: speed, feed and depth of cut',
          'Machine capability and its limits',
        ],
      },
      {
        title: 'Reading Drawings and Planning the Job',
        text: 'Understanding what you have been asked to make.',
        topics: [
          'Engineering drawings, views and dimensions',
          'Tolerances, surface finish and fits',
          'Planning the machining sequence',
          'Selecting material and stock size',
        ],
      },
      {
        title: 'Tooling and Set-up',
        text: 'Getting the machine ready to cut accurately.',
        topics: [
          'Tool types, geometry and material',
          'Tool setting, height and alignment',
          'Workpiece mounting, centring and run-out',
          'First-off machining and verification',
        ],
      },
      {
        title: 'Turning Operations',
        text: 'The operations a turner performs.',
        topics: [
          'Facing, parallel turning and step turning',
          'Drilling, boring and reaming on the lathe',
          'Taper turning and knurling',
          'Screw cutting and thread forms',
        ],
      },
      {
        title: 'Measurement and Quality',
        text: 'Proving the part is right.',
        topics: [
          'Verniers, micrometers and dial gauges',
          'Measuring diameters, lengths and threads',
          'In-process checks and final inspection',
          'Dealing with out-of-tolerance work',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Machine Care and Maintenance',
        text: 'Looking after the machine you depend on.',
        topics: [
          'Daily cleaning, lubrication and checks',
          'Swarf handling and coolant management',
          'Recognising wear and machine faults',
          'Reporting faults and supporting maintenance',
        ],
      },
      {
        title: 'Materials, Cutting Fluids and Tool Life',
        text: 'Choosing the right conditions for the material in the chuck.',
        topics: [
          'Common engineering materials and how they machine',
          'Selecting cutting speeds and feeds for the material',
          'Cutting fluids: purpose, selection and handling',
          'Recognising and extending tool life',
        ],
      },
    ],
  },

  104461: {
    fullName: 'Occupational Certificate: Engine Workshop Maintenance Mechanic',
    source: DRAFTED,
    purpose: 'Prepare mechanics to diagnose, strip, recondition and rebuild engines to manufacturer specification, and to stand behind the result.',
    outcomes: [
      'Engine workshop mechanic',
      'Reconditioning and rebuild technician',
      'Diesel or petrol engine fitter',
      'Progression toward workshop foreman',
    ],
    modules: [
      {
        title: 'Engine Systems and Operating Principles',
        text: 'How an engine works and why it fails.',
        topics: [
          'Engine types, cycles and major components',
          'Lubrication, cooling and fuel systems',
          'Air intake, exhaust and emissions basics',
          'Engine performance and common failure modes',
        ],
      },
      {
        title: 'Diagnosis and Fault Finding',
        text: 'Working out what is actually wrong.',
        topics: [
          'Systematic diagnostic procedure',
          'Diagnostic equipment and test procedures',
          'Interpreting symptoms, readings and wear patterns',
          'Recording findings and recommending repair',
        ],
      },
      {
        title: 'Strip, Inspect and Measure',
        text: 'Taking an engine apart properly.',
        topics: [
          'Planned stripping sequence and component marking',
          'Cleaning and preparing components for inspection',
          'Measuring wear against manufacturer limits',
          'Deciding repair, recondition or replace',
        ],
      },
      {
        title: 'Reconditioning and Repair',
        text: 'Bringing components back to specification.',
        topics: [
          'Machining and reconditioning operations',
          'Component replacement and matched assemblies',
          'Sealing, gasketing and fastener practice',
          'Torque procedures and sequences',
        ],
      },
      {
        title: 'Assembly, Testing and Commissioning',
        text: 'Putting it back together and proving it.',
        topics: [
          'Assembly to manufacturer specification',
          'Setting clearances, timing and adjustments',
          'Running-in, testing and performance verification',
          'Handover documentation and warranty conditions',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Workshop Tools, Equipment and Measurement',
        text: 'The instruments an engine job depends on.',
        topics: [
          'Hand tools, special tools and their correct use',
          'Micrometers, bore gauges and dial indicators',
          'Presses, lifting equipment and engine stands',
          'Calibration, care and storage of instruments',
        ],
      },
      {
        title: 'Job Records, Costing and Customer Communication',
        text: 'The business side of the workshop.',
        topics: [
          'Job cards, work records and time recording',
          'Parts identification, ordering and costing',
          'Quoting and explaining work to a customer',
          'Warranty, liability and documentation',
        ],
      },
    ],
  },

  110318: {
    fullName: 'Occupational Certificate: Injection Moulding Machine Setter',
    source: DRAFTED,
    purpose: 'Prepare setters to change moulds, dial in an injection moulding process and read a defective part back to the parameter that caused it.',
    outcomes: [
      'Injection moulding machine setter',
      'Process setter in a plastics plant',
      'Tooling and changeover technician',
      'Progression toward moulding supervision',
    ],
    modules: [
      {
        title: 'Injection Moulding Principles',
        text: 'What happens inside the machine and the mould.',
        topics: [
          'The injection moulding cycle stage by stage',
          'Machine components, controls and hydraulics',
          'Polymer materials, properties and behaviour',
          'Mould construction, gating and cooling',
        ],
      },
      {
        title: 'Mould Changing and Machine Set-up',
        text: 'Getting from one job to the next safely and quickly.',
        topics: [
          'Safe mould removal, handling and installation',
          'Connecting services: water, hydraulics and air',
          'Setting clamp, injection and ejection parameters',
          'First-off approval and start of production',
        ],
      },
      {
        title: 'Process Parameters and Optimisation',
        text: 'Dialling the process in and keeping it there.',
        topics: [
          'Temperature, pressure, speed and time settings',
          'Cycle time optimisation without losing quality',
          'Material drying, feeding and colour changes',
          'Documenting and repeating a proven set-up',
        ],
      },
      {
        title: 'Defect Diagnosis and Correction',
        text: 'Reading the part to fix the process.',
        topics: [
          'Common moulding defects and their causes',
          'Short shots, flash, sink marks and warpage',
          'Systematic parameter adjustment',
          'Knowing when the fault is the mould, not the setting',
        ],
      },
      {
        title: 'Quality and Production Control',
        text: 'Running the job to specification.',
        topics: [
          'Product specifications and inspection criteria',
          'In-process checks and sampling',
          'Scrap, regrind and waste control',
          'Production records and traceability',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Mould and Machine Maintenance',
        text: 'Protecting expensive tooling.',
        topics: [
          'Mould cleaning, protection and storage',
          'Preventive maintenance on machine and tool',
          'Recognising tool damage and wear',
          'Coordinating with the toolroom and maintenance',
        ],
      },
      {
        title: 'Materials, Colour and Additives',
        text: 'Getting the material side of the process right.',
        topics: [
          'Polymer grades and their processing windows',
          'Drying requirements and moisture problems',
          'Masterbatch, colour changes and purging',
          'Regrind: when it can be used and at what ratio',
        ],
      },
    ],
  },

  115723: {
    fullName: 'Occupational Certificate: Production Supervisor',
    source: DRAFTED,
    purpose: 'Prepare supervisors to own a production shift — its output, quality, cost, safety and the people on the floor — and to keep it running when it does not go to plan.',
    outcomes: [
      'Production supervisor or shift supervisor',
      'Line leader in a manufacturing plant',
      'Production team leader',
      'Progression toward production or plant management',
    ],
    modules: [
      {
        title: 'The Production Supervisor\'s Role',
        text: 'Leading a shift and owning its output.',
        topics: [
          'Accountability for output, quality, cost and safety',
          'Shift handover and production meetings',
          'Delegating and supervising within your authority',
          'Escalating problems to the right level',
        ],
      },
      {
        title: 'Planning and Controlling Production',
        text: 'Turning a production plan into a working shift.',
        topics: [
          'Interpreting production plans and schedules',
          'Allocating labour, machines and materials',
          'Monitoring output against target through the shift',
          'Responding to breakdowns, shortages and delays',
        ],
      },
      {
        title: 'Quality Management on the Line',
        text: 'Holding the standard while the line runs.',
        topics: [
          'Quality standards, specifications and tolerances',
          'In-process inspection and control points',
          'Identifying, isolating and reporting non-conformance',
          'Root cause analysis and corrective action',
        ],
      },
      {
        title: 'Leading a Production Team',
        text: 'Getting performance from the people on the floor.',
        topics: [
          'Briefing, instructing and coaching operators',
          'Managing attendance, discipline and conduct',
          'Performance standards and constructive feedback',
          'Building a team that raises problems early',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Continuous Improvement and Reporting',
        text: 'Making the line better shift after shift.',
        topics: [
          'Waste, downtime and efficiency measures',
          'Basic lean and continuous improvement tools',
          'Production records, reports and data accuracy',
          'Presenting shift performance to management',
        ],
      },
      {
        title: 'Cost, Waste and Productivity',
        text: 'Running the shift economically, not just on time.',
        topics: [
          'Labour, material and energy cost on a shift',
          'Identifying and costing waste and rework',
          'Productivity measures and how to move them',
          'Balancing output, cost and quality decisions',
        ],
      },
      {
        title: 'Maintenance Liaison and Equipment Availability',
        text: 'Keeping the plant running.',
        topics: [
          'Planned maintenance and its effect on the schedule',
          'Reporting breakdowns with useful detail',
          'Prioritising repairs against production demand',
          'Autonomous maintenance by the production team',
        ],
      },
    ],
  },

  118706: {
    fullName: 'Occupational Certificate: Marketing Coordinator',
    source: DRAFTED,
    purpose: 'Prepare marketing coordinators to run campaigns end to end — research, planning, content, suppliers and measurement — and to report honestly on what the activity achieved.',
    outcomes: [
      'Marketing coordinator or marketing assistant',
      'Campaign and content coordinator',
      'Events and promotions coordinator',
      'Progression toward marketing officer or brand coordinator',
    ],
    modules: [
      {
        title: 'Marketing Foundations',
        text: 'How marketing works and where the coordinator fits.',
        topics: [
          'The marketing function, mix and value proposition',
          'Understanding markets, segments and customer needs',
          'Positioning, brand and messaging basics',
          'The coordinator\'s role in the marketing cycle',
        ],
      },
      {
        title: 'Market and Customer Research',
        text: 'Finding out what is actually happening in the market.',
        topics: [
          'Planning and running basic market research',
          'Sources of secondary data and how to use them',
          'Analysing customer insight and competitor activity',
          'Turning findings into recommendations',
        ],
      },
      {
        title: 'Campaign Planning and Coordination',
        text: 'Getting a campaign from brief to delivery.',
        topics: [
          'Interpreting a brief and setting objectives',
          'Planning campaign activities, channels and timing',
          'Coordinating suppliers, agencies and internal teams',
          'Managing campaign budgets and approvals',
        ],
      },
      {
        title: 'Content, Digital and Social Channels',
        text: 'Producing and publishing across the channels a brand uses.',
        topics: [
          'Planning a content calendar',
          'Producing copy and coordinating creative assets',
          'Website, email and social channel administration',
          'Brand consistency across every channel',
        ],
      },
      {
        title: 'Events, Promotions and Sales Support',
        text: 'Marketing activity that happens face to face.',
        topics: [
          'Coordinating exhibitions, launches and promotions',
          'Producing marketing collateral and merchandise',
          'Supporting the sales team with materials and leads',
          'Logistics, budgets and post-event reporting',
        ],
      },
      {
        title: 'Measurement and Reporting',
        text: 'Showing what the activity achieved.',
        topics: [
          'Selecting measures that match the objective',
          'Collecting campaign and channel performance data',
          'Interpreting results and reporting to management',
          'Recommending improvements for the next cycle',
        ],
      },
      {
        title: 'Budgets, Suppliers and Procurement',
        text: 'Running marketing spend properly.',
        topics: [
          'Building and tracking a campaign budget',
          'Briefing agencies, printers and suppliers',
          'Quotations, purchase orders and invoice reconciliation',
          'Managing supplier performance and deadlines',
        ],
      },
      {
        title: 'Brand Governance and Compliance',
        text: 'Protecting the brand and staying inside the rules.',
        topics: [
          'Applying brand guidelines and asset libraries',
          'Approval workflows and sign-off',
          'Advertising standards and consumer protection basics',
          'Permissions, image rights and data protection in marketing',
        ],
      },
    ],
  },

  118740: {
    fullName: 'Occupational Certificate: Office Supervisor',
    source: DRAFTED,
    purpose: 'Move capable administrators into supervision: owning an office\'s workflow, budget, records and service standards, and getting the work done through a team rather than alone.',
    outcomes: [
      'Office supervisor or office manager',
      'Administration team leader',
      'Operations or facilities coordinator',
      'Progression into business or branch administration management',
    ],
    modules: [
      {
        title: 'Supervising an Office Function',
        text: 'Moving from doing the work to leading the people who do it.',
        topics: [
          'The shift from administrator to supervisor',
          'Setting expectations, standards and priorities',
          'Delegating work and following through',
          'Supervising within your authority and escalating well',
        ],
      },
      {
        title: 'Workflow, Systems and Office Operations',
        text: 'Designing how the work moves through the office.',
        topics: [
          'Mapping and improving office workflows',
          'Office systems, procedures and standard documents',
          'Managing office facilities, equipment and supplies',
          'Service levels and turnaround standards',
        ],
      },
      {
        title: 'Leading and Developing a Team',
        text: 'Getting the best from a small team day to day.',
        topics: [
          'Team communication, briefings and meetings',
          'Coaching, on-the-job training and feedback',
          'Managing performance and addressing under-performance',
          'Motivation, recognition and team culture',
        ],
      },
      {
        title: 'Administrative and Financial Control',
        text: 'Budgets, procurement and the controls behind them.',
        topics: [
          'Preparing and monitoring an office budget',
          'Procurement, quotations and supplier management',
          'Cost control and expenditure reporting',
          'Asset registers, stock and consumables',
        ],
      },
      {
        title: 'Records, Information and Compliance',
        text: 'Keeping information accurate, secure and lawful.',
        topics: [
          'Records management and retention practice',
          'Information security and data protection duties',
          'Health, safety and housekeeping in an office',
          'Business continuity and contingency arrangements',
        ],
      },
      {
        title: 'Customer and Stakeholder Service',
        text: 'Handling internal and external service demands.',
        topics: [
          'Service standards for internal and external clients',
          'Managing complaints and difficult interactions',
          'Coordinating across departments and suppliers',
          'Reporting on service performance',
        ],
      },
      {
        title: 'Meetings, Reporting and Communication',
        text: 'Keeping the office and its managers informed.',
        topics: [
          'Planning and chairing operational meetings',
          'Producing management and status reports',
          'Communicating decisions and changes to the team',
          'Written and verbal communication standards',
        ],
      },
      {
        title: 'Improving Office Operations',
        text: 'Making the function work better over time.',
        topics: [
          'Identifying bottlenecks and duplicated effort',
          'Simplifying and documenting procedures',
          'Introducing and embedding a change of process',
          'Measuring whether an improvement worked',
        ],
      },
    ],
  },

  119977: {
    fullName: 'Occupational Certificate: Production Process Controller',
    source: DRAFTED,
    purpose: 'Prepare controllers to hold a production process inside its operating window — reading its data, correcting drift and proving the product meets specification.',
    outcomes: [
      'Production process controller',
      'Process operator on a controlled plant',
      'Quality and process monitoring role',
      'Progression toward process supervision',
    ],
    modules: [
      {
        title: 'Controlling a Production Process',
        text: 'Holding a process inside its operating window.',
        topics: [
          'Process flow, inputs, outputs and control points',
          'Operating parameters, set points and limits',
          'Interpreting instrumentation and process data',
          'Making controlled adjustments and recording them',
        ],
      },
      {
        title: 'Process Monitoring and Data',
        text: 'Reading what the process is telling you.',
        topics: [
          'Collecting and recording process data accurately',
          'Trend analysis and recognising drift',
          'Basic statistical process control',
          'Escalating out-of-specification conditions',
        ],
      },
      {
        title: 'Quality Assurance in Process',
        text: 'Building quality in rather than inspecting it in.',
        topics: [
          'Product specifications and quality standards',
          'Sampling, testing and in-process verification',
          'Non-conformance, containment and disposition',
          'Corrective and preventive action',
        ],
      },
      {
        title: 'Coordinating Production Resources',
        text: 'Keeping the process supplied and staffed.',
        topics: [
          'Coordinating materials, utilities and services',
          'Scheduling around maintenance and changeovers',
          'Communicating across shifts and departments',
          'Managing process documentation',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Process Improvement and Reporting',
        text: 'Improving yield, cost and consistency.',
        topics: [
          'Identifying losses, waste and downtime causes',
          'Problem solving and root cause techniques',
          'Supporting process improvement projects',
          'Production reporting and shift documentation',
        ],
      },
      {
        title: 'Utilities, Services and Process Support',
        text: 'The services the process cannot run without.',
        topics: [
          'Steam, air, water and power in the process',
          'Monitoring utility supply and consumption',
          'Recognising a services fault versus a process fault',
          'Coordinating with engineering and utilities staff',
        ],
      },
      {
        title: 'Shift Coordination and Handover',
        text: 'Passing a live process safely between shifts.',
        topics: [
          'Structured handover of a running process',
          'Communicating deviations and interventions made',
          'Coordinating with laboratory, stores and maintenance',
          'Keeping the shift log complete and accurate',
        ],
      },
    ],
  },

  120037: {
    fullName: 'Occupational Certificate: Production Operator',
    source: DRAFTED,
    purpose: 'Build a competent production operator: someone who runs equipment to procedure, catches quality problems early and works safely alongside a team.',
    outcomes: [
      'Production operator or machine operator',
      'Manufacturing line operative',
      'Packing and finishing operator',
      'Progression toward senior operator or setter',
    ],
    modules: [
      {
        title: 'Working in a Production Environment',
        text: 'How a production floor is organised and where the operator fits.',
        topics: [
          'The production process from input to finished product',
          'Roles, responsibilities and lines of communication',
          'Shift routines, handover and instructions',
          'Housekeeping and workplace organisation',
        ],
      },
      {
        title: 'Operating Production Equipment',
        text: 'Running machinery correctly and safely.',
        topics: [
          'Pre-start checks and safe start-up',
          'Operating to standard operating procedures',
          'Monitoring machine performance during a run',
          'Safe shutdown and end-of-run procedures',
        ],
      },
      {
        title: 'Materials Handling and Product Flow',
        text: 'Moving material without damage or delay.',
        topics: [
          'Receiving, staging and issuing materials',
          'Safe manual handling and lifting techniques',
          'Using handling equipment correctly',
          'Stock accuracy and preventing product damage',
        ],
      },
      {
        title: 'Quality at the Workstation',
        text: 'Catching problems before they move down the line.',
        topics: [
          'Reading specifications and work instructions',
          'Basic measurement and in-process checks',
          'Identifying defects and non-conforming product',
          'Reporting quality problems promptly',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Basic Maintenance and Fault Reporting',
        text: 'Keeping equipment running and knowing when to stop.',
        topics: [
          'Operator-level cleaning, lubrication and checks',
          'Recognising abnormal noise, vibration and output',
          'Reporting faults clearly and accurately',
          'Supporting planned maintenance activity',
        ],
      },
      {
        title: 'Teamwork and Communication on the Line',
        text: 'Working with the people around you.',
        topics: [
          'Communicating clearly during a running shift',
          'Shift handover and passing on problems',
          'Supporting new operators on the line',
          'Workplace conduct, attendance and reliability',
        ],
      },
      {
        title: 'Waste, Efficiency and Improvement',
        text: 'Producing more with less.',
        topics: [
          'Recognising the main sources of waste at your station',
          'Reducing scrap, rework and material loss',
          'Suggesting and testing small improvements',
          'Understanding your effect on the whole line',
        ],
      },
    ],
  },

  121150: {
    fullName: 'Occupational Certificate: Human Resource Management Administrator',
    source: DRAFTED,
    purpose: 'Build a working foundation in human resource administration: the records, payroll input, recruitment support and statutory paperwork that keep an HR function accurate and compliant.',
    outcomes: [
      'HR administrator or HR assistant',
      'Payroll and benefits administrator',
      'Recruitment and onboarding coordinator',
      'Training and skills-development administrator',
    ],
    modules: [
      {
        title: 'Human Resource Administration Foundations',
        text: 'The HR function, its records and the administrator\'s role in it.',
        topics: [
          'The role and structure of the HR function',
          'HR documentation, forms and standard records',
          'Confidentiality and the handling of employee information',
          'Working with line managers and employees',
        ],
      },
      {
        title: 'Recruitment and Onboarding Administration',
        text: 'Supporting hiring from advert to first day.',
        topics: [
          'Preparing adverts and managing applications',
          'Coordinating shortlisting, interviews and feedback',
          'Preparing offers, contracts and appointment records',
          'Onboarding administration and induction support',
        ],
      },
      {
        title: 'Employee Records and HR Information',
        text: 'Maintaining accurate, complete and lawful employee data.',
        topics: [
          'Creating and maintaining employee files',
          'HR information systems and data capture accuracy',
          'Employment changes, transfers and terminations',
          'Statutory records and reporting obligations',
        ],
      },
      {
        title: 'Payroll and Benefits Administration',
        text: 'The HR side of pay, leave and benefits.',
        topics: [
          'Payroll input, verification and supporting documents',
          'Leave administration, balances and records',
          'Benefit enrolment and member administration',
          'Resolving pay and benefit queries',
        ],
      },
      {
        title: 'Conditions of Employment and Compliance',
        text: 'The legal framework an HR administrator works inside.',
        topics: [
          'Basic conditions of employment in practice',
          'Employment equity and skills development reporting',
          'Health and safety administration in the workplace',
          'Supporting disciplinary and grievance record-keeping',
        ],
      },
      {
        title: 'Training and Development Administration',
        text: 'Coordinating learning and keeping the evidence in order.',
        topics: [
          'Coordinating training schedules and attendance',
          'Learner records, evidence files and certification',
          'Supporting workplace skills planning and reporting',
          'Working with providers, SETAs and funding processes',
        ],
      },
      {
        title: 'HR Systems and Digital Tools',
        text: 'Working accurately inside the systems HR runs on.',
        topics: [
          'HR information systems and self-service portals',
          'Data capture accuracy and validation',
          'Producing standard HR reports and extracts',
          'Document management and electronic filing',
        ],
      },
      {
        title: 'Employee Support and Service',
        text: 'Being the first point of contact for the workforce.',
        topics: [
          'Handling employee queries professionally',
          'Explaining policy and procedure clearly',
          'Escalating sensitive matters appropriately',
          'Supporting wellness and employee assistance administration',
        ],
      },
    ],
  },

  121151: {
    fullName: 'Occupational Certificate: Human Resource Management Officer',
    source: DRAFTED,
    purpose: 'Equip HR practitioners to run the operational HR function — resourcing, employee relations, performance and statutory reporting — and to advise line managers with evidence rather than opinion.',
    outcomes: [
      'HR officer or HR generalist',
      'Employee relations practitioner',
      'Recruitment and talent officer',
      'Progression toward HR business partner or HR manager',
    ],
    modules: [
      {
        title: 'The HR Officer Role and Operating Context',
        text: 'Where HR sits in an organisation and what an officer owns.',
        topics: [
          'The HR value chain and the officer\'s accountability',
          'Aligning HR practice with business objectives',
          'Advising line managers with confidence and evidence',
          'Professional ethics and the limits of the role',
        ],
      },
      {
        title: 'Resourcing and Talent Acquisition',
        text: 'Running a hiring process end to end.',
        topics: [
          'Workforce planning and job profiling',
          'Sourcing strategies and selection methods',
          'Structured interviewing and fair selection decisions',
          'Onboarding, probation and early retention',
        ],
      },
      {
        title: 'Employee Relations and Discipline',
        text: 'Managing conduct, capability and conflict lawfully.',
        topics: [
          'The employment relationship and workplace rules',
          'Incapacity, poor performance and misconduct processes',
          'Grievance handling and workplace conflict',
          'Preparing for and participating in formal proceedings',
        ],
      },
      {
        title: 'Performance and Development',
        text: 'Managing how performance is set, reviewed and improved.',
        topics: [
          'Setting objectives and performance standards',
          'Conducting reviews and giving developmental feedback',
          'Identifying skills gaps and planning interventions',
          'Career pathing, succession and talent retention',
        ],
      },
      {
        title: 'Reward, Benefits and Payroll Governance',
        text: 'Pay structures and the controls around them.',
        topics: [
          'Reward principles and pay structures',
          'Job grading and internal equity',
          'Benefits administration and governance',
          'Payroll controls, audit trails and query resolution',
        ],
      },
      {
        title: 'Employment Law and Statutory Reporting',
        text: 'Compliance obligations the officer is accountable for.',
        topics: [
          'Applying labour legislation in daily decisions',
          'Employment equity planning and reporting',
          'Skills development levies and workplace skills plans',
          'Occupational health and safety responsibilities',
        ],
      },
      {
        title: 'HR Data, Reporting and Improvement',
        text: 'Using HR information to advise the business.',
        topics: [
          'Selecting and tracking meaningful HR measures',
          'Producing management reports from HR data',
          'Interpreting turnover, absence and cost information',
          'Recommending and evaluating HR interventions',
        ],
      },
      {
        title: 'Organisational Development and Change',
        text: 'Supporting the business through structural and cultural change.',
        topics: [
          'Organisational structure, job design and role clarity',
          'Supporting restructuring and change processes',
          'Culture, engagement and employee voice',
          'Consultation and communication during change',
        ],
      },
    ],
  },

  48975: {
    fullName: 'National Certificate: Plant Production',
    source: DRAFTED,
    purpose: 'Give entry-level crop workers the basics of plant production: soil preparation, planting, crop care and safe chemical handling.',
    outcomes: [
      'Crop or farm worker',
      'Planting and harvesting team member',
      'Irrigation assistant',
      'Progression toward senior farm worker',
    ],
    modules: [
      {
        title: 'Plant Production Basics',
        text: 'Plants, soil and the growing season.',
        topics: [
          'Plant structure, growth and requirements',
          'Soil types, structure and basic soil health',
          'The production cycle from land preparation to harvest',
          'Daily routines and instructions on a crop farm',
        ],
      },
      {
        title: 'Soil Preparation and Planting',
        text: 'Getting the crop into the ground properly.',
        topics: [
          'Land clearing and seedbed preparation',
          'Planting methods, spacing and depth',
          'Seed and seedling handling',
          'Working accurately to instruction',
        ],
      },
      {
        title: 'Crop Maintenance',
        text: 'Looking after the crop while it grows.',
        topics: [
          'Weeding, thinning and crop hygiene',
          'Irrigation methods and water application',
          'Basic fertiliser application and safety',
          'Monitoring crop condition and reporting',
        ],
      },
      {
        title: 'Pests, Diseases and Crop Protection',
        text: 'Recognising trouble and responding safely.',
        topics: [
          'Common pests, diseases and weeds',
          'Recognising damage and reporting it',
          'Safe handling and application of crop chemicals',
          'Protective equipment and re-entry periods',
        ],
      },
      {
        title: 'Harvesting and Post-harvest Handling',
        text: 'Getting the crop off without losing it.',
        topics: [
          'Harvest readiness and harvesting methods',
          'Handling produce to avoid damage',
          'Grading, packing and storage basics',
          'Recording harvest quantities',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Farm Equipment and Implements',
        text: 'Using and looking after the tools of the job.',
        topics: [
          'Hand tools and implements used in crop work',
          'Safe operation of equipment under instruction',
          'Daily checks, cleaning and storage',
          'Reporting damage and faults',
        ],
      },
      {
        title: 'Working Effectively on a Farm Team',
        text: 'Being a reliable member of a crop crew.',
        topics: [
          'Following instructions accurately',
          'Communicating with the team and supervisor',
          'Timekeeping, attendance and conduct',
          'Working safely alongside machinery and others',
        ],
      },
    ],
  },

  48979: {
    fullName: 'National Certificate: Animal Production',
    source: DRAFTED,
    purpose: 'Prepare experienced livestock staff to manage a herd or flock — nutrition, breeding, herd health and the records that drive the decisions.',
    outcomes: [
      'Livestock supervisor or herd manager',
      'Emerging farmer running a livestock enterprise',
      'Farm section leader',
      'Progression toward farm management',
    ],
    modules: [
      {
        title: 'Managing a Livestock Enterprise',
        text: 'Taking responsibility for a herd or flock.',
        topics: [
          'Production systems and enterprise objectives',
          'Planning the production calendar',
          'Supervising and organising farm workers',
          'Coordinating with veterinary and technical support',
        ],
      },
      {
        title: 'Nutrition and Feed Management',
        text: 'Feeding for production, not just survival.',
        topics: [
          'Nutritional requirements by class and stage',
          'Ration formulation principles and supplementation',
          'Pasture and grazing management',
          'Feed budgeting, storage and cost control',
        ],
      },
      {
        title: 'Breeding and Reproduction',
        text: 'Managing the reproductive cycle.',
        topics: [
          'Reproductive cycles and breeding seasons',
          'Selection, mating systems and record-based decisions',
          'Pregnancy, birthing and neonatal care',
          'Reproductive performance measures',
        ],
      },
      {
        title: 'Herd Health Management',
        text: 'Preventing disease rather than reacting to it.',
        topics: [
          'Herd health programmes and preventive schedules',
          'Disease recognition, isolation and treatment',
          'Parasite and vector control strategies',
          'Working with veterinary services and withdrawal periods',
        ],
      },
      {
        title: 'Production Records and Decision Making',
        text: 'Using records to run the enterprise better.',
        topics: [
          'Recording systems and data accuracy',
          'Production, growth and reproductive measures',
          'Interpreting records to guide decisions',
          'Reporting enterprise performance',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Marketing and Enterprise Economics',
        text: 'Selling the product and knowing what it cost.',
        topics: [
          'Market channels, timing and price factors',
          'Preparing and presenting animals for market',
          'Production costs, margins and gross profit',
          'Basic enterprise budgets and decisions',
        ],
      },
      {
        title: 'Infrastructure, Equipment and Farm Maintenance',
        text: 'Keeping the enterprise\'s assets working.',
        topics: [
          'Planning and supervising infrastructure maintenance',
          'Water systems, fencing and handling facilities',
          'Equipment servicing schedules and records',
          'Managing contractors and maintenance spend',
        ],
      },
    ],
  },

  49009: {
    fullName: 'National Certificate: Plant Production',
    source: DRAFTED,
    purpose: 'Prepare senior crop staff to manage a production unit — soil, water, crop protection, harvest and the costing behind it.',
    outcomes: [
      'Crop production supervisor',
      'Section leader on a commercial farm',
      'Emerging grower managing production areas',
      'Progression toward farm or production management',
    ],
    modules: [
      {
        title: 'Managing a Crop Production Unit',
        text: 'Running a production area, not just working in it.',
        topics: [
          'Planning the cropping programme and calendar',
          'Organising labour, equipment and inputs',
          'Supervising and instructing farm workers',
          'Coordinating with technical and agronomic advisers',
        ],
      },
      {
        title: 'Soil, Fertility and Nutrition',
        text: 'Feeding the soil and the crop.',
        topics: [
          'Soil sampling and interpreting analysis',
          'Fertiliser programmes and application methods',
          'Soil conservation and structure management',
          'Organic matter, amendments and pH correction',
        ],
      },
      {
        title: 'Irrigation and Water Management',
        text: 'Applying water precisely.',
        topics: [
          'Irrigation systems and their selection',
          'Scheduling irrigation to crop requirement',
          'System maintenance and troubleshooting',
          'Water use efficiency and record-keeping',
        ],
      },
      {
        title: 'Integrated Crop Protection',
        text: 'Managing pests, diseases and weeds as a programme.',
        topics: [
          'Scouting, monitoring and thresholds',
          'Integrated pest management principles',
          'Chemical selection, calibration and safe application',
          'Resistance management and withdrawal periods',
        ],
      },
      {
        title: 'Harvest, Quality and Marketing',
        text: 'Turning a crop into a saleable product.',
        topics: [
          'Harvest planning, timing and logistics',
          'Quality standards, grading and packing',
          'Post-harvest handling, cooling and storage',
          'Yield analysis, costing and production records',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Mechanisation and Equipment Management',
        text: 'Running the machinery a crop unit depends on.',
        topics: [
          'Selecting implements for the operation',
          'Calibration of planters, sprayers and spreaders',
          'Maintenance planning and equipment records',
          'Operator supervision and safe practice',
        ],
      },
      {
        title: 'Farm Records, Costing and Compliance',
        text: 'The paperwork behind a production unit.',
        topics: [
          'Production, input and application records',
          'Enterprise costing and gross margin analysis',
          'Traceability and food safety requirements',
          'Regulatory and certification record-keeping',
        ],
      },
    ],
  },

  49048: {
    fullName: 'National Certificate: Animal Production',
    source: DRAFTED,
    purpose: 'Build a competent livestock worker: daily husbandry, feeding, health checks and handling, done safely and recorded properly.',
    outcomes: [
      'Livestock attendant or stockperson',
      'General farm worker on a livestock enterprise',
      'Herd or flock assistant',
      'Progression toward senior stockperson',
    ],
    modules: [
      {
        title: 'Livestock Production Basics',
        text: 'The animals, the systems and the daily job.',
        topics: [
          'Common livestock species and production systems',
          'Animal anatomy and physiology basics',
          'Daily husbandry routines and responsibilities',
          'Handling animals calmly and safely',
        ],
      },
      {
        title: 'Feeding and Watering Livestock',
        text: 'Keeping animals properly fed and watered.',
        topics: [
          'Feed types, rations and feeding routines',
          'Grazing, supplementation and feed storage',
          'Water provision, quality and troughs',
          'Recognising under-condition and over-condition',
        ],
      },
      {
        title: 'Animal Health and Welfare',
        text: 'Spotting problems and doing the right thing.',
        topics: [
          'Signs of health and signs of illness',
          'Routine treatments, dosing and vaccination',
          'Parasite control and hygiene',
          'Animal welfare principles in daily practice',
        ],
      },
      {
        title: 'Housing, Handling and Infrastructure',
        text: 'The facilities animals depend on.',
        topics: [
          'Housing, pens, kraals and shelter',
          'Handling facilities, races and restraint',
          'Fencing, gates and infrastructure maintenance',
          'Cleaning, bedding and waste management',
        ],
      },
      {
        title: 'Records and Identification',
        text: 'Knowing which animal is which and what happened to it.',
        topics: [
          'Animal identification and marking methods',
          'Recording births, movements and treatments',
          'Basic production records',
          'Reporting to the supervisor accurately',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Grazing and Camp Management',
        text: 'Managing the land the animals live on.',
        topics: [
          'Camps, rotation and rest periods',
          'Recognising over-grazing and veld condition',
          'Water points, licks and supplementary feeding sites',
          'Moving stock between camps safely',
        ],
      },
      {
        title: 'Farm Equipment and Vehicles',
        text: 'Using the equipment the job requires.',
        topics: [
          'Common farm implements and their use',
          'Safe operation of vehicles and tractors on a farm',
          'Daily checks and basic maintenance',
          'Reporting faults and damage',
        ],
      },
    ],
  },

  49578: {
    fullName: 'National Certificate: Poultry Production',
    source: DRAFTED,
    purpose: 'Prepare poultry staff to run a house properly: environment, feed, water, flock health and the records that show how the flock is performing.',
    outcomes: [
      'Poultry house attendant or stockperson',
      'Broiler or layer unit worker',
      'Poultry farm supervisor in training',
      'Progression toward unit or farm supervision',
    ],
    modules: [
      {
        title: 'Poultry Production Systems',
        text: 'How a poultry enterprise is set up and run.',
        topics: [
          'Broiler, layer and breeder production systems',
          'The production cycle and its critical stages',
          'Housing types, stocking density and equipment',
          'Roles and daily routines on a poultry unit',
        ],
      },
      {
        title: 'Housing, Environment and Ventilation',
        text: 'Controlling the shed the birds live in.',
        topics: [
          'Temperature, humidity and ventilation control',
          'Lighting programmes and their effect on birds',
          'Litter management and shed preparation',
          'Monitoring and adjusting house conditions',
        ],
      },
      {
        title: 'Feeding and Watering',
        text: 'Getting nutrition and water right, every day.',
        topics: [
          'Feed types, rations and feeding programmes',
          'Feed storage, handling and waste control',
          'Water supply, quality and drinker management',
          'Monitoring intake and recognising problems',
        ],
      },
      {
        title: 'Flock Health and Biosecurity',
        text: 'Keeping disease out and spotting it early.',
        topics: [
          'Biosecurity procedures and visitor control',
          'Recognising signs of ill health in a flock',
          'Vaccination, medication and treatment records',
          'Mortality handling, recording and disposal',
        ],
      },
      {
        title: 'Production Records and Performance',
        text: 'Measuring how the flock is doing.',
        topics: [
          'Daily recording: mortality, feed, water and weight',
          'Growth rate, feed conversion and production measures',
          'Interpreting records to spot problems early',
          'Reporting flock performance',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Shed Preparation and Turnaround',
        text: 'Getting the house ready for the next placement.',
        topics: [
          'Cleaning, washing and disinfecting between cycles',
          'Litter removal, replacement and preparation',
          'Equipment checks, repair and calibration',
          'Downtime, rest periods and placement readiness',
        ],
      },
      {
        title: 'Catching, Loading and Depletion',
        text: 'Moving birds without losing condition or welfare.',
        topics: [
          'Preparing a flock for catching',
          'Humane catching and handling techniques',
          'Loading, crating and transport preparation',
          'Records, weights and reconciliation at depletion',
        ],
      },
    ],
  },

  57712: {
    fullName: 'Further Education and Training Certificate: Generic Management',
    source: DRAFTED,
    purpose: 'Give first-line and junior managers the core of the job: planning work, leading a team, managing performance and understanding the numbers behind their unit.',
    outcomes: [
      'Team leader or first-line manager',
      'Supervisor across office, retail or operational settings',
      'Section or unit head',
      'Progression toward middle management',
    ],
    modules: [
      {
        title: 'The Role of the Junior Manager',
        text: 'What changes when you become accountable for others\' work.',
        topics: [
          'The functions of management in practice',
          'Moving from technical expert to manager',
          'Authority, accountability and delegation',
          'Managing your own time and priorities',
        ],
      },
      {
        title: 'Leading and Motivating a Team',
        text: 'Building a team that performs without constant supervision.',
        topics: [
          'Leadership styles and when each one works',
          'Motivation, engagement and recognition',
          'Building trust and team cohesion',
          'Managing diversity in a South African workplace',
        ],
      },
      {
        title: 'Communication and Workplace Relationships',
        text: 'Communicating clearly, upward and downward.',
        topics: [
          'Briefing, listening and giving instructions',
          'Running effective team meetings',
          'Handling conflict and difficult conversations',
          'Negotiation and influencing without authority',
        ],
      },
      {
        title: 'Planning, Organising and Control',
        text: 'Turning objectives into work that gets done.',
        topics: [
          'Setting objectives and operational plans',
          'Organising work, resources and schedules',
          'Monitoring progress and controlling variance',
          'Problem solving and decision making',
        ],
      },
      {
        title: 'Managing Performance',
        text: 'Getting and keeping the standard you set.',
        topics: [
          'Setting standards and performance expectations',
          'Coaching, feedback and on-the-job development',
          'Addressing under-performance constructively',
          'Recognising and building on good performance',
        ],
      },
      {
        title: 'Financial and Operational Awareness',
        text: 'Understanding the numbers behind the work.',
        topics: [
          'Reading and using basic financial information',
          'Preparing and monitoring a unit budget',
          'Cost awareness and resource efficiency',
          'Reporting operational results to management',
        ],
      },
      {
        title: 'Managing Change and Improvement',
        text: 'Leading a team through a change in how the work is done.',
        topics: [
          'Why change is resisted and how to reduce it',
          'Introducing a change to a working team',
          'Involving the team in improving the work',
          'Sustaining a change once the attention moves on',
        ],
      },
      {
        title: 'Ethics, Governance and Compliance',
        text: 'Managing inside the rules the organisation is bound by.',
        topics: [
          'Ethical conduct and conflict of interest',
          'Organisational policy, procedure and delegation',
          'Legislative obligations relevant to a junior manager',
          'Recognising and reporting misconduct',
        ],
      },
    ],
  },

  58779: {
    fullName: 'National Certificate: Production Technology',
    source: DRAFTED,
    purpose: 'Prepare experienced production staff to take responsibility for process performance, quality systems and the people working alongside them.',
    outcomes: [
      'Senior production operator',
      'Production team leader',
      'Quality and process improvement support',
      'Progression toward production supervision',
    ],
    modules: [
      {
        title: 'Production Technology Foundations',
        text: 'How the production environment works and what it demands.',
        topics: [
          'Manufacturing processes and the production flow',
          'Materials, their properties and their uses',
          'Engineering drawings, symbols and terminology',
          'Workplace organisation and shift discipline',
        ],
      },
      {
        title: 'Measurement and Marking Out',
        text: 'Working accurately to a drawing.',
        topics: [
          'Measuring instruments and their correct use',
          'Units, tolerances and accuracy',
          'Marking out to a drawing or template',
          'Recording and verifying measurements',
        ],
      },
      {
        title: 'Tools, Equipment and Processes',
        text: 'Using the right equipment correctly.',
        topics: [
          'Hand tools and portable power tools',
          'Machine operation to standard procedure',
          'Tool selection, care and storage',
          'Setting up for a job and clearing down',
        ],
      },
      {
        title: 'Quality and Product Standards',
        text: 'Producing work that passes first time.',
        topics: [
          'Interpreting specifications and standards',
          'In-process checking and self-inspection',
          'Identifying and reporting defects',
          'Reducing rework and scrap',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Process Control and Improvement',
        text: 'Taking responsibility for how well the process runs.',
        topics: [
          'Monitoring process performance against target',
          'Basic problem solving and root cause analysis',
          'Identifying and eliminating waste',
          'Supporting continuous improvement activity',
        ],
      },
      {
        title: 'Coordinating Work and Supporting Others',
        text: 'Leading from within the team.',
        topics: [
          'Planning and sequencing your own and others\' work',
          'Coaching and guiding less experienced colleagues',
          'Coordinating with maintenance, stores and quality',
          'Reporting to the supervisor with useful detail',
        ],
      },
      {
        title: 'Quality Systems and Standards',
        text: 'Working inside a formal quality system.',
        topics: [
          'Quality management systems in a production plant',
          'Procedures, work instructions and controlled documents',
          'Internal audits and non-conformance reporting',
          'Traceability and evidence of conformity',
        ],
      },
    ],
  },

  58781: {
    fullName: 'National Certificate: Production Technology',
    source: DRAFTED,
    purpose: 'Give new entrants the working basics of a production environment: measurement, tools, quality and safe conduct on a manufacturing floor.',
    outcomes: [
      'Production assistant or general worker',
      'Entry-level machine operative',
      'Assembly and finishing assistant',
      'Progression toward operator roles',
    ],
    modules: [
      {
        title: 'Production Technology Foundations',
        text: 'How the production environment works and what it demands.',
        topics: [
          'Manufacturing processes and the production flow',
          'Materials, their properties and their uses',
          'Engineering drawings, symbols and terminology',
          'Workplace organisation and shift discipline',
        ],
      },
      {
        title: 'Measurement and Marking Out',
        text: 'Working accurately to a drawing.',
        topics: [
          'Measuring instruments and their correct use',
          'Units, tolerances and accuracy',
          'Marking out to a drawing or template',
          'Recording and verifying measurements',
        ],
      },
      {
        title: 'Tools, Equipment and Processes',
        text: 'Using the right equipment correctly.',
        topics: [
          'Hand tools and portable power tools',
          'Machine operation to standard procedure',
          'Tool selection, care and storage',
          'Setting up for a job and clearing down',
        ],
      },
      {
        title: 'Quality and Product Standards',
        text: 'Producing work that passes first time.',
        topics: [
          'Interpreting specifications and standards',
          'In-process checking and self-inspection',
          'Identifying and reporting defects',
          'Reducing rework and scrap',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Working Effectively in a Production Team',
        text: 'Contributing reliably as part of a shift.',
        topics: [
          'Following instructions and asking good questions',
          'Communication on the production floor',
          'Timekeeping, attendance and workplace conduct',
          'Working safely alongside others',
        ],
      },
      {
        title: 'Calculations for Production Work',
        text: 'The arithmetic the job actually needs.',
        topics: [
          'Units, conversions and measurement in practice',
          'Length, area, volume and mass calculations',
          'Ratios, percentages and simple proportions',
          'Checking a calculation before you cut or mix',
        ],
      },
      {
        title: 'Preparing and Finishing Work',
        text: 'The steps either side of the main operation.',
        topics: [
          'Preparing material and work surfaces',
          'Cutting, filing, drilling and deburring',
          'Cleaning, protecting and finishing a component',
          'Presenting completed work for inspection',
        ],
      },
    ],
  },

  58785: {
    fullName: 'National Certificate: Production Technology',
    source: DRAFTED,
    purpose: 'Build a production worker who can set up and run equipment to target, keep the records the plant depends on and work to a quality standard.',
    outcomes: [
      'Production operator',
      'Machine setter-operator',
      'Production recorder or line administrator',
      'Progression toward senior operator',
    ],
    modules: [
      {
        title: 'Production Technology Foundations',
        text: 'How the production environment works and what it demands.',
        topics: [
          'Manufacturing processes and the production flow',
          'Materials, their properties and their uses',
          'Engineering drawings, symbols and terminology',
          'Workplace organisation and shift discipline',
        ],
      },
      {
        title: 'Measurement and Marking Out',
        text: 'Working accurately to a drawing.',
        topics: [
          'Measuring instruments and their correct use',
          'Units, tolerances and accuracy',
          'Marking out to a drawing or template',
          'Recording and verifying measurements',
        ],
      },
      {
        title: 'Tools, Equipment and Processes',
        text: 'Using the right equipment correctly.',
        topics: [
          'Hand tools and portable power tools',
          'Machine operation to standard procedure',
          'Tool selection, care and storage',
          'Setting up for a job and clearing down',
        ],
      },
      {
        title: 'Quality and Product Standards',
        text: 'Producing work that passes first time.',
        topics: [
          'Interpreting specifications and standards',
          'In-process checking and self-inspection',
          'Identifying and reporting defects',
          'Reducing rework and scrap',
        ],
      },
      {
        title: 'Workplace Health, Safety and Environment',
        text: 'Working safely on a production floor, every shift.',
        topics: [
          'Hazard identification and risk assessment on the job',
          'Personal protective equipment: selection, use and care',
          'Machine guarding, lock-out and safe isolation',
          'Incident reporting, emergency procedures and housekeeping',
        ],
      },
      {
        title: 'Production Records and Reporting',
        text: 'Keeping the paperwork that proves what was made.',
        topics: [
          'Completing production and quality records',
          'Material and batch traceability',
          'Reporting output, downtime and waste',
          'Handover documentation between shifts',
        ],
      },
      {
        title: 'Machine Set-up and Operation',
        text: 'Setting a machine up and running it to target.',
        topics: [
          'Interpreting a job card and setting requirements',
          'Machine set-up, adjustment and first-off',
          'Operating to rate without losing quality',
          'Changeover and end-of-run procedures',
        ],
      },
      {
        title: 'Working to Production Targets',
        text: 'Meeting the number the shift is asked for.',
        topics: [
          'Understanding output targets and how they are set',
          'Monitoring your own rate through a shift',
          'Identifying what is slowing the job down',
          'Raising problems early enough to matter',
        ],
      },
    ],
  },

  66589: {
    fullName: 'National Certificate: Horticulture',
    source: DRAFTED,
    purpose: 'Prepare horticultural staff to propagate, grow and maintain plants to a saleable standard, in a nursery or on a landscape site.',
    outcomes: [
      'Nursery worker or horticultural assistant',
      'Propagation and growing-on staff',
      'Landscape planting and maintenance staff',
      'Progression toward nursery or grounds supervision',
    ],
    modules: [
      {
        title: 'Horticultural Foundations',
        text: 'Plants, propagation and the growing environment.',
        topics: [
          'Plant identification, structure and growth',
          'Growing media, soils and containers',
          'The horticultural production cycle',
          'Daily routines in a nursery or growing operation',
        ],
      },
      {
        title: 'Propagation and Establishment',
        text: 'Starting plants successfully.',
        topics: [
          'Seed sowing, germination and aftercare',
          'Vegetative propagation: cuttings and division',
          'Potting, spacing and transplanting',
          'Hardening off and establishment care',
        ],
      },
      {
        title: 'Plant Care and Maintenance',
        text: 'Keeping plants healthy through the cycle.',
        topics: [
          'Watering, feeding and nutrition',
          'Pruning, training and shaping',
          'Weed control and bed maintenance',
          'Monitoring plant condition and reporting',
        ],
      },
      {
        title: 'Pests, Diseases and Plant Health',
        text: 'Protecting the crop.',
        topics: [
          'Common horticultural pests and diseases',
          'Recognising symptoms and damage',
          'Safe use of plant protection products',
          'Hygiene and preventive practice',
        ],
      },
      {
        title: 'Nursery and Landscape Operations',
        text: 'The practical work of the operation.',
        topics: [
          'Nursery layout, benching and stock management',
          'Tools, equipment and their maintenance',
          'Landscape planting and ground preparation',
          'Preparing plants for dispatch or display',
        ],
      },
      {
        title: 'Health, Safety and Farm Practice',
        text: 'Working safely and responsibly on a farm.',
        topics: [
          'Farm hazards, personal protective equipment and safe work',
          'Safe handling and storage of chemicals and medicines',
          'Machinery, vehicle and equipment safety',
          'Environmental care, waste and water responsibility',
        ],
      },
      {
        title: 'Growing Environments and Structures',
        text: 'Controlling the conditions plants grow in.',
        topics: [
          'Tunnels, shade houses and greenhouse basics',
          'Irrigation systems in a nursery setting',
          'Light, temperature and ventilation control',
          'Maintaining structures and growing areas',
        ],
      },
      {
        title: 'Plant Knowledge and Customer Advice',
        text: 'Knowing the plants well enough to advise on them.',
        topics: [
          'Plant identification and naming conventions',
          'Growth habits, seasons and site requirements',
          'Advising on planting, care and aftercare',
          'Presenting and merchandising plants',
        ],
      },
    ],
  },

  97542: {
    fullName: 'Further Education and Training Certificate: Early Childhood Development',
    source: DRAFTED,
    purpose: 'Prepare practitioners to plan and facilitate early learning for young children, and to keep them safe, healthy and developing while they do it.',
    outcomes: [
      'Early childhood development practitioner',
      'Pre-school or crèche facilitator',
      'Playgroup or day-mother practitioner',
      'Progression toward ECD site supervision or management',
    ],
    modules: [
      {
        title: 'Child Development and How Children Learn',
        text: 'The developmental foundations behind everything practitioners do.',
        topics: [
          'Physical, cognitive, social and emotional development',
          'Developmental milestones and observing them',
          'How young children learn through play',
          'Recognising and responding to developmental delay',
        ],
      },
      {
        title: 'Planning a Learning Programme',
        text: 'Designing daily and weekly programmes that work.',
        topics: [
          'Planning a balanced daily programme',
          'Age-appropriate learning activities and materials',
          'Creating a stimulating and safe learning environment',
          'Adapting activities for different needs and abilities',
        ],
      },
      {
        title: 'Facilitating Active Learning',
        text: 'Working with children in the moment.',
        topics: [
          'Facilitating play-based and structured learning',
          'Language, literacy and numeracy foundations',
          'Creative arts, music and movement',
          'Supporting children with additional needs',
        ],
      },
      {
        title: 'Health, Safety and Nutrition',
        text: 'Keeping children safe and well.',
        topics: [
          'Hygiene, illness prevention and daily routines',
          'Nutrition and preparing appropriate meals',
          'Safety, supervision and emergency procedures',
          'First aid awareness in an early learning setting',
        ],
      },
      {
        title: 'Child Protection and Well-being',
        text: 'The practitioner\'s duty of care and legal obligations.',
        topics: [
          'Recognising signs of abuse, neglect and distress',
          'Reporting obligations and referral pathways',
          'Positive behaviour guidance and discipline',
          'Supporting emotional well-being and resilience',
        ],
      },
      {
        title: 'Working with Families and the Community',
        text: 'Practice beyond the classroom.',
        topics: [
          'Communicating with parents and caregivers',
          'Involving families in a child\'s learning',
          'Community resources and referral networks',
          'Record-keeping, reporting and professional conduct',
        ],
      },
      {
        title: 'Inclusive Practice and Diversity',
        text: 'Making sure every child in the room is included.',
        topics: [
          'Barriers to learning and how to reduce them',
          'Adapting activities for children with disabilities',
          'Language diversity and multilingual settings',
          'Culture, identity and belonging in early learning',
        ],
      },
      {
        title: 'Running an Early Learning Programme',
        text: 'The administration behind a well-run ECD site.',
        topics: [
          'Daily registers, records and child files',
          'Reporting on children\'s progress to parents',
          'Site requirements, registration and compliance basics',
          'Working as part of an ECD team',
        ],
      },
    ],
  },
}

/** The outline for a qualification, or null where none has been supplied. */
export const outlineFor = (saqaId) => courseOutlines[saqaId] ?? null

/** How many qualifications currently carry a published module breakdown. */
export const outlinedCount = Object.keys(courseOutlines).length
