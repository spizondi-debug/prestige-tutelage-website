import { useEffect, useState } from 'react'
import Photo from './Photo.jsx'
import { assetUrl } from '../lib/asset.js'

/**
 * HeroMedia — a background video where one is configured, the poster
 * photograph otherwise.
 *
 * Three things this deliberately gets right:
 *  - It never blocks on a file that does not exist. With `media.src` unset it
 *    renders the still, so the hero is always complete.
 *  - It respects prefers-reduced-motion, falling back to the still rather than
 *    animating at someone who asked us not to.
 *  - The poster shows on first paint and on slow connections, so the hero never
 *    renders as an empty box while a video downloads.
 *
 * The headline stays real HTML over the media — never burnt into the video —
 * so it remains selectable, translatable, indexable and accessible.
 */
export default function HeroMedia({ media, className = '' }) {
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setMotionOk(!q.matches)
    apply()
    q.addEventListener('change', apply)
    return () => q.removeEventListener('change', apply)
  }, [])

  if (!media.src || !motionOk) {
    return <Photo src={media.poster} alt={media.alt} className={className} eager />
  }

  return (
    <div className={`overflow-hidden bg-mist ${className}`.trim()}>
      <video
        className="h-full w-full object-cover"
        poster={assetUrl(`images/${media.poster}`)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
      >
        {media.sources.map((s) => (
          <source key={s.ext} src={assetUrl(`videos/${media.src}.${s.ext}`)} type={s.type} />
        ))}
      </video>
    </div>
  )
}
