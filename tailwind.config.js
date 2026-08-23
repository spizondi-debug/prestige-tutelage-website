/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        cream: '#FAF8F4',
        sand: '#F1EDE4',
        ink: '#12233F',
        body: '#48586A',
        muted: '#7C8AA0',
        line: '#E6E3DA',
        prestige: {
          blue: '#1E4FD8',
          'blue-deep': '#0A2A6B',
          green: '#0FB87A',
          'green-deep': '#0A8A5C',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.6rem, 5.2vw, 4.6rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        xl2: '20px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(18,35,63,0.05)',
        card: '0 18px 50px -24px rgba(18,35,63,0.28)',
      },
    },
  },
  plugins: [],
}
