import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
      body: JSON.stringify(formData),
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
          <p style={styles.label}>Contact</p>
          <h1 style={styles.title}>Let's work together</h1>
          <p style={styles.subtitle}>
            I'm currently open to new projects. Fill in the form below
            and I'll get back to you within a couple of days.
          </p>
        </div>

        {submitted ? (
          <div style={styles.successBox}>
            <p style={styles.successText}>
              Thank you! I'll be in touch soon. 🎉
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label2} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                style={styles.textarea}
              />
            </div>
            {error && (
              <p style={styles.errorText}>
                Something went wrong. Please try again.
              </p>
            )}
            <button type="submit" style={styles.button}>
              Send message
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
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-accent)',
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