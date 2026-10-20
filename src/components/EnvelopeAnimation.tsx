import { useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * EnvelopeAnimation
 *
 * Full-screen intro shown when the site first loads.
 * A sealed envelope sits in the centre; tapping it (or pressing Enter/Space
 * on the focused button) opens the flap, the letter slides out, and the
 * invitation dialog is revealed.
 */

type Phase = 'sealed' | 'opening' | 'letter-out' | 'done'

export default function EnvelopeAnimation({
  onOpenInvitation,
}: {
  onOpenInvitation: () => void
}) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('sealed')
  const [visible, setVisible] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Move focus to the tap target so keyboard users can open it with Enter.
  useEffect(() => {
    if (phase !== 'sealed') return
    const timer = setTimeout(() => buttonRef.current?.focus(), 500)
    return () => clearTimeout(timer)
  }, [phase])

  // Users who prefer reduced motion skip straight to the invitation.
  useEffect(() => {
    if (!reducedMotion) return
    setPhase('done')
    setVisible(false)
    onOpenInvitation()
  }, [reducedMotion, onOpenInvitation])

  function handleOpen() {
    if (phase !== 'sealed') return
    setPhase('opening')

    setTimeout(() => setPhase('letter-out'), reducedMotion ? 0 : 700)
    setTimeout(() => {
      setPhase('done')
      setVisible(false)
      onOpenInvitation()
    }, reducedMotion ? 0 : 1500)
  }

  if (!visible) return null

  const { groom, bride } = weddingConfig
  const isSealed = phase === 'sealed'
  const isLetterOut = phase === 'letter-out'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-gradient px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Open the wedding invitation"
    >
      <div className="absolute inset-0 bg-radial-gold animate-fadeIn" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Envelope */}
        <div
          className={`relative w-[280px] h-[190px] sm:w-[340px] sm:h-[230px] ${
            isLetterOut ? '-translate-y-8' : ''
          } ${phase === 'done' ? 'opacity-0 scale-95' : ''} transition-all duration-700 ${
            isSealed ? 'animate-envelope-float' : ''
          }`}
          style={{ perspective: '1200px' }}
        >
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-sm bg-gradient-to-br from-ivory via-ivory-dark to-ivory border-2 border-gold shadow-2xl"
            aria-hidden="true"
          />

          {/* Flap — a triangle hinged on the top edge */}
          <div
            className="absolute inset-x-0 top-0 h-[58%] origin-top"
            style={{
              transition: 'transform 0.7s cubic-bezier(0.6, 0, 0.3, 1)',
              transform: isSealed ? 'rotateX(0deg)' : 'rotateX(178deg)',
              zIndex: isSealed ? 30 : 10,
            }}
            aria-hidden="true"
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(170deg, #F7F0DF 0%, #E4CD8F 100%)',
              }}
            />
          </div>

          {/* Front pocket with the V-shaped edge */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              clipPath: 'polygon(0 22%, 50% 58%, 100% 22%, 100% 100%, 0 100%)',
              background: 'linear-gradient(180deg, #F2E8D5 0%, #FBF5E9 100%)',
              zIndex: 20,
            }}
            aria-hidden="true"
          />

          {/* Wax seal */}
          <div
            className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full z-30 flex items-center justify-center transition-all duration-500 ${
              isSealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              background: 'radial-gradient(circle at 35% 30%, #7A1B2D 0%, #5C0E1E 60%, #3D0913 100%)',
              boxShadow: '0 4px 14px rgba(61, 9, 19, 0.45)',
            }}
            aria-hidden="true"
          >
            <span className="font-script text-2xl text-gold-light leading-none">M</span>
          </div>

          {/* Letter that slides out */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[86%] bg-ivory border border-gold/50 shadow-xl px-6 py-5 text-center transition-all duration-700 ${
              isSealed
                ? 'top-[54%] opacity-0'
                : isLetterOut
                ? 'top-[-48%] opacity-100'
                : 'top-[40%] opacity-0'
            }`}
            style={{ zIndex: 25 }}
            aria-hidden="true"
          >
            <p className="font-body text-[9px] tracking-[0.28em] text-gold-dark uppercase">
              Together with our families
            </p>
            <p className="font-display text-xl text-burgundy mt-1">
              {groom.name} <span className="text-gold-dark">&amp;</span> {bride.name}
            </p>
          </div>
        </div>

        {/* Tap affordance */}
        <button
          ref={buttonRef}
          onClick={handleOpen}
          disabled={!isSealed}
          aria-label="Tap to open the invitation envelope"
          className={`mt-12 flex flex-col items-center gap-3 text-center transition-opacity duration-500 ${
            isSealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="font-body text-xs tracking-[0.3em] text-gold-light uppercase animate-shimmer">
            Tap to Open
          </span>
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping" />
            <span className="relative font-body text-sm text-gold-light">&#9825;</span>
          </span>
        </button>
      </div>
    </div>
  )
}
