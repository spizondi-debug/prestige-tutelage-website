/**
 * GrowthVisual — the light, illustrative fallback for a story slot that has
 * no real photograph yet (currently Agriculture): a pale green backdrop
 * panel, concentric ripple arcs and a few flowing contour lines, evoking
 * fields and growth without standing in a real photo's place. Swap this out
 * the moment genuine Prestige agricultural photography exists.
 */
export default function GrowthVisual() {
  // Evenly spaced contour lines, each a gentle wave with a small vertical
  // offset from the last — cheaper and easier to keep parallel than hand
  // authoring every path.
  const waves = Array.from({ length: 9 }, (_, i) => {
    const y = 360 + i * 26
    return `M 420 ${y} C 560 ${y - 46}, 660 ${y + 46}, 800 ${y - 10}`
  })

  return (
    <div className="absolute inset-0 overflow-hidden bg-paper" aria-hidden="true">
      <div
        className="absolute inset-y-0 right-0 w-[78%] rounded-l-[10rem]"
        style={{ backgroundColor: '#EAF7EE' }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {[70, 130, 190, 250, 310, 370, 430, 490].map((r) => (
          <circle key={r} cx="560" cy="260" r={r} stroke="#1E7A2E" strokeWidth="1" opacity="0.16" />
        ))}
        {waves.map((d, i) => (
          <path key={d} d={d} stroke="#1E7A2E" strokeWidth="1.2" opacity={0.32 - i * 0.02} fill="none" />
        ))}
      </svg>
    </div>
  )
}
