// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export interface TrainerProgressModalProps {
  editingEntry: ProgressEntry | null;
  onSave: (data: CreateProgressEntryDto) => void;
  onClose: () => void;
}
