import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import CTABand from '../components/CTABand.jsx'
import Reveal from '../components/Reveal.jsx'
import { industries } from '../data/industries.js'
import { iconForOffering, iconForSector } from '../data/industryIcons.js'
import { pageHeroes } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

/**
 * One sector, as a card: a solid coloured panel carrying the sector, against a
 * white panel carrying what Prestige delivers into it.
 *
 * Cards alternate blue and green down the page. Neither is the brand's bright
 * value: white is 4.19:1 on #087BE8 and 2.60:1 on #31B84A, both short of the
 * 4.5:1 the summary paragraph needs. Each panel is a gradient between two
 * darker steps of the same hue — 5.14:1 → 7.00:1 on the blue, 5.41:1 → 7.89:1
 * on the green — so the type clears AA across the whole sweep, not just at the
 * dark end.
 */
function IndustryCard({ industry, index }) {
  const SectorIcon = iconForSector(industry.slug)
  const green = index % 2 === 1

  return (
    <article
      id={industry.slug}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-paper shadow-premium"
    >
      <div className="lg:grid lg:grid-cols-[22rem_1fr] xl:grid-cols-[26rem_1fr]">
        {/* Sector */}
        <div
          className={`flex flex-col p-8 text-white lg:p-9 ${
            green
              ? 'bg-gradient-to-br from-prestige-green-deep to-prestige-green-deeper'
              : 'bg-gradient-to-br from-prestige-blue-hover to-prestige-blue-deep'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
              Industry {String(index + 1).padStart(2, '0')}
            </p>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <SectorIcon size={21} strokeWidth={1.8} aria-hidden="true" />
            </span>
          </div>

          <h2 className="mt-6 font-display text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
            {industry.title}
          </h2>
          <span
            aria-hidden="true"
            className={`mt-5 block h-1 w-12 rounded-full ${green ? 'bg-white/70' : 'bg-prestige-green-light'}`}
          />
          <p className="mt-5 leading-relaxed text-white">{industry.summary}</p>
        </div>

        {/* What we deliver */}
        <div className="p-8 lg:p-9">
          <h3
            className={`text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
              green ? 'text-prestige-green-deep' : 'text-prestige-blue-hover'
            }`}
          >
            What we typically deliver
          </h3>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {industry.offerings.map((o) => {
              const Icon = iconForOffering(o)
              return (
                <li
                  key={o}
                  className={`flex items-start gap-4 rounded-xl p-4 ${
                    green ? 'bg-prestige-green-pale' : 'bg-prestige-blue-light'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper ${
                      green ? 'text-prestige-green-deep' : 'text-prestige-blue-hover'
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-body">{o}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Industries() {
  usePageMeta(
    'Industries',
    'Workplace training and learnerships across manufacturing, agriculture and agri-processing, logistics, retail, professional services, the public sector and community development — from Prestige Tutelage, an accredited South African training provider.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.industries}
        eyebrow="Industries"
        title={<>Training designed for the <Accent>realities of your sector</Accent>.</>}
        lead="A supervisor on a poultry farm, a team leader on a production line and a manager in a professional firm face different problems. We design for each — and we know the difference."
      >
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Industry sectors">
          {industries.map((i) => (
            <a
              key={i.slug}
              href={`#${i.slug}`}
              className="text-sm font-semibold text-prestige-blue-hover transition-colors hover:text-prestige-blue-hover"
            >
              {i.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="bg-mist/50 py-14 lg:py-20">
        <div className="container-px">
          <div className="space-y-8">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug}>
                <IndustryCard industry={ind} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Your sector, your constraints."
        text="Tell us how your operation runs and we will design training that fits around it — not the other way around."
        secondary={{ label: 'Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
