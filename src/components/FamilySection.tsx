import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function FamilySection() {
  const { groom, bride } = weddingConfig

  return (
    <section className="bg-ivory py-24 px-6" aria-label="Family blessings">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">With the Blessings of Our Families</h2>
          <OrnamentDivider />
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-10 mt-10 text-center">
          <Reveal delayMs={60}>
            <p className="font-body text-xs tracking-[0.2em] text-gold-dark mb-2">BRIDE&rsquo;S FAMILY</p>
            <h3 className="font-display text-2xl text-burgundy mb-1">{bride.name}</h3>
            <p className="font-body text-sm text-ink/70">{bride.parents}</p>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="font-body text-xs tracking-[0.2em] text-gold-dark mb-2">GROOM&rsquo;S FAMILY</p>
            <h3 className="font-display text-2xl text-burgundy mb-1">{groom.name}</h3>
            <p className="font-body text-sm text-ink/70">{groom.parents}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
