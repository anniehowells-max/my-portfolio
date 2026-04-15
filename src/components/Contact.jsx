function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.inner}>
        <p style={styles.overline}>Contact</p>
        <h2 style={styles.heading}>Let's work together</h2>
        <p style={styles.body}>
          I'm currently open to new projects. Whether you have a project
          in mind, a question, or just want to say hi — I'd love to hear from you.
        </p>
        <a href="/contact" style={styles.button}>Get in touch</a>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 4rem',
    backgroundColor: 'var(--color-background)',
  },
  inner: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-accent)',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    color: 'var(--color-text-dark)',
    margin: 0,
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: 'var(--color-text-dark)',
    opacity: 0.6,
    margin: 0,
  },
  button: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
}

export default Contact
