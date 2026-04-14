const logos = [
  { name: 'DesDeck', src: '/images/logomarquee/desdecklogo.png' },
  { name: 'Client Two', src: '/images/logomarquee/genauralogo.png' },
  { name: 'Client Three', src: '/images/logomarquee/bandainamcologo.png' },
  { name: 'Client Four', src: '/images/logomarquee/lebaralogo.png' },
  { name: 'Client Five', src: '/images/logomarquee/wolfielogo.png' },
  { name: 'Client Six', src: '/images/logomarquee/oetkerhotelslogo.png' },
  { name: 'Client Seven', src: '/images/logomarquee/marketingweeklogo.png' },
]

function LogoMarquee() {
  const doubled = [...logos, ...logos]

  return (
    <section style={styles.section}>
      <div style={styles.track}>
        <div style={styles.marquee}>
          {doubled.map((logo, index) => (
            <div key={index} style={styles.logoItem}>
              <img src={logo.src} alt={logo.name} style={styles.logoImg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '2rem 0',
    backgroundColor: 'var(--color-text-dark)',
    overflow: 'hidden',
  },
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  marquee: {
    display: 'flex',
    width: 'max-content',
    animation: 'marquee 20s linear infinite',
    alignItems: 'center',
  },
  logoItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    paddingRight: '4rem',
  },
  logoImg: {
    maxHeight: '60px',
    width: 'auto',
  },
  logoText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--color-text-light)',
    opacity: 0.5,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
}

export default LogoMarquee