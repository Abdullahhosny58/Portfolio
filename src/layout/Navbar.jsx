import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'

const navLinks = [
  { href: '#about',    labelKey: 'nav.about' },
  { href: '#skills',   labelKey: 'nav.skills' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contact',  labelKey: 'nav.contact' },
]

export function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isRTL = i18n.language === 'ar'

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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
      <motion.nav
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top:      { backgroundColor: 'rgba(5,8,22,0)', borderBottomColor: 'rgba(255,255,255,0)' },
          scrolled: { backgroundColor: 'rgba(5,8,22,0.88)', borderBottomColor: 'rgba(255,255,255,0.07)' },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          borderBottom: '1px solid',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--container-pad)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '20px',
              color: 'var(--clr-text)',
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{
              width: 32, height: 32,
              borderRadius: 'var(--r-sm)',
              background: 'var(--grad-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 800, color: '#fff',
            }}>
              AH
            </span>
            <span className="gradient-text">Portfolio</span>
          </motion.a>

          {/* Desktop Nav Links */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              listStyle: 'none',
            }}
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
                      display: 'block',
                      padding: '8px 14px',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-2)',
                      borderRadius: 'var(--r-sm)',
                      transition: 'all var(--t-fast)',
                      background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.color = 'var(--clr-text)'
                        e.target.style.background = 'rgba(255,255,255,0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.color = 'var(--clr-text-2)'
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    {t(labelKey)}
                  </a>
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
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 12px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--clr-border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text-2)',
                fontSize: '13px', fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--clr-text)'
                e.currentTarget.style.borderColor = 'var(--clr-border-2)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--clr-text-2)'
                e.currentTarget.style.borderColor = 'var(--clr-border)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {t('nav.lang')}
            </button>

            {/* CV Button */}
            <a
              href="/cv-en.pdf"
              download
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--grad-accent)',
                color: '#fff',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer',
                transition: 'opacity var(--t-fast)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              }}
              className="desktop-cv-btn"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {t('nav.cv')}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="mobile-menu-btn"
              style={{
                display: 'none',
                alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40,
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--clr-border)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text)',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              style={{
                position: 'fixed', inset: 0, zIndex: 998,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: 'fixed',
                top: 'calc(var(--nav-height) + 8px)',
                left: '16px', right: '16px',
                zIndex: 999,
                background: 'rgba(12,18,37,0.98)',
                border: '1px solid var(--clr-border-2)',
                borderRadius: 'var(--r-xl)',
                padding: '20px',
                backdropFilter: 'blur(24px)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <ul style={{ listStyle: 'none', marginBottom: '16px' }}>
                {navLinks.map(({ href, labelKey }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <a
                      href={href}
                      onClick={closeMenu}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: 'var(--r-md)',
                        fontSize: '15px', fontWeight: 500,
                        color: 'var(--clr-text-2)',
                        transition: 'all var(--t-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--clr-text)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--clr-text-2)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      {t(labelKey)}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { toggleLang(); closeMenu() }}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '11px', borderRadius: 'var(--r-md)',
                    border: '1px solid var(--clr-border)', background: 'rgba(255,255,255,0.04)',
                    color: 'var(--clr-text-2)', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  <Globe size={14} /> {t('nav.lang')}
                </button>
                <a
                  href="/cv-en.pdf"
                  download
                  onClick={closeMenu}
                  style={{
                    flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '11px', borderRadius: 'var(--r-md)',
                    background: 'var(--grad-accent)', color: '#fff',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {t('nav.cv')}
                </a>
              </div>
            </motion.div>
          </>
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
