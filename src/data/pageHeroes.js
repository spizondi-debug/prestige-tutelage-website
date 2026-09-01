// Hero photograph sets, one per page.
//
// Each entry is a slide in that page's hero carousel. Every hero now draws
// only on the `stock*` entries — licensed stock, confirmed with Prestige.
// Prestige's own photographs are still used extensively below the hero, in
// sectionSliders and articleHeroes further down this file. Keep the `stock`
// prefix so a future edit doesn't mix the two libraries up.
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
  stockSiteWorkerPhone: {
    src: 'stock-site-worker-phone.jpg',
    alt: 'A site worker in a hard hat checking a phone on site',
    position: 'center 12%',
  },
  stockColleaguesPhone: {
    src: 'stock-colleagues-checking-phone.jpg',
    alt: 'Two colleagues checking a phone together in an office setting',
    position: '38% center',
  },
  stockProfessionalDesk: {
    src: 'stock-professional-at-desk.jpg',
    alt: 'A professional at a desk checking a phone beside a laptop',
    position: '62% center',
  },
  stockExecutivePhone: {
    src: 'stock-executive-checking-phone.jpg',
    alt: 'A professional in a suit checking a phone',
    position: 'center 8%',
  },
  stockSiteCraftsman: {
    src: 'stock-site-craftsman.jpg',
    alt: 'A tradesperson using power tools at a timber worksite',
    position: '75% center',
  },
  stockTeamOnsite: {
    src: 'stock-team-onsite.jpg',
    alt: 'Two colleagues in workwear and safety gear standing together on site',
    position: 'center center',
  },
  stockTrainingNotes: {
    src: 'stock-training-notes.jpg',
    alt: 'A course participant taking notes during a training session',
    position: 'center center',
  },
}

/** Sets are ordered — the first slide is the one that loads eagerly.
 *
 * Every hero here draws only on the licensed stock photography — Prestige's
 * own photographs stay in the body sections further down each page
 * (sectionSliders / articleHeroes below), not in the hero. With only seven
 * stock photographs to cover thirteen pages, the same photo does recur
 * across different pages, but each page draws a different combination and
 * order so no two heroes feel interchangeable. Two rules hold: no two pages
 * carry the exact same set, and each set runs 3–6 slides. Re-check both
 * after any swap — scripts/validate-heroes.mjs does it in one command. */
export const pageHeroes = {
  home: [
    P.stockConstructionWorker,
    P.stockWorkplaceTeam,
    P.stockBoardroomMeeting,
    P.stockPresentationAudience,
    P.stockNotetakingAudience,
    P.stockRemoteProfessional,
  ],
  about: [P.stockWorkplaceTeam, P.stockNotetakingAudience, P.stockSeminarAudience, P.stockConstructionWorker],
  programmes: [P.stockNotetakingAudience, P.stockRemoteProfessional, P.stockConstructionWorker, P.stockPresentationAudience],
  shortCourses: [P.stockPresentationAudience, P.stockRemoteProfessional, P.stockSeminarAudience, P.stockWorkplaceTeam],
  industries: [P.stockConstructionWorker, P.stockBoardroomMeeting, P.stockNotetakingAudience, P.stockSeminarAudience, P.stockWorkplaceTeam],
  growthPathways: [P.stockBoardroomMeeting, P.stockRemoteProfessional, P.stockPresentationAudience, P.stockConstructionWorker],
  services: [P.stockBoardroomMeeting, P.stockWorkplaceTeam, P.stockNotetakingAudience, P.stockRemoteProfessional],
  businessSolutions: [P.stockPresentationAudience, P.stockSeminarAudience, P.stockBoardroomMeeting],
  bbbee: [P.stockPresentationAudience, P.stockConstructionWorker, P.stockRemoteProfessional, P.stockWorkplaceTeam],
  recruitment: [P.stockRemoteProfessional, P.stockNotetakingAudience, P.stockBoardroomMeeting, P.stockSeminarAudience],
  officeRental: [P.stockRemoteProfessional, P.stockPresentationAudience, P.stockWorkplaceTeam],
  assessment: [P.stockNotetakingAudience, P.stockConstructionWorker, P.stockSeminarAudience, P.stockBoardroomMeeting, P.stockRemoteProfessional],
  insights: [P.stockRemoteProfessional, P.stockWorkplaceTeam, P.stockPresentationAudience, P.stockNotetakingAudience],
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
  // The one section slider that draws on licensed stock rather than Prestige's
  // own photography — a deliberate exception, chosen to show the audience
  // (employee, manager, HR/skills team, leadership) rather than the workshop
  // floor already shown elsewhere on this page.
  growthPathways: [P.stockSiteWorkerPhone, P.stockColleaguesPhone, P.stockProfessionalDesk, P.stockExecutivePhone],
  officeRental: [P.trainingRoom, P.workshopTraining, P.certificatesCohort],
  programmesLearnerships: [P.handoverOveralls, P.handoverRedShirt, P.certificatesCohort],
  homeLearnerships: [P.stockSiteCraftsman, P.stockTeamOnsite, P.stockTrainingNotes],
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
