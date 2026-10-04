export default function OrnamentDivider({ light = false }: { light?: boolean }) {
  const color = light ? '#E4CD8F' : '#B8923F'
  return (
    <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
      <span className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>
      <span className="h-px w-10" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  )
}
