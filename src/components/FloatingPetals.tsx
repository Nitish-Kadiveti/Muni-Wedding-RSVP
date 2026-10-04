import { useMemo } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function FloatingPetals({ count = 10 }: { count?: number }) {
  const reducedMotion = useReducedMotion()

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        delay: Math.round(Math.random() * 12),
        duration: 14 + Math.round(Math.random() * 10),
        size: 8 + Math.round(Math.random() * 8),
      })),
    [count]
  )

  if (reducedMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-full bg-rose/70 animate-drift"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: '60% 40% 60% 40%',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
