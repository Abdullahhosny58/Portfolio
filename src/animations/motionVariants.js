/* ===================================================
   PORTFOLIO — FRAMER MOTION VARIANTS
   =================================================== */

// ─── Fade Up (section entry) ──────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Fade In ──────────────────────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: 'easeOut',
    },
  }),
}

// ─── Slide In Left ────────────────────────────────
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Slide In Right ───────────────────────────────
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Scale In ─────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.08,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

// ─── Stagger Container ────────────────────────────
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// ─── Stagger Item ─────────────────────────────────
export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── Card Hover ───────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// ─── Button Hover ─────────────────────────────────
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
  tap:  { scale: 0.96 },
}

// ─── Navbar ───────────────────────────────────────
export const navbarVariants = {
  top: {
    backgroundColor: 'rgba(8, 8, 8, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255,255,255,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(8, 8, 8, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
}

// ─── Curtain Line Reveal (Motto-style) ────────────
// Wrap element in overflow-hidden, animate from y:101% → y:0
export const lineReveal = {
  hidden: { y: '101%' },
  visible: (custom = 0) => ({
    y: '0%',
    transition: {
      duration: 0.8,
      delay: custom * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Clip-path curtain (left to right) ────────────
export const curtainReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: (custom = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 0.9,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

// ─── Mobile Menu ──────────────────────────────────
export const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    pointerEvents: 'none',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  open: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ─── Section Heading ──────────────────────────────
export const headingReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Skill Bar Fill ───────────────────────────────
export const barFill = (level) => ({
  hidden: { width: 0 },
  visible: {
    width: `${level}%`,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  },
})

// ─── Pentagram Reveal ─────────────────────────────
// Clean translateY + opacity, Pentagram's signature easing
export const pentagramReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Pentagram Stagger Container ──────────────────
export const pentagramStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

// ─── Pentagram Stagger Item ───────────────────────
export const pentagramStaggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Pentagram Image Reveal ───────────────────────
// Scale from 1.05 + clip-path reveal for section images
export const pentagramImageReveal = {
  hidden: { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
