// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ProgressEntry, CreateProgressEntryDto } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

export interface TrainerProgressModalProps {
  editingEntry: ProgressEntry | null;
  onSave: (data: CreateProgressEntryDto) => Promise<boolean>;
  onClose: () => void;
}
