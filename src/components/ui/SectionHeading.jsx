import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from './Badge'

/**
 * SectionHeading — Motto-style line mask reveal.
 * The title slides up from behind an overflow:hidden clip.
 * The accent underline draws in after the title settles.
 */
export function SectionHeading({ label, title, subtitle, align = 'left', index, style: extra = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isCenter = align === 'center'

  return (
    <div
      ref={ref}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '56px',
        position: 'relative',
        ...extra,
      }}
    >
      {/* Section index number — Pentagram style */}
      {index && !isCenter && (
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            insetInlineEnd: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--clr-text-3)',
            letterSpacing: '0.12em',
          }}
        >
          {index}
        </motion.span>
      )}

      {/* Label Badge */}
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: isCenter ? 'center' : 'flex-start',
            marginBottom: '16px',
          }}
        >
          <Badge variant="teal" animate>
            <span style={{ fontSize: '8px', marginInlineEnd: '4px' }}>◈</span>
            {label}
          </Badge>
        </motion.div>
      )}

      {/* Title — line mask reveal (Motto technique) */}
      <div style={{ overflow: 'hidden', display: 'block', paddingBottom: '4px' }}>
        <motion.h2
          initial={{ y: '105%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.75, delay: label ? 0.1 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--clr-text)',
            margin: subtitle
              ? `0 ${isCenter ? 'auto' : '0'} 16px`
              : `0 ${isCenter ? 'auto' : '0'} 0`,
            maxWidth: isCenter ? '600px' : 'none',
          }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Accent line — draws in after title */}
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: isCenter ? '60px' : '40px' } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: '2px',
          background: '#c8f551',
          borderRadius: 'var(--r-full)',
          margin: subtitle
            ? `0 ${isCenter ? 'auto' : '0'} 20px`
            : `10px ${isCenter ? 'auto' : '0'} 0`,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            color: 'var(--clr-text-2)',
            lineHeight: 1.7,
            maxWidth: isCenter ? '520px' : '540px',
            margin: isCenter ? '0 auto' : '0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeading
