import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Download, ExternalLink, Github, Linkedin, Twitter, MapPin, Zap } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { MagneticButton } from '../components/ui/MagneticButton'

// ─── Scramble Text ────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

function ScrambleText({ text, delay = 0, className, style }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    // Start with empty string — prevent flash of random chars before delay
    setDisplay('')
    let rafId
    let timerRef

    timerRef = setTimeout(() => {
      let frame = 0
      const totalFrames = 32

      const animate = () => {
        frame++
        const progress = Math.min(frame / totalFrames, 1)

        const next = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            // Each char locks in once progress passes its position threshold
            if (progress > i / text.length) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        setDisplay(next)

        if (progress < 1) {
          rafId = requestAnimationFrame(animate)
        } else {
          setDisplay(text)
        }
      }

      rafId = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      clearTimeout(timerRef)
      cancelAnimationFrame(rafId)
    }
  }, [text, delay])

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {display}
    </span>
  )
}

// Ticker items — duplicated for seamless loop
const TICKER_ITEMS = [
  'React.js', 'Next.js', 'TypeScript', 'Framer Motion',
  'GSAP', 'Tailwind CSS', 'Node.js', 'MongoDB',
  'Figma', 'UI / UX', 'REST APIs', 'Redux',
]

function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="ticker-strip"
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        paddingBlock: '18px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(to top, rgba(5,8,22,0.6), transparent)',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '20px',
              paddingInline: '20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--clr-text-3)',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {item}
            <span style={{
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: 'var(--clr-accent-light)',
              opacity: 0.4,
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Ripple factory — attaches expanding ring at click position ──
function createRipple(e, color = 'rgba(255,255,255,0.22)') {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2.4
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  const span = document.createElement('span')
  span.style.cssText = [
    'position:absolute',
    'border-radius:50%',
    `background:${color}`,
    `width:${size}px`,
    `height:${size}px`,
    `left:${x}px`,
    `top:${y}px`,
    'pointer-events:none',
    'animation:ripple-wave 0.65s ease-out forwards',
  ].join(';')

  el.appendChild(span)
  setTimeout(() => span.remove(), 700)
}

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

  // ── Parallax depth layers ──────────────────────
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  // Orbs drift at different speeds — creates depth
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const orbY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  // Content scrolls up slightly faster than default
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

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
      ref={sectionRef}
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
        {/* Orb 1 — top-left — parallax layer A (slow) */}
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
            y: orbY1,
          }}
        />
        {/* Orb 2 — bottom-right — parallax layer B (medium) */}
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
            y: orbY2,
          }}
        />
        {/* Orb 3 — center-right — parallax layer C (fast) */}
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
            y: orbY3,
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

      {/* ── Content — parallax layer (slowest) ──── */}
      <motion.div
        className="container"
        style={{ position: 'relative', zIndex: 1, textAlign: isRTL ? 'right' : 'left', y: contentY }}
      >
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

          {/* Name — Scramble reveal */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.25 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7vw, 88px)',
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              marginBottom: '8px',
              color: 'var(--clr-text)',
            }}
          >
            <ScrambleText
              text={t('hero.name').toUpperCase()}
              delay={0.3}
              style={{ color: 'var(--clr-accent)' }}
            />
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

          {/* CTA Buttons — magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="hero-cta-row"
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}
          >
            <MagneticButton strength={0.3}>
              <motion.a
                href="#projects"
                whileTap={{ scale: 0.96 }}
                onClick={(e) => createRipple(e, 'rgba(8,8,8,0.18)')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px',
                  borderRadius: 'var(--r-md)',
                  background: '#c8f551',
                  color: '#080808',
                  fontSize: '15px', fontWeight: 700,
                  boxShadow: '0 6px 28px rgba(200,245,81,0.25)',
                  transition: 'box-shadow var(--t-normal), background var(--t-normal)',
                  letterSpacing: '0.01em',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#d4fa6a'
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(200,245,81,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#c8f551'
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(200,245,81,0.25)'
                }}
              >
                <ExternalLink size={16} />
                {t('hero.cta_projects')}
              </motion.a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <motion.a
                href="/cv-en.pdf"
                download
                whileTap={{ scale: 0.96 }}
                onClick={(e) => createRipple(e, 'rgba(200,245,81,0.18)')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px',
                  borderRadius: 'var(--r-md)',
                  background: 'transparent',
                  color: 'var(--clr-text)',
                  fontSize: '15px', fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'all var(--t-normal)',
                  letterSpacing: '0.01em',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(200,245,81,0.4)'
                  e.currentTarget.style.color = '#c8f551'
                  e.currentTarget.style.background = 'rgba(200,245,81,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.color = 'var(--clr-text)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Download size={16} />
                {t('hero.cta_cv')}
              </motion.a>
            </MagneticButton>
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
                  e.currentTarget.style.background = 'rgba(200,245,81,0.08)'
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
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '76px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
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

      {/* Ticker strip */}
      <TickerStrip />
    </section>
  )
}

export default Hero
