import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Prestige Tutelage site. Independent of Prestige Growth Pathways.
//
// The site is served from the custom domain www.prestigetutelage.co.za at its
// root, so base is "/". public/CNAME is what tells GitHub Pages to serve that
// domain instead of the /prestige-tutelage-website/ project subpath it would
// otherwise use. Both have to agree: a root base served from the subpath (or a
// subpath base served from the root) resolves every asset to a 404.
//
// Nothing else needs to change for this. src/lib/asset.js builds asset URLs
// from import.meta.env.BASE_URL, and src/main.jsx already maps a "/" base to an
// undefined router basename, so both follow this value automatically.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { port: 5180, open: false },
})
