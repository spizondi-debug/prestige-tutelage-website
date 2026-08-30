import { useEffect } from 'react'
import { ORIGIN, SITE_NAME, LOCALE, OG_IMAGE, pageSeo } from './seo.js'

function upsert(selector, attrs) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement(attrs.rel ? 'link' : 'meta')
    document.head.appendChild(tag)
  }
  Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v))
  return tag
}

/**
 * Per-route SEO: title, description, canonical, robots and social cards.
 *
 * Written against the DOM rather than pulling in a head-management library —
 * it is a few lines, runs once per navigation, and keeps the bundle honest.
 *
 * A route listed in `pageSeo` takes its title and description from there and
 * ignores what the page passed. That is deliberate: it puts every curated
 * title and description in one file where duplicates are visible at a glance,
 * instead of scattered across fifteen components where they drift. Routes that
 * are generated — course pages, insight articles — are not in the map and keep
 * the metadata they build from their own data.
 *
 * Canonical is always the real origin and always without a trailing slash
 * (except the root), whatever host the page is being served from. A preview or
 * staging host that canonicalises to itself is how a staging site ends up in
 * the index in place of the real one.
 */
export function usePageMeta(title, description, options = {}) {
  const { image = OG_IMAGE, type = 'website', noindex = false } = options

  useEffect(() => {
    const path = window.location.pathname
    const curated = pageSeo[path.replace(/\/+$/, '') || '/']
    const finalTitle = curated?.title ?? title
    const finalDesc = curated?.description ?? description

    const fullTitle = finalTitle
      ? `${finalTitle} | ${SITE_NAME}`
      : `${SITE_NAME} — Accredited Training & Workforce Development`
    document.title = fullTitle

    const canonicalPath = path === '/' ? '/' : path.replace(/\/+$/, '')
    const url = ORIGIN + canonicalPath

    if (finalDesc) upsert('meta[name="description"]', { name: 'description', content: finalDesc })
    upsert('link[rel="canonical"]', { rel: 'canonical', href: url })
    upsert('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    })

    upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsert('meta[property="og:url"]', { property: 'og:url', content: url })
    upsert('meta[property="og:type"]', { property: 'og:type', content: type })
    upsert('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    upsert('meta[property="og:locale"]', { property: 'og:locale', content: LOCALE })
    upsert('meta[property="og:image"]', { property: 'og:image', content: ORIGIN + image })
    upsert('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: 'Prestige Tutelage learners outside the training premises in Randburg',
    })
    if (finalDesc) {
      upsert('meta[property="og:description"]', { property: 'og:description', content: finalDesc })
      upsert('meta[name="twitter:description"]', { name: 'twitter:description', content: finalDesc })
    }
    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsert('meta[name="twitter:image"]', { name: 'twitter:image', content: ORIGIN + image })
  }, [title, description, image, type, noindex])
}
