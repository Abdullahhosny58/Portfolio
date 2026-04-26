import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Mail, MapPin, CheckCircle, Download, Github, Linkedin, Twitter } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MagneticButton } from '../components/ui/MagneticButton'

// ─── Info Card ────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, href, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, borderColor: 'rgba(200,245,81,0.25)' }}
      style={{
        padding: '28px 32px',
        background: 'var(--clr-surface)',
        border: '1px solid var(--clr-border)',
        borderRadius: 'var(--r-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        transition: 'border-color var(--t-normal), box-shadow var(--t-normal)',
        cursor: href ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-glow)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Icon */}
      <div style={{
        width: 48, height: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--r-lg)',
        background: 'rgba(200,245,81,0.07)',
        border: '1px solid rgba(200,245,81,0.18)',
        color: '#c8f551',
        flexShrink: 0,
      }}>
        <Icon size={20} />
      </div>

      {/* Text */}
      <div>
        <p style={{
          fontSize: '11px',
          color: 'var(--clr-text-3)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>
          {label}
        </p>
        {href ? (
          <a
            href={href}
            style={{
              fontSize: '15px', fontWeight: 600,
              color: 'var(--clr-text)',
              transition: 'color var(--t-fast)',
              wordBreak: 'break-all',
            }}
            onMouseEnter={(e) => e.target.style.color = '#c8f551'}
            onMouseLeave={(e) => e.target.style.color = 'var(--clr-text)'}
          >
            {value}
          </a>
        ) : (
          <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--clr-text)' }}>
            {value}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Social Link ──────────────────────────────────────────
const SOCIALS = [
  { icon: Github,   href: 'https://github.com/Abdullahhosny58', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com',               label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com',                label: 'Twitter' },
]

// ─── Contact Section ──────────────────────────────────────
export function Contact() {
  const { t } = useTranslation()

  const infoItems = [
    {
      icon: Mail,
      label: t('contact.info.email_label'),
      value: t('contact.info.email'),
      href: 'mailto:' + t('contact.info.email'),
    },
    {
      icon: MapPin,
      label: t('contact.info.location_label'),
      value: t('contact.info.location'),
      href: null,
    },
    {
      icon: CheckCircle,
      label: t('contact.info.availability_label'),
      value: t('contact.info.availability'),
      href: null,
    },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          align="center"
        />

        {/* Info Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '16px',
          marginBottom: '48px',
          maxWidth: '860px',
          marginInline: 'auto',
        }}>
          {infoItems.map((item, i) => (
            <InfoCard key={item.label} {...item} index={i} />
          ))}
        </div>

        {/* Bottom row — social + CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {SOCIALS.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.3, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--clr-border)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--clr-text-3)',
                  transition: 'all var(--t-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#c8f551'
                  e.currentTarget.style.borderColor = 'rgba(200,245,81,0.35)'
                  e.currentTarget.style.background = 'rgba(200,245,81,0.07)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--clr-text-3)'
                  e.currentTarget.style.borderColor = 'var(--clr-border)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* CV download */}
          <MagneticButton strength={0.25}>
            <motion.a
              href="/cv-en.pdf"
              download="Abdullah-Hosny-CV.pdf"
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 32px',
                borderRadius: 'var(--r-md)',
                background: 'transparent',
                color: 'var(--clr-text)',
                fontSize: '14px', fontWeight: 500,
                border: '1px solid var(--clr-border-2)',
                transition: 'all var(--t-normal)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(200,245,81,0.45)'
                e.currentTarget.style.color = '#c8f551'
                e.currentTarget.style.background = 'rgba(200,245,81,0.06)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(200,245,81,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--clr-border-2)'
                e.currentTarget.style.color = 'var(--clr-text)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Download size={15} />
              {t('cv.download')}
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
