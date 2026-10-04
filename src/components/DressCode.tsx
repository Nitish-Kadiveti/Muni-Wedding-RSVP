import { weddingConfig } from '../config/weddingConfig'
import EventIcon from './EventIcon'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function DressCode() {
  return (
    <section className="bg-ivory-dark py-24 px-6" aria-label="Dress code">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Come Dressed to Celebrate</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {weddingConfig.events.map((event, i) => (
          <Reveal key={event.id} delayMs={(i % 3) * 70}>
            <div className="flex items-start gap-3 bg-ivory border border-gold/25 rounded-sm p-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-burgundy/5 text-burgundy shrink-0">
                <EventIcon icon={event.icon} className="w-5 h-5" />
              </span>
              <div>
                <p className="font-display text-lg text-burgundy leading-tight">{event.name}</p>
                <p className="font-body text-sm text-ink/70">{event.dressCode}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
