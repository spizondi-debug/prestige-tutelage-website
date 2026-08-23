import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Prestige Tutelage site. Independent of Prestige Growth Pathways.
// GitHub Pages serves this repository from /prestige-tutelage-website/.
export default defineConfig({
  base: '/prestige-tutelage-website/',
  plugins: [react()],
  server: { port: 5180, open: false },
})
