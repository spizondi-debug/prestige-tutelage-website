// Intrinsic pixel dimensions of every photograph, generated from the files
// themselves. Rendering width/height on the <img> reserves the right box
// before the image arrives, so nothing on the page jumps as photos load.
//
// Regenerate with scripts/build-image-meta.mjs after adding or recropping an
// image; a missing entry simply means no dimensions are emitted.
export const imageMeta = {
  'bbbee-consultation.jpg': { w: 1600, h: 1067 },
  'certificate-handover-congratulations.jpg': { w: 960, h: 1280 },
  'certificate-handover-overalls.jpg': { w: 960, h: 1224 },
  'certificate-handover-red-shirt.jpg': { w: 960, h: 1259 },
  'certificate-handover-reviewing.jpg': { w: 960, h: 1232 },
  'certificates-cohort.jpg': { w: 1100, h: 1375 },
  'fabrication-workshop-floor.jpg': { w: 681, h: 830 },
  'graduate-celebrating.jpg': { w: 1400, h: 1120 },
  'graduate-portrait-hero.jpg': { w: 1200, h: 1500 },
  'graduates-group.jpg': { w: 1600, h: 1067 },
  'learner-angle-grinder.jpg': { w: 681, h: 904 },
  'learner-bandsaw-operator.jpg': { w: 505, h: 850 },
  'learner-carrying-steel-beam.jpg': { w: 505, h: 850 },
  'learner-cohort.jpg': { w: 1400, h: 933 },
  'learner-intake-group.jpg': { w: 1280, h: 577 },
  'learner-loading-components.jpg': { w: 505, h: 850 },
  'learner-welding-workshop.jpg': { w: 505, h: 850 },
  'learners-certificates-group.jpg': { w: 960, h: 1251 },
  'learners-client-site.jpg': { w: 505, h: 850 },
  'learners-plate-handling.jpg': { w: 505, h: 850 },
  'recruitment-interview.jpg': { w: 1600, h: 1067 },
  'training-room.jpg': { w: 1400, h: 1050 },
  'workshop-training.jpg': { w: 1100, h: 1375 },
  'young-professional.jpg': { w: 1400, h: 1120 },
}

export const metaFor = (src) => imageMeta[src] ?? null
