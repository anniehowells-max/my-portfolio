import frontMatter from 'front-matter'
import { getLandingPage } from './landingPages'

// English content lives in src/projects and src/posts.
// Swedish versions go in src/projects/sv and src/posts/sv with the same file name.
// A Swedish file only needs the fields that change (title, about, role, sector, etc.);
// everything else (images, order, url, date) is taken from the English file.
// A Swedish file without an English twin is a Swedish-only page: it needs all its own
// fields and only appears on the Swedish site.
const raw = {
  projects: {
    en: import.meta.glob('./projects/*.md', { query: '?raw', import: 'default', eager: true }),
    sv: import.meta.glob('./projects/sv/*.md', { query: '?raw', import: 'default', eager: true }),
  },
  posts: {
    en: import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }),
    sv: import.meta.glob('./posts/sv/*.md', { query: '?raw', import: 'default', eager: true }),
  },
}

function bySlug(files) {
  const map = {}
  for (const [filepath, content] of Object.entries(files)) {
    map[filepath.split('/').pop().replace(/\.md$/, '')] = content
  }
  return map
}

const sources = {
  projects: { en: bySlug(raw.projects.en), sv: bySlug(raw.projects.sv) },
  posts: { en: bySlug(raw.posts.en), sv: bySlug(raw.posts.sv) },
}

export function hasTranslation(kind, slug) {
  return Boolean(sources[kind].sv[slug])
}

export function hasEnglish(kind, slug) {
  return Boolean(sources[kind].en[slug])
}

// Tag names shown on the Swedish site
const tagsSv = {
  'Branding': 'Varumärke',
  'Small Business': 'Småföretag',
  'UX Design': 'UX-design',
  'Web Design': 'Webbdesign',
}

function localiseTags(item, lang) {
  if (lang !== 'sv' || !Array.isArray(item.tags)) return item
  return { ...item, tags: item.tags.map(tag => tagsSv[tag] || tag) }
}

function load(kind, slug, lang) {
  const english = sources[kind].en[slug]
  const svRaw = lang === 'sv' ? sources[kind].sv[slug] : null

  // Swedish-only page
  if (!english) {
    if (!svRaw) return null
    const sv = frontMatter(svRaw)
    return localiseTags({ slug, ...sv.attributes, body: sv.body, contentLang: 'sv' }, lang)
  }

  const en = frontMatter(english)
  if (!svRaw) {
    return localiseTags({ slug, ...en.attributes, body: en.body, contentLang: 'en' }, lang)
  }

  const sv = frontMatter(svRaw)
  // Calls to action are written per language, so never borrow the English ones
  const { ctaText: _ctaText, ctaHeading: _ctaHeading, ...shared } = en.attributes
  return localiseTags({
    slug,
    ...shared,
    ...sv.attributes,
    body: sv.body.trim() ? sv.body : en.body,
    contentLang: 'sv',
  }, lang)
}

function allSlugs(kind, lang) {
  const slugs = new Set(Object.keys(sources[kind].en))
  if (lang === 'sv') Object.keys(sources[kind].sv).forEach(slug => slugs.add(slug))
  return [...slugs]
}

export function getProject(slug, lang) {
  return load('projects', slug, lang)
}

export function getProjects(lang) {
  return allSlugs('projects', lang)
    .map(slug => load('projects', slug, lang))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

export function isProject(slug) {
  return Boolean(sources.projects.en[slug] || sources.projects.sv[slug])
}

export function getPost(slug, lang) {
  return load('posts', slug, lang)
}

export function getPosts(lang) {
  return allSlugs('posts', lang)
    .map(slug => load('posts', slug, lang))
    .sort((a, b) => new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`))
}

// Which languages a page exists in, given its English-style path (/work, /insights/slug, /orserio)
export function pageLanguages(enPath) {
  const landing = enPath.match(/^\/([^/]+)\/?$/)
  if (landing && getLandingPage(landing[1])) return { en: false, sv: true }
  const post = enPath.match(/^\/insights\/([^/]+)\/?$/)
  if (post) return { en: hasEnglish('posts', post[1]), sv: hasTranslation('posts', post[1]) }
  const project = enPath.match(/^\/([^/]+)\/?$/)
  if (project && isProject(project[1])) {
    return { en: hasEnglish('projects', project[1]), sv: hasTranslation('projects', project[1]) }
  }
  return { en: true, sv: true }
}
