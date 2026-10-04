import { useEffect, useRef } from 'react'
import type { GalleryImage } from '../types'

interface LightboxProps {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null)
  const image = images[index]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, images.length, onClose, onNavigate])

  if (!image) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center px-4 animate-fadeIn"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (delta > 50) onNavigate((index - 1 + images.length) % images.length)
        if (delta < -50) onNavigate((index + 1) % images.length)
        touchStartX.current = null
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-5 right-5 text-ivory hover:text-gold-light"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index - 1 + images.length) % images.length)
        }}
        aria-label="Previous photo"
        className="absolute left-2 md:left-6 text-ivory hover:text-gold-light p-2"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[88vw] object-contain border border-gold/40"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNavigate((index + 1) % images.length)
        }}
        aria-label="Next photo"
        className="absolute right-2 md:right-6 text-ivory hover:text-gold-light p-2"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="absolute bottom-5 text-ivory/70 text-xs font-body tracking-wide">
        {index + 1} / {images.length} · {image.category}
      </p>
    </div>
  )
}
