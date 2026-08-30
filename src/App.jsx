import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import SiteStructuredData from './components/SiteStructuredData.jsx'
import PageStructuredData from './components/PageStructuredData.jsx'
import { initAnalytics, trackPageView, wireEventDelegation } from './lib/analytics.js'

import Home from './pages/Home.jsx'

/**
 * Route-level code splitting.
 *
 * Home is imported eagerly because it is the landing route and the one whose
 * Largest Contentful Paint matters most — lazy-loading it would put a network
 * round trip in front of the hero. Every other route is a separate chunk, so a
 * visitor who lands on a course page never downloads the homepage's canvas
 * work, the training finder or the qualification lattice.
 */
const About = lazy(() => import('./pages/About.jsx'))
const Programmes = lazy(() => import('./pages/Programmes.jsx'))
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'))
const ShortCourses = lazy(() => import('./pages/ShortCourses.jsx'))
const CorporateTraining = lazy(() => import('./pages/CorporateTraining.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const BusinessSolutions = lazy(() => import('./pages/BusinessSolutions.jsx'))
const BBBEEConsulting = lazy(() => import('./pages/BBBEEConsulting.jsx'))
const Recruitment = lazy(() => import('./pages/Recruitment.jsx'))
const OfficeRental = lazy(() => import('./pages/OfficeRental.jsx'))
const Industries = lazy(() => import('./pages/Industries.jsx'))
const AssessmentCentre = lazy(() => import('./pages/AssessmentCentre.jsx'))
const GrowthPathways = lazy(() => import('./pages/GrowthPathways.jsx'))
const Insights = lazy(() => import('./pages/Insights.jsx'))
const InsightArticle = lazy(() => import('./pages/InsightArticle.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

/** GA4 has send_page_view off, so a client-side navigation reports its own. */
function PageViews() {
  const { pathname } = useLocation()
  useEffect(() => {
    // After the route's own usePageMeta has set document.title.
    const t = setTimeout(() => trackPageView(pathname, document.title), 0)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    initAnalytics()
    return wireEventDelegation()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-cloud">
      <ScrollToTop />
      <PageViews />
      <SiteStructuredData />
      <PageStructuredData />
      <Navbar />
      <main className="flex-1">
        {/* A plain reserved block, not a spinner: the fallback is on screen
            for a few hundred milliseconds at most, and something that animates
            in and out in that window reads as a glitch. The min-height keeps
            the footer from jumping up, which is the layout shift this would
            otherwise introduce. */}
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          {/* One template for all 26 qualifications. The slug carries the NQF
              level because names repeat across levels; a bare SAQA ID still
              resolves and redirects to the canonical slug. */}
          <Route path="/programmes/:slug" element={<CourseDetail />} />
          <Route path="/short-courses" element={<ShortCourses />} />
          <Route path="/corporate-training" element={<CorporateTraining />} />
          <Route path="/services" element={<Services />} />
          <Route path="/business-solutions" element={<BusinessSolutions />} />
          <Route path="/bbbee-consulting" element={<BBBEEConsulting />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/office-rental" element={<OfficeRental />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/assessment-centre" element={<AssessmentCentre />} />
          <Route path="/growth-pathways" element={<GrowthPathways />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
