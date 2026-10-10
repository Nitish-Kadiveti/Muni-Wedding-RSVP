import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InvitationModal from './components/InvitationModal'
import Countdown from './components/Countdown'
import LoveStory from './components/LoveStory'
import EventsSection from './components/EventsSection'
import Venue from './components/Venue'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import FamilySection from './components/FamilySection'
import DressCode from './components/DressCode'
import ContactSection from './components/ContactSection'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import AdminGalleryUpload from './components/AdminGalleryUpload'

export default function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-ivory">
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-burgundy focus:text-ivory focus:px-4 focus:py-2 focus:rounded"
          >
            Skip to content
          </a>

          <Navbar onViewInvitation={() => setInvitationOpen(true)} />
          <InvitationModal open={invitationOpen} onClose={() => setInvitationOpen(false)} />

          <main>
            <Hero onViewInvitation={() => setInvitationOpen(true)} />
            <Countdown />
            <LoveStory />
            <EventsSection />
            <Venue />
            <Gallery />
            <VideoSection />
            <FamilySection />
            <DressCode />
            <ContactSection />
          </main>

          <Footer />
          <MusicPlayer />
        </div>
      } />
      <Route path="/admin/gallery" element={<AdminGalleryUpload />} />
    </Routes>
  )
}
