import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import StructuredData, { graphOf, breadcrumbNode, webPageNode } from './StructuredData.jsx'
import { pageSeo, SITE_NAME } from '../lib/seo.js'
import { allPages } from '../data/site.js'

/**
 * WebPage and BreadcrumbList for the curated routes.
 *
 * Mounted once in App rather than added to fifteen page components: the trail
 * for a top-level page is always Home -> that page, and the label already
 * exists in the navigation data. Course pages and insight articles build their
 * own richer graphs and are skipped here, so nothing is described twice.
 */
export default function PageStructuredData() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'

  const graph = useMemo(() => {
    const seo = pageSeo[path]
    if (!seo) return null // generated route: it emits its own graph
    const label = allPages.find((p) => p.to === path)?.label ?? seo.title
    const trail =
      path === '/'
        ? [{ name: 'Home', path: '/' }]
        : [{ name: 'Home', path: '/' }, { name: label, path }]
    const title = `${seo.title} | ${SITE_NAME}`
    return graphOf(webPageNode(path, title, seo.description), breadcrumbNode(trail))
  }, [path])

  return <StructuredData graph={graph} id={`ld-page-${path}`} />
}
