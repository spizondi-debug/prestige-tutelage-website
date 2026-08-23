import { Link } from 'react-router-dom'
import Photo from './Photo.jsx'
import { brand } from '../data/site.js'

/**
 * Hero — premium Prestige colour treatment while preserving the approved
 * two-column structure, real photography and existing content.
 */
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-midnight">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-navy to-midnight" />
        <div className="absolute right-[-8rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-electric/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-prestige-green/15 blur-3xl" />
        <div className="absolute left-[42%] top-[18%] h-48 w-48 rounded-full bg-prestige-blue/10 blur-3xl" />
      </div>

      <div className="container-px relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-green">
                {brand.tagline.charAt(0).toUpperCase() + brand.tagline.slice(1)}
              </span>
            </div>

            <h1 className="font-display text-hero font-semibold text-white">
              Developing People.
              <br />
              Strengthening Organisations.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Prestige Tutelage delivers accredited learning, workforce development, short courses,
              workplace training and tailored skills solutions that help organisations build capable,
              confident and future-ready teams.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/programmes" className="btn btn-primary">Explore Our Programmes</Link>
              <Link to="/corporate-training" className="btn btn-outline-light">Train Your Workforce</Link>
            </div>

            <p className="mt-8 text-sm font-medium text-white/55">
              {brand.credibility.join(' • ')}
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute -right-4 -top-4 hidden h-full w-full rounded-xl2 border border-white/10 bg-prestige-blue/15 lg:block"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-xl2 border border-white/10 bg-navy shadow-card">
              <Photo
                src="graduate-portrait-hero.jpg"
                alt="A graduate in cap and gown on the steps after her graduation ceremony"
                className="aspect-[4/5] w-full"
                eager
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight/40 to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
