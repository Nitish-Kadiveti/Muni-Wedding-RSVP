/**
 * Generates a tasteful ornamental placeholder image as an inline SVG data URI.
 * Replace these with real photographs by editing `weddingConfig.ts` —
 * simply swap the `src` values for paths to your own images (e.g. "/photos/couple.jpg").
 */
export function placeholderImage(label: string, width = 800, height = 1000): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#5C0E1E"/>
        <stop offset="100%" stop-color="#7A1B2D"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
    <rect x="${width * 0.06}" y="${height * 0.06}" width="${width * 0.88}" height="${height * 0.88}"
      fill="none" stroke="#B8923F" stroke-width="2"/>
    <circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) * 0.16}"
      fill="none" stroke="#E4CD8F" stroke-width="1.5"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Cormorant Garamond, serif" font-size="${Math.min(width, height) * 0.07}"
      fill="#E4CD8F">${escapeXml(label)}</text>
  </svg>`.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
