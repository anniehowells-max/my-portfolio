const heroImage = '/images/about-hero.jpg'

import Contact from '../components/Contact'

export default function About() {
  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <h1 style={styles.heroTitle}>About</h1>
      </section>

      {/* Meet Annie */}
      <section style={styles.section} className="about-section">
        <div style={styles.twoCol} className="about-two-col">
          <h2 style={styles.sectionHeading}>Meet Annie</h2>
          <div style={styles.sectionBody}>
            <p style={styles.bodyText}>
              Annie designs thoughtful brands and digital experiences — helping people understand who you are and why you matter. She focuses on UX-led websites and visual identities, with an emphasis on clarity, usability, and storytelling to ensure brands feel considered, confident, and human.
            </p>
            <div style={styles.aboutImage} />
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section style={styles.section} className="about-section">
        <div style={styles.twoCol} className="about-two-col">
          <h2 style={styles.sectionHeading}>How I Work</h2>
          <div style={styles.sectionBody}>
            <p style={styles.bodyText}>
              Every project starts with listening — understanding your goals, your audience, and what's already working. From there, I apply UX thinking and strategic design to structure content, define flows, and craft visuals that support real user needs.
            </p>
            <p style={styles.bodyText}>
              I'm comfortable with wireframes, Figma interfaces, and responsive layouts that feel natural on every device. My process is flexible, practical, and tailored to each project — ensuring the end result is both beautiful and performant.
            </p>
          </div>
        </div>
      </section>

      {/* A Bit More Personal */}
      <section style={styles.section} className="about-section">
        <div style={styles.twoCol} className="about-two-col">
          <h2 style={styles.sectionHeading}>A Bit More Personal</h2>
          <div style={styles.sectionBody}>
            <p style={styles.bodyText}>
              Outside of design, I enjoy running, knitting, and experimenting with textiles and hand-made projects. I find the creative process — in all its forms — fuels my work.
            </p>
            <p style={styles.pullQuote}>
              "If you share a love of good design, books, or strong coffee, we'll get along just fine."
            </p>
            <div style={styles.barbaricImage} />
          </div>
        </div>
      </section>

      <Contact />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .about-two-col {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .about-section {
            padding: 2.5rem 1.5rem !important;
          }
          .about-hero {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: 'var(--color-text-dark, #403E3A)',
    color: 'var(--color-text-light, #f5f5f0)',
    minHeight: '100vh',
    fontFamily: "'Instrument Sans', sans-serif",
  },

  // Hero
  hero: {
    position: 'relative',
    height: '50vh',
    backgroundImage: `url(${heroImage.split(' ')[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: heroImage.split(' ')[1] || 'center',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '3rem 6rem',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(40, 38, 35, 0.35)',
  },
  heroTitle: {
    position: 'relative',
    zIndex: 1,
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    lineHeight: 1,
    margin: 0,
    color: 'var(--color-text-light, #f5f5f0)',
    animation: 'fadeUp 0.7s ease both',
  },

  // Section
  section: {
    padding: '4rem 6rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: '4rem',
    alignItems: 'flex-start',
  },
  sectionHeading: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    opacity: 0.35,
    fontWeight: '500',
    paddingTop: '0.25rem',
    margin: 0,
  },
  sectionBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  aboutImage: {
    width: '100%',
    aspectRatio: '4 / 3',
    backgroundImage: 'url(/images/annie-vizcaya.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '2px',
  },
  barbaricImage: {
    width: '100%',
    aspectRatio: '4 / 3',
    backgroundImage: 'url(/images/annie-barbican.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '2px',
    marginTop: '1rem',
  },
  bodyText: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    opacity: 0.75,
    margin: 0,
  },
  pullQuote: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    lineHeight: 1.6,
    opacity: 0.9,
    borderLeft: '2px solid var(--color-accent, #FF9900)',
    paddingLeft: '1.25rem',
    margin: '0.5rem 0 0',
  },

  // CTA
  cta: {
    padding: '5rem 6rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.25rem',
  },
  ctaLabel: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.4,
    margin: 0,
  },
  ctaHeading: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    margin: '0 0 0.5rem',
    color: 'var(--color-text-light, #f5f5f0)',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  ctaBtnOutline: {
    display: 'inline-block',
    padding: '0.85rem 2.2rem',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'var(--color-text-light, #f5f5f0)',
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '600',
    borderRadius: '2px',
  },
  ctaBtnFilled: {
    display: 'inline-block',
    padding: '0.85rem 2.2rem',
    backgroundColor: 'var(--color-accent, #FF9900)',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: '600',
    borderRadius: '2px',
  },
}
