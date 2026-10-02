import { useState } from 'react'
import { useLocale } from '../i18n'

const text = {
  en: {
    label: 'Contact',
    title: "Let's work together",
    subtitle: "I'm currently open to new projects. Fill in the form below and I'll get back to you within a couple of days.",
    success: "Thank you! I'll be in touch soon. 🎉",
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'Tell me about your project...',
    referral: 'How did you find me?',
    referralPlaceholder: 'Google, Instagram, word of mouth...',
    error: 'Something went wrong. Please try again.',
    submit: 'Send message',
    formLanguage: 'English',
  },
  sv: {
    label: 'Kontakt',
    title: 'Ska vi jobba ihop?',
    subtitle: 'Jag tar just nu emot nya projekt. Fyll i formuläret så hör jag av mig inom ett par dagar.',
    success: 'Tack! Jag hör av mig snart. 🎉',
    name: 'Namn',
    namePlaceholder: 'Ditt namn',
    email: 'E-post',
    emailPlaceholder: 'din@epost.se',
    message: 'Meddelande',
    messagePlaceholder: 'Berätta om ditt projekt...',
    referral: 'Hur hittade du mig?',
    referralPlaceholder: 'Google, Instagram, tips från någon...',
    error: 'Något gick fel. Försök igen.',
    submit: 'Skicka meddelande',
    formLanguage: 'Svenska',
  },
}

function Contact() {
  const { lang } = useLocale()
  const t = text[lang]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    referral: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(false)
    const response = await fetch('https://formspree.io/f/xlgadard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, language: t.formLanguage }),
    })
    if (response.ok) {
      setSubmitted(true)
    } else {
      setError(true)
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        <div style={styles.header}>
          <p style={styles.label}>{t.label}</p>
          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
        </div>

        <div style={styles.testimonial}>
          <p style={styles.testimonialQuote} lang="en">"Thanks a lot Annie, I’m very happy. Always pleasant to work with people that have a great aesthetic in addition to their technical skills. Bravo again."</p>
          <p style={styles.testimonialAuthor}>— Guillaume de Saint Lager, Paragone</p>
        </div>

        {submitted ? (
          <div style={styles.successBox}>
            <p style={styles.successText}>{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="name">{t.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="email">{t.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                rows={6}
                style={styles.textarea}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="referral">{t.referral}</label>
              <input
                id="referral"
                name="referral"
                type="text"
                placeholder={t.referralPlaceholder}
                value={formData.referral}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            {error && (
              <p style={styles.errorText}>{t.error}</p>
            )}
            <button type="submit" style={styles.button}>
              {t.submit}
            </button>
          </form>
        )}

      </div>
    </main>
  )
}

const styles = {
  main: {
    backgroundColor: 'var(--color-background)',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '8rem 4rem 6rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-accent)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
  },
  testimonial: {
    borderLeft: '2px solid var(--color-accent)',
    paddingLeft: '1.25rem',
  },
  testimonialQuote: {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 1.6,
    letterSpacing: '-0.01em',
    color: 'var(--color-text-dark)',
    margin: '0 0 0.5rem',
  },
  testimonialAuthor: {
    fontSize: '0.8rem',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-text-dark)',
    opacity: 0.45,
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label2: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--color-text-dark)',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  },
  input: {
    padding: '0.85rem 1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    fontSize: '1rem',
    fontFamily: 'Lora, serif',
    color: 'var(--color-text-dark)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '0.85rem 1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    fontSize: '1rem',
    fontFamily: 'Lora, serif',
    color: 'var(--color-text-dark)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: 'fit-content',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  },
  successBox: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  successText: {
    fontSize: '1rem',
    color: 'var(--color-text-dark)',
  },
  errorText: {
    fontSize: '0.9rem',
    color: '#c0392b',
  },
}

export default Contact