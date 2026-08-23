import { Link } from 'react-router-dom'
import Photo from '../Photo.jsx'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'
import Disclaimer from '../Disclaimer.jsx'
import MediaRail, { RailTile } from '../MediaRail.jsx'
import { SCOPE_STATEMENT } from '../../data/bbbee.js'

/**
 * The wider offer, as a picture-led rail rather than a text grid.
 *
 * Three of the four solutions have a genuine Prestige photograph. The
 * Assessment Centre does not yet, so it takes a Prestige Path panel — the
 * house graphic — rather than a stock invigilation shot. Drop a real
 * photograph in and set `photo` to replace it.
 */
const solutions = [
  {
    n: '01',
    title: 'B-BBEE Consulting',
    text: 'Skills-development strategy and implementation support, built around your workforce plan.',
    to: '/bbbee-consulting',
    photo: 'bbbee-consultation.jpg',
    alt: 'Two colleagues in conversation beside an office window',
  },
  {
    n: '02',
    title: 'Recruitment',
    text: 'Talent sourcing, learner recruitment and the pipeline behind every programme intake.',
    to: '/recruitment',
    photo: 'recruitment-interview.jpg',
    alt: 'A candidate interview taking place over a video call',
  },
  {
    n: '03',
    title: 'Assessment Centre',
    text: 'Professional assessment, moderation and invigilation services.',
    to: '/assessment-centre',
    photo: null, // no assessment photography exists yet — see public/images/README.md
    stage: 1.6,
  },
  {
    n: '04',
    title: 'Office & Training Space',
    text: 'Flexible professional space in Ferndale, Randburg.',
    to: '/office-rental',
    photo: 'training-room.jpg',
    alt: 'A training room at Prestige Tutelage set up with a projector screen and boardroom seating',
  },
]

export default function BeyondTraining() {
  return (
    <section className="border-t border-line bg-cloud py-20 lg:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Beyond training</p>
            <h2 className="mt-5 max-w-2xl font-display text-editorial font-semibold text-ink">
              A partner across the whole workforce journey.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
              Transformation strategy, recruitment, assessment and professional facilities —
              the work that surrounds training and makes it hold.
            </p>
          </Reveal>
          <Link to="/services" className="btn btn-outline shrink-0">Explore Our Services</Link>
        </div>

        <MediaRail label="Prestige Tutelage business solutions" className="mt-14">
          {solutions.map((s) => (
            <RailTile key={s.to}>
              <Link to={s.to} className="zoom-parent group block">
                <div className="relative overflow-hidden">
                  {s.photo ? (
                    <Photo src={s.photo} alt={s.alt} className="aspect-[3/4] w-full" />
                  ) : (
                    <div className="relative aspect-[3/4] w-full bg-midnight">
                      <PrestigePath
                        stage={s.stage}
                        intensity={0.5}
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  )}
                  {/* Scrim: the index must stay legible over a bright photo. */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(7,26,43,0.55),transparent)]"
                    aria-hidden="true"
                  />
                  <span className="absolute left-5 top-4 font-display text-sm font-semibold text-white">
                    {s.n}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{s.text}</p>
                <span className="chev mt-4 text-prestige-blue">
                  <span className="chev-label">Learn more</span>
                  <span aria-hidden="true" className="transition-transform duration-500 ease-prestige group-hover:translate-x-1">›</span>
                </span>
              </Link>
            </RailTile>
          ))}
        </MediaRail>

        <Disclaimer className="mt-12 max-w-3xl">{SCOPE_STATEMENT}</Disclaimer>
      </div>
    </section>
  )
}
