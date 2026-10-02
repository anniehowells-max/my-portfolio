import { useLocale } from '../i18n'

const text = {
  en: {
    overline: 'Contact',
    heading: "Let's work together",
    body: "I'm currently open to new projects. Whether you have a project in mind, a question, or just want to say hi — I'd love to hear from you.",
    button: 'Get in touch',
  },
  sv: {
    overline: 'Kontakt',
    heading: 'Ska vi jobba ihop?',
    body: 'Jag tar just nu emot nya projekt. Har du något på gång, en fråga eller vill bara säga hej? Hör gärna av dig.',
    button: 'Hör av dig',
  },
}

function Contact() {
  const { lang, to } = useLocale()
  const t = text[lang]

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.inner}>
        <p style={styles.overline}>{t.overline}</p>
        <h2 style={styles.heading}>{t.heading}</h2>
        <p style={styles.body}>{t.body}</p>
        <a href={to('/enquire')} style={styles.button}>{t.button}</a>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 4rem',
    backgroundColor: 'var(--color-background)',
  },
  inner: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-accent)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
    color: 'var(--color-text-dark)',
    margin: 0,
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: 'var(--color-text-dark)',
    opacity: 0.6,
    margin: 0,
  },
  button: {
    display: 'inline-block',
    padding: '0.85rem 2rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text-light)',
    fontWeight: '600',
    fontSize: '0.95rem',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
}

export default Contact
