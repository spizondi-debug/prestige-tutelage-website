// Interior page header — echoes the approved hero language: cream ground,
// hairline + eyebrow, Fraunces headline, restrained decoration.
export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute right-[-8rem] top-[-10rem] h-[24rem] w-[24rem] rounded-full bg-prestige-blue/[0.04]" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[20rem] w-[20rem] rounded-full bg-prestige-green/[0.05]" />
      </div>
      <div className="container-px">
        <div className="max-w-3xl py-14 lg:py-20">
          {eyebrow && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-blue">{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 text-lg leading-relaxed text-body">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
