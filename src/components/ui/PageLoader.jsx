import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PageLoader — Motto-style full-screen intro overlay.
 * Shows a counter 0→100 then splits and exits, revealing the site.
 *
 * Automatically unmounts after exit animation completes.
 */
export function PageLoader({ onComplete }) {
  const [count, setCount]   = useState(0)
  const [exiting, setExiting] = useState(false)

  // Fast counter: 0→100 over ~1.4s
  useEffect(() => {
    let frame
    let start = null
    const duration = 1400

    const tick = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out so it slows near 100
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setCount(100)
        setTimeout(() => setExiting(true), 180)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Notify parent after exit
  const handleExitComplete = () => {
    onComplete?.()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: '#080808',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            padding: 'clamp(28px, 5vw, 60px)',
            overflow: 'hidden',
          }}
        >
          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background: '#c8f551',
              width: `${count}%`,
              transition: 'width 30ms linear',
            }}
          />

          {/* Counter */}
          <div style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(64px, 12vw, 140px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#c8f551',
            userSelect: 'none',
            tabularNums: 'tabular-nums',
          }}>
            {String(count).padStart(2, '0')}
          </div>

          {/* Label */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '8px',
          }}>
            Loading
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
