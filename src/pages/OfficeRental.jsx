import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { useEnquiryForm } from '../lib/useEnquiryForm.js'
import { spaceCategories, spaceFields, DETAILS_ON_ENQUIRY } from '../data/spaces.js'
import { contact } from '../data/site.js'

export default function OfficeRental() {
  usePageMeta(
    'Office & Training Space Rental',
    'Training room, meeting room and office space rental in Ferndale, Randburg. Flexible professional space from Prestige Tutelage for training, workshops, interviews, assessments and short-term office use.',
  )

  const form = useEnquiryForm(spaceFields, {
    subject: (v) => `Space enquiry — ${v.space || 'general'}${v.date ? ` (${v.date})` : ''}`,
  })

  return (
    <>
      <PageHeader
        image="facilitator-session.jpg"
        imageAlt="A Prestige Tutelage facilitator leading a session with learners"
        imagePosition="center 42%"
        badge="Ferndale, Randburg"
        eyebrow="Office & training space"
        title="Professional space when you need it."
        lead={`Flexible professional space available through Prestige Tutelage in Ferndale, Randburg — for training, workshops, meetings, interviews, assessments and short-term office use.`}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#check-availability" className="btn btn-primary">Check Space Availability</a>
          <a href={contact.phoneHref} className="btn btn-outline">Call {contact.phone}</a>
        </div>
      </PageHeader>

      {/* Details on enquiry — stated before anyone starts looking for specs */}
      <section className="border-b border-line bg-paper py-10">
        <div className="container-px">
          <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:gap-12">
            <h2 className="font-display text-xl font-semibold text-ink">Room options &amp; pricing</h2>
            <div>
              <p className="leading-relaxed text-body">{DETAILS_ON_ENQUIRY}</p>
              <p className="mt-3 leading-relaxed text-body">
                Options vary by date and booking, so we confirm what is available, what it includes
                and what it costs when you enquire — rather than publishing a list that may not hold
                for your dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="mb-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="overflow-hidden">
              <Photo
                src="training-room.jpg"
                alt="A training room at Prestige Tutelage set up with a projector screen and boardroom seating"
                className="aspect-[4/3] w-full"
                eager
              />
            </div>
            <SectionHeading
              eyebrow="What the space is used for"
              title="Four kinds of booking."
              lead="Tell us what you are running and we will advise on the right room. Room options, capacity, facilities and pricing are confirmed when you enquire."
            />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {spaceCategories.map((cat, i) => (
              <article key={cat.slug} id={cat.slug} className="scroll-mt-28 border border-line bg-paper p-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl font-semibold text-prestige-blue/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                    {cat.title}
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-body">{cat.lead}</p>

                <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
                  Suitable for
                </h4>
                <ul className="mt-3 border-t border-line">
                  {cat.suitableFor.map((s) => (
                    <li key={s} className="flex items-start gap-3 border-b border-line py-2.5 text-[0.95rem] text-body">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <Disclaimer className="mt-10">{DETAILS_ON_ENQUIRY}</Disclaimer>
        </div>
      </section>

      {/* Why book here */}
      <section className="border-y border-line bg-mist/60 py-14 lg:py-16">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="Why book with Prestige"
              title="A training company’s space, run by people who use it."
            />
            <div className="grid gap-x-12 border-t border-line sm:grid-cols-2">
              {[
                { t: 'Set up for learning', d: 'These are rooms a training provider uses every week — arranged for groups who are there to work.' },
                { t: 'Assessment-aware', d: 'We understand what a controlled assessment needs, because we run them ourselves.' },
                { t: 'In Ferndale, Randburg', d: `${contact.addressLines.join(', ')} — convenient for Johannesburg-based teams.` },
                { t: 'One conversation', d: 'Booking, access and arrangements handled by the same team that answers the phone.' },
              ].map((x) => (
                <div key={x.t} className="border-b border-line py-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{x.t}</h3>
                  <p className="mt-1.5 leading-relaxed text-body">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="check-availability" className="scroll-mt-28 py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Check availability"
                title="Tell us what you need and when."
                lead="We will confirm what is available for your dates, what the room includes and what it costs."
              />
              <div className="mt-7 space-y-2 text-body">
                <p>
                  <a href={contact.phoneHref} className="font-semibold text-prestige-blue hover:underline">
                    {contact.phone}
                  </a>
                </p>
                <p>
                  <a href={contact.emailHref} className="font-semibold text-prestige-blue hover:underline">
                    {contact.email}
                  </a>
                </p>
                <address className="not-italic leading-relaxed text-muted">
                  {contact.addressLines.join(', ')}
                </address>
              </div>
            </div>
            <EnquiryForm
              fields={spaceFields}
              form={form}
              submitLabel="Check Space Availability"
              note="Sending an enquiry does not reserve a room. We will confirm availability, facilities and pricing before any booking is held."
            />
          </div>
        </div>
      </section>

      <CTABand
        title="Need the room for a programme we could also run?"
        text="Plenty of clients start by booking space and end up asking us to deliver the training in it. Either conversation is welcome."
        primary={{ label: 'Check Space Availability', to: '/contact?interest=Office%20%2F%20Training%20Space%20Rental' }}
        secondary={{ label: 'See Corporate Training', to: '/corporate-training' }}
      />
    </>
  )
}
