// Client logos, supplied by Prestige.
//
// COMPLIANCE — read before editing:
//   * These are Prestige's own clients, named by Prestige. Do not add an
//     organisation here on the strength of a mention anywhere else, and never
//     to fill a gap in the row.
//   * The strip credits a working relationship. It makes no claim about what
//     was delivered, how much, or with what result — no learner counts, no
//     outcomes, no testimonials. Those need the client's own sign-off.
//   * Marks are shown as supplied: trimmed of their margin and flattened onto
//     white, never recoloured, greyscaled, redrawn or stretched. A client's
//     logo is their property and their brand guidelines govern it.
//   * PERMISSION: displaying a third party's trademark on a public site is
//     normally something that organisation must agree to. Confirm consent for
//     each of these before the site goes to a public domain.
//
// `scale` is optical, not layout: a square roundel set to the same box height
// as a long wordmark reads as much bigger than it is, so the square marks are
// stepped down until the row looks even. It never distorts a logo — the box
// is `object-contain`, so both dimensions move together.

export const clients = [
  {
    name: 'voestalpine',
    file: 'voestalpine.png',
    alt: 'voestalpine',
    scale: 1,
  },
  {
    name: 'DRICONEQ',
    file: 'driconeq.png',
    alt: 'DRICONEQ',
    scale: 1,
  },
  {
    name: 'iBridge',
    file: 'ibridge.png',
    alt: 'iBridge',
    scale: 0.95,
  },
  {
    name: 'am2pm consulting',
    file: 'am2pm.png',
    alt: 'am2pm consulting',
    scale: 0.88,
  },
  {
    name: 'Zanokuhle Intellectuals Academy',
    file: 'zanokuhle.png',
    alt: 'Zanokuhle Intellectuals Academy',
    scale: 0.92,
  },
  {
    // Shown without a name at the client's request — the company was not
    // confirmed, and a guessed credit on a live site is worse than no credit.
    // Add `name` and a real `alt` once it is confirmed.
    name: null,
    file: 'client-g.png',
    alt: 'Client logo',
    scale: 0.8,
  },
]

export const CLIENTS_LEAD =
  'Organisations across manufacturing, engineering, consulting and education that Prestige Tutelage works with.'
