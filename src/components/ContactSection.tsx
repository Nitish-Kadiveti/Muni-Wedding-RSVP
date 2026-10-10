import { weddingConfig } from '../config/weddingConfig'
import { whatsappShareUrl } from '../utils/share'
import OrnamentDivider from './OrnamentDivider'
import Reveal from './Reveal'

export default function ContactSection() {
  const { contacts, whatsappNumber } = weddingConfig

  return (
    <section id="contact" className="bg-ivory-dark py-24 px-6" aria-label="Contact">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl text-burgundy">Need Help?</h2>
          <OrnamentDivider />
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 mb-10">
        {contacts.map((contact, i) => (
          <Reveal key={contact.id} delayMs={i * 80}>
            <div className="bg-ivory border border-gold/25 rounded-sm p-6 text-center h-full">
              <p className="font-body text-xs tracking-[0.2em] text-gold-dark mb-2">{contact.role.toUpperCase()}</p>
              <p className="font-display text-xl text-burgundy mb-1">{contact.name}</p>
              <a href={`tel:${contact.phone}`} className="font-body text-sm text-ink/70 hover:text-burgundy">
                {contact.phone}
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      {whatsappNumber && (
        <Reveal>
          <div className="text-center">
            <a
              href={whatsappShareUrl(
                `Hi! I have a question about the wedding of ${weddingConfig.groom.name} & ${weddingConfig.bride.name}.`,
                whatsappNumber
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-body px-6 py-2.5 hover:brightness-95 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      )}
    </section>
  )
}
