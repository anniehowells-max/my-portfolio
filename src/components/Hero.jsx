function Hero() {
  return (
    <section style={styles.section} className="hero-section">
      <div style={styles.overlay} />
      <div style={styles.content}>
        <p style={styles.greeting}></p>
        <h1 style={styles.headline}>
          Helping small businesses<br />
          find their <span style={styles.accent}>best version</span>
        </h1>
        <p style={styles.tagline}>
          Independent UX and web designer based in London, working with
          small businesses and growing brands who need clarity, structure
          and a website that actually works.
        </p>
        <div style={styles.buttons}>
          <a href="/work" style={styles.buttonPrimary}>View my work</a>
          <a href="/enquire" style={styles.buttonSecondary}>Get in touch</a>
        </div>
        <div style={styles.logos}>
          <img src="/images/squarespace-logo.png" alt="Squarespace" style={styles.logo} />
          <img src="/images/shopify-logo.png" alt="Shopify" style={styles.logo} />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            align-items: flex-end !important;
            padding: 0 1.5rem 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}

const styles = {
  section: {
    position: 'relative',
    height: '100vh',
    backgroundImage: 'url(/images/hero.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#1C1C1C',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4rem',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(28, 28, 28, 0.25)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  greeting: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'var(--color-accent)',
  },
  headline: {
    fontSize: 'clamp(2rem, 5vw, 3.75rem)',
    fontWeight: '700',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    color: 'var(--color-text-light)',
  },
  accent: {
    color: 'var(--color-accent)',
  },
  tagline: {
    fontSize: '1.15rem',
    color: 'rgba(255, 253, 250, 0.8)',
    maxWidth: '520px',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  buttonPrimary: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
  },
  logos: {
    display: 'flex',
    gap: '0.1rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
  logo: {
    height: '55px',
    width: 'auto',
    opacity: 0.7,
  },
  buttonSecondary: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'transparent',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    border: '1px solid rgba(255, 253, 250, 0.4)',
  },
}

export default Hero