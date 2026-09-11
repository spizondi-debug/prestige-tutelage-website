import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Award, ClipboardCheck, Users, Scale, FolderCheck, ShieldCheck,
  Target, HeartHandshake, Lightbulb, TrendingUp, Check, ChevronDown, ArrowRight,
} from 'lucide-react'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading, Accent, Eyebrow } from '../components/Section.jsx'
import CTABand from '../components/CTABand.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import Reveal from '../components/Reveal.jsx'
import CornerSwirl from '../components/CornerSwirl.jsx'
import ContentSlider from '../components/ContentSlider.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { useEnquiryForm } from '../lib/useEnquiryForm.js'
import StructuredData, {
  graphOf, organisationNode, websiteNode, breadcrumbNode, webPageNode, faqNode,
} from '../components/StructuredData.jsx'
import { pageHeroes, sectionSliders } from '../data/pageHeroes.js'
import { contact } from '../data/site.js'
import {
  SCOPE_NOTE, OUTCOME_QUALIFIER, FOOTER_TRUST_NOTICE, GAZETTE_REFERENCE,
  challenges, benefits, recognitionTiers, recognitionNotes, processSteps,
  inclusions, hostChain, whyUs, VISION, VISION_LINE, values, VALUES_CLOSING,
  faqs, yesFields,
} from '../data/yesProgramme.js'

const PATH = '/yes-programme-management'

const benefitIcons = { award: Award, clipboard: ClipboardCheck, users: Users, scale: Scale, folder: FolderCheck, shield: ShieldCheck }
const valueIcons = { target: Target, shield: ShieldCheck, inclusion: HeartHandshake, spark: Lightbulb, trend: TrendingUp }

