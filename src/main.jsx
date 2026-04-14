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

inject()
injectSpeedInsights()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/insights" element={<Layout><Blog /></Layout>} />
        <Route path="/insights/:slug" element={<Layout><BlogPost /></Layout>} />
        <Route path="/work" element={<Layout><ProjectCollection /></Layout>} />
        <Route path="/enquire" element={<Layout><ContactPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/:slug" element={<Layout><ProjectIndividual /></Layout>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)