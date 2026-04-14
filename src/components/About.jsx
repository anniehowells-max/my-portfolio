function About() {
  return (
    <section id="about" style={styles.section}>
      <div className="about-inner">
        <div style={styles.textBlock}>
          <h2 style={styles.heading}>About me</h2>
          <p style={styles.body}>
            I’m Annie — a freelance web, UX/UI and brand designer based in London. 
            I create thoughtful digital experiences and identities that help brands 
            connect with the people who matter.
          </p>
          <p style={styles.body}>
            When I'm not designing, you'll probably find me exploring London,
            hunting for yarn and cacti, or tinkering with side projects like,
            well, building this site from scratch.
          </p>
          <div style={styles.skills}>
            {skills.map(skill => (
              <span key={skill} style={styles.skill}>{skill}</span>
            ))}
          </div>
          <a href="/about" style={styles.button}>More about me</a>
        </div>
        <div className="about-image" style={{
          ...styles.imagePlaceholder,
        backgroundImage: 'url(/images/annie-vizcaya.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        }} />
      </div>
    </section>
  )
}

const skills = [
  'UX Design',
  'UI Design',
  'User Research',
  'Prototyping',
  'Figma',
  'Usability Testing',
]

const styles = {
  section: {
    padding: '6rem 4rem',
    backgroundColor: '#fff',
  },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#444',
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  skill: {
    fontSize: '0.8rem',
    fontWeight: '500',
    padding: '0.25rem 0.75rem',
    borderRadius: '100px',
    backgroundColor: 'var(--color-background)',
    border: '1px solid #ddd',
  },
  button: {
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
  imagePlaceholder: {
    width: '100%',
    aspectRatio: '4 / 5',
    backgroundColor: '#e8e6e0',
    borderRadius: '0',
  },
}

export default About