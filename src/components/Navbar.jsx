import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getLang, localePath, stripLang } from '../i18n'
import { pageLanguages } from '../content'

const text = {
  en: {
    work: 'Work',
    services: 'Services',
    insights: 'Insights',
    about: 'About',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  sv: {
    work: 'Projekt',
    services: 'Tjänster',
    insights: 'Artiklar',
    about: 'Om mig',
    contact: 'Kontakt',
    openMenu: 'Öppna menyn',
    closeMenu: 'Stäng menyn',
    language: 'Språk',
  },
}

const languages = [
  { code: 'sv', short: 'SV', label: 'Svenska' },
  { code: 'en', short: 'EN', label: 'English' },
]

function GlobeIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5c2.6 2.6 4 6 4 9.5s-1.4 6.9-4 9.5c-2.6-2.6-4-6-4-9.5s1.4-6.9 4-9.5z" />
    </svg>
  )
}

// Shows both languages with the current one highlighted.
// Each option links to the same page in that language.
// A Swedish-only article has no English page, so the English option goes to the article list instead
function switchHref(code, basePath) {
  if (code === 'en' && !pageLanguages(basePath).en) {
    return basePath.startsWith('/insights/') ? '/insights' : '/'
  }
  return localePath(code, basePath)
}

function LanguageSwitch({ lang, pathname, label, size = 'small', onSelect }) {
  const basePath = stripLang(pathname)
  const large = size === 'large'

  return (
    <div role="group" aria-label={label} style={large ? styles.langGroupLarge : styles.langGroup}>
      <GlobeIcon size={large ? 18 : 14} />
      {languages.map((option, i) => {
        const active = option.code === lang
        return (
          <span key={option.code} style={styles.langItem}>
            {i > 0 && <span style={styles.langSlash} aria-hidden="true">/</span>}
            {active ? (
              <span
                aria-current="true"
                title={option.label}
                style={{ ...styles.langOption, ...styles.langActive, ...(large ? styles.langOptionLarge : {}) }}
              >
                {option.short}
              </span>
            ) : (
              <a
                href={switchHref(option.code, basePath)}
                hrefLang={option.code}
                lang={option.code}
                title={option.label}
                aria-label={option.label}
                onClick={onSelect}
                style={{ ...styles.langOption, ...(large ? styles.langOptionLarge : {}) }}
                className="nav-link"
              >
                {option.short}
              </a>
            )}
          </span>
        )
      })}
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const lang = getLang(pathname)
  const t = text[lang]
  const to = (path) => localePath(lang, path)

  return (
    <>
      <div style={styles.wrapper}>
        <nav style={styles.nav}>
          <a href={to('/')} style={styles.logo}>
            <img src="/AnnieHowellsDesignAnimatedLogo.gif" alt="Annie Howells Design" style={styles.logoImg} />
          </a>
          <ul className="nav-desktop-links" style={styles.links}>
            <li><a href={to('/work')} style={styles.link} className="nav-link">{t.work}</a></li>
            <li><a href={to('/services')} style={styles.link} className="nav-link">{t.services}</a></li>
            <li><a href={to('/insights')} style={styles.link} className="nav-link">{t.insights}</a></li>
            <li><a href={to('/about')} style={styles.link} className="nav-link">{t.about}</a></li>
            <li style={styles.divider} aria-hidden="true" />
            <li><LanguageSwitch lang={lang} pathname={pathname} label={t.language} /></li>
            <li><a href={to('/enquire')} style={styles.linkBtn}>{t.contact}</a></li>
          </ul>
          <div className="nav-mobile-actions" style={styles.mobileActions}>
            <LanguageSwitch lang={lang} pathname={pathname} label={t.language} />
            <button
              className="nav-hamburger"
              onClick={() => setIsOpen(true)}
              style={styles.hamburger}
              aria-label={t.openMenu}
            >
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <rect width="20" height="1.5" rx="1" fill="currentColor"/>
                <rect y="7.25" width="20" height="1.5" rx="1" fill="currentColor"/>
                <rect y="14.5" width="20" height="1.5" rx="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div style={styles.overlay}>
          <button
            onClick={() => setIsOpen(false)}
            style={styles.closeBtn}
            aria-label={t.closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <nav style={styles.overlayNav}>
            <a href={to('/about')} style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>{t.about}</a>
            <a href={to('/work')} style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>{t.work}</a>
            <a href={to('/services')} style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>{t.services}</a>
            <a href={to('/insights')} style={styles.overlayLink} className="nav-overlay-link" onClick={() => setIsOpen(false)}>{t.insights}</a>
            <a href={to('/enquire')} style={styles.overlayBtn} onClick={() => setIsOpen(false)}>{t.contact}</a>
            <div style={styles.overlayLang}>
              <LanguageSwitch
                lang={lang}
                pathname={pathname}
                label={t.language}
                size="large"
                onSelect={() => setIsOpen(false)}
              />
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .nav-mobile-actions { display: none !important; }
        @media (max-width: 768px) {
          .nav-mobile-actions { display: flex !important; }
        }
      `}</style>
    </>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    top: '1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100,
    width: 'calc(100% - 4rem)',
    maxWidth: '780px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1.25rem 0.9rem',
    backgroundColor: 'rgba(40, 40, 40, 0.55)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '999px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoImg: {
    height: '28px',
    width: 'auto',
    display: 'block',
  },
  links: {
    gap: '1.25rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    fontWeight: '500',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-light, #f5f5f0)',
    opacity: 0.6,
    textDecoration: 'none',
  },
  linkBtn: {
    fontWeight: '600',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#fff',
    textDecoration: 'none',
    backgroundColor: 'var(--color-accent, #FF9900)',
    padding: '0.5rem 1.1rem',
    borderRadius: '999px',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '0.25rem',
    lineHeight: 0,
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(15, 15, 15, 0.97)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '1.75rem',
    right: '1.75rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '0.5rem',
    lineHeight: 0,
  },
  overlayNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  overlayLink: {
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#fff',
    textDecoration: 'none',
  },
  overlayBtn: {
    marginTop: '0.5rem',
    padding: '0.85rem 2.5rem',
    backgroundColor: 'var(--color-accent)',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    borderRadius: '999px',
    textDecoration: 'none',
  },
  overlayLang: {
    marginTop: '1.25rem',
  },
  divider: {
    width: '1px',
    height: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  mobileActions: {
    alignItems: 'center',
    gap: '1rem',
  },
  langGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--color-text-light, #f5f5f0)',
  },
  langGroupLarge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: '#fff',
  },
  langItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  langSlash: {
    fontSize: '0.7rem',
    opacity: 0.3,
  },
  langOption: {
    fontWeight: '500',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-light, #f5f5f0)',
    opacity: 0.6,
    textDecoration: 'none',
  },
  langOptionLarge: {
    fontSize: '0.95rem',
  },
  langActive: {
    opacity: 1,
    fontWeight: '700',
  },
}

export default Navbar
