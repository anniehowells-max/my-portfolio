import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, getLang, localePath, stripLang } from '../i18n'
import { getPost, getProject, isProject, pageLanguages } from '../content'
import { getLandingPage } from '../landingPages'

const SITE_NAME = 'Annie Howells Design'

// Titles and descriptions for the fixed pages. These are what Google shows in search results.
const pageMeta = {
  en: {
    '/': {
      title: SITE_NAME,
      description: 'Annie Howells is a UX, brand and web designer and developer helping small businesses and growing brands with websites, brand identities and UX audits.',
    },
    '/work': { title: `Work | ${SITE_NAME}`, description: 'Selected web design, UX and brand identity projects by Annie Howells.' },
    '/services': { title: `Services | ${SITE_NAME}`, description: 'Web design and build, website refreshes, brand identity, UX/UI, graphic design and social media design.' },
    '/insights': { title: `Insights | ${SITE_NAME}`, description: 'Articles on web design, UX and branding for small businesses and growing brands.' },
    '/about': { title: `About | ${SITE_NAME}`, description: 'Annie Howells is a freelance web, UX/UI and brand designer.' },
    '/enquire': { title: `Contact | ${SITE_NAME}`, description: 'Get in touch to talk about your website or brand project.' },
  },
  sv: {
    '/': {
      title: `Webbdesigner och UX-konsult i Göteborg | ${SITE_NAME}`,
      description: 'Annie Howells är webbdesigner och konsult inom UX och varumärke i Göteborg. Hemsidor, visuell identitet och UX-granskningar för småföretag och växande varumärken.',
    },
    '/work': { title: `Projekt | ${SITE_NAME}`, description: 'Utvalda projekt inom webbdesign, UX och visuell identitet av Annie Howells, webbdesigner i Göteborg.' },
    '/services': {
      title: `Webbdesign, visuell identitet och UX i Göteborg | ${SITE_NAME}`,
      description: 'Webbdesign och utveckling, UX-konsult, uppfräschning av hemsidor, visuell identitet och grafisk design för företag i Göteborg och resten av Sverige.',
    },
    '/insights': { title: `Artiklar om webbdesign och UX | ${SITE_NAME}`, description: 'Artiklar om webbdesign, UX och varumärke för småföretag och växande varumärken.' },
    '/about': { title: `Om Annie Howells, webbdesigner och konsult i Göteborg | ${SITE_NAME}`, description: 'Annie Howells är frilansande webb-, UX/UI- och varumärkesdesigner och konsult baserad i Göteborg.' },
    '/enquire': { title: `Kontakt | ${SITE_NAME}`, description: 'Hör av dig om du vill prata om din hemsida eller ditt varumärke.' },
  },
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function metaFor(enPath, lang) {
  const fixed = pageMeta[lang][enPath.replace(/(.)\/$/, '$1')]
  if (fixed) return fixed

  const post = enPath.match(/^\/insights\/([^/]+)\/?$/)
  if (post) {
    const item = getPost(post[1], lang)
    if (item) return { title: `${item.title} | ${SITE_NAME}`, description: item.excerpt }
  }

  const single = enPath.match(/^\/([^/]+)\/?$/)
  const landing = single && getLandingPage(single[1])
  if (landing) return { title: landing.title, description: landing.description }

  const project = single
  if (project && isProject(project[1])) {
    const item = getProject(project[1], lang)
    if (item) return { title: `${item.title} | ${SITE_NAME}`, description: stripHtml(item.about) }
  }

  return pageMeta[lang]['/']
}

function setMeta(selector, attribute, value) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    tag.setAttribute(key, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, value)
}

function Seo() {
  const { pathname } = useLocation()
  const lang = getLang(pathname)
  const enPath = stripLang(pathname)
  const svPath = localePath('sv', enPath)
  const available = pageLanguages(enPath)

  // Point Google at the version that actually has content in this language
  const canonical =
    (lang === 'sv' && available.sv) || !available.en ? svPath : enPath
  const defaultPath = available.en ? enPath : svPath

  const { title, description } = metaFor(enPath, lang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = title
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', title)
  }, [lang, title, description])

  // React 19 moves these <link> tags into <head> automatically.
  return (
    <>
      <link rel="canonical" href={`${SITE_URL}${canonical}`} />
      {available.en && <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />}
      {available.sv && <link rel="alternate" hrefLang="sv" href={`${SITE_URL}${svPath}`} />}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${defaultPath}`} />
    </>
  )
}

export default Seo
