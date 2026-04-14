import frontMatter from 'front-matter'
import { useNavigate } from 'react-router-dom'

const projectFiles = import.meta.glob('../projects/*.md', { query: '?raw', import: 'default', eager: true })

function getProjects() {
  return Object.entries(projectFiles)
    .map(([filepath, content]) => {
      const slug = filepath.replace('../projects/', '').replace('.md', '')
      const { attributes } = frontMatter(content)
      return { slug, ...attributes }
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

const heroImage = '/images/work-hero.jpg bottom'

function ProjectCollection() {
  const projects = getProjects()
  const navigate = useNavigate()

  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={styles.hero} className="work-hero">
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Work</h1>
          <h2 style={styles.heroSubtitle} className="work-hero-subtitle">Design that makes an impact.</h2>
        </div>
      </section>

      {/* Two-column layout */}
      <section style={styles.twoCol} className="work-two-col">

        {/* Left sticky column */}
        <div style={styles.leftCol} className="work-left-col">
          <h2 style={styles.leftHeading}>
            Design that<br />makes an impact.
          </h2>
        </div>

        {/* Right project rows */}
        <div style={styles.rightCol} className="work-right-col">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              style={styles.projectBlock}
              onClick={() => navigate(`/${project.slug}`)}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {/* Full-bleed cover image */}
              {(project.cardImage || project.coverImage) && (
                <div
                  style={{
                    ...styles.coverImage,
                    backgroundImage: `url(${(project.cardImage || project.coverImage).split(' ')[0]})`,
                  }}
                />
              )}

              {/* Text row */}
              <div style={styles.projectRow}>
                <span style={styles.projectNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={styles.projectContent}>
                  <div style={styles.projectMeta}>
                    <h2 style={styles.projectTitle}>{project.title}</h2>
                    {project.year && (
                      <span style={styles.projectYear}>{project.year}</span>
                    )}
                  </div>
                  {project.role && (
                    <div style={styles.tags}>
                      {project.role.map(tag => (
                        <span key={tag} style={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <span style={styles.arrow}>→</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .work-two-col {
            grid-template-columns: 1fr !important;
          }
          .work-left-col {
            display: none !important;
          }
          .work-right-col {
            border-left: none !important;
          }
          .work-hero-subtitle {
            display: block !important;
          }
          .work-hero {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: "var(--color-text-dark, #403E3A)",
    color: "var(--color-text-light, #f5f5f0)",
    minHeight: "100vh",
    fontFamily: "'Instrument Sans', sans-serif",
  },

  // Hero
  hero: {
    position: "relative",
    height: "50vh",
    backgroundImage: `url(${heroImage.split(' ')[0]})`,
    backgroundSize: "cover",
    backgroundPosition: heroImage.split(' ')[1] || 'center',
    display: "flex",
    alignItems: "flex-end",
    padding: "3rem 6rem",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(40, 38, 35, 0.35)",
  },
  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
    animation: "fadeUp 0.7s ease both",
  },
  heroSubtitle: {
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1.2,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
    display: "none",
  },

  // Two-column layout
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    alignItems: "start",
  },

  // Left sticky column
  leftCol: {
    position: "sticky",
    top: "5rem",
    padding: "5rem 4rem 5rem 6rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  eyebrow: {
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.4,
    margin: 0,
  },
  leftHeading: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1.2,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
  },
  leftBody: {
    fontSize: "0.95rem",
    opacity: 0.5,
    lineHeight: 1.8,
    margin: 0,
  },
  leftCta: {
    display: "inline-block",
    marginTop: "0.5rem",
    padding: "0.85rem 2.2rem",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "var(--color-text-light, #f5f5f0)",
    textDecoration: "none",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: "600",
    transition: "background 0.2s, border-color 0.2s",
    borderRadius: "2px",
    alignSelf: "flex-start",
  },

  // Right column
  rightCol: {
    borderLeft: "1px solid rgba(255,255,255,0.08)",
  },

  // Project blocks
  projectBlock: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
  coverImage: {
    width: "100%",
    aspectRatio: "16 / 9",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "block",
  },
  projectRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.6rem 2rem 1.6rem 3rem",
  },
  projectNumber: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    opacity: 0.25,
    minWidth: "1.8rem",
    fontVariantNumeric: "tabular-nums",
    flexShrink: 0,
  },
  projectContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  projectMeta: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
  },
  projectTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
  },
  projectYear: {
    fontSize: "0.75rem",
    opacity: 0.3,
    letterSpacing: "0.05em",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
  },
  tag: {
    fontSize: "0.72rem",
    fontWeight: "500",
    padding: "0.2rem 0.6rem",
    borderRadius: "100px",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "rgba(245,245,240,0.6)",
    letterSpacing: "0.02em",
  },
  arrow: {
    fontSize: "1rem",
    opacity: 0.3,
    flexShrink: 0,
    paddingRight: "0.5rem",
  },
}

export default ProjectCollection
