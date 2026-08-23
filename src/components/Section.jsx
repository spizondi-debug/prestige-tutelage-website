// Small layout primitives shared across the site.

export function Eyebrow({ children, light = false }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`h-px w-10 ${light ? 'bg-prestige-green' : 'bg-prestige-green'}`} />
      <span className={`text-sm font-semibold tracking-wide ${light ? 'text-white/80' : 'text-prestige-blue'}`}>
        {children}
      </span>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, lead, light = false, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <div className={`mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-10 bg-prestige-green" />
          <span className={`text-sm font-semibold tracking-wide ${light ? 'text-white/85' : 'text-prestige-blue'}`}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className={`font-display text-3xl font-semibold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/80' : 'text-body'}`}>{lead}</p>
      )}
    </div>
  )
}
