import { Link } from 'react-router-dom'
import HeroMedia from '../HeroMedia.jsx'
import Reveal from '../Reveal.jsx'
import { realPrestigeMedia } from '../../data/media.js'
import { Accent } from '../Section.jsx'

/**
 * The statement band: the Prestige training room, with the headline over it at
 * the oversized statement scale so the type still leads rather than sitting as
 * a caption on a picture.
 *
 * The photograph is weighted well down under a heavy gradient — it is the
 * ground the statement stands on, not the subject. Takes video the moment
 * footage is configured in src/data/media.js.
 */
export default function RealPrestige() {
  return (
    <section className="on-dark on-photo tex tex-grain tex-edge relative overflow-hidden bg-shadow py-24 text-white lg:py-36">
      <div className="absolute inset-0">
        <HeroMedia media={realPrestigeMedia} className="h-full w-full" />
        {/* Weighted hard so the statement reads at full strength over it. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,26,43,0.76)_0%,rgba(7,26,43,0.69)_45%,rgba(7,26,43,0.54)_100%)]"
          aria-hidden="true"
        />
      </div>

      <div className="container-px relative">
        <Reveal>
          <p className="eyebrow-light">Real people. Real development.</p>
          <h2 className="mt-7 max-w-5xl font-display text-statement font-semibold text-white">
            Training that leaves the classroom and <Accent>enters the workplace</Accent>.
          </h2>
          <div className="mt-11 flex flex-wrap gap-3">
            <Link to="/corporate-training" className="btn btn-primary">
              See How We Deliver
            </Link>
            <Link to="/about" className="btn btn-ghost-light">
              About Prestige
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
