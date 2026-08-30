import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { assetUrl } from '../lib/asset.js'
import { metaFor } from '../data/imageMeta.js'

/**
 * VideoFeature — a film the visitor chooses to watch.
 *
 * Deliberately not HeroMedia. That component is for a short, silent, decorative
 * loop behind a headline: it autoplays, muted, forever. This is the opposite —
 * a minute and a half of narrated product film that carries real information,
 * so it has controls, sound, and it does not start on its own.
 *
 * `preload="none"` means not a byte of video is fetched until someone presses
 * play. The poster is an ordinary image, so the section costs one JPEG on a
 * page nobody watches the film on — which is most of them.
 *
 * The play control is a real <button> over the poster, so the section is
 * reachable and operable from the keyboard before the native controls exist.
 * Once playing, the browser's own controls take over: they are already
 * localised, keyboard-accessible and familiar, and hand-built ones rarely are.
 *
 * prefers-reduced-motion needs no special case here. Nothing moves until the
 * visitor asks it to, which is exactly what that preference is asking for.
 */
export default function VideoFeature({ media, className = '' }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const poster = metaFor(media.poster)

  const start = () => {
    setStarted(true)
    // The element is already in the DOM, so this plays the existing video
    // rather than remounting it — no flash of poster between press and play.
    ref.current?.play()
  }

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`.trim()}>
      <video
        ref={ref}
        className="block h-full w-full object-cover"
        poster={assetUrl(`images/${media.poster}`)}
        width={poster?.w}
        height={poster?.h}
        controls={started}
        preload="none"
        playsInline
        onPlay={() => setStarted(true)}
      >
        {media.sources.map((s) => (
          <source key={s.ext} src={assetUrl(`videos/${media.src}.${s.ext}`)} type={s.type} />
        ))}
        {/* Rendered only when a caption file exists. The Growth Pathways film
            has none because its soundtrack was measured and carries no speech
            — see src/data/media.js. A film with narration sets `captions`. */}
        {media.captions && (
          <track kind="captions" src={assetUrl(media.captions)} srcLang="en" label="English" default />
        )}
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-prestige-blue-hover shadow-lifted transition-transform duration-300 ease-prestige group-hover:scale-105 sm:h-20 sm:w-20">
            <Play size={26} strokeWidth={2} fill="currentColor" aria-hidden="true" className="ml-1" />
          </span>
          <span className="sr-only">Play the video: {media.alt}</span>
        </button>
      )}
    </div>
  )
}
