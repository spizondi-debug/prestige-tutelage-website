// Hero photograph sets, one per page.
//
// Each entry is a slide in that page's hero carousel. Everything here is a
// real photograph already in public/images — Prestige's own wherever it
// exists, licensed stock only where it does not.
//
// `position` is the CSS object-position used to keep faces out of the crop
// when a portrait source is shown in a landscape panel. Check it after
// swapping any image.
//
// CONSENT — read before adding: several of these show identifiable learners,
// and the certificate photographs carry readable names. Confirm publication
// consent is held before the site goes to a public domain.

const P = {
  intake: {
    src: 'learner-intake-group.jpg',
    alt: 'A large group of Prestige Tutelage learners outside the training premises',
    position: 'center 40%',
  },
  certificatesGroup: {
    src: 'learners-certificates-group.jpg',
    alt: 'Prestige Tutelage learners holding their certificates of completion',
    position: 'center 26%',
  },
  handoverOveralls: {
    src: 'certificate-handover-overalls.jpg',
    alt: 'A Prestige Tutelage learner receiving his certificate of completion',
    position: 'center 24%',
  },
  handoverRedShirt: {
    src: 'certificate-handover-red-shirt.jpg',
    alt: 'A Prestige Tutelage learner receiving her certificate of completion',
    position: 'center 24%',
  },
  handoverReviewing: {
    src: 'certificate-handover-reviewing.jpg',
    alt: 'A Prestige Tutelage learner and facilitator looking over a certificate together',
    position: 'center 28%',
  },
  steelBeam: {
    src: 'learner-carrying-steel-beam.jpg',
    alt: 'A learner in workshop overalls carrying a steel section across a fabrication floor',
    position: 'center 11%',
  },
  welding: {
    src: 'learner-welding-workshop.jpg',
    alt: 'A learner in welding gloves and visor working on a steel frame',
    position: 'center 16%',
  },
  bandsaw: {
    src: 'learner-bandsaw-operator.jpg',
    alt: 'A learner operating a cutting machine in a fabrication workshop',
    position: 'center 14%',
  },
  plateHandling: {
    src: 'learners-plate-handling.jpg',
    alt: 'Three learners moving steel plate on a workshop floor',
    position: 'center 22%',
  },
  loading: {
    src: 'learner-loading-components.jpg',
    alt: 'A learner loading fabricated steel components onto a vehicle on site',
    position: 'center 20%',
  },
  clientSite: {
    src: 'learners-client-site.jpg',
    alt: 'Prestige Tutelage learners at a client site',
    position: 'center 20%',
  },
  angleGrinder: {
    src: 'learner-angle-grinder.jpg',
    alt: 'A learner in full protective equipment using an angle grinder at a workbench',
    position: 'center 22%',
  },
  workshopFloor: {
    src: 'fabrication-workshop-floor.jpg',
    alt: 'A worker preparing steel plate on the floor of a large fabrication workshop',
    position: 'center 34%',
  },
  facilitator: {
    src: 'facilitator-session.jpg',
    alt: 'A Prestige Tutelage facilitator leading a session with learners',
    position: 'center 42%',
  },
  trainingRoom: {
    src: 'training-room.jpg',
    alt: 'A training room at Prestige Tutelage set up with a projector screen and boardroom seating',
    position: 'center',
  },
  cohortOutside: {
    src: 'learner-cohort.jpg',
    alt: 'A Prestige Tutelage learner intake gathered outside the training venue',
    position: 'center 40%',
  },
  consultation: {
    src: 'bbbee-consultation.jpg',
    alt: 'Two colleagues in conversation beside an office window',
    position: 'center 40%',
  },
  youngProfessional: {
    src: 'young-professional.jpg',
    alt: 'A young professional at the start of his working life',
    position: 'center 28%',
  },
  interview: {
    src: 'recruitment-interview.jpg',
    alt: 'A candidate interview taking place over a video call',
    position: 'center 40%',
  },
}

/** Sets are ordered — the first slide is the one that loads eagerly. */
export const pageHeroes = {
  about: [P.intake, P.certificatesGroup, P.facilitator],
  programmes: [P.certificatesGroup, P.angleGrinder, P.handoverOveralls],
  shortCourses: [P.facilitator, P.trainingRoom, P.cohortOutside],
  industries: [P.steelBeam, P.workshopFloor, P.bandsaw],
  growthPathways: [P.handoverRedShirt, P.intake, P.youngProfessional],
  corporateTraining: [P.trainingRoom, P.clientSite, P.plateHandling],
  services: [P.clientSite, P.trainingRoom, P.intake],
  businessSolutions: [P.intake, P.certificatesGroup, P.welding],
  bbbee: [P.certificatesGroup, P.intake, P.handoverOveralls],
  recruitment: [P.intake, P.youngProfessional, P.clientSite],
  officeRental: [P.facilitator, P.cohortOutside, P.loading],
  assessment: [P.certificatesGroup, P.handoverOveralls, P.handoverRedShirt],
  insights: [P.intake, P.welding, P.handoverReviewing],
  contact: [P.consultation, P.intake, P.facilitator],
}

/** Insight articles take their hero from the article's category. */
export const articleHeroes = {
  Qualifications: [P.certificatesGroup, P.handoverOveralls],
  Learnerships: [P.cohortOutside, P.intake, P.angleGrinder],
  Leadership: [P.consultation, P.facilitator],
  Delivery: [P.facilitator, P.trainingRoom],
  Industries: [P.steelBeam, P.bandsaw, P.workshopFloor],
  Planning: [P.trainingRoom, P.interview],
  default: [P.intake, P.certificatesGroup],
}
