import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import CTABand from '../components/CTABand.jsx'
import { whyPrestige } from '../components/home/WhyPrestige.jsx'
import { brand, contact } from '../data/site.js'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { Accent } from '../components/Section.jsx'

const philosophy = [
  {
    title: 'Learning must serve the work',
    text: 'We design from the job backwards. If a programme does not change what someone can do at work, it has not done its job — however good the workshop felt.',
  },
  {
    title: 'People learn from people',
    text: 'Facilitators who know the industry, respect learners’ experience and support them as human beings are at the centre of everything we deliver.',
  },
  {
    title: 'Administration is part of quality',
    text: 'Clean records, honest assessment and disciplined reporting are not paperwork — they are what make a result worth the certificate it is printed on.',
  },
  {
    title: 'Partnership over transactions',
    text: 'We would rather understand your organisation deeply and grow with it than sell one course at a time.',
  },
]

const journey = [
  {
    stage: 'Founded on a simple conviction',
    text: 'Prestige Tutelage was built on the belief that South African organisations deserve training that is both credible and genuinely useful — accredited where it matters, practical everywhere.',
  },
  {
    stage: 'Grown through delivery',
    text: 'From early programmes to multi-sector delivery across business, production, agriculture and community development, growth has come from doing the work properly and being asked back.',
  },
  {
    stage: 'Built for what is next',
    text: 'With an established assessment capability and the Prestige Growth Pathways solution alongside the training business, Prestige keeps investing in the machinery of workforce development.',
  },
]

