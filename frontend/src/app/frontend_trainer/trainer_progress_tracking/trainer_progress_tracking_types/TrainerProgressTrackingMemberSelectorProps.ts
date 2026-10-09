// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerProgressTrackingMemberSummary } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingMemberSummary';

export interface TrainerProgressTrackingMemberSelectorProps {
  allMembers: TrainerProgressTrackingMemberSummary[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
}
