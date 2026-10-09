import type { TrainerProgressTrackingProgressSortDirection } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

/** Props for the progress-table sort direction indicator. */
export interface TrainerProgressTrackingSortDirectionIconProps {
  /** Whether the associated column is actively sorted. */
  active: boolean;
  /** Current table sort direction. */
  direction: TrainerProgressTrackingProgressSortDirection;
}
