// Builds public/sitemap.xml from the pages, case studies and articles.
// Runs automatically before every build (see "build" in package.json),
// so new projects and posts are added to the sitemap without any extra steps.
import { readdirSync, existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { landingPages } from '../src/landingPages.js'

const SITE_URL = 'https://anniehowells.com'
const root = fileURLToPath(new URL('..', import.meta.url))

function slugs(dir) {
  const path = `${root}${dir}`
  if (!existsSync(path)) return []
  return readdirSync(path)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

// Each page lists which languages it really exists in.
// Swedish-only articles and projects (a file in /sv with no English twin) get a Swedish URL only.
function contentPages(dir, toPath) {
  const en = new Set(slugs(dir))
  const sv = new Set(slugs(`${dir}/sv`))
  return [...new Set([...en, ...sv])].map(slug => ({ path: toPath(slug), hasEn: en.has(slug), hasSv: sv.has(slug) }))
}

const pages = [
  ...['/', '/work', '/services', '/insights', '/about', '/enquire'].map(path => ({ path, hasEn: true, hasSv: true })),
  ...contentPages('src/projects', slug => `/${slug}`),
  ...contentPages('src/posts', slug => `/insights/${slug}`),
  // Swedish-only landing pages
  ...landingPages.map(({ slug }) => ({ path: `/${slug}`, hasEn: false, hasSv: true })),
]

const svPath = path => (path === '/' ? '/sv/' : `/sv${path}`)

function entry(loc, { path, hasEn, hasSv }) {
  const alternates = [
    hasEn ? `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${path}"/>` : null,
    hasSv ? `    <xhtml:link rel="alternate" hreflang="sv" href="${SITE_URL}${svPath(path)}"/>` : null,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${hasEn ? path : svPath(path)}"/>`,
  ].filter(Boolean)
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n${alternates.join('\n')}\n  </url>`
}

const urls = pages.flatMap(page => [
  ...(page.hasEn ? [entry(page.path, page)] : []),
  ...(page.hasSv ? [entry(svPath(page.path), page)] : []),
])

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

writeFileSync(`${root}public/sitemap.xml`, xml)
console.log(`sitemap.xml written with ${urls.length} URLs`)
