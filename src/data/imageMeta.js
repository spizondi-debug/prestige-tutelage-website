// Intrinsic pixel dimensions of every photograph, generated from the files
// themselves. Rendering width/height on the <img> reserves the right box
// before the image arrives, so nothing on the page jumps as photos load.
//
// Regenerate with scripts/build-image-meta.mjs after adding or recropping an
// image; a missing entry simply means no dimensions are emitted.
export const imageMeta = {
  'certificate-handover-congratulations.jpg': { w: 1440, h: 1920 },
  'certificate-handover-overalls.jpg': { w: 1506, h: 1920 },
  'certificate-handover-red-shirt.jpg': { w: 1464, h: 1920 },
  'certificate-handover-reviewing.jpg': { w: 1496, h: 1920 },
  'certificates-cohort.jpg': { w: 1536, h: 1920 },
  'fabrication-workshop-floor.jpg': { w: 1575, h: 1920 },
  'learner-angle-grinder.jpg': { w: 1446, h: 1920 },
  'learner-bandsaw-operator.jpg': { w: 1141, h: 1920 },
  'learner-carrying-steel-beam.jpg': { w: 1141, h: 1920 },
  'learner-cohort.jpg': { w: 1920, h: 1280 },
  'learner-intake-group.jpg': { w: 1920, h: 866 },
  'learner-loading-components.jpg': { w: 1141, h: 1920 },
  'learner-welding-workshop.jpg': { w: 1141, h: 1920 },
  'learners-certificates-group.jpg': { w: 1473, h: 1920 },
  'learners-client-site.jpg': { w: 1141, h: 1920 },
  'learners-plate-handling.jpg': { w: 1141, h: 1920 },
  'training-room.jpg': { w: 1920, h: 1440 },
  'workshop-training.jpg': { w: 1536, h: 1920 },
}

export const metaFor = (src) => imageMeta[src] ?? null
