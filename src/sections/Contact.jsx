import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useForm } from '@formspree/react'
import { Mail, MapPin, CheckCircle, Send, Download, FileText } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { staggerContainer, staggerItem } from '../animations/motionVariants'
import Lottie from 'lottie-react'
import contactAnim from '../animation/contact/contact.json.json'

function InputField({ label, id, type = 'text', textarea, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false)

  const base = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: 'var(--r-md)',
    border: `1.5px solid ${focused ? 'rgba(99,102,241,0.5)' : 'var(--clr-border)'}`,
    background: focused ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.03)',
    color: 'var(--clr-text)',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'all var(--t-fast)',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? '128px' : undefined,
  }

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: '12px', fontWeight: 500,
          color: 'var(--clr-text-2)',
          marginBottom: '6px',
          letterSpacing: '0.04em',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--clr-accent)', marginInlineStart: '3px' }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          style={base}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          style={base}
        />
      )}
    </div>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const [state, handleFormspreeSubmit] = useForm('xeqbvegd')

  return (
    <section id="contact" className="section" style={{ background: 'var(--clr-bg-2)' }}>
      <div className="container">
        <SectionHeading
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          align="center"
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left — Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {/* Lottie Animation */}
            <div style={{ width: '100%', maxWidth: '280px', marginBottom: '32px' }}>
              <Lottie animationData={contactAnim} loop autoplay style={{ width: '100%' }} />
            </div>

            {/* Contact Info Items */}
            {[
              { icon: Mail,   labelKey: 'contact.info.email_label',       valueKey: 'contact.info.email',       href: `mailto:${t('contact.info.email')}` },
              { icon: MapPin, labelKey: 'contact.info.location_label',    valueKey: 'contact.info.location',    href: null },
              { icon: CheckCircle, labelKey: 'contact.info.availability_label', valueKey: 'contact.info.availability', href: null },
            ].map(({ icon: Icon, labelKey, valueKey, href }, i) => (
              <motion.div
                key={labelKey}
                variants={staggerItem}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                <div style={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--r-md)',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  flexShrink: 0,
                  color: 'var(--clr-accent-light)',
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: 'var(--clr-text-3)', marginBottom: '2px', letterSpacing: '0.04em' }}>
                    {t(labelKey)}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: '14px', fontWeight: 500, color: 'var(--clr-text)',
                        transition: 'color var(--t-fast)',
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--clr-accent-light)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--clr-text)'}
                    >
                      {t(valueKey)}
                    </a>
                  ) : (
                    <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--clr-text)' }}>
                      {t(valueKey)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* CV Download Block */}
            <motion.div
              variants={staggerItem}
              style={{
                marginTop: '32px',
                padding: '20px',
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 'var(--r-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <FileText size={18} style={{ color: 'var(--clr-accent-light)' }} />
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--clr-text)' }}>
                  {t('cv.title')}
                </p>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--clr-text-2)', marginBottom: '16px', lineHeight: 1.6 }}>
                {t('cv.subtitle')}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <motion.a
                  href="/cv-en.pdf"
                  download
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '10px 14px',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--grad-accent)',
                    color: '#fff',
                    fontSize: '12px', fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Download size={13} />
                  EN
                </motion.a>
                <motion.a
                  href="/cv-ar.pdf"
                  download
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    padding: '10px 14px',
                    borderRadius: 'var(--r-md)',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'var(--clr-text)',
                    fontSize: '12px', fontWeight: 500,
                    border: '1px solid var(--clr-border-2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Download size={13} />
                  عربي
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              padding: '36px',
              background: 'rgba(12,18,37,0.8)',
              border: '1px solid var(--clr-border)',
              borderRadius: 'var(--r-xl)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {state.succeeded ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <motion.div
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: 64, height: 64,
                    background: 'rgba(20,184,166,0.15)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <CheckCircle size={32} style={{ color: 'var(--clr-teal)' }} />
                </motion.div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px', fontWeight: 700,
                  color: 'var(--clr-text)',
                }}>
                  {t('contact.form.success')}
                </h3>
              </motion.div>
            ) : (
              /* Form */
              <form onSubmit={handleFormspreeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <InputField
                  id="name"
                  label={t('contact.form.name')}
                  placeholder="John Doe"
                  required
                />
                <InputField
                  id="email"
                  type="email"
                  label={t('contact.form.email')}
                  placeholder="john@example.com"
                  required
                />
                <InputField
                  id="message"
                  label={t('contact.form.message')}
                  placeholder="Tell me about your project..."
                  textarea
                  required
                />

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={!state.submitting ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!state.submitting ? { scale: 0.98 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%',
                    padding: '14px',
                    borderRadius: 'var(--r-md)',
                    background: state.submitting ? 'rgba(99,102,241,0.5)' : 'var(--grad-accent)',
                    color: '#fff',
                    fontSize: '15px', fontWeight: 600,
                    border: 'none',
                    cursor: state.submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 24px rgba(99,102,241,0.35)',
                    transition: 'all var(--t-normal)',
                    marginTop: '4px',
                  }}
                >
                  {state.submitting ? (
                    <>
                      <div style={{
                        width: 16, height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        animation: 'spin-slow 0.8s linear infinite',
                      }} />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t('contact.form.send')}
                    </>
                  )}
                </motion.button>

                {state.errors && state.errors.length > 0 && (
                  <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center' }}>
                    {t('contact.form.error')}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
