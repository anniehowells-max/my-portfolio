function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="footer-inner">
        <div className="footer-top">
          <a href="/" style={styles.logo}>
            <img src="/AnnieHowellsDesignAnimatedLogo.gif" alt="Annie Howells Design" className="footer-logo-image" />
          </a>
          <nav className="footer-nav">
            <div style={styles.navLinks}>
              <a href="/work" style={styles.navLink} className="footer-nav-link">Work</a>
              <a href="/services" style={styles.navLink} className="footer-nav-link">Services</a>
              <a href="/insights" style={styles.navLink} className="footer-nav-link">Insights</a>
              <a href="/about" style={styles.navLink} className="footer-nav-link">About</a>
            </div>
            <a href="/enquire" style={styles.enquireButton}>Enquire</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <div style={styles.socials}>
            <a href="https://www.linkedin.com/in/annie-howells-576a48143/"
              target="_blank"
              rel="noreferrer"
              style={styles.socialIcon}
              className="nav-social-icon"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:anniehowells@gmail.com"
              style={styles.socialIcon}
              className="nav-social-icon"
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Annie Howells Design — an independent design practice.
          </p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: 'var(--color-text-dark)',
    padding: '3rem 3rem 2.5rem',
  },
  logo: {
    display: 'inline-block',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.1rem',
  },
  navLink: {
    fontWeight: '500',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-light, #f5f5f0)',
    opacity: 0.6,
    textDecoration: 'none',
  },
  enquireButton: {
    display: 'inline-block',
    marginTop: '1.5rem',
    padding: '0.75rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
  },
  socialIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-light)',
  },
  copyright: {
    fontSize: '0.85rem',
    color: 'rgba(255,253,250,0.5)',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
  },
}

export default Footer
