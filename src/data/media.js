// Media configuration.
//
// Video is opt-in per slot. While `src` is null the slot renders its still
// photograph instead, so the site is never waiting on a file that does not
// exist yet. To switch a slot to video, drop the encoded files into
// public/videos/… and fill in the fields below — nothing else changes.
// See public/videos/README.md for encoding targets.
//
// Every video slot must keep a `poster` still: it is what shows on the first
// paint, on slow connections, and for anyone who prefers reduced motion.

const sources = [
  { type: 'video/webm', ext: 'webm' },
  { type: 'video/mp4', ext: 'mp4' },
]

/** The "Real people. Real development." moment — the human anchor of the site. */
export const realPrestigeMedia = {
  // e.g. 'homepage/prestige-training-room'  (no extension)
  src: null,
  poster: 'training-room.jpg',
  alt: 'A Prestige Tutelage training room set up with a projector screen and boardroom seating',
  sources,
}
