import { useLocation } from 'react-router-dom'

export const SITE_URL = 'https://anniehowells.com'

// Swedish pages live under /sv, English pages at the root.
export function getLang(pathname) {
  return pathname === '/sv' || pathname.startsWith('/sv/') ? 'sv' : 'en'
}

// Turns an English path into its Swedish equivalent: /work -> /sv/work, / -> /sv/
export function localePath(lang, path) {
  if (lang !== 'sv') return path
  return path === '/' ? '/sv/' : `/sv${path}`
}

// Turns any path back into its English equivalent: /sv/work -> /work, /sv -> /
export function stripLang(pathname) {
  if (pathname === '/sv' || pathname === '/sv/') return '/'
  if (pathname.startsWith('/sv/')) return pathname.slice(3)
  return pathname
}

export function useLocale() {
  const { pathname } = useLocation()
  const lang = getLang(pathname)
  return {
    lang,
    to: (path) => localePath(lang, path),
    dateLocale: lang === 'sv' ? 'sv-SE' : 'en-GB',
  }
}
