// RESPONSIBILITY: Query parameter contracts for Trainer Progress Tracking server-state requests.
import type { TrainerProgressTrackingProgressSortDirection, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingEntriesQueryParams {
  memberId: string;
  page: number;
  limit: number;
  sortBy: TrainerProgressTrackingProgressSortField;
  sortDirection: TrainerProgressTrackingProgressSortDirection;
  comparison?: boolean;
}
