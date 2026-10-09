import { TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_fixtures/TrainerProgressTrackingMockData';

let trainerProgressTrackingMockProgressDb = [...TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES];

export function getTrainerProgressTrackingMockProgress(): typeof trainerProgressTrackingMockProgressDb {
  return trainerProgressTrackingMockProgressDb;
}

export function replaceTrainerProgressTrackingMockProgress(nextEntries: typeof trainerProgressTrackingMockProgressDb): void {
  trainerProgressTrackingMockProgressDb = nextEntries;
}
