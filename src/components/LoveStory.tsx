import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function LoveStory() {
  return (
    <section id="our-story" className="bg-ivory py-24 px-6" aria-label="Our love story">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Our Love Story</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/40 md:-translate-x-1/2"
          aria-hidden="true"
        />

        <ol className="space-y-14">
          {weddingConfig.loveStory.map((milestone, i) => {
            const alignRight = i % 2 === 1
            return (
              <li key={milestone.id} className="relative">
                <Reveal delayMs={i * 60}>
                  <div
                    className={`md:flex items-center gap-10 ${
                      alignRight ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="hidden md:block flex-1" />

                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-ivory shadow" />

                    <div className="pl-16 md:pl-0 md:flex-1">
                      <div
                        className={`bg-ivory-dark/60 border border-gold/30 rounded-sm p-6 ${
                          alignRight ? 'md:text-right' : ''
                        }`}
                      >
                        <p className="font-body text-xs tracking-[0.2em] text-gold-dark mb-1">
                          {milestone.date}
                        </p>
                        <h3 className="font-display text-2xl text-burgundy mb-2">{milestone.title}</h3>
                        <p className="font-body text-sm text-ink/75 leading-relaxed">{milestone.story}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
