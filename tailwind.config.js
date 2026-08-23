/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Premium neutral system
        paper: '#FFFFFF',
        cream: '#F5F8FA',
        cloud: '#F5F8FA',
        sand: '#EAF0F4',
        mist: '#EAF0F4',
        ink: '#102436',
        body: '#526575',
        muted: '#7C8C98',
        line: '#DCE6EC',

        // Premium dark foundations
        midnight: '#071A2B',
        navy: '#0B2742',
        electric: '#1585D8',

        // Keep the established Prestige blue + green as brand anchors
        prestige: {
          blue: '#1E4FD8',
          'blue-deep': '#0B2742',
          'blue-soft': '#E4ECFF',
          green: '#0FB87A',
          'green-deep': '#07845C',
          'green-soft': '#E6F8F1',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.6rem, 5.2vw, 4.6rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        xl2: '20px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(7,26,43,0.06)',
        card: '0 22px 60px -28px rgba(7,26,43,0.30)',
        premium: '0 18px 50px rgba(7,26,43,0.12)',
        glow: '0 16px 45px rgba(30,79,216,0.22)',
      },
    },
  },
  plugins: [],
}
