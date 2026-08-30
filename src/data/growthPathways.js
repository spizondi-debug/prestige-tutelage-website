import {
  ChartNoAxesColumn, ClipboardList, Compass, GraduationCap, HardHat,
  Route, Search, TrendingUp, Users,
} from 'lucide-react'

// Prestige Growth Pathways — page content.
//
// COMPLIANCE — read before editing:
//   * Growth Pathways and Prestige Tutelage are distinct. Tutelage delivers
//     accredited learning and workplace training; Growth Pathways connects
//     skills analysis, planning, learning, progression and reporting. Nothing
//     here may blur the two or suggest a client must buy both — the page says
//     plainly that training can be engaged on its own.
//   * No statistics, client results, percentages, timescales or guarantees.
//     Every outcome below is written as what the approach is designed to give
//     an organisation, never as a measured result.
//   * No B-BBEE points, tax or scorecard promises.
//   * Do not access or mirror the separate Prestige Growth Pathways repository.
//     This page describes the offering; it is not that product's website.

/** The seven connected stages, in order. Rendered as one rail. */
export const journey = [
  {
    icon: Search,
    title: 'Skills gaps',
    text: 'A current view of the distance between the capability you have and the capability the work needs.',
  },
  {
    icon: Users,
    title: 'Workforce development',
    text: 'Interventions organised around the gaps that matter most, not the ones easiest to book.',
  },
  {
    icon: ClipboardList,
    title: 'Development planning',
    text: 'Plans people understand and managers can support, for individuals and for teams.',
  },
  {
    icon: GraduationCap,
    title: 'Learning',
    text: 'Qualifications, learnerships and short courses sequenced into one coherent pathway.',
  },
  {
    icon: HardHat,
    title: 'Workplace readiness',
    text: 'Whether the workplace is set up to absorb, apply and reinforce what was learnt.',
  },
  {
    icon: TrendingUp,
    title: 'Employee growth',
    text: 'Progression a person can see — a reason to stay, engage and take the next step.',
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Measurable outcomes',
    text: 'Progress, completion and workplace application reported in terms the business recognises.',
  },
]

/** The practical process, in three steps. */
export const howItWorks = [
  {
    icon: Compass,
    title: 'Understand the workforce',
    text: 'We work through the roles, the skills each one needs and where the real gaps sit. The starting point is your operation, not a template.',
  },
  {
    icon: Route,
    title: 'Build the pathway',
    text: 'Gaps become development plans, and plans become a sequence of learning with a clear order, owner and next step for each person.',
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Measure progression',
    text: 'Progress, completion and workplace application are reported back in a form managers and leadership can act on.',
  },
]

/** Who benefits, and how — one short statement each. */
export const audiences = [
  {
    who: 'Employees',
    text: 'Know where you stand, what you are working toward and what the next step is.',
  },
  {
    who: 'Managers',
    text: 'See the same picture your team sees, so coaching and support become possible.',
  },
  {
    who: 'HR and skills development teams',
    text: 'Plan, track and report on development from one connected view instead of several.',
  },
  {
    who: 'Organisational leadership',
    text: 'Make skills planning a decision backed by evidence rather than an annual guess.',
  },
]

/**
 * The two offerings, side by side.
 *
 * `standalone` is the line that keeps this honest: each side can be engaged on
 * its own. Do not remove it or soften it into a bundle.
 */
export const comparison = {
  tutelage: {
    name: 'Prestige Tutelage',
    role: 'Delivers the learning',
    points: [
      'Accredited qualifications and learnerships',
      'Corporate and short course training',
      'Workplace training and practical assessment',
      'Facilitation, assessment and moderation',
    ],
  },
  pathways: {
    name: 'Prestige Growth Pathways',
    role: 'Connects it to the business',
    points: [
      'Skills gap analysis across roles and teams',
      'Individual and team development planning',
      'Learning sequenced into a visible pathway',
      'Progression and reporting for the organisation',
    ],
  },
  standalone:
    'These are separate engagements. Many clients use Prestige Tutelage for training on its own, and nothing on this page requires both.',
}

/**
 * What an organisation can expect to gain.
 *
 * Each of these is a description of the approach, not a measured result. Keep
 * it that way: no figures, no percentages, no guarantees.
 */
export const outcomes = [
  { title: 'Clearer skills priorities', text: 'One view of which gaps matter most, agreed before the budget is spent.' },
  { title: 'Better-aligned training investment', text: 'Spend that follows the priorities rather than last year’s course list.' },
  { title: 'Visible employee development', text: 'Progress people can see for themselves, not a record held only by HR.' },
  { title: 'Stronger manager involvement', text: 'Managers who know what their people are working on and can support it.' },
  { title: 'Improved workplace application', text: 'Deliberate attention to whether learning is used once the course ends.' },
  { title: 'More useful progress reporting', text: 'Reporting written for the business, not only for the training file.' },
]

/** Both CTAs on this page open the enquiry with the interest already chosen. */
export const ENQUIRY = '/contact?interest=Prestige%20Growth%20Pathways'
