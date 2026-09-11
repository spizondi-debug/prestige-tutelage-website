/**
 * Measurement, configured but never faked.
 *
 * No tracking ID is hard-coded. GA4, GTM and the Search Console verification
 * token are read from Vite environment variables, so the site ships ready to
 * measure and a real ID is a deploy-time value rather than a code change:
 *
 *   VITE_GA4_ID=G-XXXXXXXXXX
 *   VITE_GTM_ID=GTM-XXXXXXX
 *   VITE_GSC_VERIFICATION=<token from Search Console>
 *
 * With none of them set the loader does nothing at all: no script tag, no
 * network request, no consent banner needed. `track()` stays safe to call
 * either way, so event code does not have to guard every call site.
 */
const GA4 = import.meta.env?.VITE_GA4_ID
const GTM = import.meta.env?.VITE_GTM_ID
const GSC = import.meta.env?.VITE_GSC_VERIFICATION

export const analyticsEnabled = Boolean(GA4 || GTM)

let loaded = false

function inject(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function initAnalytics() {
  if (loaded || typeof window === 'undefined') return
  loaded = true

  if (GSC) {
    const m = document.createElement('meta')
    m.name = 'google-site-verification'
    m.content = GSC
    document.head.appendChild(m)
  }

  window.dataLayer = window.dataLayer || []

  if (GA4) {
    inject(`https://www.googletagmanager.com/gtag/js?id=${GA4}`)
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    // Routing is client-side, so page_view is sent per navigation instead.
    window.gtag('config', GA4, { send_page_view: false })
  }

  if (GTM) {
    inject(`https://www.googletagmanager.com/gtm.js?id=${GTM}`)
  }
}

/** A page_view for a client-side navigation. */
export function trackPageView(path, title) {
  if (!analyticsEnabled) return
  window.gtag?.('event', 'page_view', { page_path: path, page_title: title })
  window.dataLayer?.push({ event: 'page_view', page_path: path, page_title: title })
}

/** Any other event. Safe to call with analytics off. */
export function track(name, params = {}) {
  if (!analyticsEnabled) return
  window.gtag?.('event', name, params)
  window.dataLayer?.push({ event: name, ...params })
}

/**
 * Delegated listener for the conversions worth measuring.
 *
 * One listener on the document rather than a handler on every button: nothing
 * to remember when a new CTA is added, and no analytics code sprinkled through
 * the components. `tel:` and `mailto:` are matched by href, everything else by
 * an explicit data-analytics attribute so a rename cannot silently break it.
 */
export function wireEventDelegation() {
  if (typeof document === 'undefined') return undefined
  const onClick = (e) => {
    const el = e.target.closest('a[href^="tel:"], a[href^="mailto:"], [data-analytics]')
    if (!el) return
    const href = el.getAttribute?.('href') ?? ''
    if (href.startsWith('tel:')) return track('telephone_click', { value: href.slice(4) })
    if (href.startsWith('mailto:')) return track('email_click', { value: href.slice(7) })
    return track(el.dataset.analytics, { label: el.textContent?.trim().slice(0, 80) })
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}
