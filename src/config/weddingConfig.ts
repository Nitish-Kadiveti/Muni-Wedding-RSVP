import type { WeddingConfig } from '../types'
import { placeholderImage } from '../utils/placeholder'
import couplePhotoUrl from '../Pics/Cover.jpg'
import engaged from '../Pics/Engaged.jpg'
import engaged1 from '../Pics/engaged1.jpg'
import engaged2 from '../Pics/engaged2.jpg'
import engaged3 from '../Pics/engaged3.jpg'
import engaged4 from '../Pics/engaged4.jpg'
import engaged5 from '../Pics/engaged5.jpg'
import engaged6 from '../Pics/engaged6.jpg'
import engaged7 from '../Pics/engaged7.jpg'
import engaged8 from '../Pics/engaged8.jpg'
import engaged9 from '../Pics/engaged9.jpg'
import engaged10 from '../Pics/engaged10.jpg'
import engaged11 from '../Pics/engaged11.jpg'
import engaged12 from '../Pics/engaged12.jpg'
import engaged13 from '../Pics/engaged13.jpg'
import engaged14 from '../Pics/engaged14.jpg'
import engaged15 from '../Pics/engaged15.jpg'
import F1 from '../Pics/F1.jpg'
import F2 from '../Pics/F2.jpg'
import F3 from '../Pics/F3.jpg'
import F4 from '../Pics/F4.jpg'
import F6 from '../Pics/F6.jpg'
import F7 from '../Pics/F7.jpg'
import F8 from '../Pics/F8.jpg'
import F9 from '../Pics/F9.jpg'
import C1 from '../Pics/C1.jpg'
import C2 from '../Pics/C2.jpg'
import C3 from '../Pics/C3.jpg'
import C4 from '../Pics/C4.jpg'
import V1 from '../Pics/V1.mp4'
import V2 from '../Pics/V2.mp4'

/**
 * ============================================================
 *  WEDDING CONFIGURATION
 * ============================================================
 *  This is the ONLY file most couples need to edit.
 *  Replace every "[placeholder]" value with real details.
 *  Swap placeholderImage(...) calls for real photo paths,
 *  e.g. "/photos/couple-hero.jpg" (place files in /public/photos).
 * ============================================================
 */

