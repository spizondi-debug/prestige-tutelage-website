import { contact } from '../data/site.js'

const base =
  'mt-1.5 w-full rounded-lg border bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-prestige-blue'

function Field({ field, value, error, onChange }) {
  const { name, label, type = 'text', options, rows } = field
  const invalid = Boolean(error)
  const cls = `${base} ${invalid ? 'border-red-400' : 'border-line'}`
  const shared = {
    id: name,
    name,
    value,
    onChange,
    className: cls,
    'aria-invalid': invalid || undefined,
    'aria-describedby': invalid ? `${name}-error` : undefined,
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label} {field.required && <span aria-hidden="true">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea {...shared} rows={rows ?? 5} />
      ) : type === 'select' ? (
        <select {...shared}>
          <option value="">Select an option</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input {...shared} type={type} />
      )}

      {invalid && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

/**
 * EnquiryForm — renders a field spec with shared validation and submission.
 * Full-width fields (textareas) span both columns.
 */
export default function EnquiryForm({ fields, form, submitLabel, note }) {
  const { values, errors, sent, update, onSubmit } = form

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <Field field={f} value={values[f.name]} error={errors[f.name]} onChange={update(f.name)} />
          </div>
        ))}
      </div>

      <p className="text-sm text-muted">Fields marked <span aria-hidden="true">*</span> are required.</p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
        <p className="text-sm text-muted">
          Or email us directly at{' '}
          <a href={contact.emailHref} className="font-semibold text-prestige-blue hover:underline">
            {contact.email}
          </a>
        </p>
      </div>

      {note && <p className="text-sm leading-relaxed text-muted">{note}</p>}

      {sent && (
        <p role="status" className="rounded-lg border border-prestige-green/40 bg-prestige-green/5 px-4 py-3 text-body">
          Your email application should have opened with the enquiry ready to send. If it did not,
          please email{' '}
          <a href={contact.emailHref} className="font-semibold text-prestige-blue hover:underline">
            {contact.email}
          </a>{' '}
          directly.
        </p>
      )}
    </form>
  )
}
