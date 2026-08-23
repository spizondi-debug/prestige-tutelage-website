import { useState } from 'react'

/**
 * Hero — homepage hero for Prestige Tutelage.
 *
 * Composition adapted from the 21st.dev "Hero Section 5" structure:
 *   slim top nav (see Navbar) + a two-column hero with the headline,
 *   supporting copy and dual CTAs on the left and a large media panel on
 *   the right. Prestige branding and content only — no Tailark branding,
 *   SaaS language, login buttons, dashboards or software visuals.
 *
 * DROP-IN hero photo: save a real, licensed Prestige training/graduation
 * photograph to  public/images/hero.jpg  (no AI-generated people). Until it
 * exists, a clearly-marked placeholder panel is shown instead.
 */
export default function Hero() {
  const [imgOk, setImgOk] = useState(true)
  const heroSrc = `${import.meta.env.BASE_URL}images/hero.jpg`

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-6rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-prestige-blue/[0.05]" />
        <div className="absolute bottom-[-8rem] left-[-6rem] h-[22rem] w-[22rem] rounded-full bg-prestige-green/[0.05]" />
      </div>

      <div className="container-px">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-prestige-green" />
              <span className="text-sm font-semibold tracking-wide text-prestige-blue">
                Accredited training &amp; workforce development
              </span>
            </div>

            <h1 className="font-display text-hero font-semibold text-ink">
              Developing People.
              <br />
              Strengthening Organisations.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Prestige Tutelage delivers accredited training, workplace development and tailored
              skills solutions that help organisations build capable, confident and future-ready teams.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#programmes" className="btn btn-primary">Explore Our Programmes</a>
              <a href="#corporate-training" className="btn btn-outline">Train Your Workforce</a>
            </div>

            <p className="mt-8 text-sm text-muted">
              Proudly South African · training and workforce development
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-xl2 bg-sand lg:block" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-xl2 border border-line bg-sand shadow-card">
              {imgOk ? (
                <img
                  src={heroSrc}
                  alt="Prestige Tutelage graduates celebrating at their graduation"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center sm:aspect-[5/4] lg:aspect-[4/5]">
                  <div className="px-6 text-center">
                    <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12 text-prestige-blue/50" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <rect x="6" y="12" width="36" height="26" rx="3" />
                      <circle cx="24" cy="25" r="7" />
                      <path d="M17 12l3-4h8l3 4" />
                    </svg>
                    <p className="mt-4 text-sm font-semibold text-ink">Placeholder image</p>
                    <p className="mt-1 text-sm text-muted">
                      Real Prestige training / graduation photography goes here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!imgOk && (
              <p className="mt-3 text-center text-xs text-muted lg:text-left">
                No AI-generated people. Awaiting real Prestige photography.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
