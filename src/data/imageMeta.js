// Intrinsic pixel dimensions of every photograph, generated from the files
// themselves. Rendering width/height on the <img> reserves the right box
// before the image arrives, so nothing on the page jumps as photos load.
//
// Regenerate with scripts/build-image-meta.mjs after adding or recropping an
// image; a missing entry simply means no dimensions are emitted.
export const imageMeta = {
  'certificate-handover-congratulations.jpg': { w: 1920, h: 2560 },
  'certificate-handover-overalls.jpg': { w: 1920, h: 2448 },
  'certificate-handover-red-shirt.jpg': { w: 1920, h: 2518 },
  'certificate-handover-reviewing.jpg': { w: 1920, h: 2464 },
  'certificates-cohort.jpg': { w: 1920, h: 2400 },
  'fabrication-workshop-floor.jpg': { w: 1920, h: 2341 },
  'facilitator-session.jpg': { w: 1920, h: 1280 },
  'growth-pathways-video-poster.jpg': { w: 1600, h: 900 },
  'learner-angle-grinder.jpg': { w: 1920, h: 2549 },
  'learner-bandsaw-operator.jpg': { w: 1920, h: 3231 },
  'learner-carrying-steel-beam.jpg': { w: 1920, h: 3231 },
  'learner-cohort.jpg': { w: 1920, h: 1280 },
  'learner-intake-group.jpg': { w: 1920, h: 866 },
  'learner-loading-components.jpg': { w: 1920, h: 3231 },
  'learner-welding-workshop.jpg': { w: 1920, h: 3231 },
  'learners-certificates-group.jpg': { w: 1920, h: 2503 },
  'learners-client-site.jpg': { w: 1920, h: 3231 },
  'learners-plate-handling.jpg': { w: 1920, h: 3231 },
  'testimonial-video-poster.jpg': { w: 576, h: 768 },
  'training-room.jpg': { w: 1920, h: 1440 },
  'workshop-training.jpg': { w: 1920, h: 2400 },
}

export const metaFor = (src) => imageMeta[src] ?? null
