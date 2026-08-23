import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { brand, contact } from '../data/site.js'

const interests = [
  'Accredited Qualification',
  'Learnership',
  'Short Course',
  'Corporate Training',
  'B-BBEE Consultation',
  'Recruitment',
  'Office / Training Space Rental',
  'Assessment Centre',
  'Skills Development Consulting',
  'CSI / Youth Programme',
  'Prestige Growth Pathways',
  'Other',
]

const empty = { name: '', company: '', email: '', telephone: '', interest: '', message: '' }

export default function Contact() {
  usePageMeta(
    'Contact',
    'Contact Prestige Tutelage in Ferndale, Randburg for accredited training, learnerships, short courses, corporate training, B-BBEE skills development consulting, recruitment, assessment or office and training space.',
  )

  const [params] = useSearchParams()
  const programme = params.get('programme')
  const service = params.get('service')

  const [values, setValues] = useState(() => {
    if (programme) return { ...empty, interest: 'Accredited Qualification', message: `I would like to enquire about ${programme}.\n\n` }
    if (service) return { ...empty, interest: service, message: `I would like to enquire about ${service}.\n\n` }
    return empty
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!values.email.trim()) next.email = 'Please give us an email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'That email address does not look right.'
    if (!values.message.trim()) next.message = 'Please tell us briefly what you need.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    const body = [
      `Full name: ${values.name}`,
      `Company: ${values.company || '—'}`,
      `Email: ${values.email}`,
      `Telephone: ${values.telephone || '—'}`,
      `Service / programme interest: ${values.interest || '—'}`,
      '',
      'Message:',
      values.message,
    ].join('\n')

    const subject = `Prestige enquiry — ${values.interest || values.company || values.name}`
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = 'mt-1.5 w-full rounded-lg border bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-prestige-blue'
  const label = 'block text-sm font-semibold text-ink'

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about what your organisation needs."
        lead="Training, recruitment, assessment, transformation support or professional space — tell us the situation and we will come back with a practical way forward."
      />

      <section className="py-14 lg:py-20">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Request a proposal or service discussion</h2>
              <p className="mt-2 leading-relaxed text-body">Fields marked <span aria-hidden="true">*</span> are required.</p>

              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Full Name *</label>
                    <input id="name" name="name" type="text" autoComplete="name" required value={values.name} onChange={update('name')} className={`${field} ${errors.name ? 'border-red-400' : 'border-line'}`} />
                    {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className={label}>Company</label>
                    <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={update('company')} className={`${field} border-line`} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={label}>Email *</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update('email')} className={`${field} ${errors.email ? 'border-red-400' : 'border-line'}`} />
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="telephone" className={label}>Telephone</label>
                    <input id="telephone" name="telephone" type="tel" autoComplete="tel" value={values.telephone} onChange={update('telephone')} className={`${field} border-line`} />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className={label}>Service / Programme Interest</label>
                  <select id="interest" name="interest" value={values.interest} onChange={update('interest')} className={`${field} border-line`}>
                    <option value="">Select an option</option>
                    {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={label}>Message *</label>
                  <textarea id="message" name="message" rows={6} required value={values.message} onChange={update('message')} placeholder="Tell us what you need, approximate numbers, location, timing and the outcome you are trying to achieve." className={`${field} ${errors.message ? 'border-red-400' : 'border-line'}`} />
                  {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button type="submit" className="btn btn-primary">Send Enquiry</button>
                  <p className="text-sm text-muted">Or email <a href={contact.emailHref} className="font-semibold text-prestige-blue hover:underline">{contact.email}</a></p>
                </div>

                {sent && (
                  <p role="status" className="rounded-lg border border-prestige-green/40 bg-prestige-green/5 px-4 py-3 text-body">
                    Your email application should have opened with the enquiry ready to send. If it did not, please email <a href={contact.emailHref} className="font-semibold text-prestige-blue hover:underline">{contact.email}</a> directly.
                  </p>
                )}
              </form>
            </div>

            <aside className="lg:pt-1">
              <div className="rounded-xl2 border border-line bg-paper p-7">
                <h2 className="font-display text-xl font-semibold text-ink">{brand.legalName}</h2>
                <div className="mt-6 space-y-5 text-body">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Office</h3>
                    <address className="mt-1.5 not-italic leading-relaxed">{contact.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
                  </div>
                  <div><h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Telephone</h3><p className="mt-1.5"><a href={contact.phoneHref} className="hover:text-prestige-blue">{contact.phone}</a></p></div>
                  <div><h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Email</h3><p className="mt-1.5"><a href={contact.emailHref} className="hover:text-prestige-blue">{contact.email}</a></p></div>
                  <div><h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Website</h3><p className="mt-1.5"><a href={contact.websiteHref} className="hover:text-prestige-blue">{contact.website}</a></p></div>
                </div>
                <p className="mt-7 border-t border-line pt-5 text-sm text-muted">{brand.credibility.join(' • ')}</p>
              </div>

              <div className="mt-6 border-l-2 border-prestige-green/60 pl-5">
                <h3 className="font-sans font-semibold text-ink">For procurement teams</h3>
                <p className="mt-1.5 leading-relaxed text-body">Supplier documentation, B-BBEE certification and structured proposals are provided on request — tell us what your vendor onboarding requires.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
