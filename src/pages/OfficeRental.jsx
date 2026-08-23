import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import { contact } from '../data/site.js'

const spaces = [
  { title: 'Training Rooms', text: 'Suitable for training, workshops, assessments, induction sessions and team development.' },
  { title: 'Meeting Rooms', text: 'Suitable for client meetings, interviews, workshops and planning sessions.' },
  { title: 'Office Space', text: 'Flexible professional space for short-term office use, project teams, consultants and facilitators.' },
  { title: 'Assessment / Examination Space', text: 'Controlled space for assessment sessions, invigilation and candidate assessments where appropriate.' },
]

const initialForm = {
  name: '', company: '', email: '', telephone: '', space: '', attendees: '', date: '', startTime: '', endTime: '', purpose: '', requirements: '',
}

export default function OfficeRental() {
  usePageMeta(
    'Office & Training Space Rental',
    'Office rental, training room rental and meeting space in Ferndale, Randburg for workshops, meetings, assessments and short-term business use.',
  )

  const [form, setForm] = useState(initialForm)
  const update = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company || '—'}`,
      `Email: ${form.email}`,
      `Telephone: ${form.telephone || '—'}`,
      `Space required: ${form.space || '—'}`,
      `Number of attendees: ${form.attendees || '—'}`,
      `Preferred date: ${form.date || '—'}`,
      `Start time: ${form.startTime || '—'}`,
      `End time: ${form.endTime || '—'}`,
      `Purpose: ${form.purpose || '—'}`,
      '',
      'Additional requirements:',
      form.requirements || '—',
    ].join('\n')
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent('Office / training space availability enquiry')}&body=${encodeURIComponent(body)}`
  }

  const field = 'mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-prestige-blue'
  const label = 'block text-sm font-semibold text-ink'

  return (
    <>
      <PageHeader
        eyebrow="Office & Training Space Rental"
        title="Professional space when you need it."
        lead="Flexible professional space through Prestige Tutelage in Ferndale, Randburg for training, meetings, assessments, interviews and temporary business use."
      >
        <a href="#availability" className="btn btn-primary mt-8">Check Space Availability</a>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Our spaces"
            title="A professional setting for focused work, learning and assessment."
            lead="Tell us the purpose, expected attendance and preferred date. We will confirm the current room options, capacity, facilities, availability and pricing."
          />
          <div className="mt-12 grid gap-x-10 border-t border-line md:grid-cols-2">
            {spaces.map((space) => (
              <article key={space.title} className="border-b border-line py-7 md:pr-8">
                <h2 className="font-display text-2xl font-semibold text-ink">{space.title}</h2>
                <p className="mt-3 leading-relaxed text-body">{space.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 border-l-4 border-prestige-green bg-sand/60 px-6 py-5">
            <p className="leading-relaxed text-body">
              Contact Prestige for current room options, capacity, facilities, availability and pricing. We do not publish unverified capacities, equipment specifications, parking, catering, accessibility or operating-hour claims.
            </p>
          </div>
        </div>
      </section>

      <section id="availability" className="scroll-mt-28 border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Availability enquiry"
                title="Tell us what space you need."
                lead="The enquiry opens a structured email to Prestige with the details needed to confirm a suitable option."
              />
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Location: {contact.addressLines.join(', ')}.
              </p>
              <Link to="/assessment-centre" className="mt-5 inline-block text-sm font-semibold text-prestige-blue hover:underline">
                Need formal assessment services instead? View the Assessment Centre →
              </Link>
            </div>
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div><label className={label}>Name *</label><input required value={form.name} onChange={update('name')} className={field} /></div>
              <div><label className={label}>Company</label><input value={form.company} onChange={update('company')} className={field} /></div>
              <div><label className={label}>Email *</label><input required type="email" value={form.email} onChange={update('email')} className={field} /></div>
              <div><label className={label}>Telephone</label><input type="tel" value={form.telephone} onChange={update('telephone')} className={field} /></div>
              <div><label className={label}>Space required</label><select value={form.space} onChange={update('space')} className={field}><option value="">Select</option>{spaces.map((s) => <option key={s.title}>{s.title}</option>)}</select></div>
              <div><label className={label}>Number of attendees</label><input type="number" min="1" value={form.attendees} onChange={update('attendees')} className={field} /></div>
              <div><label className={label}>Preferred date</label><input type="date" value={form.date} onChange={update('date')} className={field} /></div>
              <div className="grid grid-cols-2 gap-3"><div><label className={label}>Start time</label><input type="time" value={form.startTime} onChange={update('startTime')} className={field} /></div><div><label className={label}>End time</label><input type="time" value={form.endTime} onChange={update('endTime')} className={field} /></div></div>
              <div className="sm:col-span-2"><label className={label}>Purpose</label><input value={form.purpose} onChange={update('purpose')} className={field} placeholder="Training, meeting, interview, assessment…" /></div>
              <div className="sm:col-span-2"><label className={label}>Additional requirements</label><textarea rows="5" value={form.requirements} onChange={update('requirements')} className={field} /></div>
              <div className="sm:col-span-2"><button type="submit" className="btn btn-primary">Check Space Availability</button></div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
