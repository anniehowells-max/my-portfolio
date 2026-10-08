import { useLocale } from '../i18n'

const text = {
  en: {
    heading: 'About me',
    intro: 'I’m Annie — a freelance web, UX/UI and brand designer based in London and Sweden. I create thoughtful digital experiences and identities that help brands connect with the people who matter.',
    personal: "When I'm not designing, you'll probably find me exploring London, hunting for yarn and cacti, or tinkering with side projects like, well, building this site from scratch.",
    skills: ['UX Design', 'UI Design', 'User Research', 'Prototyping', 'Figma', 'Usability Testing'],
    button: 'More about me',
  },
  sv: {
    heading: 'Om mig',
    intro: 'Jag heter Annie och är frilansande webb-, UX/UI- och varumärkesdesigner och konsult i Göteborg och London. Jag skapar genomtänkta digitala upplevelser och identiteter som hjälper varumärken att nå rätt kunder.',
    personal: 'När jag inte designar hittar du mig oftast i en garnbutik eller plantskola, eller pysslandes med sidoprojekt, t.ex. att bygga den här sajten från grunden.',
    skills: ['UX-design', 'UI-design', 'Användarundersökningar', 'Prototyper', 'Figma', 'Användbarhetstester'],
    button: 'Mer om mig',
  },
}

function About() {
  const { lang, to } = useLocale()
  const t = text[lang]

  return (
    <section id="about" style={styles.section}>
      <div className="about-inner">
        <div style={styles.textBlock}>
          <h2 style={styles.heading}>{t.heading}</h2>
          <p style={styles.body}>{t.intro}</p>
          <p style={styles.body}>{t.personal}</p>
          <div style={styles.skills}>
            {t.skills.map(skill => (
              <span key={skill} style={styles.skill}>{skill}</span>
            ))}
          </div>
          <a href={to('/about')} style={styles.button}>{t.button}</a>
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