import type { EventInfo } from '../types'

function toCalendarUTC(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/** Builds a best-effort start/end Date pair from an EventInfo. Falls back gracefully if date is missing. */
function resolveEventTimes(event: EventInfo): { start: Date; end: Date } | null {
  if (!event.date) return null
  const start = new Date(`${event.date}T${extractTime(event.time) || '10:00'}:00`)
  if (isNaN(start.getTime())) return null
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000) // default 3-hour duration
  return { start, end }
}

function extractTime(display: string): string | null {
  const match = display.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)?/)
  if (!match) return null
  let hours = parseInt(match[1], 10)
  const minutes = match[2] ? parseInt(match[2], 10) : 0
  const meridiem = match[3]?.toUpperCase()
  if (meridiem === 'PM' && hours < 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function googleCalendarUrl(event: EventInfo): string {
  const times = resolveEventTimes(event)
  const dates = times ? `${toCalendarUTC(times.start)}/${toCalendarUTC(times.end)}` : ''
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.name,
    details: event.description,
    location: event.address || event.venue,
  })
  if (dates) params.set('dates', dates)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function outlookCalendarUrl(event: EventInfo): string {
  const times = resolveEventTimes(event)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.name,
    body: event.description,
    location: event.address || event.venue,
  })
  if (times) {
    params.set('startdt', times.start.toISOString())
    params.set('enddt', times.end.toISOString())
  }
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function downloadIcsFile(event: EventInfo): void {
  const times = resolveEventTimes(event)
  const now = toCalendarUTC(new Date())
  const dtStart = times ? toCalendarUTC(times.start) : ''
  const dtEnd = times ? toCalendarUTC(times.end) : ''

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Muni Kumar Weds Shalini//Wedding Website//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}-${Date.now()}@wedding`,
    `DTSTAMP:${now}`,
    dtStart && `DTSTART:${dtStart}`,
    dtEnd && `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcs(event.name)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.address || event.venue)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.name.replace(/\s+/g, '-')}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function escapeIcs(text: string): string {
  return text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')
}
