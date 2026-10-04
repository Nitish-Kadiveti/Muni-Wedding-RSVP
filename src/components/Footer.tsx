import { weddingConfig } from '../config/weddingConfig'
import FloatingPetals from './FloatingPetals'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'
import ShareButtons from './ShareButtons'

export default function Footer() {
  const { groom, bride } = weddingConfig

  return (
    <footer className="relative">
      <section className="bg-ivory py-20 px-6 text-center" aria-label="Thank you">
        <Reveal>
          <p className="font-body text-sm text-ink/65 mb-3">Share our invitation with someone you love</p>
          <ShareButtons />
        </Reveal>

        <Reveal delayMs={100} className="mt-16">
          <OrnamentDivider />
          <p className="font-display text-2xl text-burgundy mt-4">
            With love,
            <br />
            {groom.name} &amp; {bride.name}
          </p>
          <p className="font-body text-sm text-ink/60 mt-2">Thank you for being part of our journey.</p>
        </Reveal>
      </section>

      <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-burgundy-gradient text-ivory px-6 py-24 overflow-hidden">
        <FloatingPetals count={8} />
        <div className="relative z-10 text-center max-w-lg">
          <p className="font-display italic text-2xl md:text-3xl leading-relaxed">
            Two hearts.
            <br />
            One beautiful journey.
            <br />
            Forever to go.
          </p>
          <OrnamentDivider light />
          <p className="font-script text-3xl md:text-4xl text-gold-light">
            {groom.name} <span aria-hidden="true">❤</span> {bride.name}
          </p>
        </div>
      </section>

      <div className="bg-burgundy-dark text-ivory/50 text-center py-4 px-6 font-body text-xs">
        Made with love for {groom.name} &amp; {bride.name}&rsquo;s wedding.
      </div>
    </footer>
  )
}
