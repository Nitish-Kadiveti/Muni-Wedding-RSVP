export function whatsappShareUrl(message: string, phoneDigitsOnly?: string): string {
  const base = phoneDigitsOnly ? `https://wa.me/${phoneDigitsOnly}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(message)}`
}

export function buildInviteMessage(
  groom: string,
  bride: string,
  siteUrl: string,
  options?: { date?: string; venue?: string }
): string {
  const lines = [
    `You're invited to celebrate the wedding of`,
    `${groom} & ${bride} ❤️`,
  ]
  if (options?.date) lines.push(`Date: ${options.date}`)
  if (options?.venue) lines.push(`Venue: ${options.venue}`)
  lines.push('', siteUrl)
  return lines.join('\n')
}

export function facebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

export function xShareUrl(url: string, text: string): string {
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
}

export function telegramShareUrl(url: string, text: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
