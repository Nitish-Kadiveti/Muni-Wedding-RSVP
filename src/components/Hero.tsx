import { useEffect, useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import FloatingPetals from './FloatingPetals'
import OrnamentDivider from './OrnamentDivider'

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return '[Wedding Date]'
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Hero({ onViewInvitation }: { onViewInvitation: () => void }) {
  const { groom, bride, weddingDateISO, tagline, couplePhoto } = weddingConfig
  const [photoOpen, setPhotoOpen] = useState(false)

  // Close the full-size photo on Escape.
  useEffect(() => {
    if (!photoOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setPhotoOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [photoOpen])

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-burgundy-gradient text-ivory px-6 py-24"
    >
      <div className="absolute inset-0 bg-radial-gold" aria-hidden="true" />
      <FloatingPetals count={12} />

      {/* thin ornamental outer frame */}
      <div className="pointer-events-none absolute inset-4 md:inset-8 border border-gold/40" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto animate-fadeIn">
        <p className="font-body text-xs md:text-sm tracking-[0.25em] text-gold-light/90 mb-6">
          {tagline}
        </p>

        <div className="corner-frame mb-7">
          <button
            onClick={() => setPhotoOpen(true)}
            aria-label={`View ${groom.name} and ${bride.name} photo full size`}
            className="block w-40 h-48 md:w-56 md:h-64 rounded-t-full overflow-hidden border-2 border-gold shadow-[0_0_40px_rgba(184,146,63,0.25)] cursor-zoom-in transition-shadow hover:shadow-[0_0_55px_rgba(184,146,63,0.45)]"
          >
            <img
              src={couplePhoto}
              alt={`${groom.name} and ${bride.name}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </button>
        </div>

        {photoOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Full photo of ${groom.name} and ${bride.name}`}
            className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center px-4 animate-fadeIn"
            onClick={() => setPhotoOpen(false)}
          >
            <button
              onClick={() => setPhotoOpen(false)}
              aria-label="Close full photo"
              className="absolute top-5 right-5 text-ivory hover:text-gold-light"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <img
              src={couplePhoto}
              alt={`${groom.name} and ${bride.name}`}
              className="max-h-[85vh] max-w-[88vw] object-contain border border-gold/40 rounded-sm"
              loading="eager"
            />
          </div>
        )}

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-ivory">
          {groom.name}
        </h1>
        <p className="font-script text-2xl md:text-3xl text-gold-light my-2">Weds</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-ivory">
          {bride.name}
        </h1>

        <OrnamentDivider light />

        <p className="font-body text-sm md:text-base tracking-widest text-ivory/85 mb-10">
          {formatDate(weddingDateISO)}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-gold text-burgundy-dark font-body text-sm tracking-wide px-8 py-3 hover:bg-gold-light transition-colors shadow-lg"
          >
            Explore Our Wedding
          </button>
          <button
            onClick={onViewInvitation}
            className="rounded-full border border-gold/70 text-ivory font-body text-sm tracking-wide px-8 py-3 hover:bg-ivory/10 transition-colors"
          >
            View Invitation
          </button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to explore"
        className="absolute bottom-7 z-10 text-gold-light/80 animate-shimmer"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="1" y="1" width="20" height="32" rx="10" />
          <circle cx="11" cy="10" r="2" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </section>
  )
}
