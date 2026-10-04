import { PropsWithChildren } from 'react'
import { useInView } from '../hooks/useInView'

interface RevealProps {
  delayMs?: number
  className?: string
}

export default function Reveal({ children, delayMs = 0, className = '' }: PropsWithChildren<RevealProps>) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delayMs}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
