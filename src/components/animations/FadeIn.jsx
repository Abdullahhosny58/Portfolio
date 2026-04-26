import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * FadeIn — Pentagram-style scroll reveal wrapper.
 *
 * Props:
 *  delay     — seconds to delay the animation (default 0)
 *  direction — 'up' | 'down' | 'left' | 'right' | 'none' (default 'up')
 *  duration  — animation duration in seconds (default 0.65)
 *  once      — only animate once when entering viewport (default true)
 *  margin    — IntersectionObserver rootMargin (default '-60px')
 *  className — optional CSS class passed to the wrapper div
 *  style     — optional inline styles passed to the wrapper div
 *  as        — HTML tag or component to render instead of div
 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  once = true,
  margin = '-60px',
  className,
  style,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin })

  const offsets = {
    up:    { y: 32, x: 0 },
    down:  { y: -32, x: 0 },
    left:  { y: 0,  x: 40 },
    right: { y: 0,  x: -40 },
    none:  { y: 0,  x: 0 },
  }

  const { x, y } = offsets[direction] ?? offsets.up

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/**
 * FadeInGroup — stagger-reveals multiple children.
 *
 * Props:
 *  stagger   — seconds between each child (default 0.12)
 *  delay     — initial delay before first child (default 0.05)
 *  direction — passed to each FadeIn child (default 'up')
 */
export function FadeInGroup({
  children,
  stagger = 0.12,
  delay = 0.05,
  direction = 'up',
  className,
  style,
}) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <div className={className} style={style}>
      {items.map((child, i) => (
        <FadeIn
          key={i}
          delay={delay + i * stagger}
          direction={direction}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  )
}

export default FadeIn
