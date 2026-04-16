import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Twitter, MapPin, Zap } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

const socialLinks = [
  { icon: Github,   href: 'https://github.com/Abdullahhosny58', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com',               label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com',                label: 'Twitter' },
]

function TypewriterText({ texts, speed = 90, pause = 2200 }) {
  const [display, setDisplay] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!texts?.length) return
    const current = texts[textIndex]
    let timeout

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2.2)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex((i) => (i + 1) % texts.length)
    }

    setDisplay(current?.slice(0, charIndex) ?? '')
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block', width: '2px', height: '1em',
        background: 'var(--clr-accent-light)', marginInlineStart: '3px',
        verticalAlign: 'text-bottom',
        animation: 'cursor-blink 0.9s step-end infinite',
      }} aria-hidden />
    </span>
  )
}

export function Hero() {
  const { t, i18n } = useTranslation()
  const roles = t('hero.roles', { returnObjects: true })
  const isRTL = i18n.language === 'ar'

  // Floating orbs animation stagger
  const orbVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, delay: i * 0.2, ease: 'easeOut' },
    }),
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* ── Background Orbs ──────────────────────── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {/* Orb 1 — top-left */}
        <motion.div
          custom={0}
          variants={orbVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            top: '-10%', left: '-8%',
            width: 'clamp(400px, 55vw, 800px)',
            height: 'clamp(400px, 55vw, 800px)',
            background: 'var(--grad-hero-orb-1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float-1 18s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Orb 2 — bottom-right */}
        <motion.div
          custom={1}
          variants={orbVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            bottom: '0%', right: '-5%',
            width: 'clamp(300px, 45vw, 600px)',
            height: 'clamp(300px, 45vw, 600px)',
            background: 'var(--grad-hero-orb-2)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float-2 22s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Orb 3 — center-right */}
        <motion.div
          custom={2}
          variants={orbVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            top: '30%', right: '15%',
            width: 'clamp(200px, 30vw, 400px)',
            height: 'clamp(200px, 30vw, 400px)',
            background: 'var(--grad-hero-orb-3)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float-3 14s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
        }} />
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: isRTL ? 'right' : 'left' }}>
        <div style={{
          maxWidth: '820px',
          marginInlineStart: isRTL ? 'auto' : '0',
        }}>
          {/* Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}
          >
            <Badge variant="default" dot animate>
              <Zap size={10} />
              {t('hero.available')}
            </Badge>
            <Badge variant="neutral" animate>
              <MapPin size={10} />
              {t('hero.location')}
            </Badge>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: 'var(--clr-teal)',
              letterSpacing: '0.06em',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{
              width: 32, height: 1,
              background: 'var(--clr-teal)',
              display: 'inline-block', flexShrink: 0,
            }} />
            {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7vw, 88px)',
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              marginBottom: '8px',
            }}
          >
            <span className="gradient-text">{t('hero.name')}</span>
          </motion.h1>

          {/* Role — Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3.5vw, 36px)',
              fontWeight: 600,
              color: 'var(--clr-text-2)',
              marginBottom: '28px',
              minHeight: '1.4em',
            }}
          >
            <TypewriterText texts={Array.isArray(roles) ? roles : []} />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'var(--clr-text-2)',
              lineHeight: 1.7,
              maxWidth: '540px',
              marginBottom: '40px',
            }}
          >
            {t('hero.bio')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px',
                borderRadius: 'var(--r-md)',
                background: 'var(--grad-accent)',
                color: '#fff',
                fontSize: '15px', fontWeight: 600,
                boxShadow: '0 6px 28px rgba(99,102,241,0.4)',
                transition: 'box-shadow var(--t-normal)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 40px rgba(99,102,241,0.55)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 6px 28px rgba(99,102,241,0.4)'}
            >
              <ExternalLink size={16} />
              {t('hero.cta_projects')}
            </motion.a>

            <motion.a
              href="/cv-en.pdf"
              download
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px',
                borderRadius: 'var(--r-md)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--clr-text)',
                fontSize: '15px', fontWeight: 500,
                border: '1px solid var(--clr-border-2)',
                backdropFilter: 'blur(8px)',
                transition: 'all var(--t-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--clr-border-2)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
            >
              <Download size={16} />
              {t('hero.cta_cv')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{
              fontSize: '12px', color: 'var(--clr-text-3)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
            }}>
              Follow
            </span>
            <div style={{
              width: 24, height: 1,
              background: 'var(--clr-border-2)',
              display: 'inline-block',
            }} />
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.07, duration: 0.3, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--clr-border)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--clr-text-3)',
                  transition: 'all var(--t-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--clr-text)'
                  e.currentTarget.style.borderColor = 'var(--clr-border-2)'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--clr-text-3)'
                  e.currentTarget.style.borderColor = 'var(--clr-border)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1,
        }}
      >
        <span style={{
          fontSize: '10px', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--clr-text-3)',
          fontFamily: 'var(--font-mono)',
        }}>
          {t('hero.scroll')}
        </span>
        <div style={{
          width: 28, height: 44,
          border: '1.5px solid var(--clr-border-2)',
          borderRadius: 'var(--r-full)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px',
        }}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 5, height: 5,
              borderRadius: '50%',
              background: 'var(--clr-accent-light)',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
