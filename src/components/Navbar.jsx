import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div style={styles.wrapper}>
        <nav style={styles.nav}>
          <a href="/" style={styles.logo}>
            <img src="/AnnieHowellsDesignAnimatedLogo.gif" alt="Annie Howells Design" style={styles.logoImg} />
          </a>
          <ul className="nav-desktop-links" style={styles.links}>
            <li><a href="/work" style={styles.link} className="nav-link">Work</a></li>
            <li><a href="/services" style={styles.link} className="nav-link">Services</a></li>
            <li><a href="/insights" style={styles.link} className="nav-link">Insights</a></li>
            <li><a href="/about" style={styles.link} className="nav-link">About</a></li>
            <li><a href="/enquire" style={styles.linkBtn}>Contact</a></li>
          </ul>
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(true)}
            style={styles.hamburger}
            aria-label="Open menu"
          >
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <rect width="20" height="1.5" rx="1" fill="currentColor"/>
              <rect y="7.25" width="20" height="1.5" rx="1" fill="currentColor"/>
              <rect y="14.5" width="20" height="1.5" rx="1" fill="currentColor"/>
            </svg>
          </button>
        </nav>
      </div>

      {isOpen && (
        <div style={styles.overlay}>
          <button
            onClick={() => setIsOpen(false)}
            style={styles.closeBtn}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <nav style={styles.overlayNav}>
            <a href="/about" style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>About</a>
            <a href="/work" style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>Work</a>
            <a href="/services" style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>Services</a>
            <a href="/insights" style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>Insights</a>
            <a href="/enquire" style={styles.overlayBtn} onClick={() => setIsOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    top: '1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    width: 'calc(100% - 4rem)',
    maxWidth: '780px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1.25rem 0.9rem',
    backgroundColor: 'rgba(40, 40, 40, 0.55)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '999px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImg: {
    height: '28px',
    width: 'auto',
    display: 'block',
  },
  links: {
    gap: '1.25rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    fontWeight: '500',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-light, #f5f5f0)',
    opacity: 0.6,
    textDecoration: 'none',
  },
  linkBtn: {
    fontWeight: '600',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: 'var(--color-accent, #FF9900)',
    padding: '0.5rem 1.1rem',
    borderRadius: '999px',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '0.25rem',
    lineHeight: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(15, 15, 15, 0.97)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '1.75rem',
    right: '1.75rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '0.5rem',
    lineHeight: 0,
  },
  overlayNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  overlayLink: {
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#fff',
    textDecoration: 'none',
  },
  overlayBtn: {
    marginTop: '0.5rem',
    padding: '0.85rem 2.5rem',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    borderRadius: '999px',
    textDecoration: 'none',
  },
}

export default Navbar
