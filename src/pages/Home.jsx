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
// 06b — Testimonials, ahead of the sector/ecosystem run
import TestimonialVideo from '../components/home/TestimonialVideo.jsx'
// 07/08/09 — Growth Pathways, the business ecosystem
import GrowthPathwaysSection from '../components/home/GrowthPathwaysSection.jsx'
import BeyondTraining from '../components/home/BeyondTraining.jsx'
// 10/11 — Outcomes and trust
import ImpactSection from '../components/home/ImpactSection.jsx'
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
        {/* Three audiences, three actions: browse the catalogue, apply for a
            learnership, open a workforce conversation. Green is the site's
            enrolment colour (see .btn-green in index.css), so the learner
            action reads as distinct from the other two without having to be
            first or largest.

            "Apply Now" rather than "Apply for a Learnership" because the hero
            copy column is max-w-2xl — 672px — and the longer label pushed the
            row to 738px, orphaning "Partner With Prestige" onto a line of its
            own at every desktop width. flex-wrap stays as the fallback for
            enlarged text. */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/programmes" className="btn btn-primary">Explore Our Programmes</Link>
          <Link to="/learnership-application" className="btn btn-green">Apply Now</Link>
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

      <TestimonialVideo />

      <GrowthPathwaysSection />
      <BeyondTraining />

      <ImpactSection />
      <CredibilityStrip />

      <InsightsPreview />
      <CTABand />
    </>
  )
}
