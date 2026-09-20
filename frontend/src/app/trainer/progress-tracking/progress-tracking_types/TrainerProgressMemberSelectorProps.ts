// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressMemberSummary } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressMemberSummary';

export interface TrainerProgressMemberSelectorProps {
  allMembers: TrainerProgressMemberSummary[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
}
