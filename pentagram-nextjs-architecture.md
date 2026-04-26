# Pentagram.com Clone — Next.js Architecture Plan
> خطة كاملة لبناء موقع مطابق لـ Pentagram.com بنفس الانيميشن والتصميم
> Ready to send directly to Claude for implementation

---

## 1. Tech Stack

| الطبقة | الاختيار | السبب |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + page transitions |
| Styling | Tailwind CSS v3 | نفس نظام التصميم الأصلي |
| Animations | GSAP + Framer Motion | Page transitions + scroll animations |
| Carousel | Swiper.js | نفس المكتبة الأصلية في الموقع |
| Page Transitions | Framer Motion `AnimatePresence` | بديل PJAX الأصلي |
| Images | Next.js Image + Imgix | Blur-up lazy loading |
| Fonts | Custom font scale (f-body, f-heading) | نفس system typography |
| State | Zustand | للـ filters والـ search state |

---

## 2. Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + providers
│   ├── page.tsx                # Homepage
│   ├── work/
│   │   ├── page.tsx            # Work grid page
│   │   └── [slug]/page.tsx     # Work detail page
│   ├── about/page.tsx
│   ├── news/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header (desktop)
│   │   ├── MobileNav.tsx       # Full-screen mobile overlay nav
│   │   ├── StickyTop.tsx       # Secondary sticky nav (scroll trigger)
│   │   └── Footer.tsx
│   │
│   ├── home/
│   │   ├── HeroCarousel.tsx    # Swiper hero + filter dropdowns
│   │   ├── FilterChips.tsx     # Discipline/Sector filter chips modal
│   │   ├── ThematicCarousel.tsx # Dark bg horizontal scroll section
│   │   └── WorkGrid.tsx        # Regular project grid
│   │
│   ├── ui/
│   │   ├── WorkCard.tsx        # Project card (aspect ratio + hover)
│   │   ├── SearchPanel.tsx     # Search overlay
│   │   ├── FilterDropdown.tsx  # Dropdown for discipline/sector
│   │   └── LazyImage.tsx       # Blur-up image component
│   │
│   └── animations/
│       ├── PageTransition.tsx  # Framer Motion page wrapper
│       ├── FadeIn.tsx          # Scroll reveal wrapper
│       └── useScrollReveal.ts  # Custom hook for reveal
│
├── hooks/
│   ├── useStickyHeader.ts      # Header scroll behavior
│   ├── useSearchPanel.ts       # Search open/close state
│   └── useMobileNav.ts         # Mobile nav toggle
│
├── lib/
│   ├── api.ts                  # Data fetching functions
│   └── types.ts                # TypeScript types
│
└── styles/
    ├── globals.css             # Tailwind + custom CSS variables
    └── typography.css          # f-body-1, f-heading-1 etc.
