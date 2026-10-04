import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function Venue() {
  const { venue } = weddingConfig

  return (
    <section id="venue" className="relative bg-ivory py-24 px-6" aria-label="Venue">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Join Us at the Venue</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 border border-gold/30 rounded-sm overflow-hidden shadow-sm">
        <Reveal className="h-72 md:h-auto">
          <img src={venue.photo} alt={`${venue.name} venue`} className="w-full h-full object-cover" loading="lazy" />
        </Reveal>

        <Reveal delayMs={100}>
          <div className="bg-ivory-dark/50 h-full px-8 py-10 flex flex-col justify-center">
            <p className="font-body text-xs tracking-[0.2em] text-gold-dark mb-2">{venue.eventLabel}</p>
            <h3 className="font-display text-3xl text-burgundy mb-3">{venue.name}</h3>
            <p className="font-body text-sm text-ink/75 leading-relaxed">{venue.address}</p>
            <p className="font-body text-sm text-ink/75 mb-1">{venue.city}</p>
            <p className="font-body text-sm text-ink/75 mb-6">{venue.date}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-burgundy text-ivory text-sm font-body px-6 py-2.5 hover:bg-burgundy-light transition-colors"
              >
                Google Maps
              </a>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold text-gold-dark text-sm font-body px-6 py-2.5 hover:bg-gold hover:text-ivory transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {venue.mapsEmbedUrl ? (
        <Reveal delayMs={150}>
          <div className="max-w-5xl mx-auto mt-6 aspect-[16/7] border border-gold/30 overflow-hidden">
            <iframe
              src={venue.mapsEmbedUrl}
              title="Venue location map"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      ) : (
        <p className="text-center font-body text-xs text-ink/50 mt-4">
          Add a Google Maps embed URL to <code>venue.mapsEmbedUrl</code> in the wedding config to show an interactive map here.
        </p>
      )}
    </section>
  )
}
