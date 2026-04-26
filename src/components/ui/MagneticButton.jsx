import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton — wraps any child element with a magnetic hover effect.
 * The element drifts toward the cursor when hovered, springs back on leave.
 *
 * Props:
 *   strength  — how far the element moves (default 0.35)
 *   children  — the button/link to wrap
 *   className — forwarded to outer div
 *   style     — forwarded to outer div
 */
export function MagneticButton({ children, strength = 0.35, className, style }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  const onMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block', ...style, x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton
