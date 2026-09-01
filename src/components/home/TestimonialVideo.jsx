import { Link } from 'react-router-dom'
import VideoFeature from '../VideoFeature.jsx'
import Reveal from '../Reveal.jsx'
import { testimonialMedia } from '../../data/media.js'
import { Accent } from '../Section.jsx'

/**
 * A short piece to camera, supplied by Prestige — real speech, so it gets
 * the VideoFeature treatment (controls, sound, no autoplay) rather than a
 * silent HeroMedia loop. See the long comment on `testimonialMedia` in
 * src/data/media.js for why: a muted talking head loops as someone mouthing
 * words forever, which reads as broken rather than polished.
 *
 * The clip is vertical, shot on a phone held upright — not cropped or
 * stretched to fill a wide slot. The card keeps that shape (aspect-[3/4])
 * and sits inside a text column sized to match, rather than pretending it is
 * widescreen footage.
 */
export default function TestimonialVideo() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">In their own words</p>
            <h2 className="mt-5 font-display text-section font-semibold leading-tight text-ink">
              A short word from <Accent>the Prestige team</Accent>.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
              Hear directly from the people delivering the training — what it looks like day to day,
              and what it is built to achieve.
            </p>
            <Link to="/contact" className="btn btn-primary mt-8">
              Get In Touch
            </Link>
          </Reveal>

          <Reveal delay={90}>
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-premium">
              <VideoFeature media={testimonialMedia} className="aspect-[3/4]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
