import { useEffect, useRef } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return '[Wedding Date]'
  return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function InvitationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { groom, bride, weddingDateISO, venue } = weddingConfig
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invitation-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm px-4 py-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-ivory border-2 border-gold rounded-sm shadow-2xl px-8 py-10 text-center corner-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close invitation"
          className="absolute top-4 right-4 text-burgundy/70 hover:text-burgundy"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <p className="font-body text-xs tracking-[0.3em] text-gold-dark uppercase-none mb-3">
          Together with the blessings of our families
        </p>

        <h2 id="invitation-title" className="font-display text-3xl text-burgundy">
          {groom.name}
        </h2>
        <p className="font-script text-xl text-gold-dark my-1">weds</p>
        <h2 className="font-display text-3xl text-burgundy">{bride.name}</h2>

        <OrnamentDivider />

        <div className="font-body text-sm text-ink/80 space-y-1 mb-6">
          <p>{formatDate(weddingDateISO)}</p>
          <p>{venue.eventLabel}</p>
          <p>{venue.name}</p>
          <p>{venue.address}</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-full bg-burgundy text-ivory font-body text-sm px-7 py-2.5 hover:bg-burgundy-light transition-colors"
        >
          Open Wedding Website
        </button>
      </div>
    </div>
  )
}
