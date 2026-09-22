import { useMemo } from 'react'
import StructuredData, { graphOf, organisationNode, websiteNode } from './StructuredData.jsx'

/**
 * The organisation and website graph, mounted once for the whole app.
 *
 * Page-level graphs reference these by @id rather than repeating them, so the
 * organisation is described once on the site instead of twenty-six times with
 * twenty-six chances to disagree with itself.
 */
export default function SiteStructuredData() {
  const graph = useMemo(() => graphOf(organisationNode(), websiteNode()), [])
  return <StructuredData graph={graph} id="ld-site" />
}
