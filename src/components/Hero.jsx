import { useEffect, useState } from 'react'
import { useLocale } from '../i18n'

// Project images shown in the hero. They fade from one to the next.
// The images in /images/hero-slides are resized copies (2400px wide) so the homepage loads quickly.
// position controls which part of the image stays visible (e.g. 'center', 'right', '70% center').
// slug links the small caption to the case study; leave it out to hide the caption.
const slides = [
  { image: '/images/hero-slides/genaura.jpg', position: '65% center', title: 'Genaura', slug: 'genaura' },
  { image: '/images/hero-slides/orserio.jpg', position: 'center', title: 'Orserio', slug: 'orserio' },
  { image: '/images/hero-slides/wolfie.jpg', position: 'center', title: 'Wolfie', slug: 'wolfie' },
  { image: '/images/hero-slides/oetker-collection.jpg', position: 'center', title: 'Oetker Collection Boutique', slug: 'oetker-collection-boutique' },
]

const SLIDE_DURATION = 6000 // milliseconds each image is shown
const FADE_DURATION = 1500 // milliseconds the fade takes

const text = {
  en: {
    award: 'Ecommerce Design Award Winning Work',
    headlineStart: 'Helping small businesses',
    headlineMiddle: 'find their ',
    headlineAccent: 'best version',
    tagline: 'Independent UX and web designer based in London, working with small businesses and growing brands who need clarity, structure and a website that actually works.',
    primary: 'View my work',
    secondary: 'Get in touch',
    project: 'Project',
  },
  sv: {
    award: 'Prisat i Ecommerce Design Awards',
    headlineStart: 'Jag hjälper småföretag',
    headlineMiddle: 'hitta sin ',
    headlineAccent: 'bästa version',
    tagline: 'Fristående UX- och webbdesigner i Göteborg. Jag jobbar med små företag och växande varumärken som behöver tydlighet, struktur och en webbplats som faktiskt fungerar.',
    primary: 'Se mina projekt',
    secondary: 'Hör av dig',
    project: 'Projekt',
  },
}

function Hero() {
  const { lang, to } = useLocale()
  const t = text[lang]
  const [active, setActive] = useState(0)
  // Only download an image once it's shown or next in line
  const [furthest, setFurthest] = useState(0)

  useEffect(() => {
    // Respect people who have asked their device to reduce motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setActive(current => {
        const next = (current + 1) % slides.length
        setFurthest(previous => Math.max(previous, next))
        return next
      })
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  const current = slides[active]

  return (
    <section style={styles.section} className="hero-section">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          aria-hidden="true"
          style={{
            ...styles.slide,
            backgroundImage: i <= furthest + 1 ? `url(${slide.image})` : 'none',
            backgroundPosition: slide.position || 'center',
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}
      <div style={styles.overlay} />
      <div style={styles.content}>
        <div style={styles.awardPill}>
          <span style={styles.awardIcon}>★</span>
          <span>{t.award}</span>
        </div>
        <h1 style={styles.headline}>
          {t.headlineStart}<br />
          {t.headlineMiddle}<span style={styles.accent}>{t.headlineAccent}</span>
        </h1>
        <p style={styles.tagline}>
          {t.tagline}
        </p>
        <div style={styles.testimonial}>
          <p style={styles.testimonialQuote} lang="en">"We are obsessed with Annie's work, it looks so fab"</p>
          <p style={styles.testimonialAuthor}>— Ellie Proud, 4media group / Genaura</p>
        </div>
        <div style={styles.buttons}>
          <a href={to('/work')} style={styles.buttonPrimary}>{t.primary}</a>
          <a href={to('/enquire')} style={styles.buttonSecondary}>{t.secondary}</a>
        </div>
        <div style={styles.logos}>
          <img src="/images/squarespace-logo.png" alt="Squarespace" style={styles.logo} />
          <img src="/images/shopify-logo.png" alt="Shopify" style={styles.logo} />
        </div>
      </div>
      {current.slug && (
        <a href={to(`/${current.slug}`)} style={styles.caption} className="hero-caption">
          {t.project}: {current.title} →
        </a>
      )}
      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            align-items: flex-end !important;
            padding: 0 1.5rem 3rem !important;
          }
          .hero-caption {
            display: none !important;
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
    overflow: 'hidden',
    backgroundColor: '#1C1C1C',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4rem',
  },
  slide: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    // Darker on the left where the text sits, lighter on the right so the project shows through
    background: 'linear-gradient(90deg, rgba(28, 28, 28, 0.72) 0%, rgba(28, 28, 28, 0.45) 45%, rgba(28, 28, 28, 0.12) 100%)',
  },
  caption: {
    position: 'absolute',
    right: '2rem',
    bottom: '1.75rem',
    zIndex: 1,
    fontSize: '0.72rem',
    fontWeight: '500',
    letterSpacing: '0.06em',
    color: 'rgba(255, 253, 250, 0.75)',
    textDecoration: 'none',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '680px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  awardPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 253, 250, 0.8)',
    fontSize: '0.72rem',
    fontWeight: '500',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '0',
    borderRadius: '100px',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    alignSelf: 'flex-start',
  },
  awardIcon: {
    fontSize: '0.65rem',
  },
  testimonial: {
    borderLeft: '2px solid var(--color-accent)',
    paddingLeft: '1rem',
  },
  testimonialQuote: {
    fontSize: '0.95rem',
    fontStyle: 'italic',
    fontWeight: '400',
    lineHeight: 1.5,
    color: 'rgba(255, 253, 250, 0.75)',
    margin: '0 0 0.35rem',
  },
  testimonialAuthor: {
    fontSize: '0.72rem',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'rgba(255, 253, 250, 0.5)',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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