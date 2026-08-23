/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial (light) surfaces
        paper: '#FFFFFF',
        cream: '#FAF8F4',
        sand: '#F1EDE4',
        ink: '#12233F',
        body: '#48586A',
        muted: '#7C8AA0',
        line: '#E6E3DA',

        // Cinematic (dark) surfaces — the Prestige Path lives on these
        night: '#060A13',
        'night-2': '#0A1122',
        'night-3': '#111C34',
        'night-line': '#1E2A44',

        prestige: {
          blue: '#1E4FD8',
          'blue-deep': '#0A2A6B',
          'blue-lit': '#4C87FF', // legible on night surfaces
          green: '#0FB87A',
          'green-deep': '#0A8A5C',
          'green-lit': '#2FE3A0', // legible on night surfaces
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.6rem, 5.2vw, 4.6rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        // Oversized statements for the cinematic sections
        statement: ['clamp(2.2rem, 6.4vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        editorial: ['clamp(2rem, 4.4vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        // Standard section title — a step up from body scale, bounded so it
        // still works for sub-sections on interior pages.
        section: ['clamp(1.85rem, 3.2vw, 2.85rem)', { lineHeight: '1.12', letterSpacing: '-0.012em' }],
      },
      boxShadow: {
        // Only the nav dropdown lifts off the page now; photographs sit flat.
        card: '0 18px 50px -24px rgba(18,35,63,0.28)',
      },
      transitionTimingFunction: {
        // Restrained, premium easing — no bounce.
        prestige: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
