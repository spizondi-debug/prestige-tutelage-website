import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Prestige Tutelage site. Independent of Prestige Growth Pathways.
export default defineConfig({
  plugins: [react()],
  server: { port: 5180, open: false },
})