```

---

## 3. Design Tokens (CSS Variables)

```css
/* styles/globals.css */
:root {
  /* Colors */
  --color-primary: #000000;
  --color-secondary: #767676;
  --color-inverse: #ffffff;
  --color-dark: #1a1a1a;
  --color-chip-hover: #e0e0e0;

  /* Spacing — based on 8px grid */
  --gutter: 24px;
  --outer-gutter: 24px;
  --spacing-9: 72px;

  /* Typography scale */
  --f-heading-1: clamp(2rem, 4vw, 3.5rem);
  --f-heading-4: clamp(1.125rem, 2vw, 1.5rem);
  --f-body-1: 0.9375rem;    /* 15px */
  --f-body-2: 0.8125rem;    /* 13px */

  /* Animation */
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## 4. Animations — Technical Breakdown

### 4.1 Page Transitions (PJAX equivalent)
الموقع الأصلي يستخدم PJAX. في Next.js نستخدم Framer Motion AnimatePresence:

```tsx
// components/animations/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

export default function PageTransition({ children }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={variants} initial="initial" animate="enter" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4.2 Hero Carousel (Swiper with Fade + Autoplay)
```tsx
// components/home/HeroCarousel.tsx
// نفس الأصلي تماماً — swiper-container, swiper-slide, swiper-wrapper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'

<Swiper
  modules={[Autoplay, EffectFade]}
  effect="fade"
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  loop
  className="absolute inset-0 w-full h-full opacity-0"  // يبدأ invisible ثم JS يظهره
  onSwiper={(swiper) => gsap.to(swiper.el, { opacity: 1, duration: 0.6 })}
>
  {slides.map(slide => (
    <SwiperSlide key={slide.id}>
      <div className="relative w-full h-full">
        <Image src={slide.image} fill className="object-cover transition-all duration-300" />
        <div className="absolute bottom-0 left-0 p-outer-gutter text-inverse">
          <span className="f-body-1">{slide.title}</span>
          <span className="hidden sm:block f-body-1">{slide.description}</span>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
```

### 4.3 Sticky Header Animation
```tsx
// hooks/useStickyHeader.ts
// Header يختفي عند scroll لأسفل ويظهر عند scroll لفوق
import { useEffect, useRef, useState } from 'react'

export function useStickyHeader() {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setIsHidden(current > lastScrollY.current && current > 100)
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return isHidden
}

// في Header.tsx:
// className={`h-header fixed w-full z-300 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
```

### 4.4 Mobile Nav Overlay
```tsx
// components/layout/MobileNav.tsx
// نفس الأصلي: invisible opacity-0 → visible opacity-100 duration-300
<motion.div
  initial={{ opacity: 0, visibility: 'hidden' }}
  animate={isOpen ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}
  transition={{ duration: 0.3 }}
  className="fixed inset-0 w-full h-full bg-inverse z-[1350] overflow-y-auto"
>
  {/* nav content */}
</motion.div>
```

### 4.5 Image Blur-up Loading (نفس الأصلي بالضبط)
الأصلي يستخدم inline blurred placeholder ثم lazy load. في Next.js:
```tsx
// components/ui/LazyImage.tsx
<Image
  src={src}
  placeholder="blur"
  blurDataURL={generateBlurDataURL(src)}  // نفس فكرة imgix blur
  className="transition-opacity duration-300 object-cover w-full h-full"
/>
```

### 4.6 Thematic Carousel (Horizontal Scroll Cards)
```tsx
// components/home/ThematicCarousel.tsx
// Dark bg section, cards scroll horizontally, Flickity-style
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'

<section className="bg-dark pb-48 md:pb-64 pt-32 md:pt-48 overflow-hidden">
  <div className="container">
    <h3 className="f-heading-1 text-inverse">{title}</h3>
  </div>
  <Swiper
    modules={[FreeMode]}
    freeMode
    slidesPerView="auto"
    spaceBetween={16}
    className="mt-32 md:mt-48 lg:mt-64 pl-outer-gutter"
  >
    {cards.map(card => (
      <SwiperSlide key={card.slug} className="w-auto !flex-shrink-0">
        <div className="group w-[calc(3_*_var(--col))]">
          <a href={card.url}>
            <picture className="block aspect-[5/7] relative overflow-hidden">
              <Image src={card.image} fill className="transition-opacity duration-300 object-cover" />
            </picture>
            <h4 className="f-body-1 text-inverse mt-8 group-hover:underline">{card.title}</h4>
            <span className="f-body-2 text-secondary">{card.text}</span>
          </a>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
```

### 4.7 Work Card Hover Effect
```tsx
// components/ui/WorkCard.tsx
// Hover: image scale up subtle + title underline
<div className="group">
  <a href={`/work/${slug}`}>
    <div className={`relative overflow-hidden aspect-[${ratio}]`}>
      <Image
        src={image}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <h3 className="f-body-1 mt-8 group-hover:underline underline-offset-2">{title}</h3>
  </a>
</div>
```

### 4.8 Filter Animation (Carousel + Chips)
الـ filter bar يستخدم dropdown مع chevron rotate animation:
```tsx
// حين تفتح الـ dropdown
<button onClick={toggle} className="inline-flex items-center">
  <span>{activeFilter}</span>
  <svg className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
    {/* caret icon */}
  </svg>
</button>

// الـ chips تظهر مع fade + slide up
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
>
  {/* chips */}
</motion.div>
```

### 4.9 Search Panel Overlay
```tsx
// Search يفتح من الـ top مع slide down
<motion.div
  initial={{ y: '-100%', opacity: 0 }}
  animate={isOpen ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 }}
  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="fixed top-0 left-0 w-full bg-inverse z-[900] shadow-lg"
>
  <form className="container py-20">
    <input placeholder="Find work by sector, discipline, location, year" />
  </form>
</motion.div>
```

### 4.10 Scroll Reveal (FadeIn on Scroll)
```tsx
// components/animations/FadeIn.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 5. Tailwind Config — Column System

الموقع يستخدم custom column widths مثل `w-3-col-adjusted`, `w-6-cols-vw`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'outer-gutter': '24px',
        'gutter': '16px',
        'header': '60px',
        'spacing-9': '72px',
      },
      maxWidth: {
        'site': '1728px',
      },
      aspectRatio: {
        '7/3': '7 / 3',
        '5/7': '5 / 7',
        '3/2': '3 / 2',
        '3/4': '3 / 4',
      },
      zIndex: {
        '305': '305',
        '900': '900',
        '1350': '1350',
        '1351': '1351',
      },
      // Custom column widths (based on 12-col grid)
      width: {
        'col-3': 'calc((100vw - 2 * 24px - 2 * 16px) / 4)',
        'col-4': 'calc((100vw - 2 * 24px - 3 * 16px) / 3)',
        'col-6': 'calc((100vw - 2 * 24px - 5 * 16px) / 2)',
      }
    }
  }
}
```

---

## 6. Typography System

```css
/* styles/typography.css */
.f-heading-1 { font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.1; letter-spacing: -0.02em; font-weight: 400; }
.f-heading-4 { font-size: clamp(1.125rem, 2vw, 1.5rem); line-height: 1.2; font-weight: 400; }
.f-body-1    { font-size: 0.9375rem; line-height: 1.5; }
.f-body-2    { font-size: 0.8125rem; line-height: 1.4; }
```

---

## 7. Page Sections — Build Order

### الـ Homepage تتكون من هذه الـ sections بالترتيب:

1. `<Header>` — sticky، يختفي عند scroll لأسفل
2. `<MobileNav>` — full-screen overlay، z-index عالي
3. `<StickyTop>` — يظهر بعد scroll 200px
4. `<SearchPanel>` — overlay، يفتح من الأعلى
5. `<HeroCarousel>` — Swiper full-width، aspect `7/3` على desktop، `3/4` على موبايل
6. `<FilterBar>` — discipline/sector dropdowns + chip filters
7. `<ThematicCarousel>` × N — كل واحد section مستقلة dark bg
8. `<WorkGrid>` — grid عادي، responsive
9. `<NewsSection>` — grid `2/3/4` columns
10. `<Footer>`

---

## 8. Data Structure (TypeScript Types)

```typescript
// lib/types.ts

interface WorkItem {
  id: number
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  ratio: '5/7' | '3/2' | '7/3'
  discipline: string[]
  sector: string[]
  link: string
}

interface ThematicSection {
  title: string
  text: string
  cta?: string
  setKey: number
  items: WorkItem[]
}

interface FilterOption {
  label: string
  value: string
  type: 'discipline' | 'sector'
}
```

---

## 9. Dependencies List

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0",
    "swiper": "^11.0.0",
    "zustand": "^4.5.0",
    "@next/font": "^14.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}
```

---

## 10. Implementation Order (للـ Claude)

```
Phase 1 — Setup
1. npx create-next-app@latest pentagram-clone --typescript --tailwind --app
2. Install: framer-motion gsap swiper zustand
3. Configure tailwind.config.js (spacing, aspectRatio, zIndex, maxWidth)
4. Create styles/typography.css + import in globals.css
5. Create styles/globals.css with all CSS variables

Phase 2 — Layout
6. Build Header.tsx with useStickyHeader hook
7. Build MobileNav.tsx with Framer Motion overlay
8. Build StickyTop.tsx (appears after scroll)
9. Build SearchPanel.tsx with slide-down animation
10. Build Footer.tsx
11. Wire layout.tsx with PageTransition wrapper

Phase 3 — Homepage Sections
12. Build HeroCarousel.tsx (Swiper + fade effect + blur-up images)
13. Build FilterBar.tsx (dropdowns with chevron rotation + chip modal)
14. Build ThematicCarousel.tsx (dark bg + Swiper freeMode horizontal)
15. Build WorkCard.tsx (hover scale + underline)
16. Build WorkGrid.tsx (responsive grid)
17. Build FadeIn.tsx scroll reveal wrapper

Phase 4 — Pages
18. Wire homepage page.tsx
19. Build work/page.tsx
20. Build work/[slug]/page.tsx
21. Build about, news, contact pages

Phase 5 — Polish
22. Add all Framer Motion page transitions
23. Test scroll animations with useInView
24. Add responsive breakpoints (sm/md/lg)
25. Performance: Next/Image optimization, lazy loading
```

---

## 11. Key Animation Summary (للـ Reference السريع)

| Animation | Library | Trigger | Duration |
|---|---|---|---|
| Hero image fade | CSS Transition | Auto | 300ms |
| Hero carousel auto-advance | Swiper | Auto | 4000ms delay |
| Image blur-up load | CSS Transition | Load | 300ms |
| Header hide/show | CSS Transition | Scroll | 300ms |
| Mobile nav open | Framer Motion | Click | 300ms |
| Search panel open | Framer Motion | Click | 350ms |
| Thematic carousel scroll | Swiper FreeMode | Drag | - |
| Card hover image scale | CSS Transition | Hover | 500ms |
| Card hover underline | CSS | Hover | instant |
| Filter dropdown open | Framer Motion | Click | 200ms |
| Chevron rotate | CSS Transition | Click | 200ms |
| Page transition | Framer Motion AnimatePresence | Route change | 400ms |
| Scroll reveal | Framer Motion useInView | Scroll | 600ms |

---

*Generated from live analysis of pentagram.com — April 2026*
*Ready to send to Claude for full implementation*
