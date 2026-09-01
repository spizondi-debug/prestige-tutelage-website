import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import { Accent } from '../Section.jsx'
import { assetUrl } from '../../lib/asset.js'
import { metaFor } from '../../data/imageMeta.js'

const connects = [
  'Skills gaps',
  'Workforce development',
  'Development planning',
  'Learning',
  'Workplace readiness',
  'Employee growth',
  'Measurable outcomes',
]

/**
 * The dashboard card is a real frame lifted from the supplied Growth Pathways
 * product film (public/videos/growth-pathways/), not a mockup drawn for this
 * page. Same ground rule as the film itself: the figures on it (74%, 23 skill
 * gaps, and so on) are product-demo sample data, not a client's numbers, so
 * nothing here should be read as a measured result — it illustrates the
 * software, the way a screenshot on any SaaS site does.
 *
 * Replaces the abstract PrestigePath canvas this section used to carry.
 * That component is still the signature visual elsewhere (the /growth-pathways
 * page itself); here, a real screenshot of the product does more work than an
 * abstract animation once one exists to show.
 */
export default function GrowthPathwaysSection() {
  return (
    <section className="on-dark tex tex-grain tex-edge relative overflow-hidden bg-shadow py-20 text-white lg:py-28">
      <div className="container-px relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow-light">A related Prestige solution</p>
            <h2 className="mt-5 font-display text-section font-semibold leading-tight text-white">
              Prestige <Accent>Growth Pathways</Accent>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              Growth Pathways joins the dots between where your workforce is and where your
              organisation needs it to be — connecting skills gaps to development plans, learning to
              workplace readiness, and individual growth to outcomes you can actually measure.
            </p>
            <Link to="/growth-pathways" className="btn btn-green mt-8">
              Explore Prestige Growth Pathways
            </Link>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line-dark pt-6 sm:grid-cols-3">
              {connects.map((c, i) => (
                <li key={c} className="flex items-center gap-2.5 text-sm text-white/80">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      i % 2 ? 'bg-prestige-blue-hover' : 'bg-prestige-green'
                    }`}
                    aria-hidden="true"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="relative">
            <div
              className="absolute -inset-x-6 -inset-y-8 rounded-[2rem] bg-prestige-blue/20 blur-2xl"
              aria-hidden="true"
            />
            <picture className="relative block overflow-hidden rounded-2xl shadow-lifted ring-1 ring-white/10">
              <source srcSet={assetUrl('images/growth-pathways-dashboard.webp')} type="image/webp" />
              <img
                src={assetUrl('images/growth-pathways-dashboard.jpg')}
                alt="The Prestige Growth Pathways dashboard, showing workforce readiness, skill gaps and development progress by division with sample product-demo figures"
                width={metaFor('growth-pathways-dashboard.jpg')?.w}
                height={metaFor('growth-pathways-dashboard.jpg')?.h}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </picture>
            <p className="relative mt-4 text-center text-xs text-white/50">
              From the Prestige Growth Pathways product film — sample figures, not client data.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
