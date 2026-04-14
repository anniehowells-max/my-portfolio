import { useNavigate } from 'react-router-dom'
import frontMatter from 'front-matter'

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function getLatestPosts() {
  return Object.entries(postFiles)
    .map(([filepath, content]) => {
      const slug = filepath.replace('../posts/', '').replace('.md', '')
      const { attributes } = frontMatter(content)
      return { slug, ...attributes }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
}

function PostCard({ slug, title, date, tags, excerpt, coverImage }, i) {
  const navigate = useNavigate()

  return (
    <div
      key={slug}
      style={styles.postBlock}
      onClick={() => navigate(`/insights/${slug}`)}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      {coverImage && (
        <div
          style={{
            ...styles.coverImage,
            backgroundImage: `url(${coverImage})`,
          }}
        />
      )}
      <div style={styles.postBody}>
        <div style={styles.postMeta}>
          <span style={styles.postNumber}>{String(i + 1).padStart(2, '0')}</span>
          {date && (
            <span style={styles.postDate}>
              {new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
        <h3 style={styles.postTitle}>{title}</h3>
        {excerpt && <p style={styles.excerpt}>{excerpt}</p>}
        <div style={styles.postFooter}>
          {tags && tags.length > 0 && (
            <div style={styles.tags}>
              {tags.map(tag => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
          <span style={styles.arrow}>→</span>
        </div>
      </div>
    </div>
  )
}

function LatestInsights() {
  const posts = getLatestPosts()

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Latest Insights</h2>
        <a href="/insights" style={styles.viewAll}>View all →</a>
      </div>
      <div style={styles.grid} className="insights-grid">
        {posts.map((post, i) => PostCard(post, i))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .insights-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            border-left: none !important;
            -webkit-overflow-scrolling: touch;
          }
          .insights-grid > * {
            flex: 0 0 80vw !important;
            scroll-snap-align: start;
            border-left: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  )
}

const styles = {
  section: {
    backgroundColor: 'var(--color-text-dark, #403E3A)',
    padding: '4rem 0 0',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '3rem',
    padding: '0 4rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: 'var(--color-text-light, #f5f5f0)',
  },
  viewAll: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--color-accent)',
    letterSpacing: '0.02em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
  },
  postBlock: {
    borderRight: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  coverImage: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'block',
    flexShrink: 0,
  },
  postBody: {
    padding: '1.75rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postNumber: {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    opacity: 0.25,
    fontVariantNumeric: 'tabular-nums',
    color: 'var(--color-text-light, #f5f5f0)',
  },
  postDate: {
    fontSize: '0.72rem',
    opacity: 0.3,
    letterSpacing: '0.04em',
    color: 'var(--color-text-light, #f5f5f0)',
  },
  postTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    letterSpacing: '-0.02em',
    lineHeight: 1.35,
    margin: 0,
    color: 'var(--color-text-light, #f5f5f0)',
  },
  excerpt: {
    fontSize: '0.88rem',
    opacity: 0.5,
    lineHeight: 1.7,
    margin: 0,
    color: 'var(--color-text-light, #f5f5f0)',
  },
  postFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: '0.5rem',
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
  arrow: {
    fontSize: '1rem',
    opacity: 0.3,
    flexShrink: 0,
    color: 'var(--color-text-light, #f5f5f0)',
  },
}

export default LatestInsights
