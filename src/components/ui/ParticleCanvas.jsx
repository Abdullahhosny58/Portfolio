import { useEffect, useRef } from 'react'

export function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let W = 0, H = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const makeParticle = () => {
      const x = Math.random() * W
      const y = Math.random() * H
      return {
        x, y,
        bx: x, by: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.45 + 0.15,
      }
    }

    const init = () => {
      const count = Math.min(130, Math.floor((W * H) / 9000))
      particles = Array.from({ length: count }, makeParticle)
    }

    const CONNECT_DIST = 110
    const MOUSE_DIST = 140
    const REPEL_DIST = 110

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // mouse repulsion
        const dxm = mx - p.x
        const dym = my - p.y
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < REPEL_DIST && dm > 0) {
          const f = (REPEL_DIST - dm) / REPEL_DIST
          p.vx -= (dxm / dm) * f * 1.2
          p.vy -= (dym / dm) * f * 1.2
        }

        // spring back to base
        p.vx += (p.bx - p.x) * 0.0018
        p.vy += (p.by - p.y) * 0.0018
        p.vx *= 0.94
        p.vy *= 0.94
        p.x += p.vx
        p.y += p.vy

        // dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200,245,81,' + p.alpha + ')'
        ctx.fill()

        // particle-to-particle lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = 'rgba(200,245,81,' + ((1 - d / CONNECT_DIST) * 0.18) + ')'
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // particle-to-mouse lines
        if (dm < MOUSE_DIST && dm > 0) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = 'rgba(129,140,248,' + ((1 - dm / MOUSE_DIST) * 0.45) + ')'
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => { resize(); init() }, 150)
    }

    resize()
    init()
    draw()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default ParticleCanvas
