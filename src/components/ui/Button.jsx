import { motion } from 'framer-motion'

const styles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: 1,
    borderRadius: 'var(--r-md)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--t-normal)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    outline: 'none',
    padding: '12px 24px',
  },
  primary: {
    background: '#c8f551',
    color: '#080808',
    boxShadow: '0 4px 24px rgba(200,245,81,0.25)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--clr-text)',
    border: '1px solid var(--clr-border-2)',
    backdropFilter: 'blur(8px)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--clr-text-2)',
    padding: '8px 16px',
  },
  sm: { fontSize: '13px', padding: '8px 18px' },
  lg: { fontSize: '16px', padding: '15px 32px', borderRadius: 'var(--r-lg)' },
}

export function Button({
  children,
  variant = 'primary',
  size,
  as = 'button',
  href,
  onClick,
  style: extraStyle = {},
  disabled = false,
  ...props
}) {
  const Component = motion(as === 'a' ? 'a' : 'button')

  const computedStyle = {
    ...styles.base,
    ...styles[variant],
    ...(size && styles[size]),
    ...(disabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }),
    ...extraStyle,
  }

  return (
    <Component
      href={href}
      onClick={onClick}
      style={computedStyle}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
