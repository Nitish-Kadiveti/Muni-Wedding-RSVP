import { useState } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import {
  buildInviteMessage,
  copyToClipboard,
  facebookShareUrl,
  telegramShareUrl,
  whatsappShareUrl,
  xShareUrl,
} from '../utils/share'

export default function ShareButtons() {
  const [copied, setCopied] = useState(false)
  const siteUrl = typeof window !== 'undefined' ? window.location.href : weddingConfig.siteUrl
  const message = buildInviteMessage(weddingConfig.groom.name, weddingConfig.bride.name, siteUrl)

  async function handleCopy() {
    const ok = await copyToClipboard(siteUrl)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const buttons = [
    { label: 'WhatsApp', href: whatsappShareUrl(message), color: 'bg-[#25D366]' },
    { label: 'Facebook', href: facebookShareUrl(siteUrl), color: 'bg-[#1877F2]' },
    { label: 'X', href: xShareUrl(siteUrl, message), color: 'bg-[#111]' },
    { label: 'Telegram', href: telegramShareUrl(siteUrl, message), color: 'bg-[#26A5E4]' },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Share this invitation">
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${b.color} text-white text-xs font-body rounded-full px-4 py-2 hover:brightness-95 transition`}
        >
          {b.label}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="text-xs font-body rounded-full border border-gold text-gold-dark px-4 py-2 hover:bg-gold hover:text-ivory transition-colors"
      >
        {copied ? 'Link Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}
