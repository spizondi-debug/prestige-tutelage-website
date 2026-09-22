import { qualifications } from '../data/programmes.js'

/**
 * Course URL slugs.
 *
 * A qualification's name is not unique — Production Technology is registered at
 * NQF 2, 3 and 4, and Animal and Plant Production twice each — so the level is
 * part of the slug rather than decoration. Name plus level is unique across all
 * 26; the check runs in scripts/validate-seo.mjs so a new qualification cannot
 * silently collide.
 *
 * `slugOverrides` shortens a handful of very long registered names. The name
 * itself is never changed: it is a verified value and appears in full in the
 * H1, the metadata and the structured data. Only the URL is shortened.
 */
const slugOverrides = {
  121150: 'hr-administrator-nqf-5',
  121151: 'hr-officer-nqf-6',
  102159: 'metal-melting-refining-controller-nqf-4',
  102580: 'machine-operator-assembler-nqf-3',
  104461: 'engine-workshop-mechanic-nqf-5',
  97542: 'early-childhood-development-nqf-4',
}

export const kebab = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugFor = (q) => slugOverrides[q.saqaId] ?? `${kebab(q.name)}-nqf-${q.nqf}`

export const coursePath = (q) => `/programmes/${slugFor(q)}`

/** Slug -> qualification, built once. */
const bySlug = new Map(qualifications.map((q) => [slugFor(q), q]))

/**
 * Resolve a URL segment to a qualification.
 *
 * Accepts a SAQA ID as well as a slug so the /programmes/101869 links that
 * shipped before slugs existed keep working; CourseDetail redirects those to
 * the canonical slug URL rather than serving the same page at two addresses.
 */
export function resolveCourse(param) {
  if (!param) return null
  const slug = bySlug.get(param)
  if (slug) return { q: slug, canonical: true }
  const byId = qualifications.find((x) => x.saqaId === param)
  return byId ? { q: byId, canonical: false } : null
}

export const allCoursePaths = () => qualifications.map((q) => coursePath(q))
