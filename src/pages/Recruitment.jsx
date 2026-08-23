import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/Section.jsx'
import { contact } from '../data/site.js'

const solutionGroups = [
  {
    title: 'Talent Sourcing',
    items: ['Candidate sourcing', 'Job advertising support', 'Community and youth sourcing', 'Graduate and entry-level sourcing'],
  },
  {
    title: 'Screening & Shortlisting',
    items: ['CV screening', 'Minimum-requirement checks', 'Candidate shortlisting', 'Telephone screening', 'Structured candidate evaluation'],
  },
  {
    title: 'Interview Support',
    items: ['Interview coordination', 'Structured interview guides', 'Candidate scheduling', 'Interview administration'],
  },
  {
    title: 'Pre-employment Support',
    items: ['Reference-check coordination', 'Qualification-verification coordination', 'Identity/document-verification coordination', 'Background-check coordination'],
  },
  {
    title: 'Learnership & Youth Recruitment',
    items: ['Unemployed learner sourcing', 'Employed learner screening', 'Learnership candidate recruitment', 'Youth programme recruitment', 'Disability-inclusive recruitment support', 'Learner onboarding', 'Documentation collection', 'Induction coordination'],
  },
]

const initialForm = {
  company: '', contactPerson: '', email: '', telephone: '', position: '', vacancies: '', employmentType: '', location: '', experience: '', qualifications: '', startDate: '', notes: '',
}

export default function Recruitment() {
  usePageMeta(
    'Recruitment Services',
    'Recruitment services in Johannesburg for employers, learnerships, youth talent, entry-level candidates, administrative, manufacturing, agriculture, supervisor and HR roles.',
  )

  const [form, setForm] = useState(initialForm)
  const update = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Company: ${form.company}`,
      `Contact person: ${form.contactPerson}`,
      `Email: ${form.email}`,
      `Telephone: ${form.telephone || '—'}`,
      `Position title: ${form.position}`,
      `Number of vacancies: ${form.vacancies || '—'}`,
      `Employment type: ${form.employmentType || '—'}`,
      `Location: ${form.location || '—'}`,
      `Required experience: ${form.experience || '—'}`,
      `Required qualifications: ${form.qualifications || '—'}`,
      `Desired start date: ${form.startDate || '—'}`,
      '',
      'Additional information:',
      form.notes || '—',
    ].join('\n')
    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(`Recruitment enquiry — ${form.position || form.company}`)}&body=${encodeURIComponent(body)}`
  }

  const field = 'mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-prestige-blue'
  const label = 'block text-sm font-semibold text-ink'

  return (
    <>
      <PageHeader
        eyebrow="Recruitment Services"
        title="Finding people who fit the role — and the organisation."
        lead="Prestige connects employers with the right talent through a professional, fair and efficient recruitment process, with particular strength in learner, youth and workforce-pipeline recruitment."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#submit-vacancy" className="btn btn-primary">Submit a Vacancy</a>
          <Link to="/contact" className="btn btn-outline">Find Talent With Prestige</Link>
        </div>
      </PageHeader>

      <section className="py-16 lg:py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Recruitment solutions"
            title="From sourcing to shortlist, with the administration handled properly."
            lead="We support permanent, project-based, entry-level and learnership recruitment across roles Prestige genuinely services."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {solutionGroups.map((group) => (
              <article key={group.title} className="border-t border-line pt-5">
                <h2 className="font-display text-xl font-semibold text-ink">{group.title}</h2>
                <ul className="mt-4 space-y-2 text-body">
                  {group.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-4xl text-sm leading-relaxed text-muted">
            Where regulated or specialist checks are required, Prestige coordinates the process with the appropriate third party rather than representing that it performs regulated verification itself.
          </p>
        </div>
      </section>

      <section id="submit-vacancy" className="scroll-mt-28 border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <SectionHeading
              eyebrow="Employer enquiry"
              title="Submit a vacancy."
              lead="Give us the role, location and minimum requirements. The form opens a structured email to Prestige so no vacancy details are lost."
            />
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div><label className={label}>Company *</label><input required value={form.company} onChange={update('company')} className={field} /></div>
              <div><label className={label}>Contact person *</label><input required value={form.contactPerson} onChange={update('contactPerson')} className={field} /></div>
              <div><label className={label}>Email *</label><input required type="email" value={form.email} onChange={update('email')} className={field} /></div>
              <div><label className={label}>Telephone</label><input type="tel" value={form.telephone} onChange={update('telephone')} className={field} /></div>
              <div><label className={label}>Position title *</label><input required value={form.position} onChange={update('position')} className={field} /></div>
              <div><label className={label}>Number of vacancies</label><input type="number" min="1" value={form.vacancies} onChange={update('vacancies')} className={field} /></div>
              <div><label className={label}>Employment type</label><select value={form.employmentType} onChange={update('employmentType')} className={field}><option value="">Select</option><option>Permanent</option><option>Fixed-term / Project</option><option>Learnership</option><option>Graduate / Entry-level</option></select></div>
              <div><label className={label}>Location</label><input value={form.location} onChange={update('location')} className={field} /></div>
              <div><label className={label}>Required experience</label><textarea rows="3" value={form.experience} onChange={update('experience')} className={field} /></div>
              <div><label className={label}>Required qualifications</label><textarea rows="3" value={form.qualifications} onChange={update('qualifications')} className={field} /></div>
              <div><label className={label}>Desired start date</label><input type="date" value={form.startDate} onChange={update('startDate')} className={field} /></div>
              <div className="sm:col-span-2"><label className={label}>Additional information</label><textarea rows="5" value={form.notes} onChange={update('notes')} className={field} /></div>
              <div className="sm:col-span-2"><button type="submit" className="btn btn-primary">Submit Vacancy Enquiry</button></div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
