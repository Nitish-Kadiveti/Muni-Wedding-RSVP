import { useEffect, useState } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'events', label: 'Wedding Events' },
  { id: 'venue', label: 'Venue' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ onViewInvitation }: { onViewInvitation: () => void }) {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(NAV_ITEMS.map((n) => n.id))

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.55)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav
        aria-label="Primary"
        className="bg-ivory/95 backdrop-blur border-b border-gold/30 shadow-[0_2px_18px_rgba(92,14,30,0.08)]"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
          <button
            onClick={() => goTo('home')}
            className="font-display text-lg md:text-xl text-burgundy tracking-wide"
          >
            M <span className="text-gold-dark">&amp;</span> S
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  className={`font-body text-sm tracking-wide transition-colors ${
                    active === item.id ? 'text-burgundy font-medium' : 'text-ink/70 hover:text-burgundy'
                  }`}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={onViewInvitation}
              className="rounded-full border border-gold text-gold-dark px-4 py-1.5 text-sm font-body hover:bg-gold hover:text-ivory transition-colors"
            >
              View Invitation
            </button>
          </div>

          <button
            className="md:hidden text-burgundy"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-ivory border-b border-gold/30 shadow-lg animate-fadeIn">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  className={`w-full text-left py-2.5 font-body text-base border-b border-gold/10 ${
                    active === item.id ? 'text-burgundy font-medium' : 'text-ink/80'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-3">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  onViewInvitation()
                }}
                className="w-full rounded-full border border-gold text-gold-dark px-4 py-2 text-sm"
              >
                View Invitation
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
