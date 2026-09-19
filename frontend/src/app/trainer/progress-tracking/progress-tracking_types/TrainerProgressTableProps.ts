// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ProgressEntry } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export interface TrainerProgressTableProps {
  entries: ProgressEntry[];
  onEdit: (entry: ProgressEntry) => void;
  onDelete: (entryId: string) => void;
}
