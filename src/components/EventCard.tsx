import { useState } from 'react'
import type { EventInfo } from '../types'
import { googleCalendarUrl, outlookCalendarUrl, downloadIcsFile } from '../utils/calendar'
import EventIcon from './EventIcon'

export default function EventCard({ event }: { event: EventInfo }) {
  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <div className="bg-ivory border border-gold/30 rounded-sm p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-11 h-11 rounded-full bg-burgundy/5 text-burgundy">
          <EventIcon icon={event.icon} />
        </span>
        <h3 className="font-display text-2xl text-burgundy">{event.name}</h3>
      </div>

      <dl className="font-body text-sm text-ink/75 space-y-1.5 mb-4">
        <div className="flex gap-2">
          <dt className="text-gold-dark shrink-0 w-16">Date</dt>
          <dd>{event.date ? new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '[Wedding Date]'}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-gold-dark shrink-0 w-16">Time</dt>
          <dd>{event.time}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-gold-dark shrink-0 w-16">Venue</dt>
          <dd>{event.venue}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-gold-dark shrink-0 w-16">Dress</dt>
          <dd>{event.dressCode}</dd>
        </div>
      </dl>

      <p className="font-body text-sm text-ink/70 leading-relaxed mb-5 flex-1">{event.description}</p>

      <div className="flex flex-wrap gap-2 relative">
        <div className="relative">
          <button
            onClick={() => setCalendarOpen((v) => !v)}
            aria-expanded={calendarOpen}
            className="text-xs font-body rounded-full border border-gold text-gold-dark px-4 py-1.5 hover:bg-gold hover:text-ivory transition-colors"
          >
            + Add to Calendar
          </button>
          {calendarOpen && (
            <div className="absolute z-10 mt-2 w-44 bg-ivory border border-gold/40 rounded-sm shadow-lg overflow-hidden">
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm hover:bg-ivory-dark"
              >
                Google Calendar
              </a>
              <a
                href={outlookCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm hover:bg-ivory-dark"
              >
                Outlook Calendar
              </a>
              <button
                onClick={() => {
                  downloadIcsFile(event)
                  setCalendarOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-ivory-dark"
              >
                Apple / iCal (.ics)
              </button>
            </div>
          )}
        </div>

        {event.mapsUrl && (
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body rounded-full border border-burgundy/40 text-burgundy px-4 py-1.5 hover:bg-burgundy hover:text-ivory transition-colors"
          >
            Get Directions
          </a>
        )}
      </div>
    </div>
  )
}
