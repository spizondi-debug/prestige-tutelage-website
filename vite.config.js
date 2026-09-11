import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Prestige Tutelage site. Independent of Prestige Growth Pathways.
//
// The deployed site is code-split per route: a visitor landing on a course
// page should not download the homepage's canvas work. The single-file
// preview cannot be, because a lazy chunk is a separate file and a page
// opened from file:// has no origin to fetch it from — every route except
// Home came up blank the first time this was tried.
//
// So the preview build, and only the preview build, collapses everything back
// into one bundle. Same source, same routes, different packaging. The flag is
// the one already used to switch the router to hashes for the same reason.
const singleFilePreview = process.env.VITE_HASH_ROUTER === '1'

export default defineConfig({
  plugins: [react()],
  server: { port: 5180, open: false },
  build: singleFilePreview
    ? { rollupOptions: { output: { inlineDynamicImports: true } } }
    : {},
})
