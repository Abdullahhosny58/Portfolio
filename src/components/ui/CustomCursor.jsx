import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor
 * - Small precise dot follows cursor exactly
 * - Larger ring follows with spring delay (Motto-style)
 * - Ring expands + fills on hover over links/buttons
 * - Hides on touch devices
 */
export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ring follows with spring — creates the lag/trail effect
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 })

  useEffect(() => {
    // Detect touch — don't show on mobile
    if (window.matchMedia('(hover: none)').matches) return

    document.body.classList.add('has-custom-cursor')
    setVisible(true)

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onEnter = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, .swiper')
      ) {
        setHovering(true)
      }
    }

    const onLeave = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, .swiper')
      ) {
        setHovering(false)
      }
    }

    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onHide  = () => setVisible(false)
    const onShow  = () => setVisible(true)

    window.addEventListener('mousemove',   onMove)
    window.addEventListener('mouseover',   onEnter)
    window.addEventListener('mouseout',    onLeave)
    window.addEventListener('mousedown',   onDown)
    window.addEventListener('mouseup',     onUp)
    document.addEventListener('mouseleave', onHide)
    document.addEventListener('mouseenter', onShow)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove',   onMove)
      window.removeEventListener('mouseover',   onEnter)
      window.removeEventListener('mouseout',    onLeave)
      window.removeEventListener('mousedown',   onDown)
      window.removeEventListener('mouseup',     onUp)
      document.removeEventListener('mouseleave', onHide)
      document.removeEventListener('mouseenter', onShow)
    }
  }, [mouseX, mouseY])

  if (!visible) return null

  return (
    <>
      {/* ── Precise dot ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width:  hovering ? 6 : clicking ? 3 : 5,
            height: hovering ? 6 : clicking ? 3 : 5,
            background: hovering ? '#080808' : '#c8f551',
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          style={{
            borderRadius: '50%',
            background: '#c8f551',
          }}
        />
      </motion.div>

      {/* ── Trailing ring ── */}
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width:       hovering ? 44 : clicking ? 24 : 32,
            height:      hovering ? 44 : clicking ? 24 : 32,
            background:  hovering ? 'rgba(200,245,81,0.9)' : 'transparent',
            borderColor: hovering ? 'rgba(200,245,81,0)' : 'rgba(200,245,81,0.5)',
            borderWidth: hovering ? 0 : clicking ? 1.5 : 1,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(200,245,81,0.5)',
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>
    </>
  )
}

export default CustomCursor
