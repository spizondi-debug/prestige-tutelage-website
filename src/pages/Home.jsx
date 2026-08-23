import { usePageMeta } from '../lib/meta.js'
import Hero from '../components/Hero.jsx'
import CredibilityStrip from '../components/home/CredibilityStrip.jsx'
import WhatWeDo from '../components/home/WhatWeDo.jsx'
import FeaturedProgrammes from '../components/home/FeaturedProgrammes.jsx'
import LearnershipsSection from '../components/home/LearnershipsSection.jsx'
import ShortCoursesSection from '../components/home/ShortCoursesSection.jsx'
import CorporateTrainingSection from '../components/home/CorporateTrainingSection.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import IndustriesSection from '../components/home/IndustriesSection.jsx'
import AssessmentSection from '../components/home/AssessmentSection.jsx'
import GrowthPathwaysSection from '../components/home/GrowthPathwaysSection.jsx'
import WhyPrestige from '../components/home/WhyPrestige.jsx'
import ImpactSection from '../components/home/ImpactSection.jsx'
import TrainingFinder from '../components/home/TrainingFinder.jsx'
import InsightsPreview from '../components/home/InsightsPreview.jsx'
import CTABand from '../components/CTABand.jsx'

export default function Home() {
  usePageMeta(
    null,
    'Prestige Tutelage delivers accredited learning, workforce development, short courses, workplace training and tailored skills solutions for South African organisations.',
  )

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <WhatWeDo />
      <FeaturedProgrammes />
      <LearnershipsSection />
      <ShortCoursesSection />
      <CorporateTrainingSection />
      <ServicesSection />
      <IndustriesSection />
      <AssessmentSection />
      <GrowthPathwaysSection />
      <WhyPrestige />
      <ImpactSection />
      <TrainingFinder />
      <InsightsPreview />
      <CTABand />
    </>
  )
}
