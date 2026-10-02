import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import { useLocale } from '../i18n'
import { getPost } from '../content'

const text = {
  en: {
    notFound: 'Post not found',
    back: '← Back to Insights',
    englishOnly: '',
    ctaText: "I design UX-led websites for small businesses and growing brands that need clarity, structure and long-term performance. If you have a project in mind, I'd love to hear from you.",
    ctaHeading: 'Get in touch to discuss your project.',
    ctaButton: 'Enquire',
  },
  sv: {
    notFound: 'Artikeln hittades inte',
    back: '← Tillbaka till artiklar',
    englishOnly: 'Den här artikeln finns just nu bara på engelska.',
    ctaText: 'Jag designar UX-drivna webbplatser för små företag och växande varumärken som behöver tydlighet, struktur och en webbplats som håller över tid. Har du ett projekt på gång? Hör gärna av dig.',
    ctaHeading: 'Kontakta mig så pratar vi om ditt projekt.',
    ctaButton: 'Kontakta mig',
  },
}

function BlogPost() {
  const { slug } = useParams()
  const { lang, to, dateLocale } = useLocale()
  const t = text[lang]
  const post = getPost(slug, lang)

  // Use the article's own call to action only when it's in the page language
  const useOwnCta = post && post.contentLang === lang

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <main style={styles.main}>
        <div style={styles.notFound}>
          <h1>{t.notFound}</h1>
          <a href={to('/insights')} style={styles.backLink}>{t.back}</a>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        {post.contentLang !== lang && (
          <p style={styles.languageNote}>{t.englishOnly}</p>
        )}

        <div style={styles.tags}>
          {post.tags && post.tags.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
        <h1 style={styles.title} lang={post.contentLang}>{post.title}</h1>
        <p style={styles.date}>
          {new Date(`${post.date}T00:00:00`).toLocaleDateString(dateLocale, {
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
          lang={post.contentLang}
          dangerouslySetInnerHTML={{ __html: marked(post.body) }}
        />

        <div style={styles.cta}>
          <p style={styles.ctaText}>
            {(useOwnCta && post.ctaText) || t.ctaText}
          </p>
          <p style={styles.ctaHeading}>{(useOwnCta && post.ctaHeading) || t.ctaHeading}</p>
          <a href={to('/enquire')} style={styles.ctaButton}>{t.ctaButton}</a>
        </div>

        <a href={to('/insights')} style={styles.backLink}>{t.back}</a>

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
  languageNote: {
    fontSize: '0.9rem',
    color: '#888',
    margin: 0,
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