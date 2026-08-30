import {
  Briefcase, Gauge, Handshake, HeartPulse, Library, MessagesSquare,
  MonitorSmartphone, Network, ShieldCheck, Target, Users,
} from 'lucide-react'

/**
 * Short course category icons.
 *
 * Keyed by the category slug in shortCourses.js, so an icon can be swapped
 * here without touching the catalogue data. An unknown or new slug falls back
 * to Library, so a category added to the data always renders a real icon
 * rather than an empty box.
 *
 * These are decorative — the card's heading already names the category — so
 * the page marks them aria-hidden rather than giving a screen reader a label
 * to read out ahead of the title.
 */
const ICONS = {
  'leadership-management': Network,
  'communication-customer-experience': MessagesSquare,
  'human-resources': Users,
  'sales-commercial': Handshake,
  'personal-effectiveness': Target,
  'workplace-culture-wellbeing': HeartPulse,
  'operational-excellence': Gauge,
  'safety-quality': ShieldCheck,
  'workplace-readiness': Briefcase,
  'microsoft-digital': MonitorSmartphone,
}

export const iconForCategory = (slug) => ICONS[slug] ?? Library

/** The count marker, shared by every card. */
export const CountIcon = Library
