import { Link } from 'react-router-dom'
import Photo from '../Photo.jsx'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'
import Disclaimer from '../Disclaimer.jsx'
import MediaRail, { RailTile } from '../MediaRail.jsx'
import { SCOPE_STATEMENT } from '../../data/bbbee.js'
import { Accent } from '../Section.jsx'

/**
 * The wider offer, as a picture-led rail rather than a text grid.
 *
 * All four solutions now carry a genuine Prestige photograph. The Assessment
 * Centre card held the Prestige Path panel — the house graphic — while no
 * assessment photography existed; the classroom photograph replaced it, which
 * is the same image that leads the Assessment Centre page.
 */
const solutions = [
  {
    n: '01',
    title: 'B-BBEE Consulting',
    text: 'Skills-development strategy and implementation support, built around your workforce plan.',
    to: '/bbbee-consulting',
    photo: 'learners-certificates-group.jpg',
    alt: 'Prestige Tutelage learners holding their certificates of completion',
  },
  {
    n: '02',
    title: 'Recruitment',
    text: 'Talent sourcing, learner recruitment and the pipeline behind every programme intake.',
    to: '/recruitment',
    photo: 'learner-intake-group.jpg',
    alt: 'A Prestige Tutelage learner intake outside the training premises',
  },
  {
    n: '03',
    title: 'Assessment Centre',
    text: 'Professional assessment, moderation and invigilation services.',
    to: '/assessment-centre',
    photo: 'facilitator-session.jpg',
    alt: 'Prestige Tutelage learners working at desks while a facilitator leads the session',
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
    <section className="tex tex-dots border-t border-line bg-cloud py-20 lg:py-28">
      <div className="container-px">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Beyond training</p>
            <h2 className="mt-5 max-w-2xl font-display text-editorial font-semibold text-prestige-green-deep">
              A partner across the <Accent>whole workforce journey</Accent>.
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
                    <div className="relative aspect-[3/4] w-full bg-shadow">
                      <PrestigePath
                        stage={s.stage}
                        intensity={0.5}
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  )}
                  {/* Scrim: the index must stay legible over a bright photo. */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(7,26,43,0.44),transparent)]"
                    aria-hidden="true"
                  />
                  <span className="absolute left-5 top-4 font-display text-sm font-semibold text-white">
                    {s.n}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-prestige-blue-hover">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-body">{s.text}</p>
                <span className="chev mt-4 text-prestige-blue-hover">
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
