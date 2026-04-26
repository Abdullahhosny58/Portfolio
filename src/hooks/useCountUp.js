import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCountUp — animates a number from 0 to `target` when the ref
 * element scrolls into view. Uses GSAP for smooth easing.
 *
 * Usage:
 *   const { ref, display } = useCountUp(50, { suffix: '+', duration: 1.8 })
 *   return <span ref={ref}>{display}</span>
 *
 * Options:
 *   duration  — animation duration in seconds (default 1.8)
 *   suffix    — appended after number e.g. '+', '%', 'k' (default '')
 *   prefix    — prepended before number e.g. '$' (default '')
 *   decimals  — decimal places (default 0)
 *   start     — ScrollTrigger start (default 'top 85%')
 */
export function useCountUp(target, options = {}) {
  const {
    duration = 1.8,
    suffix = '',
    prefix = '',
    decimals = 0,
    start = 'top 85%',
  } = options

  const ref = useRef(null)
  const [display, setDisplay] = useState(`${prefix}0${suffix}`)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Extract numeric value from target (handles "3+", "50+", "20+")
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    if (isNaN(numeric)) { setDisplay(String(target)); return }

    // Keep original suffix (e.g. "+" from "50+") + custom suffix
    const originalSuffix = String(target).replace(/[0-9.]/g, '')
    const fullSuffix = originalSuffix + suffix

    const obj = { value: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    })

    tl.to(obj, {
      value: numeric,
      duration,
      ease: 'power2.out',
      onUpdate() {
        const v = decimals > 0
          ? obj.value.toFixed(decimals)
          : Math.round(obj.value)
        setDisplay(`${prefix}${v}${fullSuffix}`)
      },
      onComplete() {
        setDisplay(`${prefix}${numeric}${fullSuffix}`)
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill()
      })
    }
  }, [target, duration, suffix, prefix, decimals, start])

  return { ref, display }
}
