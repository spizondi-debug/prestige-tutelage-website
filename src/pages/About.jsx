import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
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
        badge="Randburg, Johannesburg"
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
                tone="green"
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
              label="Prestige Tutelage certificate handovers"
            />
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="border-y border-line bg-navy py-16 lg:py-20">
        <div className="container-px">
          <div className="max-w-3xl">
            <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
            <p className="font-display text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
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
            <SectionHeading
              eyebrow="Training philosophy"
              title="Four convictions shape every programme we run."
            />
            <div className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {philosophy.map((p) => (
                <div key={p.title} className="border-b border-line py-6">
                  <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-body">{p.text}</p>
                </div>
              ))}
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
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading eyebrow="Our journey" title="Built steadily, the way trust is built." />
          <ol className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-3">
            {journey.map((j, i) => (
              <li key={j.stage} className="relative pl-5">
                <span className="absolute left-0 top-1 h-full w-px bg-line" aria-hidden="true" />
                <span className="absolute -left-[3px] top-1 h-2 w-2 rounded-full bg-prestige-green" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">Chapter {i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{j.stage}</h3>
                <p className="mt-2 leading-relaxed text-body">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why partner */}
      <section className="border-t border-line bg-mist/60 py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Why organisations partner with Prestige"
              title="Chosen for how we work, kept for what we deliver."
            />
            <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {whyPrestige.map((w) => (
                <div key={w.title} className="border-b border-line py-5">
                  <dt className="font-display text-lg font-semibold text-ink">{w.title}</dt>
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
