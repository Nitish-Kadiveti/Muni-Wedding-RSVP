export interface EventInfo {
  id: string
  name: string
  date: string // ISO date string, e.g. "2026-12-01" — empty string if unknown
  time: string // display string, e.g. "6:00 PM" — placeholder if unknown
  endTime?: string // used for calendar generation
  venue: string
  address?: string
  mapsUrl?: string
  dressCode: string
  description: string
  icon: EventIconKey
}

export type EventIconKey =
  | 'engagement'
  | 'haldi'
  | 'mehendi'
  | 'sangeet'
  | 'wedding'
  | 'reception'

export interface LoveStoryMilestone {
  id: string
  date: string
  title: string
  story: string
  image?: string
}

export interface GalleryImage {
  id: string
  src: string
  category: GalleryCategory
  alt: string
  type?: 'image' | 'video'
}

export type GalleryCategory =
  | 'Our Moments'
  | 'Engagement'
  | 'Pre-Wedding'
  | 'Family'
  | 'Cousin'
  | 'Friends'
  | 'Wedding'
  | 'Celebrations'

export interface HotelInfo {
  id: string
  name: string
  address: string
  distanceFromVenue: string
  bookingUrl?: string
}

export interface InfoCard {
  id: string
  title: string
  description: string
  icon: string
}

export interface ContactPerson {
  id: string
  role: string
  name: string
  phone: string
  whatsapp?: string
}

export interface WeddingConfig {
  groom: { name: string; fullName?: string; parents?: string }
  bride: { name: string; fullName?: string; parents?: string }
  weddingDateISO: string // primary ceremony date-time in ISO, used for the countdown
  tagline: string
  couplePhoto: string
  heroBackdrop: string
  venue: {
    name: string
    address: string
    city: string
    date: string
    eventLabel: string
    mapsUrl: string
    mapsEmbedUrl?: string
    photo: string
  }
  events: EventInfo[]
  loveStory: LoveStoryMilestone[]
  gallery: GalleryImage[]
  video: {
    title: string
    provider: 'youtube' | 'vimeo' | 'none'
    embedId: string
    poster: string
  }
  hotels: HotelInfo[]
  importantInfo: InfoCard[]
  contacts: ContactPerson[]
  whatsappNumber: string // digits only, with country code, e.g. "911234567890"
  music: { title: string; src: string }
  siteUrl: string
}

