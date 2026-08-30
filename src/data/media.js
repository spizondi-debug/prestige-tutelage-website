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

/**
 * Growth Pathways — the product film on /growth-pathways.
 *
 * Supplied by Prestige: a branded explainer that runs about a minute and a
 * half, with sound. It is content, not decoration, so the page plays it
 * through VideoFeature (controls, no autoplay) rather than HeroMedia, which
 * exists for short silent background loops.
 *
 * The film shows the Growth Pathways interface with sample figures and sample
 * employee names in it. They are a product demonstration, not client data, and
 * the page says so beside the player — nothing in it should be read as a
 * measured result.
 *
 * `captions` is unset: no WebVTT file has been supplied. Every point in the
 * film appears as on-screen text and the page covers the same ground in HTML,
 * but that is not a substitute for captions if the soundtrack carries
 * narration. Point this at a .vtt in public/ once one exists.
 */
export const growthPathwaysMedia = {
  src: 'growth-pathways/prestige-growth-pathways',
  poster: 'growth-pathways-video-poster.jpg',
  alt: 'Prestige Growth Pathways product film, showing how skills gaps, development planning, learning and progression connect',
  captions: null,
  // MP4 only, deliberately — not the shared `sources` pair.
  //
  // This film is motion graphics, which H.264 already compresses hard: 100
  // seconds of 720p lands at 2.8 MB with the on-screen text still crisp. A VP9
  // WebM was encoded and measured against it and came out 2.6 MB — 6% smaller
  // at a visibly lower quality point. WebM is listed first when present, so
  // shipping it would hand most browsers the worse file to save nothing.
  // Re-test if the film is ever re-cut; the answer is different for footage.
  sources: [{ type: 'video/mp4', ext: 'mp4' }],
}
