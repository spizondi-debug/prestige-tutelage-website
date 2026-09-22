import {
  BookOpen, Briefcase, Building2, ClipboardCheck, Cog, Factory, GraduationCap,
  HeartHandshake, MessageSquare, ShieldCheck, ShoppingBag, Sprout, Truck, Users,
} from 'lucide-react'

/**
 * Icons for the industry cards.
 *
 * Two maps, both decorative: every icon sits beside text that already names
 * the thing, so the page marks them aria-hidden rather than giving a screen
 * reader a label to read out twice.
 */

/** One per sector, keyed by the slug in industries.js. */
const SECTOR = {
  'manufacturing-engineering': Factory,
  'agriculture-agriprocessing': Sprout,
  'logistics-supply-chain': Truck,
  'retail-consumer': ShoppingBag,
  'professional-services': Briefcase,
  'public-sector': Building2,
  'education-community': GraduationCap,
}

export const iconForSector = (slug) => SECTOR[slug] ?? Briefcase

/**
 * The offering icon is matched on what the offering says rather than stored
 * against each string.
 *
 * There are 28 offerings across seven sectors and they change as the copy
 * does. Keeping a hand-written icon for each would mean a list that silently
 * falls out of step the first time a line is reworded — the icon would either
 * disappear or, worse, stay behind on the old meaning. Matching on the words
 * means a reworded or newly added offering still gets a sensible icon, and an
 * unmatched one falls back to a neutral mark instead of an empty box.
 *
 * Order matters: the first match wins, so the more specific patterns are
 * listed above the general ones.
 */
const RULES = [
  [/learnership/i, GraduationCap],
  [/safety|assessment|moderation/i, ShieldCheck],
  // Above the people rule: "records management training" is an administration
  // course, and matching it on "management" drew the team-development icon.
  [/admin|records|office/i, ClipboardCheck],
  // Above the short-course rule, so a customer-facing course reads as customer
  // work rather than as "a short course" — which most of these are. Matched on
  // customer/sales/client and never on a bare "service", which would also
  // catch "Assessment and moderation services".
  [/customer|\bsales\b|client/i, HeartHandshake],
  [/short course|communication|presentation/i, MessageSquare],
  [/supervis|team leader|manager|management|leadership/i, Users],
  // Above the production rule below: without it "Animal, Poultry and Plant
  // Production programmes" matches on "production" and draws a cog, which
  // reads industrial on an agriculture card.
  [/animal|poultry|plant|farm|agricultur|rural/i, Sprout],
  [/community|youth|readiness|employab/i, Sprout],
  [/technolog|production|workplace training|depot|warehouse/i, Cog],
]

export const iconForOffering = (text) => RULES.find(([re]) => re.test(text))?.[1] ?? BookOpen
