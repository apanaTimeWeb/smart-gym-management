// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingComparisonTableProps {
  snapshots: TrainerProgressTrackingComparisonMemberSnapshot[];
}
