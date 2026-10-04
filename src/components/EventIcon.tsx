import type { EventIconKey } from '../types'

const paths: Record<EventIconKey, JSX.Element> = {
  engagement: (
    <path d="M12 21c-4-3-8-6.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.5-4 8-8 11z M9 9l2 2 4-4" />
  ),
  haldi: <path d="M12 3c2 3 4 6 4 9a4 4 0 1 1-8 0c0-3 2-6 4-9z" />,
  mehendi: <path d="M6 20c4-1 6-4 6-8 0-4 2-6 6-8M6 20c0-4 2-7 2-11M14 6c1 2 1 4 0 6" />,
  sangeet: <path d="M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  wedding: <path d="M8 12a4 4 0 1 1 4 4M16 12a4 4 0 1 0-4-4M12 8a4 4 0 0 0 0 8" />,
  reception: <path d="M4 21h16M6 21V10l6-6 6 6v11M10 21v-6h4v6" />,
}

export default function EventIcon({ icon, className = 'w-6 h-6' }: { icon: EventIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[icon]}
    </svg>
  )
}
