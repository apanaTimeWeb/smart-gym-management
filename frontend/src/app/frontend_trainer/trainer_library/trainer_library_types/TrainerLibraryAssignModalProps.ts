// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan, TrainerLibraryAssignedMember } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';

export interface TrainerLibraryAssignModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  members: TrainerLibraryAssignedMember[];
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (memberId: string, idempotencyKey: string) => Promise<void>;
  testId?: string;
}
