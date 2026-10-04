import { weddingConfig } from '../config/weddingConfig'
import { useCountdown } from '../hooks/useCountdown'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingConfig.weddingDateISO)

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <section className="bg-ivory-dark py-20 px-6" aria-label="Wedding countdown">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-display italic text-2xl md:text-3xl text-burgundy">Counting down to forever</p>
          <OrnamentDivider />
        </Reveal>

        {isPast ? (
          <Reveal delayMs={150}>
            <p className="font-display text-3xl md:text-4xl text-burgundy mt-6">
              The celebrations have begun! ❤️
            </p>
          </Reveal>
        ) : (
          <Reveal delayMs={150}>
            <div className="grid grid-cols-4 gap-3 md:gap-8 mt-8" role="timer" aria-live="polite">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="bg-ivory border border-gold/50 rounded-sm py-5 px-2 md:py-8 shadow-sm"
                >
                  <div className="font-display text-3xl md:text-5xl text-burgundy tabular-nums">
                    {String(u.value).padStart(2, '0')}
                  </div>
                  <div className="font-body text-[11px] md:text-xs tracking-[0.15em] text-ink/60 mt-1 md:mt-2">
                    {u.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
