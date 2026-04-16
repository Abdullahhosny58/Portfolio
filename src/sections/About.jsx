import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '../components/ui/SectionHeading'
import { staggerContainer, staggerItem } from '../animations/motionVariants'

const techStack = [
  'React.js', 'Next.js', 'TypeScript', 'Redux',
  'Tailwind CSS', 'MUI', 'Framer Motion', 'REST APIs',
]

function StatCard({ number, label, color = 'var(--clr-accent-light)' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '24px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--clr-border)',
        borderRadius: 'var(--r-lg)',
        transition: 'border-color var(--t-normal)',
        cursor: 'default',
      }}
      whileHover={{ borderColor: 'var(--clr-border-2)', y: -2 }}
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px, 4vw, 48px)',
        fontWeight: 800,
        lineHeight: 1,
        color,
        letterSpacing: '-0.03em',
      }}>
        {number}
      </span>
      <span style={{
        fontSize: '13px',
        color: 'var(--clr-text-2)',
        fontWeight: 500,
      }}>
        {label}
      </span>
    </motion.div>
  )
}

export function About() {
  const { t } = useTranslation()
  const stats = t('about.stats', { returnObjects: true })

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Left — Text */}
          <div>
            <SectionHeading
              label={t('about.label')}
              title={t('about.title')}
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p style={{
                fontSize: 'clamp(15px, 1.7vw, 17px)',
                color: 'var(--clr-text-2)',
                lineHeight: 1.8,
                marginBottom: '20px',
              }}>
                {t('about.para1')}
              </p>
              <p style={{
                fontSize: 'clamp(15px, 1.7vw, 17px)',
                color: 'var(--clr-text-2)',
                lineHeight: 1.8,
                marginBottom: '36px',
              }}>
                {t('about.para2')}
              </p>

              {/* Tech Stack Tags */}
              <p style={{
                fontSize: '11px',
                color: 'var(--clr-text-3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                marginBottom: '12px',
              }}>
                {t('about.stack')}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={staggerItem}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--r-full)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--clr-border)',
                      color: 'var(--clr-text-2)',
                      transition: 'all var(--t-fast)',
                      cursor: 'default',
                    }}
                    whileHover={{
                      background: 'rgba(99,102,241,0.1)',
                      borderColor: 'rgba(99,102,241,0.35)',
                      color: 'var(--clr-accent-light)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right — Stats + Image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ position: 'relative', alignSelf: 'flex-start' }}
            >
              <div style={{
                position: 'relative',
                width: '160px', height: '160px',
                borderRadius: 'var(--r-xl)',
              }}>
                {/* Glow ring */}
                <div style={{
                  position: 'absolute', inset: '-3px',
                  background: 'var(--grad-accent)',
                  borderRadius: 'calc(var(--r-xl) + 3px)',
                  opacity: 0.7,
                  animation: 'glow-pulse 3s ease-in-out infinite',
                  zIndex: 0,
                }} />
                <img
                  src="/me.png"
                  alt="Abdullah Hosny"
                  style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'var(--r-xl)',
                    border: '3px solid var(--clr-bg)',
                  }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-12px', insetInlineEnd: '-12px',
                  background: 'rgba(12,18,37,0.95)',
                  border: '1px solid var(--clr-border-2)',
                  borderRadius: 'var(--r-md)',
                  padding: '8px 12px',
                  fontSize: '12px', fontWeight: 600,
                  color: 'var(--clr-teal)',
                  backdropFilter: 'blur(12px)',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-glow-teal)',
                }}
              >
                ✦ Open to Work
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}>
              <StatCard
                number={stats.experience}
                label={stats.experience_label}
                color="var(--clr-accent-light)"
              />
              <StatCard
                number={stats.projects}
                label={stats.projects_label}
                color="var(--clr-teal-light)"
              />
              <StatCard
                number={stats.tech}
                label={stats.tech_label}
                color="var(--clr-violet)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
