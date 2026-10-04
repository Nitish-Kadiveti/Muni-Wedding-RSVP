import { useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function VideoSection() {
  const { video } = weddingConfig
  const [playing, setPlaying] = useState(false)

  if (video.provider === 'none') return null

  const embedSrc =
    video.provider === 'youtube'
      ? `https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${video.embedId}?autoplay=1`

  return (
    <section className="bg-ivory-dark py-24 px-6" aria-label="Wedding video">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">{video.title}</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <Reveal>
        <div className="max-w-3xl mx-auto aspect-video relative border border-gold/30 overflow-hidden bg-ink">
          {playing ? (
            <iframe
              src={embedSrc}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group relative w-full h-full"
              aria-label={`Play ${video.title}`}
            >
              <img src={video.poster} alt="" className="w-full h-full object-cover opacity-80" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-ivory/90 group-hover:bg-gold transition-colors shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#5C0E1E">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  )
}
