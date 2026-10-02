import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contact from '../components/Contact'
import { useLocale } from '../i18n'
import { getProject } from '../content'
import { getLandingPage } from '../landingPages'

// Swedish landing pages for local searches. The content lives in src/landingPages.js.
export default function LandingPage({ slug }) {
  const page = getLandingPage(slug)
  const { lang, to } = useLocale()
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  if (!page) return null

  const projects = page.projects.map(projectSlug => getProject(projectSlug, lang)).filter(Boolean)

  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={{ ...styles.hero, backgroundImage: `url(${page.heroImage})` }} className="landing-hero">
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>{page.eyebrow}</p>
          <h1 style={styles.heroTitle}>{page.heading}</h1>
          <p style={styles.heroIntro}>{page.intro}</p>
          <div style={styles.buttons}>
            <a href={to('/enquire')} style={styles.buttonPrimary}>{page.primaryCta}</a>
            <a href={to(page.secondaryCta.path)} style={styles.buttonSecondary}>{page.secondaryCta.label}</a>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section style={styles.section} className="landing-section">
        <div style={styles.twoCol} className="landing-two-col">
          <h2 style={styles.sectionHeading}>{page.reasonsHeading}</h2>
          <div style={styles.reasons}>
            {page.reasons.map(reason => (
              <div key={reason.title} style={styles.reason}>
                <h3 style={styles.reasonTitle}>{reason.title}</h3>
                <p style={styles.bodyText}>{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / who it suits */}
      <section style={styles.section} className="landing-section">
        <div style={styles.twoCol} className="landing-two-col">
          <h2 style={styles.sectionHeading}>{page.servicesHeading}</h2>
          <div>
            <ul style={styles.list}>
              {page.services.map(item => (
                <li key={item} style={styles.listItem}>{item}</li>
              ))}
            </ul>
            <a href={to(page.servicesLink.path)} style={styles.textLink}>{page.servicesLink.label} →</a>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section style={styles.projectsSection}>
          <div style={styles.projectsHeader} className="landing-projects-header">
            <h2 style={styles.projectsHeading}>{page.projectsHeading}</h2>
          </div>
          <div style={styles.projectGrid} className="landing-project-grid">
            {projects.map(project => (
              <div
                key={project.slug}
                style={styles.projectCard}
                onClick={() => navigate(to(`/${project.slug}`))}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {(project.cardImage || project.coverImage) && (
                  <div
                    style={{
                      ...styles.projectImage,
                      backgroundImage: `url(${(project.cardImage || project.coverImage).split(' ')[0]})`,
                    }}
                  />
                )}
                <div style={styles.projectBody}>
                  <h3 style={styles.projectTitle}>
                    <a href={to(`/${project.slug}`)} style={styles.projectLink}>{project.title}</a>
                  </h3>
                  {project.role && (
                    <div style={styles.tags}>
                      {project.role.map(tag => (
                        <span key={tag} style={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section style={styles.faqSection} className="landing-faq">
        <h2 style={styles.faqHeading}>{page.faqHeading}</h2>
        <div style={styles.faqList}>
          {page.faqs.map((faq, i) => (
            <div key={faq.question} style={styles.faqItem}>
              <button
                style={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{faq.question}</span>
                <span style={{ ...styles.faqIcon, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              {/* Answers stay in the page for Google, they're just hidden until opened */}
              <p style={{ ...styles.faqAnswer, display: openFaq === i ? 'block' : 'none' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Contact />

      <style>{`
        @media (max-width: 768px) {
          .landing-hero {
            padding: 7rem 1.5rem 2.5rem !important;
            min-height: 0 !important;
          }
          .landing-section {
            padding: 2.5rem 1.5rem !important;
          }
          .landing-two-col {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .landing-projects-header {
            padding: 0 1.5rem !important;
          }
          .landing-project-grid {
            grid-template-columns: 1fr !important;
          }
          .landing-faq {
            padding: 3rem 1.5rem !important;
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
  },

  // Hero
  hero: {
    position: 'relative',
    minHeight: '75vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '8rem 6rem 4rem',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(40, 38, 35, 0.55)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '720px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  heroTitle: {
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    margin: 0,
    color: 'var(--color-text-light, #f5f5f0)',
  },
  heroIntro: {
    fontSize: '1.1rem',
    color: 'rgba(255, 253, 250, 0.8)',
    maxWidth: '560px',
    margin: 0,
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

  // Two-column sections
  section: {
    padding: '4.5rem 6rem',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '4rem',
    alignItems: 'flex-start',
  },
  sectionHeading: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    opacity: 0.5,
    fontWeight: '400',
    paddingTop: '0.25rem',
    margin: 0,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  reasons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.25rem',
    maxWidth: '640px',
  },
  reason: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  reasonTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    margin: 0,
    color: 'var(--color-text-light, #f5f5f0)',
  },
  bodyText: {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    opacity: 0.75,
    margin: 0,
  },
  list: {
    listStyle: 'none',
    margin: '0 0 1.75rem',
    padding: 0,
    maxWidth: '640px',
  },
  listItem: {
    fontSize: '1.1rem',
    fontWeight: '500',
    letterSpacing: '-0.01em',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  textLink: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--color-accent)',
  },

  // Projects
  projectsSection: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    paddingTop: '4rem',
  },
  projectsHeader: {
    padding: '0 6rem',
    marginBottom: '2.5rem',
  },
  projectsHeading: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
  },
  projectCard: {
    borderRight: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  projectImage: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  projectBody: {
    padding: '1.5rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  projectTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  projectLink: {
    color: 'var(--color-text-light, #f5f5f0)',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  tag: {
    fontSize: '0.72rem',
    fontWeight: '500',
    padding: '0.2rem 0.6rem',
    borderRadius: '100px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'rgba(245,245,240,0.6)',
    letterSpacing: '0.02em',
  },

  // FAQ
  faqSection: {
    padding: '5rem 6rem',
    backgroundColor: 'var(--color-text-light, #f5f5f0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  faqHeading: {
    fontSize: '1.8rem',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    margin: '0 0 2.5rem',
    color: 'var(--color-text-dark, #403E3A)',
    textAlign: 'center',
  },
  faqList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '760px',
  },
  faqItem: {
    borderBottom: '1px solid rgba(64,62,58,0.12)',
  },
  faqQuestion: {
    width: '100%',
    background: 'none',
    border: 'none',
    color: 'var(--color-text-dark, #403E3A)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.4rem 0',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    gap: '1rem',
    letterSpacing: '-0.01em',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  faqIcon: {
    fontSize: '1.4rem',
    fontWeight: '300',
    opacity: 0.4,
    transition: 'transform 0.25s ease',
    flexShrink: 0,
    color: 'var(--color-text-dark, #403E3A)',
  },
  faqAnswer: {
    fontSize: '0.95rem',
    color: 'var(--color-text-dark, #403E3A)',
    opacity: 0.7,
    lineHeight: 1.8,
    paddingBottom: '1.4rem',
    margin: 0,
  },
}
