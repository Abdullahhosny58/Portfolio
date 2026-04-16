import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const target = useRef({ x: -300, y: -300 })
  const outer  = useRef({ x: -300, y: -300 })
  const inner  = useRef({ x: -300, y: -300 })

  useEffect(() => {
    const onMove = (e) => { target.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const animate = () => {
      // outer blob — slow lerp
      outer.current.x += (target.current.x - outer.current.x) * 0.06
      outer.current.y += (target.current.y - outer.current.y) * 0.06
      // inner dot — fast lerp
      inner.current.x += (target.current.x - inner.current.x) * 0.18
      inner.current.y += (target.current.y - inner.current.y) * 0.18

      if (outerRef.current) {
        outerRef.current.style.transform =
          'translate(' + (outer.current.x - 250) + 'px,' + (outer.current.y - 250) + 'px)'
      }
      if (innerRef.current) {
        innerRef.current.style.transform =
          'translate(' + (inner.current.x - 4) + 'px,' + (inner.current.y - 4) + 'px)'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* large soft glow blob */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform',
        }}
      />
      {/* small crisp dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'rgba(129,140,248,0.6)',
          boxShadow: '0 0 12px 3px rgba(99,102,241,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default CursorGlow
