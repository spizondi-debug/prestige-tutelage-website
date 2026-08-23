// Media configuration.
//
// Video is opt-in per slot. While `src` is null the slot renders its still
// photograph instead, so the site is never waiting on a file that does not
// exist yet. To switch a slot to video, drop the encoded files into
// public/videos/… and fill in the fields below — nothing else changes.
//
// Every video slot must keep a `poster` still: it is what shows on the first
// paint, on slow connections, and for anyone who prefers reduced motion.

export const heroMedia = {
  // e.g. 'homepage/prestige-workforce-hero'  (no extension — see `sources`)
  src: null,
  poster: 'graduate-portrait-hero.jpg',
  alt: 'A graduate in cap and gown on the steps after her graduation ceremony',
  // Encodings are tried in order; WebM first where available, MP4 as fallback.
  sources: [
    { type: 'video/webm', ext: 'webm' },
    { type: 'video/mp4', ext: 'mp4' },
  ],
}
