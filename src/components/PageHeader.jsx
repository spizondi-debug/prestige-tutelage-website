/**
 * Interior page header. Carries the same language as the homepage: blueprint
 * grid on Cloud, wide-tracked micro-caps eyebrow, Poppins title at the
 * editorial scale.
 *
 * The soft coloured blobs this used to carry were the old idiom — they read as
 * decoration rather than structure, and nothing else on the site does that any
 * more.
 */
export default function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <section className="tex tex-grid border-b border-line bg-cloud">
      <div className="container-px">
        <div className="max-w-3xl py-16 lg:py-24">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-5 font-display text-editorial font-semibold text-ink">{title}</h1>
          {lead && <p className="mt-6 text-lg leading-relaxed text-body">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
