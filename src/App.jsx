import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUp } from 'lucide-react'
import { Navbar } from './layout/Navbar'
import { Footer } from './layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { ParticleCanvas } from './components/ui/ParticleCanvas'
import { CursorGlow } from './components/ui/CursorGlow'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './styles/globals.css'
import './styles/animations.css'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key='scroll-top'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label='Scroll to top'
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed', bottom: '28px', insetInlineEnd: '28px', zIndex: 900,
            width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r-md)', background: 'var(--grad-accent)', border: 'none',
            color: '#fff', cursor: 'pointer', boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
          }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  const { i18n } = useTranslation()
  useSmoothScroll()
  useEffect(() => {
    const lang = i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])
  return (
    <>
      <ParticleCanvas />
      <CursorGlow />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
