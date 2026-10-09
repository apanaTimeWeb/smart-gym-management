// RESPONSIBILITY: Owns the validated list response shape returned by Trainer Progress Tracking entry queries.
import type { TrainerProgressTrackingProgressEntry } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingEntriesResponse {
  entries: TrainerProgressTrackingProgressEntry[];
  total: number;
  page: number;
  limit: number;
}
