import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

const socials = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/Abdullahhosny58' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter,  label: 'Twitter',  href: 'https://twitter.com' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--clr-border)',
      background: 'var(--clr-bg)',
      padding: '48px 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
      }}>
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 700,
            background: 'var(--grad-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Abdullah Hosny
        </motion.a>

        {/* Nav Links */}
        <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['hero', 'about', 'skills', 'projects', 'contact'].map((sec) => (
            <a
              key={sec}
              href={'#' + sec}
              style={{
                fontSize: '13px',
                color: 'var(--clr-text-2)',
                transition: 'color var(--t-fast)',
                textTransform: 'capitalize',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--clr-accent-light)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--clr-text-2)'}
            >
              {t('nav.' + sec)}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {socials.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--r-md)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--clr-border)',
                color: 'var(--clr-text-2)',
                transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.12)'
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                e.currentTarget.style.color = 'var(--clr-accent-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.borderColor = 'var(--clr-border)'
                e.currentTarget.style.color = 'var(--clr-text-2)'
              }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{
          fontSize: '12px',
          color: 'var(--clr-text-3)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          {t('footer.made')}
          <Heart size={11} style={{ color: '#f43f5e', fill: '#f43f5e' }} />
          {t('footer.name')} — {year}
        </p>
      </div>
    </footer>
  )
}

export default Footer
