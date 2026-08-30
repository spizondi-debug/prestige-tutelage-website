import { brand, contact } from '../data/site.js'
import { qualifications } from '../data/programmes.js'
import { outlineFor } from '../data/courseOutlines.js'
import { coursePath } from './slug.js'

/**
 * One source of truth for everything a search engine reads.
 *
 * ORIGIN is the canonical host, confirmed with the client as www. Everything
 * that names the site — canonical tags, the sitemap, robots.txt, Open Graph
 * and the JSON-LD — is generated from this constant, so there is one place to
 * change it and no way for two of them to disagree.
 *
 * The apex domain is redirected to www in public/_redirects. That redirect is
 * the half that makes this real: without it the same 49 URLs are reachable at
 * two hosts, and the ranking signals split between them.
 */
export const ORIGIN = 'https://www.prestigetutelage.co.za'
export const SITE_NAME = brand.name
export const LOCALE = 'en_ZA'

/** The share image. A real Prestige photograph, not a placeholder. */
export const OG_IMAGE = '/images/learner-intake-group.jpg'
export const LOGO_URL = `${ORIGIN}/prestige-tutelage-logo.png`

export const abs = (path) => (path.startsWith('http') ? path : ORIGIN + path)

/**
 * Titles and descriptions, one per indexable route.
 *
 * `usePageMeta` appends " | Prestige Tutelage", so a title here is written to
 * read correctly once that is added and to land near 60 characters in total.
 * Every description is written for the search intent of that page rather than
 * restating the same sentence, which is what produces the duplicate-description
 * warnings a site like this normally collects.
 */
export const pageSeo = {
  '/': {
    title: 'Accredited Training Provider South Africa',
    description:
      'Prestige Tutelage provides accredited learnerships, occupational qualifications and workforce training for employers across South Africa. Based in Randburg.',
  },
  '/about': {
    title: 'About Our Accredited Training Company',
    description:
      'Prestige Tutelage is a 100% black-owned, Level 1 B-BBEE accredited training and workforce development company based in Ferndale, Randburg, Johannesburg.',
  },
  '/programmes': {
    title: 'Accredited Learnerships and Courses',
    description:
      'Browse 26 accredited qualifications and learnerships across business, manufacturing, engineering and agriculture, each with its SAQA ID and NQF level.',
  },
  '/short-courses': {
    title: 'Corporate Short Courses South Africa',
    description:
      'Practical corporate short courses in leadership, communication, HR, safety, Excel and workplace readiness — delivered on site for teams across South Africa.',
  },
  '/corporate-training': {
    title: 'Corporate Training for South African Employers',
    description:
      'Corporate training built around your workforce plan: skills gap analysis, programme design, facilitation, learner administration and reporting for employers.',
  },
  '/services': {
    title: 'Training and Workforce Development Services',
    description:
      'Learning and development, workforce advisory, talent, programme management, assessment and business facilities — the full Prestige Tutelage service range.',
  },
  '/business-solutions': {
    title: 'Business Solutions Beyond Training',
    description:
      'B-BBEE skills development consulting, recruitment, assessment services and training venue rental from Prestige Tutelage in Randburg, Johannesburg.',
  },
  '/bbbee-consulting': {
    title: 'B-BBEE Skills Development Consulting',
    description:
      'Turn skills development spend into real capability. Prestige Tutelage plans, delivers and evidences B-BBEE skills development programmes for employers.',
  },
  '/recruitment': {
    title: 'Recruitment and Learner Sourcing Services',
    description:
      'Recruitment services and learnership intake sourcing from Prestige Tutelage — advertising, screening, interview coordination and candidate management.',
  },
  '/office-rental': {
    title: 'Training Venue and Office Rental, Randburg',
    description:
      'Flexible training rooms, meeting space and office facilities for hire in Ferndale, Randburg. Availability, capacity and pricing confirmed on enquiry.',
  },
  '/industries': {
    title: 'Industry Training Across Seven Sectors',
    description:
      'Training built for the realities of manufacturing, agriculture, logistics, retail, professional services and the public sector across South Africa.',
  },
  '/assessment-centre': {
    title: 'Assessment, Moderation and Invigilation',
    description:
      'Prestige Tutelage operates a professionally managed assessment capability — candidate registration, assessment, moderation, results and records.',
  },
  '/growth-pathways': {
    title: 'Prestige Growth Pathways',
    description:
      'One workforce, one development journey. Growth Pathways connects skills planning, learning delivery and progression into a single view for employers.',
  },
  '/insights': {
    title: 'Skills Development Insights and Guides',
    description:
      'Explainers on learnerships, qualifications, skills planning and workplace learning for employers, HR managers and skills development facilitators.',
  },
  '/contact': {
    title: 'Contact Prestige Tutelage, Randburg',
    description:
      'Talk to Prestige Tutelage about accredited training, learnerships or B-BBEE skills development. 64 Hill Street, Ferndale, Randburg. Call 010 065 0822.',
  },
}

/**
 * Course metadata, generated from the structured data.
 *
 * Title lands near 60 characters once the site name is appended, and every
 * value in the description is a verified one — nothing is padded to fill.
 */
