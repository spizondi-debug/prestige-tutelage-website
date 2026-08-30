import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { Accent, SectionHeading } from '../components/Section.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import VideoFeature from '../components/VideoFeature.jsx'
import Reveal from '../components/Reveal.jsx'
import CTABand from '../components/CTABand.jsx'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { growthPathwaysMedia } from '../data/media.js'
import {
  audiences, comparison, ENQUIRY, howItWorks, journey, outcomes,
} from '../data/growthPathways.js'

/**
 * The seven stages, as one rail.
 *
 * Two layouts from one list. Below xl the stages stack with a vertical
 * connector down the left, because seven columns in 1024px leaves 146px a
 * stage — narrower than the words. From xl up they run left to right, which is
 * how a journey reads, and 1440px gives each stage room.
 *
 * The connector is drawn per stage rather than as one absolute line across the
 * section, so it cannot drift out of step with the nodes when the grid reflows.
 * The last stage has none: the journey ends there.
 */
function JourneyRail() {
  return (
    <ol className="mt-12 grid gap-y-9 xl:grid-cols-7 xl:gap-x-5 xl:gap-y-0">
      {journey.map(({ icon: Icon, title, text }, i) => (
        <Reveal
          as="li"
          key={title}
          delay={i * 70}
          className="relative flex gap-5 xl:flex-col xl:gap-0"
        >
          {/* Connector to the next stage: down on stacked layouts, across on
              the rail. Hidden on the last stage. */}
          {i < journey.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[1.4375rem] top-12 h-[calc(100%+0.75rem)] w-px bg-prestige-blue/25 xl:left-1/2 xl:top-[1.4375rem] xl:h-px xl:w-full"
            />
          )}

          <span className="relative z-10 flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center rounded-full border border-prestige-blue/25 bg-prestige-blue-light text-prestige-blue-hover">
            <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
          </span>

          <div className="min-w-0 xl:mt-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-prestige-blue-hover">
              Stage {i + 1}
            </p>
            <h3 className="mt-1.5 font-sans font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

/** One side of the Tutelage / Growth Pathways comparison. */
function OfferingPanel({ offering, tone }) {
  const green = tone === 'green'
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-paper p-7 lg:p-8 ${
        green ? 'border-prestige-green/35' : 'border-prestige-blue/30'
      }`}
    >
      <p
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
          green ? 'text-prestige-green-deep' : 'text-prestige-blue-hover'
        }`}
      >
        {offering.role}
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink">{offering.name}</h3>
      <ul className="mt-6 space-y-3">
        {offering.points.map((p) => (
          <li key={p} className="flex items-start gap-3 leading-relaxed text-body">
            <span
              aria-hidden="true"
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                green ? 'bg-prestige-green' : 'bg-prestige-blue'
              }`}
            />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GrowthPathways() {
  usePageMeta(
    'Prestige Growth Pathways',
    'One workforce, one connected development journey. Growth Pathways links skills gaps, development planning, learning and progression to measurable outcomes.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.growthPathways}
        eyebrow="A related Prestige solution"
        title={<>Prestige <Accent>Growth Pathways</Accent></>}
        lead={
          <>
            <span className="block font-display text-xl font-semibold leading-snug sm:text-2xl">
              One workforce. One connected development journey.
            </span>
            <span className="mt-4 block">
              Growth Pathways connects workforce needs, learning and measurable progression — so a
              skills gap leads to a plan, a plan leads to learning, and learning leads to something
              the business can see.
            </span>
          </>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to={ENQUIRY} className="btn btn-primary">Discover Growth Pathways</Link>
          <Link to={ENQUIRY} className="btn btn-outline">Book a demo</Link>
        </div>

        {/* The pathway, in miniature: enough to show the shape of what follows
            without turning the hero into a diagram. Decorative — the section
            below carries the same seven stages as real content. */}
        <div className="mt-10 hidden max-w-md items-center gap-3 sm:flex" aria-hidden="true">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white">
            Skills gaps
          </span>
          <span className="flex flex-1 items-center gap-1.5">
            {journey.map((s, i) => (
              <span key={s.title} className="flex flex-1 items-center gap-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green-light" />
                {i < journey.length - 1 && <span className="h-px flex-1 bg-white/40" />}
              </span>
            ))}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white">
            Outcomes
          </span>
        </div>
      </PageHeader>

      {/* The connected journey */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="The connected journey"
            title="Seven stages that usually live in seven different places."
            lead="Growth Pathways runs them as one sequence, so development stops being a series of disconnected events."
          />
          <JourneyRail />
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-mist/50 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, in the order they actually happen."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {howItWorks.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 lg:p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-prestige-blue-hover text-white">
                      <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-semibold text-prestige-blue-hover/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 leading-relaxed text-body">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Watch — the product film. Nothing downloads until play is pressed;
          see VideoFeature. */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <VideoFeature
              media={growthPathwaysMedia}
              className="aspect-video w-full rounded-2xl border border-line shadow-premium"
            />
            <div>
              <SectionHeading
                eyebrow="Watch"
                title="Growth Pathways in ninety seconds."
              />
              <p className="mt-5 leading-relaxed text-body">
                A short film on how the connected approach works — from the first view of a skills
                gap through to what leadership sees at the end of it.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                Growth Pathways sits alongside the training Prestige delivers: the same facilitators
                and the same standards, applied to the planning layer rather than only the classroom.
              </p>
              <p className="mt-6 border-l-2 border-prestige-blue/30 pl-5 text-sm leading-relaxed text-muted">
                The interface, figures and employee names in the film are a product demonstration.
                They illustrate how the view works and are not client data or measured results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <ContentSlider
              images={sectionSliders.growthPathways}
              aspect="aspect-[5/4]"
              label="Prestige Tutelage learners building practical skills"
              className="order-last lg:order-first"
            />
            <div>
              <SectionHeading
                eyebrow="Why it matters"
                title="Development that people can see themselves in."
              />
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {audiences.map((a) => (
                  <div key={a.who} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-sans font-semibold text-ink">{a.who}</dt>
                    <dd className="leading-relaxed text-body">{a.text}</dd>
                  </div>
                ))}
              </dl>
              <Link to={ENQUIRY} className="btn btn-outline mt-8">Talk to us about Growth Pathways</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How the two fit together */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="How the two fit together"
            title="Prestige Tutelage delivers the learning. Growth Pathways connects it to the business."
          />

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
            <OfferingPanel offering={comparison.tutelage} tone="blue" />

            {/* The join between the two, drawn rather than described. */}
            <div className="flex items-center justify-center lg:flex-col" aria-hidden="true">
              <span className="h-px w-10 bg-prestige-blue/25 lg:h-16 lg:w-px" />
              <span className="mx-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-prestige-blue/25 bg-prestige-blue-light text-xs font-semibold text-prestige-blue-hover lg:mx-0 lg:my-3">
                +
              </span>
              <span className="h-px w-10 bg-prestige-blue/25 lg:h-16 lg:w-px" />
            </div>

            <OfferingPanel offering={comparison.pathways} tone="green" />
          </div>

          <p className="mt-8 max-w-3xl border-l-2 border-prestige-green/60 pl-5 leading-relaxed text-body">
            {comparison.standalone}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/programmes" className="btn btn-primary">See our programmes</Link>
            <Link to="/services" className="btn btn-outline">Explore services</Link>
          </div>
        </div>
      </section>

      {/* Business outcomes */}
      <section className="border-t border-line bg-mist/50 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Business outcomes"
            title="What an organisation gets out of running it this way."
          />
          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 60} className="border-t-2 border-prestige-green/50 pt-5">
                <h3 className="font-sans font-semibold text-ink">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{o.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            These describe what the approach is designed to give an organisation. Results depend on
            the workforce, the roles and the commitment behind the plan.
          </p>
        </div>
      </section>

      <CTABand
        title="Connect learning to the future of your workforce."
        text="A short conversation is the fastest way to see whether the connected approach fits how your organisation works."
        primary={{ label: 'Explore Growth Pathways', to: ENQUIRY }}
        secondary={{ label: 'Talk to our team', to: ENQUIRY }}
      />
    </>
  )
}
