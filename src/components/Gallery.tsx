import { useMemo, useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import type { GalleryCategory, GalleryImage } from '../types'
import Lightbox from './Lightbox'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

const CATEGORIES: Array<GalleryCategory | 'All'> = [
  'All',
  'Our Moments',
  'Engagement',
  'Pre-Wedding',
  'Family',
  'Cousin',
  'Friends',
  'Wedding',
  'Celebrations',
]

const shuffle = (items: GalleryImage[], seed: number): GalleryImage[] => {
  const arr = [...items]
  let s = seed
  function next() {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [seed, setSeed] = useState(0) // 0 = original order
  const [spinning, setSpinning] = useState(false)

  const shuffled = filter === 'Family' && seed > 0

  const filtered = useMemo(() => {
    const base = filter === 'All' ? weddingConfig.gallery : weddingConfig.gallery.filter((g) => g.category === filter)
    return shuffled ? shuffle(base, seed) : base
  }, [filter, shuffled, seed])

  function handleShuffle() {
    setSeed((s) => s + 1)
    setSpinning(true)
    window.setTimeout(() => setSpinning(false), 600)
  }

  return (
    <section id="gallery" className="bg-ivory py-24 px-6" aria-label="Photo gallery">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Our Moments</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs font-body rounded-full px-2 py-1 border transition-colors ${
              filter === cat
                ? 'bg-burgundy text-ivory border-burgundy'
                : 'border-gold/40 text-ink/70 hover:border-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filter === 'Family' && (
        <div className="max-w-5xl mx-auto flex justify-center mb-8">
          <button
            onClick={handleShuffle}
            className={`inline-flex items-center gap-1 text-xs font-bold rounded-full px-3 py-1 border transition-all ${
              shuffled
                ? 'bg-burgundy text-ivory border-burgundy'
                : 'border-gold/40 text-ink/60 hover:border-gold/60'
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform duration-300 ${spinning ? 'animate-spin' : ''}`}
            >
              <path d="M16 3h5v5" />
              <path d="M4 20L21 3" />
              <path d="M21 16v5h-5" />
              <path d="M15 15l6 6" />
              <path d="M4 4l5 5" />
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto columns-2 sm:columns-3 gap-4 [column-fill:balance]">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(i)}
            className="block w-full mb-4 break-inside-avoid group relative overflow-hidden border border-gold/20"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                playsInline
                muted
                loop
                preload="metadata"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-colors" />
            {item.type === 'video' && (
              <span className="absolute bottom-2 right-2 bg-burgundy/80 text-ivory text-[10px] font-body px-2 py-0.5 rounded">
                Video
              </span>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
