import { assetUrl } from '../../lib/asset.js'
import { clients, CLIENTS_LEAD } from '../../data/clients.js'
import { Eyebrow } from '../Section.jsx'

/**
 * ClientStrip — the organisations Prestige works with, as their own logos.
 *
 * Every mark sits in an identical box with `object-contain`, so nothing is
 * stretched or cropped whatever its aspect: voestalpine is nearly 5:1 and the
 * roundels are square, and both fit the same box without distortion. The
 * per-logo `scale` in clients.js is an optical correction on top of that — a
 * square mark filling the same height as a long wordmark reads as far bigger
 * than it is.
 *
 * Logos are shown in full colour rather than greyscaled to a house style. A
 * client's mark is their property, and recolouring it is exactly what their
 * brand guidelines usually forbid.
 *
 * The heading says who these are and nothing more. Any claim about what was
 * delivered, to how many people, or with what result would need each client's
 * own sign-off, so this strip carries none.
 */
export default function ClientStrip() {
  return (
    <section className="border-y border-line bg-paper py-14 lg:py-16">
      <div className="container-px">
        <div className="max-w-3xl">
          <Eyebrow>Clients</Eyebrow>
          <h2 className="mt-4 font-display text-section font-semibold text-prestige-green-deep">
            Trusted by the organisations we train for.
          </h2>
          <p className="mt-4 leading-relaxed text-body">{CLIENTS_LEAD}</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          {clients.map((c) => (
            <li key={c.file} className="flex items-center justify-center">
              <img
                src={assetUrl(`images/clients/${c.file}`)}
                alt={c.alt}
                width={c.w}
                height={c.h}
                loading="lazy"
                decoding="async"
                className="max-h-14 w-auto max-w-full object-contain sm:max-h-16"
                style={{ transform: c.scale === 1 ? undefined : `scale(${c.scale})` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