export const weddingConfig: WeddingConfig = {
  groom: {
    name: 'Muni Kumar',
    fullName: 'Muni Kumar',
    parents: "Gopi and Nirmala",
  },
  bride: {
    name: 'Shalini',
    fullName: 'Shalini',
    parents: "[Bride's Parents' Names]",
  },

  // Primary ceremony date & time used for the countdown. Use ISO format with timezone offset.
  weddingDateISO: '2026-11-26T10:00:00+05:30',

  tagline: 'Together with the blessings of our families',

  couplePhoto: couplePhotoUrl,
  heroBackdrop: placeholderImage('', 1920, 1080),

  venue: {
    name: '[Venue Name]',
    address: '[Venue Address]',
    city: '[City, State]',
    date: '[Wedding Date]',
    eventLabel: 'Wedding Ceremony',
    mapsUrl: 'https://maps.google.com/?q=[Venue+Name]',
    mapsEmbedUrl: '',
    photo: placeholderImage('Venue Photograph', 1400, 900),
  },

  events: [
    {
      id: 'engagement',
      name: 'Engagement',
      date: '',
      time: '[Event Time]',
      venue: '[Venue Name]',
      address: '[Venue Address]',
      mapsUrl: '',
      dressCode: '',
      description: 'Join us as we formally announce our commitment to one another, surrounded by our closest family and friends.',
      icon: 'engagement',
    },
    {
      id: 'haldi',
      name: 'Haldi',
      date: '',
      time: '[Event Time]',
      venue: '[Venue Name]',
      address: '[Venue Address]',
      mapsUrl: '',
      dressCode: 'Yellow attire suggested',
      description: 'A joyful turmeric ceremony to bless the couple with warmth, radiance and good fortune ahead of the wedding.',
      icon: 'haldi',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      date: '',
      time: '[Event Time]',
      venue: '[Venue Name]',
      address: '[Venue Address]',
      mapsUrl: '',
      dressCode: 'Traditional attire',
      description: 'The sacred union of Muni Kumar & Shalini, blessed by family, tradition and rituals passed through generations.',
      icon: 'wedding',
    },
    {
      id: 'reception',
      name: 'Reception',
      date: '',
      time: '[Event Time]',
      venue: '[Venue Name]',
      address: '[Venue Address]',
      mapsUrl: '',
      dressCode: 'Formal / Evening wear',
      description: 'Join us for dinner and celebration as we begin this new chapter, surrounded by everyone we love.',
      icon: 'reception',
    },
  ],

  loveStory: [
    {
      id: 'first-hello',
      date: '[Date]',
      title: 'The First Hello',
      story: 'Replace this with how you first crossed paths — the place, the moment, the small detail neither of you forgot.',
      image: placeholderImage('The First Hello', 700, 700),
    },
    {
      id: 'when-we-met',
      date: '[Date]',
      title: 'When We Met',
      story: 'Replace this with the story of your first real conversation and what made it memorable.',
      image: placeholderImage('When We Met', 700, 700),
    },
    {
      id: 'the-beginning',
      date: '[Date]',
      title: 'The Beginning',
      story: 'Replace this with how you decided to give each other a chance.',
      image: placeholderImage('The Beginning', 700, 700),
    },
    {
      id: 'falling-in-love',
      date: '[Date]',
      title: 'Falling in Love',
      story: 'Replace this with a memory that captures when you both knew this was something real.',
      image: placeholderImage('Falling in Love', 700, 700),
    },
    {
      id: 'the-proposal',
      date: '[Date]',
      title: 'The Proposal',
      story: 'Replace this with the story of the proposal — where it happened and how it felt.',
      image: placeholderImage('The Proposal', 700, 700),
    },
    {
      id: 'forever-begins',
      date: '[Wedding Date]',
      title: 'Forever Begins',
      story: 'And now, surrounded by the people we love most, our forever begins.',
      image: placeholderImage('Forever Begins', 700, 700),
    },
  ],

  gallery: [
    
    { id: 'g1', src: placeholderImage('Our Moments', 800, 1000), category: 'Our Moments', alt: 'Our Moments', type: 'image' },
    { id: 'ga', src: engaged, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g2', src: engaged1, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3', src: engaged2, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3a', src: engaged3, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3b', src: engaged4, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3c', src: engaged5, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3m', src: engaged6, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3d', src: engaged7, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3e', src: engaged8, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3f', src: engaged9, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3g', src: engaged10, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3h', src: engaged11, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3i', src: engaged12, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3j', src: engaged13, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3k', src: engaged14, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },
    { id: 'g3l', src: engaged15, category: 'Engagement', alt: 'Engagement — Muni Kumar & Shalini', type: 'image' },

    { id: 'g4', src: placeholderImage('Pre-Wedding', 800, 1000), category: 'Pre-Wedding', alt: 'Pre-Wedding', type: 'image' },
    { id: 'g5a', src: F1, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5b', src: F2, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5c', src: F3, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5d', src: F4, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5e', src: F6, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5f', src: F7, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5g', src: F8, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g5h', src: F9, category: 'Family', alt: 'Family', type: 'image' },
    { id: 'g11a', src: C1, category: 'Cousin', alt: 'Cousin', type: 'image' },
    { id: 'g11b', src: C2, category: 'Cousin', alt: 'Cousin', type: 'image' },
    { id: 'g11c', src: C3, category: 'Cousin', alt: 'Cousin', type: 'image' },
    { id: 'g11d', src: C4, category: 'Cousin', alt: 'Cousin', type: 'image' },
    { id: 'g6', src: placeholderImage('Friends', 800, 1000), category: 'Friends', alt: 'Friends', type: 'image' },
    { id: 'g7', src: placeholderImage('Wedding', 800, 1000), category: 'Wedding', alt: 'Wedding', type: 'image' },
    { id: 'g8', src: placeholderImage('Celebrations', 800, 1000), category: 'Celebrations', alt: 'Celebrations', type: 'image' },
    { id: 'g9', src: placeholderImage('Pre-Wedding', 800, 1000), category: 'Pre-Wedding', alt: 'Pre-Wedding', type: 'image' },
    { id: 'g10', src: placeholderImage('Our Moments', 800, 1000), category: 'Our Moments', alt: 'Our Moments', type: 'image' },
    { id: 'g11', src: V1, category: 'Our Moments', alt: 'Video: Our Moments', type: 'video' },
    { id: 'g12', src: V2, category: 'Our Moments', alt: 'Video: Our Moments', type: 'video' },
    
  ],

  video: {
    title: 'Our Journey Together',
    provider: 'none', // set to 'youtube' or 'vimeo' once a video exists
    embedId: '', // e.g. YouTube video ID or Vimeo ID
    poster: placeholderImage('Our Journey Together', 1280, 720),
  },

  hotels: [
    {
      id: 'hotel-1',
      name: '[Hotel Name]',
      address: '[Hotel Address]',
      distanceFromVenue: '[Distance from Venue]',
      bookingUrl: '',
    },
    {
      id: 'hotel-2',
      name: '[Hotel Name]',
      address: '[Hotel Address]',
      distanceFromVenue: '[Distance from Venue]',
      bookingUrl: '',
    },
  ],

  importantInfo: [
    { id: 'parking', title: 'Parking', description: '[Add parking instructions for guests]', icon: 'parking' },
    { id: 'accommodation', title: 'Accommodation', description: '[Add accommodation details or link to Travel & Stay]', icon: 'accommodation' },
    { id: 'transportation', title: 'Transportation', description: '[Add shuttle / transport details]', icon: 'transportation' },
    { id: 'dress-code', title: 'Dress Code', description: '[Add general dress code guidance]', icon: 'dress' },
    { id: 'photography', title: 'Photography', description: '[Add photography / videography guidance for guests]', icon: 'camera' },
    { id: 'children', title: 'Children', description: '[Let guests know if the event is child-friendly]', icon: 'children' },
    { id: 'weather', title: 'Weather', description: '[Add expected weather and what to bring]', icon: 'weather' },
    { id: 'contact', title: 'Contact Information', description: 'See the Contact section below for our wedding coordinator and family contacts.', icon: 'contact' },
  ],

  contacts: [
    { id: 'coordinator', role: 'Wedding Coordinator', name: '[Coordinator Name]', phone: '[Phone Number]', whatsapp: '' },
    { id: 'bride-family', role: "Bride's Family", name: "[Bride's Family Contact]", phone: '[Phone Number]' },
    { id: 'groom-family', role: "Groom's Family", name: "[Groom's Family Contact]", phone: '[Phone Number]' },
  ],

  // Configure once — used for WhatsApp share buttons across the site.
  // Digits only, with country code, no + or spaces. Example: "911234567890"
  whatsappNumber: '',

  music: {
    title: 'Wedding Instrumental',
    src: '', // add a path like "/audio/wedding-theme.mp3" once you have licensed music
  },

  siteUrl: 'https://munikumar-weds-shalini.vercel.app',
}
