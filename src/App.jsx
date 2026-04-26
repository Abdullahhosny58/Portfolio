import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useVelocity, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowUp } from 'lucide-react'
import { Navbar } from './layout/Navbar'
import { Footer } from './layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { ParticleCanvas } from './components/ui/ParticleCanvas'
import { CustomCursor } from './components/ui/CustomCursor'
import { PageLoader } from './components/ui/PageLoader'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './styles/globals.css'
import './styles/animations.css'

// ─── Scroll progress bar — Motto/Pentagram style ──
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        right: 0,
        height: '2px',
        background: '#c8f551',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
        boxShadow: '0 0 12px rgba(200,245,81,0.6)',
      }}
    />
  )
}

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
            borderRadius: 'var(--r-md)', background: '#c8f551', border: 'none',
            color: '#080808', cursor: 'pointer', boxShadow: '0 6px 24px rgba(200,245,81,0.3)',
          }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── Scroll velocity skew — Motto signature effect ──
function useScrollSkew() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { stiffness: 40, damping: 14, mass: 0.12 })
  return useTransform(smoothVelocity, [-1400, 1400], [2.8, -2.8])
}

function App() {
  const { i18n } = useTranslation()
  const [loaded, setLoaded] = useState(false)
  const skewY = useScrollSkew()
  useSmoothScroll()

  useEffect(() => {
    const lang = i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <>
      {/* Page loader — shown on first paint, exits after counter reaches 100 */}
      <PageLoader onComplete={() => setLoaded(true)} />

      {/* Scroll progress bar — lime line at top of viewport */}
      <ScrollProgressBar />

      {/* Custom cursor — replaces browser cursor on desktop */}
      <CustomCursor />

      {/* Site content — fades in after loader exits */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ParticleCanvas />
            <Navbar />
            <motion.main style={{ position: 'relative', zIndex: 1, skewY, willChange: 'transform' }}>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </motion.main>
            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
