import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Badge } from '../components/ui/Badge'
import { projects, projectFilters } from '../data/content'

function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      style={{
        borderRadius: 'var(--r-xl)',
        background: 'var(--clr-surface)',
        border: `1px solid ${hovered ? 'rgba(99,102,241,0.3)' : 'var(--clr-border)'}`,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color var(--t-normal), box-shadow var(--t-normal)',
        boxShadow: hovered ? 'var(--shadow-glow)' : 'none',
        position: 'relative',
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'var(--clr-surface-2)',
      }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--t-slow)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(5,8,22,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px',
              borderRadius: 'var(--r-md)',
              background: 'var(--grad-accent)',
              color: '#fff',
              fontSize: '13px', fontWeight: 600,
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
            }}
          >
            <ExternalLink size={14} />
            {t('projects.live')}
          </motion.a>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px',
              borderRadius: 'var(--r-md)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '13px', fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Github size={14} />
            {t('projects.code')}
          </motion.a>
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: '12px', insetInlineEnd: '12px',
            padding: '4px 10px',
            background: 'rgba(99,102,241,0.9)',
            borderRadius: 'var(--r-full)',
            fontSize: '10px', fontWeight: 600,
            color: '#fff', letterSpacing: '0.04em',
            backdropFilter: 'blur(4px)',
          }}>
            Featured
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px', fontWeight: 700,
            color: 'var(--clr-text)',
            lineHeight: 1.3,
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

        <p style={{
          fontSize: '13px',
          color: 'var(--clr-text-2)',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}>
          {project.subtitle}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

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
        <SectionHeading
          label={t('projects.label')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
          }}
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
                  padding: '8px 20px',
                  borderRadius: 'var(--r-full)',
                  fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(99,102,241,0.5)' : 'var(--clr-border)',
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-2)',
                  transition: 'all var(--t-fast)',
                }}
              >
                {t(labelKey)}
                {key !== 'all' && (
                  <span style={{
                    marginInlineStart: '6px',
                    fontSize: '11px',
                    color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-3)',
                  }}>
                    ({projects.filter((p) => p.category === key).length})
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
                padding: '12px 32px',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--clr-border-2)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--clr-text)',
                fontSize: '14px', fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--t-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                e.currentTarget.style.color = 'var(--clr-accent-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--clr-border-2)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.color = 'var(--clr-text)'
              }}
            >
              {showAll ? '← Show Less' : t('projects.view_all')} ({filtered.length})
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
