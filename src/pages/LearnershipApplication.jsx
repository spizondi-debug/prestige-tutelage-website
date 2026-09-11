import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, AlertTriangle, ShieldCheck } from 'lucide-react'
import { usePageMeta } from '../lib/meta.js'
import PageHeader from '../components/PageHeader.jsx'
import { SectionHeading, Accent } from '../components/Section.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import CornerSwirl from '../components/CornerSwirl.jsx'
import StructuredData, {
  graphOf, organisationNode, websiteNode, breadcrumbNode, webPageNode,
} from '../components/StructuredData.jsx'
import { pageHeroes } from '../data/pageHeroes.js'
import { contact } from '../data/site.js'
import { steps, documents, consents, POPIA_POINTS } from '../data/learnershipApplication.js'

const PATH = '/learnership-application'

const inputBase =
  'mt-1.5 w-full rounded-lg border bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-prestige-blue'

/* ---- South African ID number ---------------------------------------------
   Thirteen digits: YYMMDD, a four-digit sequence whose value carries gender,
   a citizenship digit, and a Luhn check digit. Validating the checksum here
   catches a mistyped number while the applicant is still on the page, rather
   than at verification weeks later. */
function luhnOk(s) {
  let sum = 0
  let alt = false
  for (let i = s.length - 1; i >= 0; i -= 1) {
    let n = Number(s[i])
    if (alt) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

export function decodeSaId(v) {
  if (!/^\d{13}$/.test(v)) return { ok: false, why: 'An ID number is exactly 13 digits.' }
  const yy = Number(v.slice(0, 2))
  const mm = Number(v.slice(2, 4))
  const dd = Number(v.slice(4, 6))
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return { ok: false, why: 'The first six digits are not a valid date.' }
  const now = new Date()
  const year = 2000 + yy > now.getFullYear() ? 1900 + yy : 2000 + yy
  const dob = new Date(Date.UTC(year, mm - 1, dd))
  if (dob.getUTCMonth() !== mm - 1 || dob.getUTCDate() !== dd) return { ok: false, why: 'That date does not exist.' }
  if (!luhnOk(v)) return { ok: false, why: 'That ID number fails the standard checksum — please check it again.' }
  let age = now.getUTCFullYear() - year
  const md = now.getUTCMonth() + 1 - mm
  if (md < 0 || (md === 0 && now.getUTCDate() < dd)) age -= 1
  const iso = `${year}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`
  return { ok: true, iso, age, sex: Number(v.slice(6, 10)) >= 5000 ? 'Male' : 'Female' }
}

const RX = {
  email: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
  mobile: /^(?:\+27|0)[6-8]\d{8}$/,
  postal: /^\d{4}$/,
  year: /^(19|20)\d{2}$/,
}

function Field({ f, value, error, onChange }) {
  const invalid = Boolean(error)
  const cls = `${inputBase} ${invalid ? 'border-red-400' : 'border-line'} ${f.mono ? 'font-mono tracking-wide' : ''}`
  const shared = {
    id: f.name,
    name: f.name,
    value,
    onChange,
    className: cls,
    'aria-invalid': invalid || undefined,
    'aria-describedby': invalid ? `${f.name}-error` : f.hint ? `${f.name}-hint` : undefined,
  }
  return (
    <div className={f.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={f.name} className="block text-sm font-semibold text-ink">
        {f.label} {f.required && <span className="text-red-600" aria-hidden="true">*</span>}
      </label>

      {f.type === 'textarea' ? (
        <textarea {...shared} rows={f.rows ?? 3} maxLength={f.max} />
      ) : f.type === 'select' ? (
        <select {...shared}>
          <option value="">Select…</option>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input {...shared} type={f.type ?? 'text'} inputMode={f.mono ? 'numeric' : undefined} />
      )}

      {f.max && (
        <p className="mt-1 text-right font-mono text-xs text-muted">{(value || '').length} / {f.max}</p>
      )}
      {f.hint && !invalid && <p id={`${f.name}-hint`} className="mt-1.5 text-sm text-muted">{f.hint}</p>}
      {invalid && <p id={`${f.name}-error`} className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  )
}

export default function LearnershipApplication() {
  usePageMeta(
    'Learnership Application',
    'Apply for a Prestige Tutelage learnership. Applying is free — we never ask for payment to apply, be shortlisted or be placed.',
  )

  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(0)
  const [reference, setReference] = useState('')

  const graph = useMemo(
    () => graphOf(
      organisationNode(),
      websiteNode(),
      breadcrumbNode([
        { name: 'Home', path: '/' },
        { name: 'Programmes', path: '/programmes' },
        { name: 'Learnership Application', path: PATH },
      ]),
      webPageNode(PATH, 'Learnership Application', 'Apply for a Prestige Tutelage learnership.'),
    ),
    [],
  )

  const visible = (f) => !f.showIf || f.showIf(values)
  const idInfo = values.idNumber?.length === 13 ? decodeSaId(values.idNumber) : null
  const under18 = idInfo?.ok ? idInfo.age < 18 : false

  const update = (name) => (e) => {
    let v = e.target.value
    if (name === 'idNumber') v = v.replace(/\D/g, '').slice(0, 13)
    setValues((prev) => {
      const next = { ...prev, [name]: v }
      // Reading the date of birth off the ID saves the applicant retyping what
      // the number already contains, and keeps the two consistent.
      if (name === 'idNumber' && v.length === 13) {
        const d = decodeSaId(v)
        if (d.ok) {
          next.dob = d.iso
          if (!prev.gender) next.gender = d.sex
        }
      }
      return next
    })
    // A mistyped ID is worth catching on the thirteenth keystroke rather than
    // at Continue — the applicant still has the document in front of them.
    if (name === 'idNumber' && v.length === 13) {
      const d = decodeSaId(v)
      setErrors((err) => ({ ...err, idNumber: d.ok ? undefined : d.why }))
      return
    }
    setErrors((err) => (err[name] ? { ...err, [name]: undefined } : err))
  }

  const validateStep = () => {
    const found = {}
    for (const f of steps[step].fields) {
      if (!visible(f)) continue
      const v = (values[f.name] ?? '').trim()
      if (f.required && !v) { found[f.name] = 'This is required.'; continue }
      if (!v) continue
      if (f.name === 'idNumber') { const d = decodeSaId(v); if (!d.ok) found[f.name] = d.why }
      if (f.type === 'email' && !RX.email.test(v)) found[f.name] = 'Enter an email address like you@example.co.za'
      if (f.type === 'tel' && !RX.mobile.test(v.replace(/[\s-]/g, ''))) {
        found[f.name] = 'Enter a South African mobile number, like 082 123 4567.'
      }
      if (f.name === 'postal' && !RX.postal.test(v)) found[f.name] = 'A postal code is 4 digits.'
      if (f.name === 'yearCompleted' && !RX.year.test(v)) found[f.name] = 'Enter a four-digit year.'
    }
    setErrors(found)
    const first = steps[step].fields.find((f) => found[f.name])
    if (first) {
      document.getElementById(first.name)?.focus()
      return false
    }
    return true
  }

  const declarationOk = consents.every(([k]) => values[k]) && (values.signature ?? '').trim().length > 1

  const submit = (e) => {
    e.preventDefault()
    if (!validateStep()) return
    if (!declarationOk) {
      setErrors({ declaration: 'Please tick every box and sign before submitting.' })
      return
    }
    const ref = `PT-LA-${new Date().getFullYear()}-${Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)}`

    const lines = [`Application reference: ${ref}`, '']
    for (const s of steps) {
      lines.push(`— ${s.title} —`)
      for (const f of s.fields) {
        if (!f.showIf || f.showIf(values)) lines.push(`${f.label}: ${values[f.name]?.trim() || '—'}`)
      }
      lines.push('')
    }
    lines.push('— Declaration —')
    consents.forEach(([k, label]) => lines.push(`${values[k] ? 'Yes' : 'No'}: ${label}`))
    lines.push(`Signed: ${values.signature}`)
    lines.push(`Date: ${new Date().toISOString().slice(0, 10)}`)

    setReference(ref)
    window.location.href =
      `${contact.emailHref}?subject=${encodeURIComponent(`Learnership application — ${values.firstNames ?? ''} ${values.surname ?? ''} (${ref})`)}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  /* ---- confirmation ---- */
  if (reference) {
    return (
      <>
        <StructuredData graph={graph} id="ld-learnership-application" />
        <section className="border-b border-line bg-cloud py-20 lg:py-28">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-prestige-green-pale">
                <Check aria-hidden="true" className="h-8 w-8 text-prestige-green-deeper" />
              </span>
              <h1 className="mt-7 font-display text-3xl font-semibold text-prestige-green-deep">
                Thank you for applying to Prestige Tutelage
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-body">
                Your application has been prepared. Please keep your reference number for any
                enquiries. Only shortlisted applicants will be contacted.
              </p>

              <div className="mt-8 rounded-2xl border border-line bg-paper p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Application reference
                </p>
                <p className="mt-2 font-mono text-2xl font-semibold tracking-wide text-ink">{reference}</p>
              </div>

              <div className="mt-8 rounded-2xl border border-prestige-blue/25 bg-prestige-blue-light p-7 text-left">
                <h2 className="font-display text-base font-semibold text-ink">One more step: your documents</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Email the documents below to{' '}
                  <a href={contact.emailHref} className="font-semibold text-prestige-blue-hover hover:underline">
                    {contact.email}
                  </a>{' '}
                  with <span className="font-mono font-semibold text-ink">{reference}</span> in the subject line.
                </p>
                <ul className="mt-4 grid gap-2">
                  {documents.map(([label, required]) => (
                    <li key={label} className="flex items-start gap-2.5 text-sm text-body">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-prestige-green-deeper" />
                      <span>{label} {!required && <span className="text-muted">(if you have it)</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-2xl bg-prestige-blue-deep p-6 text-left text-white">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-prestige-green" />
                <p className="pl-2 text-sm leading-relaxed text-white/90">
                  <strong className="font-semibold text-white">
                    Please do not pay anyone to apply for a Prestige Tutelage learnership.
                  </strong>{' '}
                  Applying is free, and it stays free at every stage.
                </p>
              </div>
              <Link to="/programmes" className="btn btn-outline mt-8">Browse our programmes</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  const isLast = step === steps.length - 1
  const current = steps[step]

  return (
    <>
      <StructuredData graph={graph} id="ld-learnership-application" />

      <PageHeader
        eyebrow="Learner application"
        title={<>Apply for a <Accent>learnership</Accent></>}
        lead="Complete this application accurately. Completing it does not guarantee acceptance — shortlisted applicants may be contacted for verification, assessments or interviews."
        images={pageHeroes.recruitment}
      />

      <section className="relative overflow-hidden py-14 lg:py-20">
        <CornerSwirl size="sm" />
        <div className="container-px relative">
          <div className="mx-auto max-w-3xl">

            <div className="relative flex items-start gap-4 overflow-hidden rounded-2xl bg-prestige-blue-deep p-6 text-white">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-prestige-green" />
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-prestige-green-light" />
              <p className="text-sm leading-relaxed text-white/90">
                <strong className="font-semibold text-white">Applying is free.</strong> Prestige
                Tutelage never asks for payment to apply, be shortlisted, or be placed on a
                learnership. If anyone asks you to pay, it is not us — report it to{' '}
                <a href={contact.emailHref} className="font-semibold text-prestige-green-light underline">
                  {contact.email}
                </a>.
              </p>
            </div>

            {/* progress */}
            <ol className="mt-8 flex flex-wrap gap-2" aria-label="Application progress">
              {steps.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    aria-current={i === step ? 'step' : undefined}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition ${
                      i === step
                        ? 'border-prestige-blue bg-prestige-blue text-white font-semibold'
                        : i < step
                          ? 'border-line bg-paper text-ink hover:border-prestige-blue'
                          : 'border-line bg-cloud text-muted'
                    }`}
                  >
                    <span className="font-mono text-xs tabular-nums">{i + 1}</span>
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-gradient-to-r from-prestige-blue to-prestige-green transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <form onSubmit={submit} noValidate className="mt-10 rounded-2xl border border-line bg-paper p-6 shadow-premium sm:p-9">
              <SectionHeading eyebrow={`Step ${step + 1} of ${steps.length}`} title={current.title} lead={current.lead} />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {current.fields.filter(visible).map((f) => (
                  <Field key={f.name} f={f} value={values[f.name] ?? ''} error={errors[f.name]} onChange={update(f.name)} />
                ))}
              </div>

              {current.key === 'personal' && idInfo?.ok && (
                <dl className="mt-6 flex flex-wrap gap-8 rounded-xl border border-prestige-green/30 bg-prestige-green-pale p-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Date of birth</dt>
                    <dd className="mt-0.5 font-mono font-semibold text-ink">{idInfo.iso}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Age</dt>
                    <dd className="mt-0.5 font-mono font-semibold text-ink">{idInfo.age}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Read from your ID</dt>
                    <dd className="mt-0.5 text-sm text-body">If this is wrong, check the number you typed.</dd>
                  </div>
                </dl>
              )}

              {current.key === 'personal' && under18 && (
                <p className="mt-5 rounded-xl border border-prestige-blue/25 bg-prestige-blue-light p-5 text-sm leading-relaxed text-ink">
                  You are under 18, so a parent or guardian must consent. Please ask them to email{' '}
                  <a href={contact.emailHref} className="font-semibold text-prestige-blue-hover hover:underline">
                    {contact.email}
                  </a>{' '}
                  confirming they agree to your application.
                </p>
              )}

              {/* documents + declaration land on the last step */}
              {isLast && (
                <div className="mt-10 space-y-8 border-t border-line pt-8">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">Documents we will need</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      You do not upload anything here. After you submit, we will show you a reference
                      number — email these to {contact.email} quoting that number.
                    </p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {documents.map(([label, required]) => (
                        <li key={label} className="flex items-start gap-2.5 text-sm text-body">
                          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-prestige-green-deeper" />
                          <span>{label} {!required && <span className="text-muted">(optional)</span>}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-line bg-cloud p-6">
                    <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                      <ShieldCheck aria-hidden="true" className="h-5 w-5 text-prestige-blue" />
                      How we use your information
                    </h3>
                    <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-relaxed text-body">
                      {POPIA_POINTS.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>

                  <fieldset>
                    <legend className="font-display text-base font-semibold text-ink">Declaration</legend>
                    <div className="mt-3 divide-y divide-line border-y border-line">
                      {consents.map(([key, label]) => (
                        <label key={key} htmlFor={key} className="flex cursor-pointer items-start gap-3 py-3.5">
                          <input
                            id={key}
                            type="checkbox"
                            checked={Boolean(values[key])}
                            onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.checked }))}
                            className="mt-1 h-[18px] w-[18px] shrink-0 accent-prestige-blue"
                          />
                          <span className="text-sm leading-relaxed text-body">{label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="signature" className="block text-sm font-semibold text-ink">
                          Type your full name to sign <span className="text-red-600" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="signature"
                          value={values.signature ?? ''}
                          onChange={update('signature')}
                          className={`${inputBase} border-line font-display text-lg`}
                        />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-ink">Date</span>
                        <p className="mt-1.5 rounded-lg border border-line bg-cloud px-4 py-3 font-mono text-ink">
                          {new Date().toISOString().slice(0, 10)}
                        </p>
                      </div>
                    </div>

                    {errors.declaration && (
                      <p className="mt-3 text-sm font-medium text-red-600">{errors.declaration}</p>
                    )}
                  </fieldset>
                </div>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                {step > 0 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="btn btn-outline">Back</button>
                )}
                {!isLast ? (
                  <button
                    type="button"
                    onClick={() => validateStep() && setStep(step + 1)}
                    className="btn btn-primary"
                  >
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">Submit application</button>
                )}
                <span className="ml-auto text-sm text-muted">
                  Fields marked <span className="text-red-600">*</span> are required.
                </span>
              </div>
            </form>

            <Disclaimer className="mt-8">
              Submitting this form opens an email to Prestige Tutelage with your answers so you can
              send it from your own address. Nothing is stored on this website. Programme
              availability and enrolment are subject to confirmation of the applicable accreditation
              and enrolment route.
            </Disclaimer>
          </div>
        </div>
      </section>
    </>
  )
}
