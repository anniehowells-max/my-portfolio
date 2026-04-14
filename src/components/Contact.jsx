function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.inner}>
        <h2 style={styles.heading}>Let's work together</h2>
        <p style={styles.body}>
          I'm currently open to new opportunities. Whether you have a project
          in mind, a question, or just want to say hi — my inbox is always open.
        </p>
        <a href="mailto:anniehowells@gmail.com" style={styles.button}>
          Say hello
        </a>
        <div style={styles.socials}>
        
            <a href="https://www.linkedin.com/in/annie-howells-576a48143/"
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
          >
            LinkedIn
          </a>
          <span style={styles.dot}>·</span>
          
            <a href="https://github.com/anniehowells"
            target="_blank"
            rel="noreferrer"
            style={styles.socialLink}
          >
            GitHub
          </a>
        </div>
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
  heading: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--color-text-dark)',
    letterSpacing: '-0.02em',
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: 'var(--color-text-dark)',
    opacity: 0.6,
  },
  button: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    transition: 'opacity 0.2s ease',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  socialLink: {
    color: 'var(--color-text-dark)',
    opacity: 0.5,
    fontWeight: '500',
    fontSize: '0.9rem',
  },
  dot: {
    color: 'var(--color-text-dark)',
    opacity: 0.3,
  },
}

export default Contact