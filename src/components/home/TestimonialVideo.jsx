import { Link } from 'react-router-dom'
import VideoFeature from '../VideoFeature.jsx'
import Reveal from '../Reveal.jsx'
import { testimonialMedia } from '../../data/media.js'
import { Accent } from '../Section.jsx'

/**
 * Short pieces to camera, supplied by Prestige — real speech, so each gets
 * the VideoFeature treatment (controls, sound, no autoplay) rather than a
 * silent HeroMedia loop. See the long comment on `testimonialMedia` in
 * src/data/media.js for why: a muted talking head loops as someone mouthing
 * words forever, which reads as broken rather than polished.
 *
 * Every clip is vertical, shot on a phone held upright — not cropped or
 * stretched to fill a wide slot. Each card keeps that shape (aspect-[3/4])
 * in a grid that reflows from one column on a phone up to four across on a
 * wide desktop, rather than forcing four portraits into one widescreen row.
 */
export default function TestimonialVideo() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">In their own words</p>
          <h2 className="mt-5 font-display text-section font-semibold leading-tight text-ink">
            A few words from <Accent>the Prestige team</Accent>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Hear directly from the people around Prestige Tutelage — what the training looks like
            day to day, and what it is built to achieve.
          </p>
          <Link to="/contact" className="btn btn-primary mt-8">
            Get In Touch
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {testimonialMedia.map((media, i) => (
            <Reveal key={media.src} delay={i * 70}>
              <div className="overflow-hidden rounded-2xl shadow-premium">
                <VideoFeature media={media} className="aspect-[3/4]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
