import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import frontMatter from 'front-matter'

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function getPosts() {
    console.log('Post files:', postFiles)
  console.log('Keys:', Object.keys(postFiles))
  return Object.entries(postFiles).map(([filepath, content]) => {
    const slug = filepath.replace('../posts/', '').replace('.md', '')
    const { attributes } = frontMatter(content)
return { slug, ...attributes }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
}

function PostCard({ slug, title, date, tags, excerpt, coverImage, navigate, number }) {
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
          <span style={styles.postNumber}>{String(number).padStart(2, '0')}</span>
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
        <h2 style={styles.postTitle}>{title}</h2>
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

const heroImage = '/images/insights-hero.jpg'

function Blog() {
  const posts = getPosts()
  const navigate = useNavigate()
  const [activeTag, setActiveTag] = useState(null)

  const allTags = [...new Set(posts.flatMap(p => p.tags || []))].sort()
  const filtered = activeTag ? posts.filter(p => p.tags && p.tags.includes(activeTag)) : posts

  return (
    <div style={styles.page}>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <h1 style={styles.heroTitle}>Insights</h1>
      </section>

      {/* Filter bar */}
      <div style={styles.filterBar}>
        <button
          className={`filter-btn${activeTag === null ? ' active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Three-column grid */}
      <section style={styles.grid} className="insights-grid">
        {filtered.map((post) => PostCard({ ...post, navigate, number: posts.length - posts.findIndex(p => p.slug === post.slug) }))}
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .insights-grid {
            grid-template-columns: 1fr !important;
          }
          .insights-filter-bar {
            padding: 1.25rem 1.5rem !important;
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
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(40, 38, 35, 0.35)",
  },
  heroTitle: {
    position: "relative",
    zIndex: 1,
    fontSize: "clamp(3rem, 8vw, 6rem)",
    fontWeight: "700",
    letterSpacing: "-0.03em",
    lineHeight: 1,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
    animation: "fadeUp 0.7s ease both",
  },

  // Filter bar
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    padding: "1.5rem 6rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  // Three-column grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderLeft: "1px solid rgba(255,255,255,0.08)",
  },

  // Post blocks
  postBlock: {
    borderRight: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
    display: "flex",
    flexDirection: "column",
  },
  coverImage: {
    width: "100%",
    aspectRatio: "16 / 9",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "block",
    flexShrink: 0,
  },
  postBody: {
    padding: "1.75rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flex: 1,
  },
  postMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postNumber: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    opacity: 0.25,
    fontVariantNumeric: "tabular-nums",
  },
  postDate: {
    fontSize: "0.72rem",
    opacity: 0.3,
    letterSpacing: "0.04em",
  },
  postTitle: {
    fontSize: "1.05rem",
    fontWeight: "600",
    letterSpacing: "-0.02em",
    lineHeight: 1.35,
    margin: 0,
    color: "var(--color-text-light, #f5f5f0)",
  },
  excerpt: {
    fontSize: "0.88rem",
    opacity: 0.5,
    lineHeight: 1.7,
    margin: 0,
  },
  postFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "0.5rem",
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
  },
}

export default Blog
