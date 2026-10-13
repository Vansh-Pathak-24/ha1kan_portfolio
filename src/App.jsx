import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis, NAV_H, markLoaded } from './lib/lenis'
import { site } from './lib/site'
import Navbar from './components/NavBar'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import MobileTabs from './components/MobileTabs'
import Transition from './components/Transition'
import LandingPage from './sections/LandingPage'
import Features from './pages/Features'

const App = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = site.title
  }, [])

  useEffect(() => {
    if (!document.querySelector('[data-preloader]')) markLoaded()
  }, [])

  useEffect(() => {
    const el = hash && document.querySelector(hash)
    if (el) lenis.scrollTo(el, { offset: -NAV_H, immediate: true, force: true })
    else lenis.scrollTo(0, { immediate: true, force: true })
    ScrollTrigger.refresh()
  }, [pathname, hash])

  return (
    <>
      <Preloader />
      <Transition />
      <Cursor />
      <Navbar />
      <MobileTabs />
      <div id="page">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
