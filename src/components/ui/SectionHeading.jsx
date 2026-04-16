import { motion } from 'framer-motion'
import { Badge } from './Badge'

export function SectionHeading({ label, title, subtitle, align = 'left', style: extra = {} }) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '56px',
        ...extra,
      }}
    >
      {/* Label Badge */}
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: isCenter ? 'center' : 'flex-start',
          marginBottom: '16px',
        }}>
          <Badge variant="teal" animate>
            <span style={{ fontSize: '8px', marginInlineEnd: '4px' }}>◈</span>
            {label}
          </Badge>
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: 'var(--clr-text)',
          marginBottom: subtitle ? '16px' : 0,
          maxWidth: isCenter ? '600px' : 'none',
          margin: subtitle
            ? `0 ${isCenter ? 'auto' : '0'} 16px`
            : `0 ${isCenter ? 'auto' : '0'} 0`,
        }}
      >
        {title}
      </h2>

      {/* Accent line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: isCenter ? '60px' : '48px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: '3px',
          background: 'var(--grad-accent)',
          borderRadius: 'var(--r-full)',
          margin: subtitle ? `0 ${isCenter ? 'auto' : '0'} 20px` : `12px ${isCenter ? 'auto' : '0'} 0`,
          overflow: 'hidden',
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 1.8vw, 17px)',
          color: 'var(--clr-text-2)',
          lineHeight: 1.7,
          maxWidth: isCenter ? '520px' : '540px',
          margin: isCenter ? '0 auto' : '0',
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading
