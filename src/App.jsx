import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Programmes from './pages/Programmes.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import ShortCourses from './pages/ShortCourses.jsx'
import CorporateTraining from './pages/CorporateTraining.jsx'
import Services from './pages/Services.jsx'
import BusinessSolutions from './pages/BusinessSolutions.jsx'
import BBBEEConsulting from './pages/BBBEEConsulting.jsx'
import Recruitment from './pages/Recruitment.jsx'
import OfficeRental from './pages/OfficeRental.jsx'
import Industries from './pages/Industries.jsx'
import AssessmentCentre from './pages/AssessmentCentre.jsx'
import GrowthPathways from './pages/GrowthPathways.jsx'
import Insights from './pages/Insights.jsx'
import InsightArticle from './pages/InsightArticle.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cloud">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          {/* One template for all 26 qualifications, keyed by SAQA ID because
              names repeat across NQF levels. */}
          <Route path="/programmes/:saqaId" element={<CourseDetail />} />
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
      </main>
      <Footer />
    </div>
  )
}
