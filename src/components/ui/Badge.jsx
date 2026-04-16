import { motion } from 'framer-motion'

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: 'var(--r-full)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  default: {
    background: 'rgba(99, 102, 241, 0.12)',
    color: 'var(--clr-accent-light)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
  },
  teal: {
    background: 'rgba(20, 184, 166, 0.12)',
    color: 'var(--clr-teal-light)',
    border: '1px solid rgba(20, 184, 166, 0.25)',
  },
  violet: {
    background: 'rgba(167, 139, 250, 0.12)',
    color: 'var(--clr-violet)',
    border: '1px solid rgba(167, 139, 250, 0.25)',
  },
  neutral: {
    background: 'rgba(255, 255, 255, 0.06)',
    color: 'var(--clr-text-2)',
    border: '1px solid var(--clr-border)',
  },
  tag: {
    background: 'rgba(255, 255, 255, 0.04)',
    color: 'var(--clr-text-3)',
    border: '1px solid var(--clr-border)',
    fontSize: '10px',
    padding: '3px 8px',
  },
}

export function Badge({ children, variant = 'default', style: extra = {}, dot, animate = false }) {
  const computedStyle = {
    ...styles.base,
    ...styles[variant],
    ...extra,
  }

  if (animate) {
    return (
      <motion.span
        style={computedStyle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      >
        {dot && (
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'currentColor', flexShrink: 0,
            animation: 'glow-pulse 2s ease-in-out infinite',
          }} />
        )}
        {children}
      </motion.span>
    )
  }

  return (
    <span style={computedStyle}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'currentColor', flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  )
}

export default Badge