export default function About() {
  usePageMeta(
    'About',
    'Prestige Tutelage is a South African accredited training and workforce development company based in Randburg, partnering with organisations across business, production, agriculture and community development.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.about}
        eyebrow="About Prestige Tutelage"
        title={<>A South African training company built on <Accent>credibility and care</Accent>.</>}
        lead="Prestige Tutelage is an accredited training and workforce development company based in Randburg, Johannesburg. We help organisations build capable, confident and future-ready teams — and we help people build working lives worth being proud of."
      />

      {/* Who we are */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Who we are"
                title="Serious about training. Human about how it happens."
                lead="We deliver accredited programmes, learnerships, short courses and workplace training for employers across South Africa — backed by our own assessment centre and disciplined learner administration."
              />
              <p className="mt-5 leading-relaxed text-body">
                Our clients range from operations that need production and agricultural skills on the
                ground, to corporates developing managers and professional teams, to public and
                community programmes creating opportunity for unemployed youth. What they share is a
                need for a partner who does what it says — on time, to standard, with proper records.
              </p>
              <p className="mt-4 text-sm font-medium text-muted">{brand.credibility.join(' • ')}</p>
            </div>
            <ContentSlider
              images={sectionSliders.aboutWhoWeAre}
              aspect="aspect-[4/3]"
              label="Prestige Tutelage training and workplace culture"
            />
          </div>
        </div>
      </section>

      {/* Purpose — a photograph carries the statement rather than flat colour.
          The blue base sits under the photo so the band is never a pale gap
          while the file loads, and the type never lands on bare photograph.

          The overlay is measured, not guessed. From lg up the text occupies
          the left ~60%, so the blue thins towards the right and the room
          reads through. Below lg the text spans almost the full width, and
          that same falloff put its lightest backdrop pixel at 2.99:1 — under
          the 3.0 that 24px type needs — so narrow screens get a near-even
          overlay instead. Re-measure against the rendered band, not the flat
          token, if either stop moves. */}
      <section className="relative isolate overflow-hidden border-y border-line bg-prestige-blue-deep">
        {/* Not the 42% this photograph carries in pageHeroes: that crop suits
            a tall hero panel, and in a band this wide and short it cuts the
            facilitator off at the neck. Empty alt — the statement is the
            content here and the photograph adds nothing a reader needs. */}
        <Photo
          src="facilitator-session.jpg"
          alt=""
          position="center 10%"
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,89,168,0.94)_0%,rgba(5,89,168,0.86)_100%)] lg:bg-[linear-gradient(to_right,rgba(5,89,168,0.94)_0%,rgba(5,89,168,0.90)_46%,rgba(5,89,168,0.78)_72%,rgba(6,109,206,0.60)_100%)]"
          aria-hidden="true"
        />
        <div className="container-px relative py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="mb-7 block h-1 w-14 rounded-full bg-prestige-green" aria-hidden="true" />
            <p className="font-display text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-[2.125rem] lg:leading-[1.45]">
              Our purpose is in our name on the door: developing people, strengthening organisations —
              so that skills development in South Africa means real capability, real dignity and real
              opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Training philosophy"
                title="Four convictions shape every programme we run."
              />
              <span className="mt-7 block h-1 w-14 rounded-full bg-prestige-green" aria-hidden="true" />
            </div>
            <div className="relative">
              {/* Connecting trace between the four badges — decorative,
                  desktop only. Coordinates are percentages of this box, tuned
                  to land on the badge centres in the two-column card grid
                  below; re-tune alongside the badge offsets if either moves. */}
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M -4 8 H 82" fill="none" stroke="#0A5FB8" strokeWidth="0.5" strokeLinecap="round" />
                <path
                  d="M 21 8 V 46 Q 21 58 31 58 H 69 Q 79 58 79 46 V 22"
                  fill="none"
                  stroke="#0A5FB8"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {philosophy.map((p, i) => (
                  <div
                    key={p.title}
                    className="relative rounded-2xl border border-line bg-paper p-6 pt-9 shadow-premium lg:p-7 lg:pt-10"
                  >
                    <span
                      className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-prestige-green text-sm font-bold text-white lg:left-7"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-prestige-blue-hover">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-body">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach + accreditation */}
      <section className="border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Our approach"
                title="Workforce development, end to end."
                lead="We work the full journey: understanding the organisation, diagnosing the real gaps, designing the right mix of interventions, delivering them well, and measuring what changed."
              />
              <p className="mt-5 leading-relaxed text-body">
                That means one accountable partner across accredited programmes, learnerships, short
                courses, workplace training, assessment and learner administration — instead of a
                different provider for every piece.
              </p>
              <Link to="/corporate-training" className="btn btn-outline mt-7">See How We Work</Link>
            </div>
            <div>
              <SectionHeading
                eyebrow="Accreditation & transformation"
                title="Credentials stated plainly."
              />
              <ul className="mt-6 space-y-4">
                <li className="border-l-2 border-prestige-green/60 pl-5">
                  <h3 className="font-sans font-semibold text-ink">Accredited training provider</h3>
                  <p className="mt-1 leading-relaxed text-body">
                    Prestige delivers qualifications with formal assessment, moderation and quality
                    assurance behind every result. Programme availability is subject to current
                    qualification registration, our applicable accreditation or approved delivery
                    route, and the relevant assessment and certification arrangements — all confirmed
                    in writing when we scope your intervention.
                  </p>
                </li>
                <li className="border-l-2 border-prestige-green/60 pl-5">
                  <h3 className="font-sans font-semibold text-ink">Level 1 B-BBEE contributor</h3>
                  <p className="mt-1 leading-relaxed text-body">
                    Procurement from Prestige supports clients’ own scorecards, and our programmes can
                    support the skills development element of B-BBEE planning.
                  </p>
                </li>
                <li className="border-l-2 border-prestige-green/60 pl-5">
                  <h3 className="font-sans font-semibold text-ink">Based in Randburg, Johannesburg</h3>
                  <p className="mt-1 leading-relaxed text-body">
                    {contact.addressLines.join(', ')} — delivering on-site at client workplaces across
                    South Africa.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative overflow-hidden pb-20 pt-16 lg:pb-28 lg:pt-24">
        <div className="container-px relative">
          <SectionHeading eyebrow="Our journey" title="Built steadily, the way trust is built." />

          {/* Numbered timeline — desktop only; the chapter badge inline with
              each item's own heading (below) carries the same signal on
              narrow screens without needing three evenly-spaced columns. */}
          <div className="relative mt-14 hidden lg:block" aria-hidden="true">
            <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-prestige-green/30" />
            <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-prestige-green" />
            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-prestige-green" />
            <div className="relative grid grid-cols-3">
              {journey.map((j, i) => (
                <div key={j.stage} className="flex justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-prestige-green font-display text-base font-bold text-white ring-8 ring-prestige-green/10">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ol className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-3 lg:gap-16">
            {journey.map((j, i) => (
              <li key={j.stage}>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-prestige-green font-display text-base font-bold text-white ring-8 ring-prestige-green/10 lg:hidden">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">Chapter {i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-prestige-blue-hover">{j.stage}</h3>
                <p className="mt-2 leading-relaxed text-body">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Wave transition into the Why-partner section below. */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full text-prestige-blue-light lg:h-20"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0,45 C240,95 480,5 720,25 C960,45 1200,95 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </section>

      {/* Why partner */}
      <section className="relative overflow-hidden bg-prestige-blue-light py-16 lg:py-24">
        <svg
          className="pointer-events-none absolute -left-24 -top-24 hidden h-[26rem] w-[26rem] lg:block"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="0" cy="0" r="140" stroke="#066DCE" strokeWidth="1.2" opacity="0.18" />
          <circle cx="0" cy="0" r="220" stroke="#066DCE" strokeWidth="1.1" opacity="0.14" />
          <circle cx="0" cy="0" r="300" stroke="#31B84A" strokeWidth="1.1" opacity="0.16" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-24 -right-24 hidden h-[26rem] w-[26rem] lg:block"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="140" stroke="#066DCE" strokeWidth="1.2" opacity="0.18" />
          <circle cx="400" cy="400" r="220" stroke="#066DCE" strokeWidth="1.1" opacity="0.14" />
          <circle cx="400" cy="400" r="300" stroke="#31B84A" strokeWidth="1.1" opacity="0.16" />
        </svg>
        <div className="container-px relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Why organisations partner with Prestige"
              title="Chosen for how we work, kept for what we deliver."
            />
            <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {whyPrestige.map((w, i) => (
                <div
                  key={w.title}
                  className={`border-b border-line py-5 ${i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''}`}
                >
                  <dt className="font-display text-lg font-semibold text-prestige-blue-hover">{w.title}</dt>
                  <dd className="mt-1.5 leading-relaxed text-body">{w.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTABand
        title="Get to know Prestige properly."
        text="The best way to evaluate a training partner is a conversation about your actual needs. We would welcome one."
      />
    </>
  )
}
