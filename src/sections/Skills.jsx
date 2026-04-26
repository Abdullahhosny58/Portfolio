import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skills } from '../data/content'

const categoryColors = {
  frontend:   { bg: 'rgba(200,245,81,0.08)', border: 'rgba(200,245,81,0.25)',  text: '#c8f551' },
  frameworks: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', text: '#e2e8f0' },
  styling:    { bg: 'rgba(20,184,166,0.1)',   border: 'rgba(20,184,166,0.25)',  text: '#2dd4bf' },
  tools:      { bg: 'rgba(167,139,250,0.1)',  border: 'rgba(167,139,250,0.25)', text: '#c4b5fd' },
}

function SkillCard({ skill, index }) {
  const { t } = useTranslation()
  const colors = categoryColors[skill.category] || categoryColors.tools

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -8 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      style={{
        padding: '20px',
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 'var(--r-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'default',
        transition: 'box-shadow var(--t-normal)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Icon + Name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--r-sm)',
          background: 'rgba(255,255,255,0.06)',
          fontSize: '14px', fontWeight: 700,
          color: skill.color,
          fontFamily: 'var(--font-mono)',
          flexShrink: 0,
        }}>
          {skill.icon}
        </span>
        <span style={{
          fontSize: '14px', fontWeight: 600,
          color: 'var(--clr-text)',
        }}>
          {skill.name}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 'var(--r-full)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.05 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            borderRadius: 'var(--r-full)',
          }}
        />
      </div>

      {/* Level label */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '10px',
          color: 'var(--clr-text-3)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {t(`skills.categories.${skill.category}`, skill.category)}
        </span>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          color: colors.text,
          fontFamily: 'var(--font-mono)',
        }}>
          {skill.level}%
        </span>
      </div>
    </motion.div>
  )
}

export function Skills() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { key: 'all',       label: t('skills.categories.all') },
    { key: 'frontend',  label: t('skills.categories.frontend') },
    { key: 'frameworks',label: t('skills.categories.frameworks') },
    { key: 'styling',   label: t('skills.categories.styling') },
    { key: 'tools',     label: t('skills.categories.tools') },
  ]

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="section" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="container">
        <SectionHeading
          label={t('skills.label')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
          index="02"
        />

        {/* Category Filter Tabs */}
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
          {categories.map(({ key, label }) => {
            const isActive = activeCategory === key
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--r-full)',
                  fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(200,245,81,0.4)' : 'var(--clr-border)',
                  background: isActive ? 'rgba(200,245,81,0.1)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? 'var(--clr-accent-light)' : 'var(--clr-text-2)',
                  transition: 'all var(--t-fast)',
                }}
              >
                {label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: '16px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
