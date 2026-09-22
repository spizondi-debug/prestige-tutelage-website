import { useEffect } from 'react'
import { brand, contact } from '../data/site.js'
import { ORIGIN, LOGO_URL, orgAddress, abs } from '../lib/seo.js'

/**
 * JSON-LD, injected per route.
 *
 * One <script type="application/ld+json"> per graph, removed on unmount so a
 * client-side navigation cannot leave the previous page's Course schema behind
 * — which is the usual way a single-page app ends up telling Google that its
 * contact page is a project management qualification.
 *
 * Every value comes from the site's own verified data. Nothing here asserts an
 * accreditation number, a rating, a price or an enrolment count: absent
 * properties are simply absent, because a wrong one in structured data is
 * worse than a missing one.
 */
export default function StructuredData({ graph, id = 'ld-page' }) {
  useEffect(() => {
    if (!graph) return undefined
    const tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.dataset.ld = id
    tag.textContent = JSON.stringify(graph)
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [graph, id])
  return null
}

/** The organisation itself. Referenced by @id from every other graph. */
export const organisationNode = () => ({
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': `${ORIGIN}/#organisation`,
  name: brand.legalName,
  alternateName: brand.name,
  url: ORIGIN,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 768, height: 404 },
  image: LOGO_URL,
  email: contact.email,
  telephone: '+27100650822',
  address: orgAddress,
  areaServed: [
    { '@type': 'City', name: 'Johannesburg' },
    { '@type': 'City', name: 'Randburg' },
    { '@type': 'AdministrativeArea', name: 'Gauteng' },
    { '@type': 'Country', name: 'South Africa' },
  ],
  description:
    'Accredited training and workforce development provider delivering learnerships, occupational qualifications, short courses, corporate training and assessment services across South Africa.',
})

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  url: ORIGIN,
  name: brand.name,
  inLanguage: 'en-ZA',
  publisher: { '@id': `${ORIGIN}/#organisation` },
})

/** BreadcrumbList from an ordered [{ name, path }]. */
export const breadcrumbNode = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
})

export const webPageNode = (path, title, description) => ({
  '@type': 'WebPage',
  '@id': `${abs(path)}#webpage`,
  url: abs(path),
  name: title,
  description,
  inLanguage: 'en-ZA',
  isPartOf: { '@id': `${ORIGIN}/#website` },
  about: { '@id': `${ORIGIN}/#organisation` },
})

/** FAQPage — only ever built from questions the page actually renders. */
export const faqNode = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
})

/**
 * Course.
 *
 * `educationalCredentialAwarded` and `educationalLevel` carry the registered
 * facts. `hasCourseInstance` is omitted deliberately: courseMode and start
 * dates are not verified for these programmes, and Google would rather have no
 * instance than an invented one.
 */
export const courseNode = (q, outline, path) => {
  const node = {
    '@type': 'Course',
    '@id': `${abs(path)}#course`,
    name: outline?.fullName ?? q.name,
    description: q.forWho,
    url: abs(path),
    inLanguage: 'en-ZA',
    provider: { '@id': `${ORIGIN}/#organisation` },
    educationalLevel: `NQF Level ${q.nqf}`,
    educationalCredentialAwarded: outline?.fullName ?? q.name,
    identifier: [
      { '@type': 'PropertyValue', name: 'SAQA ID', value: String(q.saqaId) },
      { '@type': 'PropertyValue', name: 'NQF Level', value: String(q.nqf) },
    ],
    about: q.area,
  }
  if (q.credits) {
    node.identifier.push({ '@type': 'PropertyValue', name: 'Credits', value: String(q.credits) })
    node.numberOfCredits = q.credits
  }
  if (outline?.durationMonths) node.timeRequired = `P${outline.durationMonths}M`
  if (outline?.modules) {
    node.syllabusSections = outline.modules.map((m, i) => ({
      '@type': 'Syllabus',
      position: i + 1,
      name: m.title,
      description: m.text,
    }))
  }
  if (outline?.outcomes) node.occupationalCategory = outline.outcomes
  return node
}

/** Wrap any set of nodes into one @graph document. */
export const graphOf = (...nodes) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.filter(Boolean),
})
