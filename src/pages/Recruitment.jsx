import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import Photo from '../components/Photo.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { useEnquiryForm } from '../lib/useEnquiryForm.js'
import {
  recruitmentGroups,
  learnerRecruitment,
  roleCategories,
  engagementTypes,
  vacancyFields,
  CHECKS_QUALIFIER,
} from '../data/recruitment.js'

export default function Recruitment() {
  usePageMeta(
    'Recruitment Services',
    'Recruitment services in Johannesburg from Prestige Tutelage — candidate sourcing, screening and shortlisting, interview support, and specialist learnership and youth recruitment across South Africa.',
  )

  const form = useEnquiryForm(vacancyFields, {
    subject: (v) => `Vacancy — ${v.position || 'enquiry'}${v.company ? ` (${v.company})` : ''}`,
  })

  return (
    <>
      <PageHeader
        eyebrow="Recruitment services"
        title="Finding people who fit the role — and the organisation."
        lead="Recruitment is the other half of workforce development. Prestige sources, screens and shortlists candidates for employers — and brings particular strength to learnership and youth intakes, because we also run the programmes those learners go into."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact?interest=Recruitment" className="btn btn-primary">Find Talent With Prestige</Link>
          <a href="#submit-a-vacancy" className="btn btn-outline">Submit a Vacancy</a>
        </div>
      </PageHeader>

      {/* Engagement types */}
      <section className="border-b border-line bg-paper py-12 lg:py-14">
        <div className="container-px">
          <div className="grid gap-8 sm:grid-cols-3">
            {engagementTypes.map((e) => (
              <div key={e.name} className="border-l-2 border-prestige-green/60 pl-5">
                <h2 className="font-sans font-semibold text-ink">{e.name}</h2>
                <p className="mt-2 leading-relaxed text-body">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service groups */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="What we do"
                title="From first advert to first day."
                lead="Take the whole process, or the part you do not have capacity for."
              />
              <p className="mt-5 leading-relaxed text-body">
                Most of the work sits between the advert and the offer: reading applications
                properly, calling candidates who look right on paper, coordinating diaries across
                busy managers, and keeping every applicant informed. That is the part we carry.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
              <Photo
                src="recruitment-interview.jpg"
                alt="A candidate interview taking place over a video call"
                className="aspect-[3/2] w-full"
              />
            </div>
          </div>

          <div className="mt-14 space-y-12">
            {recruitmentGroups.map((g, i) => (
              <div key={g.slug} id={g.slug} className="scroll-mt-28 border-t border-line pt-8">
                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-2xl font-semibold text-prestige-green/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                        {g.title}
                      </h3>
                    </div>
                    <p className="mt-3 leading-relaxed text-body">{g.lead}</p>
                    {g.note && <Disclaimer className="mt-4">{g.note}</Disclaimer>}
                  </div>
                  <ul className="grid content-start gap-x-10 sm:grid-cols-2">
                    {g.services.map((s) => (
                      <li key={s} className="flex items-start gap-3 border-b border-line py-2.5 text-body">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learnership & youth recruitment — the differentiator */}
      <section className="border-y border-line bg-sand/60 py-16 lg:py-20">
        <div className="container-px">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Where we are strongest"
                title="Learnership & youth recruitment."
                lead={learnerRecruitment.lead}
              />
              <ul className="mt-8 grid gap-x-10 border-t border-line sm:grid-cols-2">
                {learnerRecruitment.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 border-b border-line py-2.5 text-body">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link to="/programmes#learnerships" className="btn btn-outline mt-8">How Learnerships Work</Link>
            </div>
            <div className="overflow-hidden rounded-xl2 border border-line shadow-card lg:mt-2">
              <Photo
                src="graduates-group.jpg"
                alt="A group of graduates walking together after their ceremony"
                className="aspect-[3/2] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              eyebrow="Roles we recruit for"
              title="The roles we know, because we train for them."
              lead="Our recruitment sits closest to the occupations we already develop people into."
            />
            <ul className="grid content-start gap-x-10 border-t border-line sm:grid-cols-2">
              {roleCategories.map((r) => (
                <li key={r} className="flex items-start gap-3 border-b border-line py-3 text-body">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-prestige-green" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <Disclaimer className="mt-10">{CHECKS_QUALIFIER}</Disclaimer>
        </div>
      </section>

      {/* Vacancy form */}
      <section id="submit-a-vacancy" className="scroll-mt-28 border-t border-line bg-paper py-16 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Submit a vacancy"
                title="Tell us who you need."
                lead="The more you can tell us about the role and the person who would succeed in it, the better the shortlist."
              />
              <p className="mt-5 leading-relaxed text-body">
                We will come back to confirm scope, timelines and terms before any sourcing starts.
              </p>
            </div>
            <EnquiryForm
              fields={vacancyFields}
              form={form}
              submitLabel="Submit Vacancy"
              note="Prestige will confirm the engagement, scope and fees in writing before beginning any recruitment work."
            />
          </div>
        </div>
      </section>

      <CTABand
        title="Find talent with Prestige."
        text="Whether it is one supervisor or a learnership intake of forty, tell us what you need and we will tell you honestly whether we are the right fit."
        primary={{ label: 'Find Talent With Prestige', to: '/contact?interest=Recruitment' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  )
}
