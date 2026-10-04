import { FormEvent, useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import type { RSVPPayload } from '../types'
import { buildRsvpWhatsappMessage, whatsappShareUrl } from '../utils/share'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

const FUNCTIONS = ['Engagement', 'Haldi', 'Wedding', 'Reception']

type Status = 'idle' | 'submitting' | 'success' | 'error'

const DUPLICATE_KEY = 'wedding-rsvp-submitted'

export default function RSVPForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [lastPayload, setLastPayload] = useState<RSVPPayload | null>(null)

  function validate(form: FormData): { payload: RSVPPayload; errors: Record<string, string> } {
    const fullName = String(form.get('fullName') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const guestCount = Number(form.get('guestCount') || 1)
    const guestNames = String(form.get('guestNames') || '').trim()
    const events = form.getAll('events').map(String)
    const attendance = String(form.get('attendance') || '') as RSVPPayload['attendance']
    const dietary = String(form.get('dietary') || '').trim()
    const message = String(form.get('message') || '').trim()

    const errs: Record<string, string> = {}
    if (!fullName) errs.fullName = 'Please enter your full name.'
    if (!phone) errs.phone = 'Please enter a contact phone number.'
    else if (!/^[0-9+\-\s()]{7,}$/.test(phone)) errs.phone = 'Please enter a valid phone number.'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.'
    if (!attendance) errs.attendance = 'Please let us know if you can join us.'
    if (attendance === 'accepting' && events.length === 0) {
      errs.events = 'Please select at least one function you will attend.'
    }
    if (guestCount < 1 || guestCount > 20) errs.guestCount = 'Guest count should be between 1 and 20.'

    return {
      payload: { fullName, phone, email, guestCount, guestNames, events, attendance, dietary, message },
      errors: errs,
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const { payload, errors: validationErrors } = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    // Basic client-side duplicate-submission guard for this browser/session.
    const fingerprint = `${payload.fullName.toLowerCase()}|${payload.phone}`
    const submitted = JSON.parse(localStorage.getItem(DUPLICATE_KEY) || '[]') as string[]
    if (submitted.includes(fingerprint)) {
      setStatus('error')
      setErrorMessage("It looks like you've already submitted an RSVP with this name and phone number.")
      return
    }

    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')

      localStorage.setItem(DUPLICATE_KEY, JSON.stringify([...submitted, fingerprint]))
      setLastPayload(payload)
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage("We couldn't save your RSVP right now. Please try again, or use the WhatsApp option below.")
    }
  }

  return (
    <section id="rsvp" className="bg-ivory py-24 px-6" aria-label="RSVP">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Will You Join Us?</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-xl mx-auto">
        {status === 'success' && lastPayload ? (
          <Reveal>
            <div className="text-center border border-gold/40 rounded-sm p-10 bg-ivory-dark/40">
              <p className="font-display text-2xl text-burgundy mb-2">
                Thank you! We can&apos;t wait to celebrate with you. ❤️
              </p>
              <p className="font-body text-sm text-ink/65 mb-6">
                Your RSVP has been received. You can also confirm it on WhatsApp below.
              </p>
              <a
                href={whatsappShareUrl(buildRsvpWhatsappMessage(lastPayload), weddingConfig.whatsappNumber || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-body px-6 py-2.5 hover:brightness-95 transition"
              >
                Confirm on WhatsApp
              </a>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Field label="Full Name" name="fullName" required error={errors.fullName} />
              <Field label="Phone Number" name="phone" type="tel" required error={errors.phone} />
              <Field label="Email" name="email" type="email" error={errors.email} />

              <div className="grid grid-cols-2 gap-4">
                <Field label="Number of Guests" name="guestCount" type="number" defaultValue={1} min={1} max={20} error={errors.guestCount} />
                <Field label="Guest Names" name="guestNames" placeholder="Optional" />
              </div>

              <fieldset>
                <legend className="font-body text-sm text-ink/70 mb-2">Which functions will you attend?</legend>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {FUNCTIONS.map((fn) => (
                    <label key={fn} className="flex items-center gap-2 font-body text-sm text-ink/80">
                      <input type="checkbox" name="events" value={fn} className="accent-burgundy w-4 h-4" />
                      {fn}
                    </label>
                  ))}
                </div>
                {errors.events && <p className="text-xs text-burgundy mt-1">{errors.events}</p>}
              </fieldset>

              <fieldset>
                <legend className="font-body text-sm text-ink/70 mb-2">Attendance</legend>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 font-body text-sm text-ink/80">
                    <input type="radio" name="attendance" value="accepting" className="accent-burgundy w-4 h-4" />
                    Joyfully Accepts
                  </label>
                  <label className="flex items-center gap-2 font-body text-sm text-ink/80">
                    <input type="radio" name="attendance" value="declining" className="accent-burgundy w-4 h-4" />
                    Regretfully Declines
                  </label>
                </div>
                {errors.attendance && <p className="text-xs text-burgundy mt-1">{errors.attendance}</p>}
              </fieldset>

              <Field label="Dietary Preferences" name="dietary" placeholder="e.g. Vegetarian, Jain, No allergies" />

              <div>
                <label htmlFor="message" className="block font-body text-sm text-ink/70 mb-1.5">
                  Special Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full border border-gold/40 bg-ivory rounded-sm px-4 py-2.5 font-body text-sm focus:border-burgundy outline-none"
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-sm text-burgundy bg-rose-light/40 border border-rose rounded-sm px-4 py-2">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-full bg-burgundy text-ivory font-body text-sm tracking-wide px-6 py-3 hover:bg-burgundy-light transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Confirm RSVP'}
              </button>

              <p className="text-center font-body text-xs text-ink/50">
                Prefer WhatsApp? Fill the form above, then use the button that appears after you submit — or message us directly using the button in the Contact section.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  error,
  ...rest
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
  defaultValue?: string | number
  min?: number
  max?: number
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-body text-sm text-ink/70 mb-1.5">
        {label}
        {required && <span className="text-burgundy"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full border border-gold/40 bg-ivory rounded-sm px-4 py-2.5 font-body text-sm focus:border-burgundy outline-none"
        {...rest}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-burgundy mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
