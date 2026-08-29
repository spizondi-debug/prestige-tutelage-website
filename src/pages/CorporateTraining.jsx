import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import { corporateProcess, corporateAudiences, deliveryFormats } from '../data/corporate.js'

export default function CorporateTraining() {
  usePageMeta(
    'Corporate Training',
    'Corporate training and workplace training in South Africa, built around your business — skills gap analysis, supervisory and leadership training, programme design, on-site delivery, learner administration and measurable outcomes.',
  )

  return (
    <>
      <PageHeader
        image="training-room.jpg"
        imageAlt="A training room at Prestige Tutelage set up with a projector screen and boardroom seating"
        imagePosition="center"
        eyebrow="Corporate training"
        title="Training built around your business."
        lead="Not a catalogue you choose from — a programme designed from your objectives, your operation and your people. Delivered where the work happens, administered properly, and measured against what actually changed."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn btn-primary">Request a Proposal</Link>
          <Link to="/short-courses" className="btn btn-outline">Browse Short Courses</Link>
        </div>
      </PageHeader>

      {/* The process */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="container-px">
          <div className="max-w-3xl">
            <span className="mb-5 block h-px w-10 bg-prestige-green" aria-hidden="true" />
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              One process, applied to your context.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Every engagement runs the same disciplined arc — so you always know where you are, what
              comes next and what you will have at the end.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
            {corporateProcess.map((step, i) => (
              <li key={step.name} className="bg-navy p-6">
                <span className="font-display text-lg font-semibold text-prestige-growth">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-sans font-semibold text-white">{step.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <div className="mb-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="overflow-hidden">
              <Photo
                src="facilitator-session.jpg"
                alt="A Prestige Tutelage facilitator leading a session with learners"
                className="aspect-[3/2] w-full"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="In the room"
                title="Facilitators who earn the room."
                lead="Training only transfers when the person at the front has industry credibility, reads the group, and can hold a mixed room of people with very different starting points."
              />
              <p className="mt-5 leading-relaxed text-body">
                Our facilitators are practitioners. They teach from work they have actually done, in
                language the group recognises — and they are comfortable moving between the formal
                content and the real questions that come up.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Who we work with"
              title="We speak the language of the people who carry the mandate."
              lead="Corporate training touches many desks. We make each of them easier."
            />
            <dl className="grid content-start border-t border-line">
              {corporateAudiences.map((a) => (
                <div key={a.role} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[0.4fr_0.6fr] sm:gap-6">
                  <dt className="font-sans font-semibold text-ink">{a.role}</dt>
                  <dd className="leading-relaxed text-body">{a.need}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Delivery formats */}
      <section className="border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Delivery formats"
                title="Delivered the way your organisation actually runs."
                lead="Shift patterns, production pressure and dispersed sites are normal. We plan around them rather than asking you to plan around us."
              />
              <div className="mt-8 overflow-hidden">
                <Photo
                  src="workshop-training.jpg"
                  alt="A learner in full protective equipment working with an angle grinder during practical training"
                  className="aspect-[4/5] w-full"
                />
              </div>
            </div>
            <dl className="grid content-start gap-x-12 border-t border-line sm:grid-cols-2">
              {deliveryFormats.map((f) => (
                <div key={f.name} className="border-b border-line py-5">
                  <dt className="font-display text-lg font-semibold text-ink">{f.name}</dt>
                  <dd className="mt-1.5 leading-relaxed text-body">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="What you get"
            title="A partner who protects your reputation inside the business."
          />
          <div className="mt-10 grid gap-x-12 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: 'A single accountable contact', d: 'One person who owns the engagement end to end — no chasing between departments.' },
              { t: 'Clean learner administration', d: 'Registers, records, progress and completion data you can hand to an auditor without flinching.' },
              { t: 'Facilitators who earn the room', d: 'Practitioners with industry credibility, warmth and the ability to hold a mixed group.' },
              { t: 'Assessment integrity', d: 'Formal assessment and moderation through our own assessment centre where applicable.' },
              { t: 'Transparent proposals', d: 'Clear scope, deliverables and pricing — structured for procurement, not padded.' },
              { t: 'Reporting that means something', d: 'Progress, completion and workplace application — reported in language the business uses.' },
            ].map((x) => (
              <div key={x.t} className="border-b border-line py-5 lg:pr-6">
                <h3 className="font-display text-lg font-semibold text-ink">{x.t}</h3>
                <p className="mt-1.5 leading-relaxed text-body">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Prestige is a Level 1 B-BBEE contributor — procurement from us supports your own scorecard,
            and our programmes can support the skills development element of your planning.
          </p>
        </div>
      </section>

      <CTABand
        title="Let’s scope your intervention."
        text="Bring us a business objective or a capability problem. We will come back with a practical, costed way forward."
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  )
}
