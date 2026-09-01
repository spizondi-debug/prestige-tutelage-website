// Hero photograph sets, one per page.
//
// Each entry is a slide in that page's hero carousel. Most photographs are
// Prestige's own; the `stock*` entries are licensed stock, confirmed with
// Prestige, reintroduced to widen the homepage rotation. Keep the two
// visually distinguishable in this file (the `stock` prefix) so a future
// edit doesn't mistake one for the other.
//
// `position` is the CSS object-position used to keep faces out of the crop
// when a portrait source is shown in a landscape panel. Check it after
// swapping any image.
//
// CONSENT — read before adding: several of the Prestige photographs show
// identifiable learners, and the certificate photographs carry readable
// names. Confirm publication consent is held before the site goes to a
// public domain. The stock photographs carry their own licence, confirmed
// separately — no additional consent question applies to those.
//
// The stock filenames arrived mismatched to their content (e.g. a file named
// "graduation" was a construction site) — alt text below describes what is
// actually in each photo, not the original filename.

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
  handoverCongrats: {
    src: 'certificate-handover-congratulations.jpg',
    alt: 'A Prestige Tutelage learner being congratulated at a certificate handover',
    position: 'center 26%',
  },
  facilitatorSession: {
    src: 'facilitator-session.jpg',
    alt: 'Prestige Tutelage learners working at desks while a facilitator leads the session',
    position: 'center 42%',
  },
  workshopTraining: {
    src: 'workshop-training.jpg',
    alt: 'A learner in full protective equipment working with an angle grinder during practical training',
    position: 'center 30%',
  },
  certificatesCohort: {
    src: 'certificates-cohort.jpg',
    alt: 'Prestige Tutelage learners with their certificates of completion',
    position: 'center 28%',
  },
  stockConstructionWorker: {
    src: 'stock-construction-worker.jpg',
    alt: 'A tradesperson in safety gear using power tools at a construction site',
    position: 'center 30%',
  },
  stockWorkplaceTeam: {
    src: 'stock-workplace-team.jpg',
    alt: 'Two workers in branded workwear and hard hats standing together on site',
    position: 'center 30%',
  },
  stockSeminarAudience: {
    src: 'stock-seminar-audience.jpg',
    alt: 'A close, candid view of a seminar audience member',
    position: 'center 20%',
  },
  stockNotetakingAudience: {
    src: 'stock-notetaking-audience.jpg',
    alt: 'An audience member taking notes during a training session',
    position: 'center 40%',
  },
  stockPresentationAudience: {
    src: 'stock-presentation-audience.jpg',
    alt: 'A presenter addressing a seated, engaged corporate audience',
    position: 'center 30%',
  },
  stockBoardroomMeeting: {
    src: 'stock-boardroom-meeting.jpg',
    alt: 'A team collaborating around a boardroom table with laptops open',
    position: 'center 35%',
  },
  stockRemoteProfessional: {
    src: 'stock-remote-professional.jpg',
    alt: 'A professional working on a laptop in a plant-filled space',
    position: 'center 30%',
  },
}

/** Sets are ordered — the first slide is the one that loads eagerly.
 *
 * Every photograph here is Prestige's own. Three rules hold: a page's hero
 * never shows a photograph that already appears further down that same page,
 * no two pages carry the same set, and each set runs 3–5 slides. Re-check all
 * three after any swap — scripts/validate-heroes.mjs does it in one command. */
export const pageHeroes = {
  home: [
    P.stockConstructionWorker,
    P.stockWorkplaceTeam,
    P.stockBoardroomMeeting,
    P.stockPresentationAudience,
    P.stockNotetakingAudience,
  ],
  about: [P.cohortOutside, P.intake, P.certificatesGroup, P.handoverReviewing, P.stockWorkplaceTeam],
  programmes: [P.angleGrinder, P.workshopTraining, P.trainingRoom, P.cohortOutside, P.stockNotetakingAudience],
  shortCourses: [P.trainingRoom, P.intake, P.cohortOutside, P.handoverOveralls, P.stockPresentationAudience],
  industries: [P.steelBeam, P.workshopFloor, P.bandsaw, P.loading, P.stockConstructionWorker],
  growthPathways: [P.stockBoardroomMeeting, P.facilitatorSession, P.handoverCongrats, P.certificatesCohort],
  services: [P.trainingRoom, P.cohortOutside, P.handoverReviewing, P.angleGrinder, P.stockBoardroomMeeting],
  businessSolutions: [P.stockPresentationAudience, P.handoverReviewing, P.clientSite, P.steelBeam],
  bbbee: [P.handoverOveralls, P.certificatesGroup, P.intake, P.handoverCongrats, P.stockPresentationAudience],
  recruitment: [P.intake, P.clientSite, P.certificatesGroup, P.handoverReviewing, P.stockRemoteProfessional],
  officeRental: [P.cohortOutside, P.intake, P.certificatesGroup, P.handoverCongrats, P.stockRemoteProfessional],
  assessment: [P.facilitatorSession, P.trainingRoom, P.handoverReviewing, P.certificatesCohort, P.stockNotetakingAudience],
  insights: [P.intake, P.handoverRedShirt, P.handoverReviewing, P.cohortOutside, P.stockRemoteProfessional],
  contact: [P.handoverReviewing, P.intake, P.certificatesGroup, P.trainingRoom, P.stockWorkplaceTeam],
}

/**
 * Photographs for the editorial split sections further down each page. Chosen
 * so a section does not repeat its own page's hero imagery.
 */
export const sectionSliders = {
  aboutWhoWeAre: [P.handoverCongrats, P.handoverOveralls, P.handoverRedShirt],
  corporateInTheRoom: [P.trainingRoom, P.workshopTraining, P.angleGrinder, P.stockSeminarAudience],
  corporateDelivery: [P.workshopFloor, P.bandsaw, P.steelBeam],
  bbbee: [P.welding, P.bandsaw, P.plateHandling],
  recruitmentProcess: [P.handoverRedShirt, P.handoverOveralls, P.handoverCongrats],
  recruitmentYouth: [P.cohortOutside, P.certificatesCohort, P.workshopTraining],
  growthPathways: [P.angleGrinder, P.steelBeam, P.workshopFloor],
  officeRental: [P.trainingRoom, P.workshopTraining, P.certificatesCohort],
  programmesLearnerships: [P.handoverOveralls, P.handoverRedShirt, P.certificatesCohort],
  homeLearnerships: [P.handoverOveralls, P.handoverCongrats, P.clientSite],
}

/** Insight articles take their hero from the article's category. */
export const articleHeroes = {
  Qualifications: [P.certificatesGroup, P.handoverOveralls, P.certificatesCohort],
  Learnerships: [P.cohortOutside, P.intake, P.angleGrinder],
  Leadership: [P.handoverReviewing, P.certificatesGroup, P.intake],
  Delivery: [P.trainingRoom, P.workshopTraining, P.plateHandling],
  Industries: [P.steelBeam, P.bandsaw, P.workshopFloor],
  Planning: [P.trainingRoom, P.intake, P.certificatesGroup],
  default: [P.intake, P.certificatesGroup, P.cohortOutside],
}
