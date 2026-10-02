import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './index.css'
import App from './App'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ProjectCollection from './pages/ProjectCollection'
import ProjectIndividual from './pages/ProjectIndividual'
import Layout from './components/Layout'
import ContactPage from './pages/Contact'
import ServicesPage from './pages/Services'
import AboutPage from './pages/About'
import LandingPage from './pages/LandingPage'
import { landingPages } from './landingPages'

inject()
injectSpeedInsights()

const pages = [
  { path: '/', element: <App /> },
  { path: '/insights', element: <Blog /> },
  { path: '/insights/:slug', element: <BlogPost /> },
  { path: '/work', element: <ProjectCollection /> },
  { path: '/enquire', element: <ContactPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/:slug', element: <ProjectIndividual /> },
]

// Every page exists twice: in English at the root and in Swedish under /sv
const routes = [
  ...pages.flatMap(({ path, element }) => [
    { path, element },
    { path: path === '/' ? '/sv' : `/sv${path}`, element },
  ]),
  // Swedish-only landing pages (content in src/landingPages.js)
  ...landingPages.map(({ slug }) => ({
    path: `/sv/${slug}`,
    element: <LandingPage slug={slug} />,
  })),
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Layout>{element}</Layout>} />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
