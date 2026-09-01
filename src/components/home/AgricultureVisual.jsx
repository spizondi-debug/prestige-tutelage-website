/**
 * AgricultureVisual — the branded panel for the Agriculture story in
 * FeaturedStories, standing in until genuine Prestige agricultural
 * photography exists. A technical, blueprint-style line drawing rather than
 * a stock farm: honest about what it is, in the same restrained blue/green
 * linework as the rest of the site's diagrams (see the Programmes page
 * "Technical Interventions" panel).
 *
 * Edge-to-edge, no card — matching the photo slots either side of it in
 * FeaturedStories, which deliberately run to the viewport edge rather than
 * sitting in a bordered box.
 */
export default function AgricultureVisual({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-prestige-blue-light ${className}`.trim()} aria-hidden="true">
      <svg
        viewBox="0 0 900 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="agriBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EAF4FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <pattern id="agriGrid" width="45" height="45" patternUnits="userSpaceOnUse">
            <path d="M45 0H0V45" fill="none" stroke="#0B2740" strokeWidth="1" opacity="0.05" />
          </pattern>
        </defs>

        <rect width="900" height="720" fill="url(#agriBg)" />
        <rect width="900" height="720" fill="url(#agriGrid)" />

        {/* Dotted grid cluster, top-left — a smaller echo of the site's corner swirl */}
        <g fill="#1E9142" opacity="0.35">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={70 + col * 22} cy={70 + row * 22} r="2.2" />
            )),
          )}
        </g>

        {/* Growth-cycle rings */}
        <circle cx="560" cy="330" r="190" fill="none" stroke="#31B84A" strokeWidth="1.4" strokeDasharray="3 7" opacity="0.4" />
        <circle cx="560" cy="330" r="140" fill="none" stroke="#087BE8" strokeWidth="1.2" opacity="0.28" />

        {/* Furrows */}
        <g fill="none" stroke="#0B2740" strokeWidth="1.4" opacity="0.22">
          <path d="M60 560 C 260 530, 620 530, 840 560" />
          <path d="M60 605 C 260 575, 620 575, 840 605" />
          <path d="M60 650 C 260 620, 620 620, 840 650" />
        </g>
        {/* Seedlings along the top furrow */}
        <g fill="#31B84A">
          {[150, 280, 410, 540, 670].map((x) => (
            <circle key={x} cx={x} cy={556 - (x % 3 === 0 ? 6 : 0)} r="4.5" opacity="0.55" />
          ))}
        </g>

        {/* Central plant — stem, leaf pairs, bud node */}
        <g fill="none" stroke="#1E7A2E" strokeWidth="2.4" strokeLinecap="round">
          <path d="M480 560 C 478 470, 486 380, 500 300" />
          <path d="M492 470 C 450 452, 420 420, 410 388" />
          <path d="M492 470 C 534 452, 564 420, 574 388" />
          <path d="M498 390 C 462 374, 436 346, 428 318" />
          <path d="M498 390 C 534 374, 560 346, 568 318" />
        </g>
        <g fill="#EAF4FF" stroke="#1E7A2E" strokeWidth="2">
          <circle cx="500" cy="300" r="7" />
          <circle cx="410" cy="388" r="5" />
          <circle cx="574" cy="388" r="5" />
          <circle cx="428" cy="318" r="5" />
          <circle cx="568" cy="318" r="5" />
        </g>

        {/* Signature vertical accent, right edge */}
        <line x1="800" y1="90" x2="800" y2="640" stroke="#31B84A" strokeWidth="1.4" opacity="0.5" />
        <circle cx="800" cy="90" r="5" fill="#EAF4FF" stroke="#31B84A" strokeWidth="2" />
        <circle cx="800" cy="360" r="8" fill="#31B84A" />
        <circle cx="800" cy="640" r="5" fill="#EAF4FF" stroke="#31B84A" strokeWidth="2" />
      </svg>
    </div>
  )
}
