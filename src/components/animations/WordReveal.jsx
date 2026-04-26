import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * WordReveal — Motto-style GSAP word-by-word scroll reveal.
 *
 * Splits text into individual word spans, then staggers them
 * from opacity:0 + y:24 → opacity:1 + y:0 as the element
 * enters the viewport.
 *
 * Props:
 *   text      — the string to animate
 *   as        — HTML tag to render (default 'p')
 *   delay     — extra delay in seconds before stagger starts (default 0)
 *   stagger   — seconds between each word (default 0.04)
 *   start     — ScrollTrigger start position (default 'top 85%')
 *   className — CSS class on the container
 *   style     — inline styles on the container
 */
export function WordReveal({
  text,
  as: Tag = 'p',
  delay = 0,
  stagger = 0.04,
  start = 'top 85%',
  className,
  style,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !text) return

    // Split into word spans
    const words = text.split(' ')
    container.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.28em"><span class="word" style="display:inline-block;will-change:transform">${word}</span></span>`
      )
      .join('')

    const wordEls = container.querySelectorAll('.word')

    gsap.set(wordEls, { y: '105%', opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    })

    tl.to(wordEls, {
      y: '0%',
      opacity: 1,
      duration: 0.65,
      stagger,
      delay,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill()
      })
    }
  }, [text, delay, stagger, start])

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ lineHeight: 1.8, ...style }}
    />
  )
}

export default WordReveal
