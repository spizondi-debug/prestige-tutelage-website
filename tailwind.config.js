/** @type {import('tailwindcss').Config} */

// PRESTIGE COLOUR SYSTEM
//
// Prestige blue is the primary colour of the site. Navy is no longer a brand
// surface anywhere: navigation, footer, CTA bands, card headers, buttons and
// every photographic overlay are blue. The only dark neutral left is `shadow`,
// used behind or over photographs where a blue tint would recolour the image.
//
// Values match the brand variables in src/index.css. Change them in both.
//
// Every pairing has been checked for WCAG AA. Four results shape the system
// and must not be quietly undone:
//
//   * White on Prestige Blue #087BE8 is 4.19:1 — enough for LARGE text
//     (3.0:1), short of normal text (4.5:1). Surfaces carrying small white
//     text use `blue-hover` #066DCE instead, which is 5.14:1.
//   * White on Prestige Green #31B84A is 2.60:1 — it FAILS. Green buttons
//     carry ink text, never white.
//   * Prestige Green on Prestige Blue is 1.61:1 — the two are almost the same
//     luminance. Green can never be text on blue; `green-light` #8FE3A1 is
//     the accent that reads there.
//   * Prestige Green on white is 2.60:1 — it FAILS. Green text on light
//     surfaces uses `green-deep` #1E7A2E.

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Prestige blue foundation ─────────────────────────────────────
        // The site's primary colour. Navy is no longer a brand surface; the
        // only dark neutrals left are photo scrims, where tinting the shadow
        // blue would recolour the photograph underneath.
        //
        // CONTRAST — read before using any of these behind text. White on
        // #087BE8 is 4.19:1: it clears AA for large text (3.0:1) but not for
        // normal text (4.5:1). `blue-hover` #066DCE is 5.14:1 and clears both.
        prestige: {
          blue: '#087BE8',          // --prestige-blue
          'blue-hover': '#066DCE',  // --prestige-blue-hover
          'blue-deep': '#0559A8',   // gradient depth, focus rings, pressed
          'blue-light': '#EAF4FF',  // --prestige-blue-light, pale metadata
          green: '#31B84A',         // --prestige-green — accent, never text on white
          // Green text has to be darkened to be legible: #31B84A is 2.60:1 on
          // white. This is the same hue at the same saturation, dark enough
          // to clear 4.5:1 on White, Cloud and Mist.
          'green-deep': '#1E7A2E',
          // Lifted green for accents sitting on blue.
          'green-light': '#8FE3A1',
        },

        // ── Photo scrims only ────────────────────────────────────────────
        // Not brand surfaces. Used behind or over photographs, where a blue
        // tint would shift the colour of the image itself.
        shadow: '#0B1B28',

        // ── Light surfaces ───────────────────────────────────────────────
        cloud: '#F5F8FA',
        mist: '#EDF2F6',   // 3 points lighter than before, so the blue label
                           // colour clears 4.5:1 on it (4.56 vs 4.47)
        paper: '#FFFFFF',

        // ── Text ─────────────────────────────────────────────────────────
        ink: '#172B3D',   // --prestige-text — 14.49:1 on white
        body: '#3E5B77',  //  6.63:1 — longer body copy
        muted: '#546F89', //  4.91:1 on Cloud, 4.55:1 on Mist — the floor

        // ── Hairlines ────────────────────────────────────────────────────
        line: 'rgba(23, 43, 61, 0.10)',
        'line-dark': 'rgba(255, 255, 255, 0.18)',
      },
      backgroundImage: {
        // Signature gradients. Used selectively — never as a page-wide wash.
        'prestige-digital': 'linear-gradient(135deg, #0559A8 0%, #066DCE 48%, #087BE8 100%)',
        'prestige-growth': 'linear-gradient(135deg, #066DCE 0%, #087BE8 55%, #31B84A 100%)',
        'prestige-deep': 'linear-gradient(180deg, #0559A8 0%, #066DCE 55%, #087BE8 100%)',
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
        // Premium, not heavy: tinted with the brand text colour rather than black.
        soft: '0 2px 8px rgba(23, 43, 61, 0.06)',
        premium: '0 16px 50px rgba(23, 43, 61, 0.13)',
        lifted: '0 22px 60px rgba(23, 43, 61, 0.18)',
      },
      transitionTimingFunction: {
        // Restrained, premium easing — no bounce.
        prestige: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