/**
 * Short names for the <title> only.
 *
 * Several registered names run past 55 characters on their own, which pushes
 * the title past what a search result will display. The registered name is
 * never changed — it carries the H1, the description, the structured data and
 * the page itself. This is a display alias for the title tag, and for the
 * description of the two courses whose full name would push it past 160.
 */
const seoShortName = {
  121150: 'HR Administrator',
  121151: 'HR Officer',
  97542: 'Early Childhood Development',
  102580: 'Machine Operator',
  119977: 'Production Controller',
  104461: 'Engine Mechanic',
  110318: 'Moulding Machine Setter',
  103018: 'Workshop Assistant',
  102159: 'Metal Melting Controller',
  101876: 'Management Assistant',
  58779: 'Production Technology',
}

export const seoNameFor = (q) => seoShortName[q.saqaId] ?? q.name

export function courseSeo(q) {
  const outline = outlineFor(q.saqaId)
  const title = `${seoNameFor(q)} NQF Level ${q.nqf} Course`
  // Built to land in the 140-160 band. The registered name can run to 60
  // characters on its own, so the tail is dropped rather than truncated
  // mid-sentence once the verified facts have been stated.
  const facts = [
    `NQF Level ${q.nqf}`,
    `SAQA ID ${q.saqaId}`,
    ...(q.credits ? [`${q.credits} credits`] : []),
  ].join(', ')
  // Prefer the full registered name; fall back to the short alias only when
  // it would push the description past the 160-character band.
  const full = outline?.fullName ?? q.name
  const build = (name) => `Study the ${name} — ${facts} — with Prestige Tutelage in South Africa.`
  const head = build(full).length <= 160 ? build(full) : build(seoNameFor(q))
  // Longest tail that still fits the 160 band, so a short registered name
  // does not leave a 120-character description that reads as an afterthought.
  const tails = [
    ' Accredited delivery in Randburg, Johannesburg and on employer sites nationwide.',
    ' Accredited delivery for employers, learners and SETA-funded intakes nationwide.',
    ' Accredited delivery for employers, learners and SETA-funded intakes.',
    ' Accredited delivery for employers and SETA-funded learner intakes.',
    ' Accredited delivery for employers and learners.',
    ' Accredited training for employers.',
    '',
  ]
  const description = head + (tails.find((t) => (head + t).length <= 160) ?? '')
  return { title, description }
}

/**
 * FAQs, answered from the verified record rather than written as marketing.
 *
 * This matters for more than tone: FAQPage structured data may only describe
 * questions and answers actually visible on the page, and Google treats an
 * answer that is not on the page as a violation. Generating both from the same
 * fields means the markup and the page can never drift apart, and no answer
 * can assert something the data does not hold.
 */
export function courseFaqs(q) {
  const outline = outlineFor(q.saqaId)
  const faqs = [
    {
      question: `What is the SAQA ID and NQF level for ${q.name}?`,
      answer: `${outline?.fullName ?? q.name} is registered under SAQA ID ${q.saqaId} at NQF Level ${q.nqf}${
        q.credits ? `, carrying ${q.credits} credits` : ''
      }.`,
    },
    {
      question: `Who is the ${q.name} qualification for?`,
      answer: q.forWho,
    },
  ]
  if (outline?.durationMonths) {
    faqs.push({
      question: `How long does ${q.name} take to complete?`,
      answer: `Prestige Tutelage delivers this qualification over approximately ${outline.durationMonths} months. The exact schedule is confirmed in writing when your programme is scoped.`,
    })
  }
  if (outline?.modules) {
    faqs.push({
      question: `What does the ${q.name} course cover?`,
      answer: `The programme runs across ${outline.modules.length} modules: ${outline.modules
        .map((m) => m.title)
        .join('; ')}.`,
    })
  }
  faqs.push(
    {
      question: `How is ${q.name} assessed?`,
      answer:
        'Assessment is formative and summative. Formative assessment runs throughout the programme as knowledge activities, assignments, practical tasks and workplace evidence. A final integrated assessment follows, including the External Integrated Summative Assessment (EISA) where applicable.',
    },
    {
      question: `Can employers fund ${q.name} as part of a skills development plan?`,
      answer:
        'Yes. Prestige Tutelage works with employers to place this qualification inside a workplace skills plan and to keep the learner records and training evidence that plan depends on. Prestige provides B-BBEE skills-development consulting and implementation support. Formal B-BBEE verification and scoring remain the responsibility of an appropriately accredited verification professional or agency.',
    },
  )
  return faqs
}

/** Related qualifications: same training area first, then the same NQF level. */
export function relatedCourses(q, limit = 3) {
  const others = qualifications.filter((x) => x.saqaId !== q.saqaId)
  const sameArea = others.filter((x) => x.area === q.area)
  const sameLevel = others.filter((x) => x.area !== q.area && x.nqf === q.nqf)
  return [...sameArea, ...sameLevel].slice(0, limit)
}

export { coursePath }
export const orgAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${contact.addressLines[0]}, ${contact.addressLines[1]}`,
  addressLocality: contact.addressLines[2],
  addressRegion: 'Gauteng',
  postalCode: contact.addressLines[3],
  addressCountry: 'ZA',
}
