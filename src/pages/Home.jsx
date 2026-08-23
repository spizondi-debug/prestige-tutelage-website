import { usePageMeta } from '../lib/meta.js'
import CinematicHero from '../components/home/CinematicHero.jsx'
import IntroducePrestige from '../components/home/IntroducePrestige.jsx'
import CredibilityStrip from '../components/home/CredibilityStrip.jsx'
import WhatWeDo from '../components/home/WhatWeDo.jsx'
import FeaturedProgrammes from '../components/home/FeaturedProgrammes.jsx'
import LearnershipsSection from '../components/home/LearnershipsSection.jsx'
import ShortCoursesSection from '../components/home/ShortCoursesSection.jsx'
import CorporateTrainingSection from '../components/home/CorporateTrainingSection.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import IndustriesSection from '../components/home/IndustriesSection.jsx'
import AssessmentSection from '../components/home/AssessmentSection.jsx'
import BeyondTraining from '../components/home/BeyondTraining.jsx'
import GrowthPathwaysSection from '../components/home/GrowthPathwaysSection.jsx'
import WhyPrestige from '../components/home/WhyPrestige.jsx'
import ImpactSection from '../components/home/ImpactSection.jsx'
import TrainingFinder from '../components/home/TrainingFinder.jsx'
import InsightsPreview from '../components/home/InsightsPreview.jsx'
import CTABand from '../components/CTABand.jsx'

export default function Home() {
  usePageMeta(
    null,
    'Accredited training provider in Randburg, South Africa. Prestige Tutelage delivers qualifications, learnerships, corporate short courses and workplace training across business administration, HR, project management, manufacturing, engineering, agriculture and early childhood development.',
  )

  return (
    <>
      <CinematicHero />
      <IntroducePrestige />
      <CredibilityStrip />
      <WhatWeDo />
      <FeaturedProgrammes />
      <LearnershipsSection />
      <ShortCoursesSection />
      <CorporateTrainingSection />
      <ServicesSection />
      <IndustriesSection />
      <AssessmentSection />
      <BeyondTraining />
      <GrowthPathwaysSection />
      <WhyPrestige />
      <ImpactSection />
      <TrainingFinder />
      <InsightsPreview />
      <CTABand />
    </>
  )
}
