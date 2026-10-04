import { useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'

const PREF_KEY = 'wedding-music-on'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const preferred = sessionStorage.getItem(PREF_KEY)
    if (preferred === 'true' && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      sessionStorage.setItem(PREF_KEY, 'false')
    } else {
      audio.play().then(() => {
        setPlaying(true)
        sessionStorage.setItem(PREF_KEY, 'true')
      }).catch(() => setPlaying(false))
    }
  }

  if (!weddingConfig.music.src) return null

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <audio ref={audioRef} src={weddingConfig.music.src} loop preload="none" />
      <button
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        title={weddingConfig.music.title}
        className="w-12 h-12 rounded-full bg-burgundy text-ivory shadow-lg flex items-center justify-center hover:bg-burgundy-light transition-colors"
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={playing ? '' : 'animate-shimmer'}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  )
}
