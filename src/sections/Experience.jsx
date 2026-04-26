import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react'

// Company brand colors (subtle accent per company)
const COMPANY_COLORS = {
  'The Mok Company':   '#c8f551',
  'Vision Dimensions': '#60a5fa',
  'ILLA':              '#f472b6',
}

// ─── Timeline dot + line ──────────────────────────────────
function TimelineDot({ color, inView, delay }) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: '20px',
    }}>
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay, type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 12, height: 12,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 12px ${color}66`,
          flexShrink: 0,
          marginTop: '6px',
          position: 'relative',
          zIndex: 1,
        }}
      />
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          width: '1px',
          flex: 1,
          minHeight: '40px',
          background: `linear-gradient(to bottom, ${color}55, transparent)`,
          transformOrigin: 'top',
          marginTop: '6px',
        }}
      />
    </div>
  )
}

// ─── Single Job Card ──────────────────────────────────────
function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const color = COMPANY_COLORS[job.company] || '#c8f551'

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '20px 1fr',
        gap: '24px',
        alignItems: 'start',
      }}
    >
      {/* Left — timeline */}
      <TimelineDot color={color} inView={inView} delay={index * 0.12} />

      {/* Right — card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ paddingBottom: '40px' }}
      >
        <motion.div
          style={{
            background: 'var(--clr-surface)',
            border: `1px solid ${expanded ? color + '30' : 'var(--clr-border)'}`,
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            transition: 'border-color var(--t-normal), box-shadow var(--t-normal)',
            boxShadow: expanded
              ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${color}18`
              : 'var(--shadow-sm)',
            cursor: 'pointer',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Card header */}
          <div style={{
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            <div style={{ flex: 1 }}>
              {/* Company + role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <div style={{
                  width: 32, height: 32,
                  borderRadius: 'var(--r-sm)',
                  background: color + '15',
                  border: `1px solid ${color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Briefcase size={14} style={{ color }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(15px, 2vw, 18px)',
                  fontWeight: 700,
                  color: 'var(--clr-text)',
                  letterSpacing: '-0.01em',
                }}>
                  {job.role}
                </h3>
              </div>

              {/* Company name — accent color */}
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                color,
                marginBottom: '10px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.02em',
              }}>
                {job.company}
              </p>

              {/* Meta row */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
              }}>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', color: 'var(--clr-text-3)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  <Calendar size={11} />
                  {job.period}
                </span>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', color: 'var(--clr-text-3)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  <MapPin size={11} />
                  {job.type}
                </span>
              </div>
            </div>

            {/* Expand chevron */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                color: 'var(--clr-text-3)',
                flexShrink: 0,
                marginTop: '4px',
              }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          {/* Expandable body */}
          <motion.div
            initial={false}
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 28px 24px',
              borderTop: `1px solid ${color}18`,
            }}>
              {/* Accent line */}
              <motion.div
                initial={{ width: 0 }}
                animate={expanded ? { width: '32px' } : { width: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  height: '2px',
                  background: color,
                  borderRadius: 'var(--r-full)',
                  marginTop: '20px',
                  marginBottom: '16px',
                }}
              />

              {/* Bullet points */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {job.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={expanded ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                      fontSize: '13px',
                      color: 'var(--clr-text-2)',
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{
                      width: 5, height: 5,
                      borderRadius: '50%',
                      background: color,
                      flexShrink: 0,
                      marginTop: '7px',
                      opacity: 0.8,
                    }} />
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {job.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={expanded ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--r-full)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      background: color + '10',
                      border: `1px solid ${color}25`,
                      color: color,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Experience Section ───────────────────────────────────
export function Experience() {
  const { t } = useTranslation()
  const jobs = t('experience.jobs', { returnObjects: true })

  return (
    <section id="experience" className="section" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="container">
        <SectionHeading
          label={t('experience.label')}
          title={t('experience.title')}
          index={t('experience.index')}
        />

        {/* Timeline */}
        <div style={{ maxWidth: '760px' }}>
          {Array.isArray(jobs) && jobs.map((job, i) => (
            <JobCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
