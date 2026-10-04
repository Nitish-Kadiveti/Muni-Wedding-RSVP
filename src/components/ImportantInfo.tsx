import { weddingConfig } from '../config/weddingConfig'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

const ICONS: Record<string, JSX.Element> = {
  parking: <path d="M6 3h6a5 5 0 0 1 0 10H9v8M9 8h3a1 1 0 1 1 0 5H9V8z" />,
  accommodation: <path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />,
  transportation: <path d="M3 13l2-6h14l2 6M5 13h14v6H5zM7 19v2M17 19v2M5 13a2 2 0 1 0 4 0M15 13a2 2 0 1 0 4 0" />,
  dress: <path d="M8 3l4 3 4-3 2 4-3 2v12H7V9L4 7z" />,
  camera: <path d="M4 8h3l2-3h6l2 3h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  children: <path d="M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 21c0-4 3-6 6-6s6 2 6 6" />,
  weather: <path d="M6 16a4 4 0 1 1 1.2-7.83A5 5 0 0 1 17 10a3 3 0 0 1 0 6H6z" />,
  contact: <path d="M4 5h16v14H4zM4 5l8 7 8-7" />,
}

export default function ImportantInfo() {
  return (
    <section className="bg-ivory-dark py-24 px-6" aria-label="Important information">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Everything You Need to Know</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {weddingConfig.importantInfo.map((card, i) => (
          <Reveal key={card.id} delayMs={(i % 4) * 70}>
            <div className="bg-ivory border border-gold/25 rounded-sm p-6 h-full text-center">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-burgundy/5 text-burgundy mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  {ICONS[card.icon] ?? <circle cx="12" cy="12" r="9" />}
                </svg>
              </span>
              <h3 className="font-display text-lg text-burgundy mb-1">{card.title}</h3>
              <p className="font-body text-sm text-ink/65">{card.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
