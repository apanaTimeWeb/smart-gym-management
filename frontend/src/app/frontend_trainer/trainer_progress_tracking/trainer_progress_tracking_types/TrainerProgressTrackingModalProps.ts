// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingCreateProgressEntryDto } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';

export interface TrainerProgressTrackingModalProps {
  editingEntry: TrainerProgressTrackingProgressEntry | null;
  onSave: (data: TrainerProgressTrackingCreateProgressEntryDto) => Promise<boolean>;
  onClose: () => void;
  testId?: string;
}
