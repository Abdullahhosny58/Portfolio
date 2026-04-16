import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal — Attaches a GSAP ScrollTrigger fade-up
 * to every element with [data-reveal] inside the ref container.
 *
 * @param {object} options
 * @param {number} options.y          - Starting Y offset (default 40)
 * @param {number} options.duration   - Animation duration (default 0.7)
 * @param {number} options.stagger    - Stagger between children (default 0.12)
 */
export function useScrollReveal({ y = 40, duration = 0.7, stagger = 0.12 } = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      const targets = container.querySelectorAll('[data-reveal]')

      if (targets.length === 0) {
        // Animate the container itself if no children have data-reveal
        gsap.from(container, {
          opacity: 0,
          y,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            once: true,
          },
        })
      } else {
        targets.forEach((el) => {
          const delay = parseFloat(el.dataset.delay || '0')
          gsap.from(el, {
            opacity: 0,
            y,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          })
        })
      }
    }, container)

    return () => ctx.revert()
  }, [y, duration, stagger])

  return containerRef
}

/**
 * useStaggerReveal — Reveals a list of children with stagger.
 */
export function useStaggerReveal({ y = 30, duration = 0.6, stagger = 0.08 } = {}) {
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      const items = list.children

      gsap.from(items, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          once: true,
        },
      })
    }, list)

    return () => ctx.revert()
  }, [y, duration, stagger])

  return listRef
}
