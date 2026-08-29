import { useEffect } from 'react'

const SITE = 'Prestige Tutelage'
const ORIGIN = 'https://www.prestigetutelage.co.za'

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
 * Per-route SEO: title, description, canonical and Open Graph.
 *
 * Written against the DOM rather than pulling in a head-management library —
 * it is a few lines, runs once per navigation, and keeps the bundle honest.
 * Canonical uses the real origin so it stays correct regardless of the
 * preview or staging host the page happens to be served from.
 */
export function usePageMeta(title, description, options = {}) {
  const { image = '/images/learner-intake-group.jpg', type = 'website' } = options

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE}`
      : `${SITE} — Accredited Training & Workforce Development`
    document.title = fullTitle

    const url = ORIGIN + window.location.pathname

    if (description) upsert('meta[name="description"]', { name: 'description', content: description })
    upsert('link[rel="canonical"]', { rel: 'canonical', href: url })

    upsert('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsert('meta[property="og:url"]', { property: 'og:url', content: url })
    upsert('meta[property="og:type"]', { property: 'og:type', content: type })
    upsert('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE })
    upsert('meta[property="og:image"]', { property: 'og:image', content: ORIGIN + image })
    if (description) {
      upsert('meta[property="og:description"]', { property: 'og:description', content: description })
      upsert('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    }
    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsert('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsert('meta[name="twitter:image"]', { name: 'twitter:image', content: ORIGIN + image })
  }, [title, description, image, type])
}
