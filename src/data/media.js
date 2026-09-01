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
 * `captions` is unset, and measured rather than assumed: the soundtrack was
 * analysed and carries no narration. Across 401 quarter-second windows the
 * level spans 13.6 dB with 3.2% falling well below the median — continuous
 * music. Speech shows 25 dB or more and 15-30% quiet windows for the pauses
 * between words and sentences. Nothing is spoken, so there is nothing for
 * captions to carry.
 *
 * The real access gap is the other way round: every point in the film is made
 * visually, as on-screen text, which a blind visitor gets nothing from. The
 * page carries the same ground in HTML and says so beside the player, which is
 * the text alternative WCAG asks for. Keep that line if the film is re-cut.
 *
 * If a version with narration is ever supplied, point `captions` at a .vtt.
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

/**
 * Homepage testimonials — short pieces to camera, supplied by Prestige, one
 * per speaker.
 *
 * Real speech, not motion graphics, so unlike the Growth Pathways film these
 * have no measured basis for skipping captions — the source has no
 * transcript, and writing one from listening would risk putting words in
 * someone's mouth that are not exactly what was said. `captions: null` here
 * records a real gap, not a checked absence. Point a clip at a .vtt the
 * moment an accurate transcript exists for it.
 *
 * Vertical (576×768) because that is the orientation they were shot in — a
 * phone held upright to camera, not a widescreen production. VideoFeature
 * does not assume a shape, so the section around them is built narrow to
 * match rather than stretching or cropping the frame to fit a wide slot.
 *
 * No names or roles are attached. None were supplied, and inventing them
 * would misrepresent real people — the same reasoning that keeps this site
 * without fabricated testimonial quotes elsewhere.
 */
export const testimonialMedia = [1, 2, 3, 4].map((n) => ({
  src: `testimonial/prestige-testimonial-${n}`,
  poster: `testimonial-video-poster-${n}.jpg`,
  alt: 'A member of the Prestige Tutelage team speaking to camera',
  captions: null,
  sources: [{ type: 'video/mp4', ext: 'mp4' }],
}))
