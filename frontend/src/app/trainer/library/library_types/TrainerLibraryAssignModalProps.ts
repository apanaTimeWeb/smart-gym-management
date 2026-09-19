// RESPONSIBILITY: Owns the typed props contract for this component.
import type { DietPlan, TrainerLibraryAssignedMember } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export interface TrainerLibraryAssignModalProps {
  isOpen: boolean;
  plan: DietPlan | null;
  members: TrainerLibraryAssignedMember[];
  isSaving: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (memberId: string) => Promise<void>;
}
