import { Link } from 'react-router-dom'
import Photo from '../Photo.jsx'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'
import { qualificationsIn } from '../../data/programmes.js'

/**
 * Featured programme stories — full-bleed and alternating. Deliberately not
 * cards: the photograph runs to the edge of the viewport, and the statement
 * sits in the opposite half with nothing but air around it.
 *
 * Where Prestige has real photography the story is carried by the photograph.
 * Where it does not yet, the slot takes a branded Prestige Path panel rather
 * than stock: abstract motion is honest, a stock farm is not. Each panel is
 * replaced by dropping in a real photo and setting `photo`.
 */
const stories = [
  {
    area: 'Manufacturing & Production',
    eyebrow: 'Manufacturing',
    headline: 'Skills built for production.',
    text: 'Operators, process controllers and the supervisors who lead them — qualifications that match how a plant actually runs, delivered close to the line.',
    photo: 'workshop-training.jpg',
    alt: 'A learner in full protective equipment working with an angle grinder during practical training',
  },
  {
    area: 'Agriculture & Agri-processing',
    eyebrow: 'Agriculture',
    headline: 'Skills that grow industries.',
    text: 'Animal, poultry and plant production for farm teams, supervisors and emerging farmers — learning that happens close to the soil and the stock.',
    photo: null, // awaiting genuine Prestige agricultural photography
    stage: 2.4,
  },
  {
    area: 'Business, Administration & Leadership',
    eyebrow: 'Management',
    headline: 'Build the people who lead.',
    text: 'The administrative, HR, project and management roles organisations run on — and the first-line managers who carry the most people.',
    photo: 'certificate-handover-reviewing.jpg',
    alt: 'A Prestige Tutelage learner and facilitator looking over a certificate together',
  },
]

export default function FeaturedStories() {
  return (
    <section className="bg-cloud">
      {stories.map((s, i) => {
        const count = qualificationsIn(s.area).length
        const flip = i % 2 === 1
        return (
          <div key={s.area} className="border-t border-line first:border-t-0">
            <div className="grid lg:grid-cols-2">
              {/* Media — runs to the viewport edge on its own side */}
              <div
                className={`zoom-parent relative min-h-[20rem] lg:min-h-[34rem] ${
                  flip ? 'lg:order-last' : ''
                }`}
              >
                {s.photo ? (
                  <Photo src={s.photo} alt={s.alt} className="absolute inset-0 h-full w-full" />
                ) : (
                  <div className="absolute inset-0 bg-shadow">
                    <PrestigePath
                      stage={s.stage}
                      intensity={0.55}
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                )}
              </div>

              {/* Story */}
              <div className="flex items-center">
                <div
                  className={`w-full px-5 py-16 sm:px-8 lg:py-24 ${
                    flip
                      ? 'lg:pl-12 lg:pr-16 xl:pl-24 xl:pr-20'
                      : 'lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-24'
                  }`}
                >
                  <Reveal>
                    <p className="eyebrow">{s.eyebrow}</p>
                    <h3 className="mt-5 max-w-xl font-display text-editorial font-semibold text-ink">
                      {s.headline}
                    </h3>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{s.text}</p>
                    {count > 0 && (
                      <p className="mt-5 text-sm text-muted">
                        {count} {count === 1 ? 'qualification' : 'qualifications'} in this area
                      </p>
                    )}
                    <Link
                      to="/programmes#catalogue"
                      className="chev group mt-8 text-prestige-blue-hover hover:text-prestige-blue-hover"
                    >
                      <span className="chev-label">Explore {s.eyebrow} programmes</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-prestige group-hover:translate-x-1"
                      >
                        ›
                      </span>
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
