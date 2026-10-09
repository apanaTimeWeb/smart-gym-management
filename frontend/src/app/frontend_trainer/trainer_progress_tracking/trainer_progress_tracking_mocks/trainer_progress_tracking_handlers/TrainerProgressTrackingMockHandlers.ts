import { TrainerProgressTrackingBrowseMockHandlers } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_handlers/TrainerProgressTrackingBrowseMockHandlers';
import { TrainerProgressTrackingMutationMockHandlers } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_mocks/trainer_progress_tracking_handlers/TrainerProgressTrackingMutationMockHandlers';

/**
 * @description Composes browse and mutation handlers for the Progress Tracking feature.
 * @dependencies Uses only module-owned handler groups.
 */
export const TrainerProgressTrackingMockHandlers = [
  ...TrainerProgressTrackingBrowseMockHandlers,
  ...TrainerProgressTrackingMutationMockHandlers,
];
