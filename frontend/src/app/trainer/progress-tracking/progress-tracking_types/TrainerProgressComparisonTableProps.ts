// RESPONSIBILITY: Owns the typed props contract for this component.
import type { ComparisonMemberSnapshot } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export interface TrainerProgressComparisonTableProps {
  snapshots: ComparisonMemberSnapshot[];
}