/** One accordion row. Native button + region so screen readers and keyboards both work. */
function Faq({ q, a, open, onToggle, id }) {
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          id={`faq-btn-${id}`}
          className="flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige-blue-deep"
        >
          <span className="font-display text-base font-semibold leading-snug text-ink sm:text-lg">{q}</span>
          <ChevronDown
            aria-hidden="true"
            className={`mt-0.5 h-5 w-5 shrink-0 text-prestige-blue transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        hidden={!open}
        className="pb-6 pr-10"
      >
        <p className="max-w-3xl leading-relaxed text-body">{a}</p>
      </div>
    </div>
  )
}

export default function YesProgramme() {
  usePageMeta(
    'YES Programme Management',
    'Prestige Tutelage manages YES Programme implementation for South African employers — youth recruitment, workplace placement, monitoring and close-out reporting.',
  )

  const [openFaq, setOpenFaq] = useState(0)

  const form = useEnquiryForm(yesFields, {
    subject: 'YES Programme consultation request',
  })

  const graph = useMemo(
    () =>
      graphOf(
        organisationNode(),
        websiteNode(),
        breadcrumbNode([
          { name: 'Home', path: '/' },
          { name: 'Business Solutions', path: '/business-solutions' },
          { name: 'YES Programme Management', path: PATH },
        ]),
        webPageNode(PATH, 'YES Programme Management', 'YES Programme implementation and management for South African employers.'),
        faqNode(faqs.map(([question, answer]) => ({ question, answer }))),
        {
          '@type': 'Service',
          name: 'YES Programme Management',
          serviceType: 'Youth Employment Service programme management',
          provider: { '@id': 'https://www.prestigetutelage.co.za/#organisation' },
          areaServed: { '@type': 'Country', name: 'South Africa' },
          description:
            'End-to-end management of Youth Employment Service programmes: eligibility assessment, programme design, youth recruitment and screening, workplace placement, monitoring and close-out reporting.',
        },
      ),
    [],
  )

  return (
    <>
      <StructuredData graph={graph} id="ld-yes-programme" />

      <PageHeader
        eyebrow="YES Programme Management"
        title={<>Build youth careers. <Accent>Strengthen your business.</Accent></>}
        lead="Prestige Tutelage helps South African organisations implement structured, compliant and impactful YES Programme opportunities — from planning and youth recruitment to workplace support, monitoring and close-out reporting."
        images={pageHeroes.yesProgramme}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#enquiry" className="btn btn-primary">Request a YES Consultation</a>
          <a href="#solution" className="btn btn-outline">Explore Our Management Solution</a>
        </div>
        <p className="mt-6 text-sm font-medium text-muted">
          Level 1 B-BBEE · Accredited Training Provider · National Workforce Development Support
        </p>
      </PageHeader>

      {/* ---------- the problem ---------- */}
      <section className="relative overflow-hidden border-b border-line py-16 lg:py-24" aria-labelledby="yes-challenge">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="The implementation gap"
              title={<span id="yes-challenge">Youth employment should create more than compliance</span>}
              lead="Most employers we speak to have already decided to participate. What stops them is everything between that decision and a young person doing real work on a Monday morning."
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 40}>
                <h3 className="font-display text-base font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{d}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <p className="mt-12 max-w-3xl text-lg leading-relaxed text-body">
              We work as an implementation partner, not an adviser at arm's length. The target gets
              calculated, the young people get recruited and placed, the records get built as you go,
              and someone answers the phone when a supervisor has a problem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- what the YES programme is ---------- */}
      <section className="border-b border-line bg-cloud py-16 lg:py-24" aria-labelledby="yes-what">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Background"
                title={<span id="yes-what">What is the YES Programme?</span>}
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-body">
                <p>
                  The Youth Employment Service is a business-led initiative, supported by government,
                  that creates twelve-month paid work experiences for unemployed South African youth.
                  Participating businesses fund and host the opportunities.
                </p>
                <p>
                  The purpose is straightforward: a young person with a year of real work experience
                  and a reference is in a different position in the labour market to one without. For
                  the business, it is a structured way to meet transformation and employment
                  objectives while getting a long, honest look at emerging talent.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80} className="space-y-6">
              <ContentSlider
                images={sectionSliders.yesYouth}
                aspect="aspect-[4/3]"
                label="Prestige Tutelage learners"
              />
              <div className="rounded-2xl border border-prestige-blue/20 bg-prestige-blue-light p-7">
                <Eyebrow>Before you plan anything</Eyebrow>
                <p className="mt-3 leading-relaxed text-ink">{SCOPE_NOTE}</p>
                <p className="mt-5 border-t border-prestige-blue/20 pt-5 text-sm leading-relaxed text-body">
                  We assess your position against the current requirements at the start of every
                  engagement, and tell you plainly where you stand.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- benefits ---------- */}
      <section className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="yes-benefits">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="Business value"
              title={<span id="yes-benefits">What a well-run programme returns</span>}
              lead="Six outcomes a properly managed YES programme produces — for the young people on it and for the business funding it."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, icon, text], i) => {
              const Icon = benefitIcons[icon]
              return (
                <Reveal key={title} delay={i * 50}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-premium transition duration-300 ease-prestige hover:-translate-y-1 hover:border-prestige-green/60 hover:shadow-lifted">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-prestige-green-pale text-prestige-green-deeper">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body">{text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- B-BBEE recognition ---------- */}
      <section className="border-y border-line bg-cloud py-16 lg:py-24" aria-labelledby="yes-bbbee">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Potential recognition"
              title={<span id="yes-bbbee">What YES participation can support on your scorecard</span>}
              lead="The gazetted structure below is what qualifying businesses work towards. Read it alongside the qualification underneath it — the tiers describe what is possible, not what is promised."
            />
          </Reveal>

          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {recognitionTiers.map((t, i) => (
              <Reveal as="li" key={t.tier} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-premium">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-prestige-blue-hover">
                    {t.tier}
                  </span>
                  <p className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                    {t.requirement}
                  </p>
                  <div className="mt-5 flex items-start gap-2.5 border-t border-line pt-5">
                    <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-prestige-green-deeper" />
                    <p className="text-[0.95rem] leading-relaxed text-body">{t.outcome}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <ul className="mt-10 grid max-w-4xl gap-3">
              {recognitionNotes.map((n) => (
                <li key={n} className="flex gap-3 text-[0.95rem] leading-relaxed text-body">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-prestige-green-deeper" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-4">
              <Disclaimer>{OUTCOME_QUALIFIER}</Disclaimer>
              <Disclaimer>Structure as gazetted: {GAZETTE_REFERENCE}</Disclaimer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section id="solution" className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="yes-process">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="Turnkey management"
              title={<span id="yes-process">From planning to programme close-out</span>}
              lead="Six stages. Each one produces something the next one needs, and evidence you can hand to a verification agency."
            />
          </Reveal>
          <ol className="mt-12 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {processSteps.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={i * 40}>
                <div className="flex flex-col gap-3 bg-paper p-6 sm:flex-row sm:gap-7 sm:p-7">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-prestige-blue font-display text-sm font-bold tabular-nums text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 max-w-3xl leading-relaxed text-body">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- inclusions ---------- */}
      <section className="border-y border-line bg-cloud py-16 lg:py-24" aria-labelledby="yes-inclusions">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Service inclusions"
              title={<span id="yes-inclusions">What management covers</span>}
              lead="A full-scope engagement covers the list below. Final inclusions depend on the agreed scope of work."
            />
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 20} className="flex items-start gap-3">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-prestige-green-deeper" />
                <span className="text-[0.95rem] leading-relaxed text-body">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- host placement ---------- */}
      <section className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="yes-host">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="Host placement"
              title={<span id="yes-host">When you cannot place everyone internally</span>}
              lead="Plenty of employers can fund more opportunities than they have desks, sites or supervisors for. Host placement closes that gap without lowering the standard of the work experience."
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            <Reveal>
              <ContentSlider
                images={sectionSliders.yesWorkplace}
                aspect="aspect-[4/3]"
                label="Learners in the workplace"
              />
            </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2">
            {hostChain.map(([role, text], i) => (
              <Reveal as="li" key={role} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-premium">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-prestige-blue-hover">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
          <Reveal>
            <Disclaimer className="mt-10">
              Host placement is subject to due diligence, placement availability and the applicable
              YES requirements. The sponsoring organisation retains the YES commitment throughout.
            </Disclaimer>
          </Reveal>
        </div>
      </section>

      {/* ---------- vision and values ---------- */}
      <section className="border-y border-line bg-cloud py-16 lg:py-24" aria-labelledby="yes-values">
        <div className="container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Vision and values"
              title={<span id="yes-values">Driven by purpose. Grounded in values.</span>}
              lead="At Prestige Tutelage, youth employment is more than a compliance exercise. It is an opportunity to build confidence, workplace capability and sustainable career pathways while delivering measurable value to participating organisations."
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="relative mt-12 overflow-hidden rounded-3xl bg-prestige-blue-deep px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-prestige-green" />
              <Eyebrow light>Our vision</Eyebrow>
              <p className="mt-5 max-w-4xl font-display text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                {VISION}
              </p>
              <p className="mt-7 font-display text-base font-semibold text-prestige-green-light">
                {VISION_LINE}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {values.map(([name, icon, text], i) => {
              const Icon = valueIcons[icon]
              // Two on the first row, three on the second: 3+3, then 2+2+2 of six columns.
              const span = i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              return (
                <Reveal key={name} delay={i * 50} className={span}>
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition duration-300 ease-prestige hover:-translate-y-1 hover:border-prestige-green/60 hover:shadow-lifted">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-prestige-blue/20 bg-prestige-blue-light text-prestige-blue-hover">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 font-display text-xs font-bold uppercase tracking-[0.16em] text-prestige-green-deeper">
                      {name}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-body">{text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal>
            <p className="mt-10 max-w-3xl leading-relaxed text-body">{VALUES_CLOSING}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- why us ---------- */}
      <section className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="yes-why">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="Why Prestige Tutelage"
              title={<span id="yes-why">Who you would be working with</span>}
            />
          </Reveal>
          <dl className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(([term, def], i) => (
              <Reveal key={term} delay={i * 40}>
                <dt className="font-display text-base font-semibold text-ink">{term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-body">{def}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="mt-12 max-w-3xl leading-relaxed text-body">
              Read more <Link to="/about" className="font-semibold text-prestige-blue-hover hover:underline">about Prestige Tutelage</Link>,
              our <Link to="/programmes" className="font-semibold text-prestige-blue-hover hover:underline">accredited learnerships</Link>,
              or our wider <Link to="/bbbee-consulting" className="font-semibold text-prestige-blue-hover hover:underline">skills-development and B-BBEE support</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- enquiry ---------- */}
      <section id="enquiry" className="border-y border-line bg-cloud py-16 lg:py-24" aria-labelledby="yes-enquiry">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Consultation"
                title={<span id="yes-enquiry">Let's build your YES programme</span>}
                lead="Tell us a little about your organisation and your youth-employment objectives. A Prestige Tutelage representative will contact you to discuss a suitable implementation approach."
              />
              <div className="mt-8 rounded-2xl border border-prestige-green/25 bg-prestige-green-pale p-6">
                <h3 className="font-display text-base font-semibold text-prestige-green-deeper">
                  Looking for a learnership or youth opportunity?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  This form is for employers. If you are a young person looking for a placement,
                  get in touch and we will point you at the current learner intakes — you do not
                  pay anything to apply.
                </p>
                <Link to="/learnership-application" className="btn btn-outline mt-5">
                  Submit a learner application
                </Link>
              </div>
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-ink">Telephone</dt>
                  <dd><a href={contact.phoneHref} className="text-prestige-blue-hover hover:underline">{contact.phone}</a></dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-ink">Email</dt>
                  <dd><a href={contact.emailHref} className="text-prestige-blue-hover hover:underline">{contact.email}</a></dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-ink">Office</dt>
                  <dd className="text-body">{contact.addressLines.join(', ')}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-2xl border border-line bg-paper p-7 shadow-premium lg:p-9">
                <EnquiryForm
                  fields={yesFields}
                  form={form}
                  submitLabel="Request My Consultation"
                  note="We use your details to respond to this enquiry and to discuss a suitable YES implementation approach. We do not sell or share them for marketing."
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="relative overflow-hidden py-16 lg:py-24" aria-labelledby="yes-faqs">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title={<span id="yes-faqs">Frequently asked questions</span>}
            />
          </Reveal>
          <div className="mt-10 max-w-4xl border-t border-line">
            {faqs.map(([q, a], i) => (
              <Faq
                key={q}
                id={i}
                q={q}
                a={a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Turn youth employment into lasting business and social impact."
        text="Partner with Prestige Tutelage to build a well-managed youth-employment programme that supports young people, strengthens workplace capacity and produces reliable programme evidence."
        primary={{ label: 'Book a Consultation', to: `${PATH}#enquiry` }}
        secondary={{ label: 'Contact Prestige Tutelage', to: '/contact' }}
      />

      <section className="border-t border-line py-10">
        <div className="container-px">
          <Disclaimer>{FOOTER_TRUST_NOTICE}</Disclaimer>
        </div>
      </section>

      {/* Sticky mobile CTA — hidden once the enquiry form is on screen would need
          an observer; a plain anchor is more reliable and never covers the form
          because the form sits above the fold it scrolls to. */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
        <a href="#enquiry" className="btn btn-primary w-full justify-center">Request a YES Consultation</a>
      </div>
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  )
}
