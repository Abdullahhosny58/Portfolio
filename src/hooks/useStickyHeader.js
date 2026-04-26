import { useEffect, useRef, useState } from 'react'

/**
 * Pentagram-style sticky header:
 * - Always visible at top of page
 * - Hides when scrolling DOWN past 80px
 * - Shows again when scrolling UP
 */
export function useStickyHeader() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY

      if (current < 80) {
        // Always show near the top
        setHidden(false)
      } else {
        // Hide going down, show going up
        setHidden(current > lastScrollY.current)
      }

      lastScrollY.current = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}

export default useStickyHeader
