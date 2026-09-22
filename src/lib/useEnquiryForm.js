import { useState } from 'react'
import { contact } from '../data/site.js'

/**
 * Shared enquiry-form behaviour: controlled values, per-field validation and
 * submission.
 *
 * No backend is wired to this site yet, so submitting composes a structured
 * email to Prestige rather than silently discarding an enquiry. Replace
 * `submit` with a POST to your endpoint when one exists — the validation and
 * field rendering stay as they are.
 */
export function useEnquiryForm(fields, { subject }) {
  const initial = Object.fromEntries(fields.map((f) => [f.name, '']))
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (name) => (e) => {
    const { value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((err) => (err[name] ? { ...err, [name]: undefined } : err))
  }

  const validate = () => {
    const next = {}
    for (const f of fields) {
      const value = (values[f.name] ?? '').trim()
      if (f.required && !value) {
        next[f.name] = `Please complete ${f.label.toLowerCase()}.`
      } else if (f.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[f.name] = 'That email address does not look right.'
      }
    }
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) {
      const first = fields.find((f) => found[f.name])
      document.getElementById(first.name)?.focus()
      return
    }

    const body = fields
      .map((f) => `${f.label}: ${values[f.name]?.trim() || '—'}`)
      .join('\n')

    const line = typeof subject === 'function' ? subject(values) : subject
    window.location.href =
      `${contact.emailHref}?subject=${encodeURIComponent(line)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return { values, errors, sent, update, onSubmit }
}
