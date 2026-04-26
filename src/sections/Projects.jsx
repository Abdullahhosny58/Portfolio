import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { projects, projectFilters } from '../data/content'

// ─────────────────────────────────────────────────────────
// Project Card  (grid view) — 3D tilt on mouse move
// ─────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Raw mouse position (normalised -0.5 → 0.5 relative to card center)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics — smooth tilt & return to flat
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.5 })

  // Map normalised coords → degrees
  const rotateY = useTransform(springX, [-0.5, 0.5], [-11, 11])
  const rotateX = useTransform(springY, [-0.5, 0.5], [9, -9])

  // Glare highlight — radial gradient that chases the cursor
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07) 0%, transparent 62%)`

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }, [mouseX, mouseY])

  return (
    // Perspective wrapper — required for 3D
    <div style={{ perspective: '900px' }}>
      <motion.article
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          borderRadius: 'var(--r-xl)',
          background: 'var(--clr-surface)',
          border: `1px solid ${hovered ? 'rgba(200,245,81,0.2)' : 'var(--clr-border)'}`,
          overflow: 'hidden',
          cursor: 'default',
          transition: 'border-color var(--t-normal), box-shadow var(--t-normal)',
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.55), var(--shadow-glow)'
            : 'var(--shadow-md)',
          position: 'relative',
        }}
      >
        {/* ── Glare overlay — chases cursor ── */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            background: glareBg,
            opacity: hovered ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 20,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Image */}
        <div style={{
          position: 'relative', aspectRatio: '16/9',
          overflow: 'hidden', background: 'var(--clr-surface-2)',
        }}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform var(--t-slow), opacity 300ms ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            onError={(e) => { e.target.style.display = 'none' }}
          />

          {/* Hover overlay with buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(5,8,22,0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            }}
          >
            <motion.a
              href={project.live} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 18px', borderRadius: 'var(--r-md)',
                background: '#c8f551', color: '#080808',
                fontSize: '13px', fontWeight: 700,
                boxShadow: '0 4px 16px rgba(200,245,81,0.25)',
              }}
            >
              <ExternalLink size={14} />{t('projects.live')}
            </motion.a>

            <motion.a
              href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 18px', borderRadius: 'var(--r-md)',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                fontSize: '13px', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <Github size={14} />{t('projects.code')}
            </motion.a>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div style={{
              position: 'absolute', top: '12px', insetInlineEnd: '12px',
              padding: '4px 10px', background: 'rgba(200,245,81,0.9)',
              borderRadius: 'var(--r-full)',
              fontSize: '10px', fontWeight: 700, color: '#080808',
              letterSpacing: '0.04em', backdropFilter: 'blur(4px)',
            }}>
              {t('projects.featured_badge')}
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px', fontWeight: 700,
              color: 'var(--clr-text)', lineHeight: 1.3,
              textDecoration: hovered ? 'underline' : 'none',
              textDecorationColor: 'rgba(255,255,255,0.25)',
              textUnderlineOffset: '3px',
              transition: 'text-decoration var(--t-fast)',
            }}>
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} style={{ color: 'var(--clr-accent-light)', flexShrink: 0, marginInlineStart: '8px' }} />
            </motion.div>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--clr-text-2)', lineHeight: 1.6, marginBottom: '16px' }}>
            {project.subtitle}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="tag">{tag}</Badge>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Projects Section
// ─────────────────────────────────────────────────────────
export function Projects() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  const displayed = showAll ? filtered : filtered.slice(0, 6)

  return (
    <section id="projects" className="section">
      <div className="container">

          {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="filter-pills"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}
        >
          {projectFilters.map(({ key, labelKey }) => {
            const isActive = activeFilter === key
            return (
              <motion.button
                key={key}
                onClick={() => { setActiveFilter(key); setShowAll(false) }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 20px', borderRadius: 'var(--r-full)',
                  fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer', border: '1px solid',
                  borderColor: isActive ? 'rgba(200,245,81,0.35)' : 'var(--clr-border)',
                  background: isActive ? 'rgba(200,245,81,0.1)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-2)',
                  transition: 'all var(--t-fast)',
                }}
              >
                {t(labelKey)}
                {key !== 'all' && (
                  <span style={{
                    marginInlineStart: '6px', fontSize: '11px',
                    color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-3)',
                  }}>
                    ({projects.filter((p) => p.category === key).length})
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
            gap: '24px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More */}
        {filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '12px 32px', borderRadius: 'var(--r-md)',
                border: '1px solid var(--clr-border-2)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text)', fontSize: '14px', fontWeight: 500,
                cursor: 'pointer', transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(200,245,81,0.25)'; e.currentTarget.style.background = 'rgba(200,245,81,0.07)'; e.currentTarget.style.color = 'var(--clr-accent-light)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--clr-border-2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--clr-text)' }}
            >
              {showAll ? t('projects.show_less') : t('projects.view_all')} ({filtered.length})
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  )
}

export default Projects
