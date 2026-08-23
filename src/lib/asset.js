/**
 * Resolve a path under public/.
 *
 * Normally this is just the deployed base URL + path. A self-contained build
 * (the shareable single-file preview) pre-populates `__PT_ASSETS__` with data
 * URIs so the page works with no server behind it; production is unaffected.
 */
export function assetUrl(path) {
  const inlined = globalThis.__PT_ASSETS__
  if (inlined && inlined[path]) return inlined[path]
  return `${import.meta.env.BASE_URL}${path}`
}
