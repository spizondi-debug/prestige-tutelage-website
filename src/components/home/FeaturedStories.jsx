import { Link } from 'react-router-dom'
import Photo from '../Photo.jsx'
import PrestigePath from '../PrestigePath.jsx'
import Reveal from '../Reveal.jsx'
import { qualificationsIn } from '../../data/programmes.js'

/**
 * Featured programme stories — large, image-led, alternating. Deliberately not
 * cards: one photograph, one statement, one line, one link.
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
  },
  {
    area: 'Business, Administration & Leadership',
    eyebrow: 'Management',
    headline: 'Build the people who lead.',
    text: 'The administrative, HR, project and management roles organisations run on — and the first-line managers who carry the most people.',
    photo: 'graduate-portrait-hero.jpg',
    alt: 'A graduate in cap and gown on the steps after her graduation ceremony',
  },
]

export default function FeaturedStories() {
  return (
    <section className="bg-cream">
      {stories.map((s, i) => {
        const count = qualificationsIn(s.area).length
        const flip = i % 2 === 1
        return (
          <div key={s.area} className="border-t border-line first:border-t-0">
            <div className="container-px">
              <div className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
                {/* Media */}
                <div className={flip ? 'lg:order-last' : ''}>
                  <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
                    {s.photo ? (
                      <Photo src={s.photo} alt={s.alt} className="aspect-[4/3] w-full" />
                    ) : (
                      <div className="relative aspect-[4/3] w-full bg-night">
                        <PrestigePath stage={2.4} intensity={0.55} className="absolute inset-0 h-full w-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Story */}
                <Reveal>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prestige-green">
                    {s.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-editorial font-semibold text-ink">
                    {s.headline}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">{s.text}</p>
                  {count > 0 && (
                    <p className="mt-4 text-sm text-muted">
                      {count} {count === 1 ? 'qualification' : 'qualifications'} in this area
                    </p>
                  )}
                  <Link
                    to="/programmes#catalogue"
                    className="group mt-7 inline-flex items-center gap-2 font-sans font-semibold text-prestige-blue transition-colors hover:text-prestige-blue-deep"
                  >
                    Explore {s.eyebrow} Programmes
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
