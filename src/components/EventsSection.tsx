import { weddingConfig } from '../config/weddingConfig'
import EventCard from './EventCard'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function EventsSection() {
  return (
    <section id="events" className="bg-ivory-dark py-24 px-6" aria-label="Wedding celebrations">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">The Wedding Celebrations</h2>
          <OrnamentDivider />
          {/* <p className="font-body text-sm text-ink/60 max-w-md mx-auto mt-2">
            Details for each function below are placeholders — replace them in the wedding configuration file.
          </p> */}
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddingConfig.events.map((event, i) => (
          <Reveal key={event.id} delayMs={(i % 3) * 80}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
