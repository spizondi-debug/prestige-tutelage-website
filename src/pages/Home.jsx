import { usePageMeta } from '../lib/meta.js'

// 01 — Full-bleed photographic hero
import PageHeader from '../components/PageHeader.jsx'
import { pageHeroes } from '../data/pageHeroes.js'
// 02/03 — More than training + proof points
import IntroducePrestige from '../components/home/IntroducePrestige.jsx'
import ClientStrip from '../components/home/ClientStrip.jsx'
// 04 — Programmes and the explorer
import FeaturedProgrammes from '../components/home/FeaturedProgrammes.jsx'
import TrainingFinder from '../components/home/TrainingFinder.jsx'
// 05 — The NQF ladder, rendered from the real catalogue
import LearningLadder from '../components/home/LearningLadder.jsx'
// 06 — Featured programme stories
import FeaturedStories from '../components/home/FeaturedStories.jsx'
import LearnershipsSection from '../components/home/LearnershipsSection.jsx'
import ShortCoursesSection from '../components/home/ShortCoursesSection.jsx'
// 06/07/08 — Industries, Growth Pathways, the business ecosystem
import IndustriesSection from '../components/home/IndustriesSection.jsx'
import GrowthPathwaysSection from '../components/home/GrowthPathwaysSection.jsx'
import BeyondTraining from '../components/home/BeyondTraining.jsx'
// 09 — The human anchor
import RealPrestige from '../components/home/RealPrestige.jsx'
// 10/11 — Outcomes and trust
import ImpactSection from '../components/home/ImpactSection.jsx'
import WhyPrestige from '../components/home/WhyPrestige.jsx'
import CredibilityStrip from '../components/home/CredibilityStrip.jsx'
// 12/13 — Insights and the closing CTA
import InsightsPreview from '../components/home/InsightsPreview.jsx'
import CTABand from '../components/CTABand.jsx'
import { Link } from 'react-router-dom'
import { Accent } from '../components/Section.jsx'

/**
 * The homepage arc: photographic opening → who Prestige is → what they deliver →
 * who they deliver it for → the wider ecosystem → the people behind it →
 * proof → what to do next.
 *
 * Sections that restated each other were removed rather than reordered: the
 * services overview, the "what we do" pillars, the corporate-training band and
 * the assessment band all duplicated content that now lives on its own page.
 */
export default function Home() {
  usePageMeta(
    null,
    'Accredited training provider in Randburg, South Africa. Prestige Tutelage delivers qualifications, learnerships, corporate short courses and workplace training across business administration, HR, project management, manufacturing, engineering, agriculture and early childhood development.',
  )

  return (
    <>
      <PageHeader
        images={pageHeroes.home}
        eyebrow="Accredited training & workforce development"
        title={<>Building the <Accent>workforce behind tomorrow</Accent>.</>}
        lead="Accredited learning, workforce development and business solutions that turn potential into capability."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/programmes" className="btn btn-primary">Explore Our Programmes</Link>
          <Link to="/contact" className="btn btn-outline">Partner With Prestige</Link>
        </div>
      </PageHeader>
      <IntroducePrestige />
      <ClientStrip />

      <FeaturedProgrammes />
      <TrainingFinder />

      <LearningLadder />

      <FeaturedStories />
      <LearnershipsSection />
      <ShortCoursesSection />

      <IndustriesSection />
      <GrowthPathwaysSection />
      <BeyondTraining />

      <RealPrestige />

      <ImpactSection />
      <WhyPrestige />
      <CredibilityStrip />

      <InsightsPreview />
      <CTABand />
    </>
  )
}
