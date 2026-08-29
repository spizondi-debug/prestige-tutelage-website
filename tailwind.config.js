/** @type {import('tailwindcss').Config} */

// PRESTIGE COLOUR SYSTEM
//
// The two brand colours are sampled from the official logo artwork, not
// approximated: #006FD8 and #2DA22F. Do not substitute "close enough" values,
// and do not recolour the logo itself.
//
// Every pairing below has been checked for WCAG AA (4.5:1) at body size.
// Three results shape the whole system and must not be quietly undone:
//
//   * White on Prestige Green is 3.32:1 — it FAILS. Green buttons therefore
//     carry Midnight text, never white.
//   * White on Electric Blue is 3.90:1 — it FAILS. Electric Blue is a
//     graphic accent (lighting, strokes, glow), never a text or fill colour
//     behind white text.
//   * Prestige Blue on Midnight is 3.58:1 — it FAILS. On dark surfaces
//     interactive text is white, brightening to Growth Green on hover.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Dark foundation ──────────────────────────────────────────────
        // Never pure black: the darkest value on the site is #061521.
        'midnight-deep': '#061521', // top of the cinematic hero gradient only
        midnight: '#071A2B',        // the main dark foundation
        navy: '#0B2742',            // secondary dark sections, cards on dark
        'navy-lift': '#0D4F81',     // gradient midpoint; link hover on light

        // ── Light surfaces ───────────────────────────────────────────────
        // Never stark white everywhere: Cloud is the default light section.
        cloud: '#F5F8FA',
        mist: '#EAF0F4',
        paper: '#FFFFFF', // reserved for important content surfaces

        // ── Text ─────────────────────────────────────────────────────────
        ink: '#102436',   // primary — softer than black
        body: '#526575',  // body copy
        // Muted was specified as #7C8C98, which is 3.25:1 on Cloud and fails
        // AA. Darkened along its own hue to the first passing value so
        // captions and metadata stay legible, per "do not make important
        // information too light".
        muted: '#63727E',

        // ── Hairlines ────────────────────────────────────────────────────
        line: 'rgba(7, 26, 43, 0.10)',
        'line-dark': 'rgba(255, 255, 255, 0.10)',

        prestige: {
          blue: '#006FD8',     // exact logo blue — knowledge, links, active states
          'blue-bright': '#0877D8', // primary button hover; brightest blue still AA on white
          electric: '#1585D8', // graphic accent only — lighting, strokes, glow
          green: '#2DA22F',    // exact logo green — growth, progression, success
          growth: '#45B95C',   // refined secondary green — highlights, hover, stats
        },
      },
      backgroundImage: {
        // Signature gradients. Used selectively — never as a page-wide wash.
        'prestige-digital': 'linear-gradient(135deg, #0B2742 0%, #0D4F81 48%, #1585D8 100%)',
        'prestige-growth': 'linear-gradient(135deg, #0D4F81 0%, #1585D8 48%, #45B95C 100%)',
        'prestige-midnight': 'linear-gradient(180deg, #061521 0%, #071A2B 55%, #0B2742 100%)',
      },
      fontFamily: {
        // Poppins throughout. `display` and `sans` stay separate tokens so the
        // two roles can diverge again later without touching every component.
        display: ['Poppins', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 5vw, 4.4rem)', { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        // Oversized statements for the cinematic sections
        statement: ['clamp(2.1rem, 6vw, 5.2rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        editorial: ['clamp(1.95rem, 4.2vw, 3.4rem)', { lineHeight: '1.12', letterSpacing: '-0.03em' }],
        // Standard section title — a step up from body scale, bounded so it
        // still works for sub-sections on interior pages.
        section: ['clamp(1.8rem, 3.1vw, 2.7rem)', { lineHeight: '1.16', letterSpacing: '-0.025em' }],
      },
      boxShadow: {
        // Premium, not heavy: tinted with the brand navy rather than black.
        soft: '0 2px 8px rgba(7, 26, 43, 0.05)',
        premium: '0 16px 50px rgba(7, 26, 43, 0.12)',
        lifted: '0 22px 60px rgba(7, 26, 43, 0.18)',
      },
      transitionTimingFunction: {
        // Restrained, premium easing — no bounce.
        prestige: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
