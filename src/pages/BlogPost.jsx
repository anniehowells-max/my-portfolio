import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import frontMatter from 'front-matter'

const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

function getPost(slug) {
  const filepath = `../posts/${slug}.md`
  const raw = postFiles[filepath]
  if (!raw) return null
  const { attributes, body } = frontMatter(raw)
  return { ...attributes, content: body }
}

function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <main style={styles.main}>
        <div style={styles.notFound}>
          <h1>Post not found</h1>
          <a href="/insights" style={styles.backLink}>← Back to Insights</a>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        <div style={styles.tags}>
          {post.tags && post.tags.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.date}>
          {new Date(`${post.date}T00:00:00`).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        <div style={{
          ...styles.coverImage,
          backgroundImage: post.coverImage ? `url(${post.coverImage})` : 'none',
          backgroundColor: '#d4c9b8',
        }} />

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />

        <div style={styles.cta}>
          <p style={styles.ctaText}>
            {post.ctaText || "I design UX-led websites for small businesses and growing brands that need clarity, structure and long-term performance. If you have a project in mind, I'd love to hear from you."}
          </p>
          <p style={styles.ctaHeading}>{post.ctaHeading || 'Get in touch to discuss your project.'}</p>
          <a href="/enquire" style={styles.ctaButton}>Enquire</a>
        </div>

        <a href="/insights" style={styles.backLink}>← Back to Insights</a>

      </div>
    </main>
  )
}

const styles = {
  main: {
    backgroundColor: 'var(--color-background)',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '740px',
    margin: '0 auto',
    padding: '6rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  tags: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.2rem 0.65rem',
    borderRadius: '100px',
    backgroundColor: 'var(--color-background)',
    border: '1px solid #ddd',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.15',
  },
  date: {
    fontSize: '0.9rem',
    color: '#888',
  },
  coverImage: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '0',
  },
  cta: {
    borderTop: '1px solid var(--color-accent)',
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  ctaText: {
    fontSize: '1rem',
    color: '#444',
  },
  ctaHeading: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--color-text-dark)',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    width: 'fit-content',
  },
  backLink: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: 'var(--color-accent)',
  },
  notFound: {
    padding: '6rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
}

export default BlogPost