import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function TravelStay() {
  const { hotels } = weddingConfig

  return (
    <section className="bg-ivory py-24 px-6" aria-label="Travel and stay">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Travel &amp; Stay</h2>
          <OrnamentDivider />
          <p className="font-body text-sm text-ink/60 max-w-md mx-auto mt-2">
            A few notes for guests travelling from out of town.
          </p>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
        {hotels.map((hotel, i) => (
          <Reveal key={hotel.id} delayMs={i * 80}>
            <div className="border border-gold/30 rounded-sm p-6 h-full bg-ivory-dark/40">
              <h3 className="font-display text-xl text-burgundy mb-1">{hotel.name}</h3>
              <p className="font-body text-sm text-ink/70">{hotel.address}</p>
              <p className="font-body text-xs text-gold-dark mt-1">{hotel.distanceFromVenue}</p>
              <div className="flex gap-3 mt-4">
                {hotel.bookingUrl ? (
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-body rounded-full border border-gold text-gold-dark px-4 py-1.5 hover:bg-gold hover:text-ivory transition-colors"
                  >
                    View Hotel
                  </a>
                ) : (
                  <span className="text-xs font-body text-ink/40 italic">Booking link coming soon</span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-5">
            <p className="font-display text-lg text-burgundy mb-1">Airport</p>
            <p className="font-body text-sm text-ink/65">[Nearest Airport &amp; Distance]</p>
          </div>
          <div className="p-5">
            <p className="font-display text-lg text-burgundy mb-1">Railway Station</p>
            <p className="font-body text-sm text-ink/65">[Nearest Station &amp; Distance]</p>
          </div>
          <div className="p-5">
            <p className="font-display text-lg text-burgundy mb-1">Local Transport</p>
            <p className="font-body text-sm text-ink/65">[Taxi / Cab Information]</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
