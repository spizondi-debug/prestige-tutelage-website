import { Link } from 'react-router-dom'
import HeroMedia from './HeroMedia.jsx'
import { brand } from '../data/site.js'
import { heroMedia } from '../data/media.js'

/**
 * Hero — approved homepage hero (21st.dev "Hero Section 5" structure):
 * slim nav + two-column hero with headline, supporting copy and dual CTAs on
 * the left and a large media panel on the right.
 *
 * The media panel takes video when one is configured and the still otherwise.
 * Keeping the headline beside the media rather than overlaid on it means the
 * type never fights the footage for contrast, and the copy stays fully legible
 * regardless of what is playing.
 */
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute right-[-6rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-prestige-blue/[0.05]" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[22rem] w-[22rem] rounded-full bg-prestige-green/[0.05]" />
      </div>

      <div className="container-px">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-blue">
                {brand.tagline.charAt(0).toUpperCase() + brand.tagline.slice(1)}
              </span>
            </div>

            <h1 className="font-display text-hero font-semibold text-ink">
              Building South Africa’s Workforce for Tomorrow
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Accredited workforce development, learnerships, skills programmes and business
              solutions designed to help organisations grow their people and strengthen their
              B-BBEE impact.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/programmes" className="btn btn-primary">Explore Our Programmes</Link>
              <Link to="/contact" className="btn btn-outline">Request a Proposal</Link>
            </div>

            <p className="mt-8 text-sm font-medium text-muted">
              {brand.credibility.join(' • ')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-xl2 bg-sand lg:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
              <HeroMedia media={heroMedia} className="aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
