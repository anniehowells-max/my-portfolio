import { useNavigate } from 'react-router-dom'
import frontMatter from 'front-matter'

const projectFiles = import.meta.glob('../projects/*.md', { query: '?raw', import: 'default', eager: true })

function getProjects() {
  return Object.entries(projectFiles)
    .map(([filepath, content]) => {
      const slug = filepath.replace('../projects/', '').replace('.md', '')
      const { attributes } = frontMatter(content)
      return { slug, ...attributes }
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 3)
}

function Projects() {
  const projects = getProjects()
  const navigate = useNavigate()

  return (
    <section id="projects" style={styles.section} className="projects-section">

      {/* Left sticky column */}
      <div style={styles.leftCol} className="projects-left-col">
        <h2 style={styles.leftHeading}>Selected Work</h2>
        <a href="/work" style={styles.leftCta}>See all projects</a>
      </div>

      {/* Right project column */}
      <div style={styles.rightCol} className="projects-right-col">
        <style>{`
          @media (max-width: 768px) {
            .projects-section {
              grid-template-columns: 1fr !important;
            }
            .projects-left-col {
              position: static !important;
              padding: 2.5rem 1.5rem !important;
              border-bottom: 1px solid rgba(64,62,58,0.12);
              flex-direction: row !important;
              align-items: center !important;
              justify-content: space-between !important;
            }
            .projects-right-col {
              border-left: none !important;
            }
          }
        `}</style>
        {projects.map((project, i) => (
          <div
            key={project.slug}
            style={styles.projectBlock}
            onClick={() => navigate(`/${project.slug}`)}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            {(project.cardImage || project.coverImage) && (
              <div
                style={{
                  ...styles.coverImage,
                  backgroundImage: `url(${(project.cardImage || project.coverImage).split(' ')[0]})`,
                }}
              />
            )}
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
  )
}

const styles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    alignItems: 'start',
  },
  leftCol: {
    position: 'sticky',
    top: '5rem',
    padding: '5rem 4rem 5rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    alignItems: 'flex-start',
  },
  leftHeading: {
    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    margin: 0,
    color: 'var(--color-text-dark, #403E3A)',
  },
  leftCta: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    marginTop: '0.5rem',
    padding: '0.75rem 1.75rem',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    borderRadius: '4px',
    textDecoration: 'none',
  },
  rightCol: {
    borderLeft: '1px solid rgba(64,62,58,0.12)',
  },
  projectBlock: {
    borderBottom: '1px solid rgba(64,62,58,0.12)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  coverImage: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'block',
  },
  projectRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.6rem 2rem 1.6rem 3rem',
  },
  projectNumber: {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    opacity: 0.25,
    minWidth: '1.8rem',
    fontVariantNumeric: 'tabular-nums',
    flexShrink: 0,
    color: 'var(--color-text-dark, #403E3A)',
  },
  projectContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  projectMeta: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
  },
  projectTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    margin: 0,
    color: 'var(--color-text-dark, #403E3A)',
  },
  projectYear: {
    fontSize: '0.75rem',
    opacity: 0.4,
    letterSpacing: '0.05em',
    color: 'var(--color-text-dark, #403E3A)',
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
    backgroundColor: 'rgba(64,62,58,0.08)',
    color: 'rgba(64,62,58,0.6)',
    letterSpacing: '0.02em',
  },
  arrow: {
    fontSize: '1rem',
    opacity: 0.3,
    flexShrink: 0,
    paddingRight: '0.5rem',
    color: 'var(--color-text-dark, #403E3A)',
  },
}

export default Projects
