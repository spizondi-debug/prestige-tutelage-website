// Intrinsic pixel dimensions of every photograph, generated from the files
// themselves. Rendering width/height on the <img> reserves the right box
// before the image arrives, so nothing on the page jumps as photos load.
//
// Regenerate with scripts/build-image-meta.mjs after adding or recropping an
// image; a missing entry simply means no dimensions are emitted.
export const imageMeta = {
  'bbbee-consultation.jpg': { w: 1600, h: 1067 },
  'certificates-cohort.jpg': { w: 1100, h: 1375 },
  'facilitator-session.jpg': { w: 1400, h: 933 },
  'graduate-celebrating.jpg': { w: 1400, h: 1120 },
  'graduate-portrait-hero.jpg': { w: 1200, h: 1500 },
  'graduates-group.jpg': { w: 1600, h: 1067 },
  'learner-cohort.jpg': { w: 1400, h: 933 },
  'recruitment-interview.jpg': { w: 1600, h: 1067 },
  'training-room.jpg': { w: 1400, h: 1050 },
  'workshop-training.jpg': { w: 1100, h: 1375 },
  'young-professional.jpg': { w: 1400, h: 1120 },
}

export const metaFor = (src) => imageMeta[src] ?? null
