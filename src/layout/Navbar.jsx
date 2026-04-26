import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'
import { useStickyHeader } from '../hooks/useStickyHeader'

const navLinks = [
  { href: '#about',      labelKey: 'nav.about' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#skills',     labelKey: 'nav.skills' },
  { href: '#projects',   labelKey: 'nav.projects' },
  { href: '#contact',    labelKey: 'nav.contact' },
]

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isRTL = i18n.language === 'ar'

  // Pentagram hide-on-scroll-down / show-on-scroll-up
  const hidden = useStickyHeader()

  // Blur bg on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('portfolio-lang', next)
    document.documentElement.lang = next
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
  }

  const closeMenu = () => setMobileOpen(false)

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.nav
        initial={false}
        animate={{
          y: hidden ? -90 : 0,
          backgroundColor: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0)',
          borderBottomColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          borderBottom: '1px solid',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '0 var(--container-pad)',
          height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '20px', color: 'var(--clr-text)',
              letterSpacing: '-0.03em',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            <span style={{
              width: 32, height: 32, borderRadius: 'var(--r-sm)',
              background: 'var(--grad-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 800, color: '#080808',
            }}>AH</span>
            <span className="gradient-text">Portfolio</span>
          </motion.a>

          {/* Desktop Nav Links */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none' }}
            className="desktop-nav"
          >
            {navLinks.map(({ href, labelKey }) => {
              const id = href.slice(1)
              const isActive = activeSection === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    style={{
                      display: 'block', padding: '8px 14px',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-2)',
                      borderRadius: 'var(--r-sm)',
                      transition: 'all var(--t-fast)',
                      background: isActive ? 'rgba(200,245,81,0.08)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) { e.target.style.color = 'var(--clr-text)'; e.target.style.background = 'rgba(255,255,255,0.05)' }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) { e.target.style.color = 'var(--clr-text-2)'; e.target.style.background = 'transparent' }
                    }}
                  >{t(labelKey)}</a>
                </li>
              )
            })}
          </motion.ul>

          {/* Right Controls */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <button
              onClick={toggleLang}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 12px', borderRadius: 'var(--r-sm)',
                border: '1px solid var(--clr-border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text-2)', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--clr-text)'; e.currentTarget.style.borderColor = 'var(--clr-border-2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--clr-text-2)'; e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              aria-label="Toggle language"
            >
              <Globe size={14} />{t('nav.lang')}
            </button>

            <a
              href="/cv-en.pdf" download
              className="desktop-cv-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: 'var(--r-sm)',
                background: 'var(--grad-accent)', color: '#fff',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'opacity var(--t-fast)',
                boxShadow: '0 4px 16px rgba(200,245,81,0.2)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >{t('nav.cv')}</a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 'var(--r-sm)',
                border: '1px solid var(--clr-border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text)', cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>

        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay (Pentagram style) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', inset: 0,
              zIndex: 1350,
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Logo top-left */}
            <motion.a
              href="#" onClick={closeMenu}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              style={{
                position: 'absolute', top: '20px',
                insetInlineStart: '24px',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '18px', color: 'var(--clr-text)',
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 'var(--r-sm)',
                background: 'var(--grad-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 800, color: '#fff',
              }}>AH</span>
              <span className="gradient-text">Portfolio</span>
            </motion.a>

            {/* Close button top-right */}
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              style={{
                position: 'absolute', top: '18px', insetInlineEnd: '20px',
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--clr-border-2)',
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--clr-text)', cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {/* Large centered nav links */}
            <nav>
              <ul style={{ listStyle: 'none', textAlign: 'center', padding: 0, margin: 0 }}>
                {navLinks.map(({ href, labelKey }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <a
                      href={href}
                      onClick={closeMenu}
                      style={{
                        display: 'block',
                        fontSize: 'clamp(32px, 7vw, 54px)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        color: 'var(--clr-text-2)',
                        padding: '10px 40px',
                        letterSpacing: '-0.025em',
                        transition: 'color var(--t-fast)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--clr-text)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--clr-text-2)'}
                    >
                      {t(labelKey)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom controls */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.35 }}
              style={{
                position: 'absolute', bottom: '40px',
                display: 'flex', gap: '12px', alignItems: 'center',
              }}
            >
              <button
                onClick={() => { toggleLang(); closeMenu() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '11px 20px', borderRadius: 'var(--r-md)',
                  border: '1px solid var(--clr-border)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--clr-text-2)', fontSize: '14px', fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <Globe size={14} />{t('nav.lang')}
              </button>
              <a
                href="/cv-en.pdf" download onClick={closeMenu}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '12px 28px', borderRadius: 'var(--r-md)',
                  background: 'var(--grad-accent)', color: '#fff',
                  fontSize: '14px', fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(200,245,81,0.22)',
                }}
              >{t('nav.cv')}</a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-cv-btn { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar
