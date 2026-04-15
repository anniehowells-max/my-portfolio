import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import frontMatter from 'front-matter'

const projectFiles = import.meta.glob('../projects/*.md', { query: '?raw', import: 'default', eager: true })

function getProject(slug) {
  const filepath = `../projects/${slug}.md`
  const raw = projectFiles[filepath]
  if (!raw) return null
  const { attributes, body } = frontMatter(raw)
  return { ...attributes, body }
}

function parseSections(body) {
  const sections = []
  const regex = /::(\w[\w-]*)\n([\s\S]*?)::/g
  let match
  while ((match = regex.exec(body)) !== null) {
    const type = match[1]
    const content = match[2].trim()
    if (type === 'image-grid') {
      const images = content.split('\n').map(l => l.trim()).filter(Boolean)
      sections.push({ type, images })
    } else if (type === 'image-full') {
      const [image, position] = content.split(/\s+/)
      sections.push({ type, image, position: position || 'center' })
    } else if (type === 'video-full') {
      sections.push({ type, video: content })
    } else {
      sections.push({ type, content })
    }
  }
  return sections
}

function TextSection({ content }) {
  return (
    <div
      className="post-content"
      style={styles.textSection}
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  )
}

function TextTwoCol({ content }) {
  const [left, right] = content.split('||').map(s => s.trim())
  return (
    <div className="project-two-col">
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: marked(left) }}
      />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: marked(right) }}
      />
    </div>
  )
}

function ImageFull({ image, position }) {
  return (
    <div style={{
      ...styles.imageFull,
      backgroundImage: `url(${image})`,
      backgroundPosition: position,
    }} />
  )
}

function VideoFull({ video }) {
  const isVimeo = video.includes('vimeo.com')
  if (isVimeo) {
    const id = video.match(/vimeo\.com\/(\d+)/)?.[1]
    return (
      <iframe
        src={`https://player.vimeo.com/video/${id}?autoplay=1&loop=1&muted=1&background=1`}
        style={{ width: '100%', aspectRatio: '16 / 9', border: 'none', display: 'block' }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    )
  }
  return (
    <video
      src={video}
      style={styles.videoFull}
      autoPlay
      muted
      loop
      playsInline
    />
  )
}

function ImageGrid({ images }) {
  return (
    <div className="project-image-grid">
      {images.map((img, i) => (
        <div key={i} style={{
          ...styles.imageGridItem,
          backgroundImage: `url(${img})`,
        }} />
      ))}
    </div>
  )
}

function ProjectIndividual() {
  const { slug } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <main style={styles.main}>
        <div style={styles.notFound}>
          <h1>Project not found</h1>
          <a href="/work" style={styles.backLink}>← Back to Work</a>
        </div>
      </main>
    )
  }

  const sections = parseSections(project.body)

  return (
    <main style={styles.main}>

      <div style={styles.aboveFold}>
      <div style={styles.heroWrapper}>
        <div style={styles.hero} className="project-hero">
          <div style={styles.heroLeft}>
            <h1 style={styles.title}>{project.title}</h1>
            <p style={styles.about}>{project.about}</p>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.metaBlock}>
              <p style={styles.metaLabel}>Role</p>
              <div style={styles.tags}>
                {project.role && project.role.map(tag => (
                  <span key={tag} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={styles.metaBlock}>
              <p style={styles.metaLabel}>Year</p>
              <p style={styles.metaValue}>{project.year}</p>
            </div>
            {project.url && (
              <div style={styles.metaBlock}>
                <p style={styles.metaLabel}>URL</p>
                <a href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.metaLink}
                >
                  {project.url.replace('https://', '')} →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{
        ...styles.coverImage,
        backgroundImage: project.coverImage ? `url(${project.coverImage.split(' ')[0]})` : 'none',
        backgroundPosition: project.coverImage?.split(' ')[1] || 'center',
        backgroundColor: '#d4c9b8',
      }} />
      </div>

      <div style={styles.body}>
        {sections.map((section, i) => {
          if (section.type === 'text') return <TextSection key={i} content={section.content} />
          if (section.type === 'text-two-col') return <TextTwoCol key={i} content={section.content} />
          if (section.type === 'image-full') return <ImageFull key={i} image={section.image} position={section.position} />
          if (section.type === 'video-full') return <VideoFull key={i} video={section.video} />
          if (section.type === 'image-grid') return <ImageGrid key={i} images={section.images} />
          return null
        })}
      </div>

      <div style={styles.footerWrapper}>
        <div style={styles.footer}>
          <a href="/work" style={styles.backLink}>← Back to Work</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-hero {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 7rem 1.5rem 2.5rem !important;
          }
        }
      `}</style>
    </main>
  )
}

const styles = {
  main: {
    backgroundColor: 'var(--color-background)',
    minHeight: '100vh',
  },
  aboveFold: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  heroWrapper: {
    backgroundColor: 'var(--color-text-dark)',
  },
  hero: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '8rem 4rem 4rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6rem',
    alignItems: 'start',
  },
  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  heroRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    paddingTop: '0.5rem',
  },
  title: {
    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    color: '#fff',
  },
  about: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Lora, serif',
  },
  metaBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  metaLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-accent)',
  },
  metaValue: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.7)',
  },
  metaLink: {
    fontSize: '0.95rem',
    color: 'var(--color-accent)',
    textDecoration: 'underline',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.2rem 0.65rem',
    borderRadius: '100px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.8)',
  },
  coverImage: {
    flex: 1,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  textSection: {
    maxWidth: '680px',
    padding: '3rem 4rem',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  imageFull: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#e8e6e0',
  },
  videoFull: {
    width: '100%',
    aspectRatio: '16 / 9',
    display: 'block',
    lineHeight: 0,
  },
  imageGridItem: {
    aspectRatio: '1 / 1',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#e8e6e0',
  },
  footerWrapper: {
    backgroundColor: 'var(--color-background)',
  },
  footer: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '3rem 4rem 6rem',
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

export default ProjectIndividual