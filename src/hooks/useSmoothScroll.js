import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Handle anchor link clicks
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      e.preventDefault()
      const id = target.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (el) lenis.scrollTo(el, { offset: -80 })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      gsap.ticker.remove(lenis.raf)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
}
