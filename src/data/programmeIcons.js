import {
  Bird, Blocks, Boxes, BookOpen, Briefcase, Building2, CalendarDays, ClipboardList,
  Cog, Cpu, Drill, Factory, Flame, Flower2, Gauge, GraduationCap, Hammer, HardHat, IdCard,
  Megaphone, Network, PawPrint, Settings2, ShoppingBag, Sprout, Tractor, Truck,
  Users, Wrench,
} from 'lucide-react'

/**
 * Programme icons.
 *
 * Each qualification carries an `icon` key in programmes.js; this maps that key
 * to a Lucide component. Keys are named for what the programme *is* rather than
 * for the glyph, so an icon can be swapped here without touching the data.
 *
 * Adding a programme does not require an entry: an unknown or absent key falls
 * back to the training area, and an unknown area falls back to GraduationCap.
 * The card therefore always renders a real icon and never an empty header.
 *
 * Icons are decorative — the card's heading already names the programme — so
 * ProgrammeCard marks them aria-hidden rather than giving them a label a screen
 * reader would read out ahead of the title.
 */
export const PROGRAMME_ICONS = {
  // Business, administration & leadership
  calendar: CalendarDays,     // Management Assistant
  people: Users,              // Human resources — administration
  badge: IdCard,              // Human resources — officer
  office: Building2,          // Office Supervisor
  megaphone: Megaphone,       // Marketing Coordinator
  clipboard: ClipboardList,   // Project Manager
  leadership: Network,        // Generic Management
  admin: Briefcase,           // Business administration

  // Manufacturing & production
  factory: Factory,           // Production Supervisor
  machine: Cog,               // Production Operator
  assembly: Boxes,            // Machine Operator & Assembler
  controls: Gauge,            // Production Process Controller
  technology: Cpu,            // Production Technology

  // Engineering & technical
  lathe: Drill,               // Lathe Operator
  mechanic: Wrench,           // Engine Workshop Maintenance Mechanic
  settings: Settings2,        // Injection Moulding Machine Setter
  workshop: Hammer,           // Manufacturing Workshop Assistant
  furnace: Flame,             // Metal melting & refining

  // Agriculture & agri-processing
  poultry: Bird,              // Poultry Production
  livestock: PawPrint,        // Animal Production
  crops: Sprout,              // Plant Production
  horticulture: Flower2,      // Horticulture
  farm: Tractor,

  // Education & community development
  childhood: Blocks,          // Early Childhood Development
  learning: BookOpen,
  certificate: GraduationCap,

  // Registered ahead of the programmes that will use them, so adding a retail,
  // logistics or safety qualification is a data change rather than a code one.
  retail: ShoppingBag,
  logistics: Truck,
  safety: HardHat,
}

/** Used when a programme has no `icon` key of its own. */
export const AREA_ICONS = {
  'Business, Administration & Leadership': Briefcase,
  'Manufacturing & Production': Factory,
  'Engineering & Technical': Wrench,
  'Agriculture & Agri-processing': Tractor,
  'Education & Community Development': GraduationCap,
}

export const DEFAULT_ICON = GraduationCap

export function iconFor(q) {
  return PROGRAMME_ICONS[q.icon] ?? AREA_ICONS[q.area] ?? DEFAULT_ICON
}
