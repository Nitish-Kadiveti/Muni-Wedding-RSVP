import type { RSVPPayload } from '../types'

export function whatsappShareUrl(message: string, phoneDigitsOnly?: string): string {
  const base = phoneDigitsOnly ? `https://wa.me/${phoneDigitsOnly}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}

export function buildInviteMessage(groom: string, bride: string, siteUrl: string): string {
  return `You're invited to celebrate the wedding of ${groom} & ${bride} ❤️\n\n${siteUrl}`
}

export function buildRsvpWhatsappMessage(payload: RSVPPayload): string {
  const lines = [
    `RSVP — ${payload.fullName}`,
    `Attendance: ${payload.attendance === 'accepting' ? 'Joyfully Accepts' : 'Regretfully Declines'}`,
    payload.guestCount ? `Guests: ${payload.guestCount}` : null,
    payload.guestNames ? `Guest Names: ${payload.guestNames}` : null,
    payload.events.length ? `Attending: ${payload.events.join(', ')}` : null,
    payload.dietary ? `Dietary Preference: ${payload.dietary}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    payload.message ? `Message: ${payload.message}` : null,
  ].filter(Boolean)
  return lines.join('\n')
}

export function facebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

export function xShareUrl(url: string, text: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
}

export function telegramShareUrl(url: string, text: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
