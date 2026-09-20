// RESPONSIBILITY: Owns the typed props contract for this component.
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export interface TrainerLibraryDietModalProps {
  isOpen: boolean;
  plan: DietPlan | null;
  onClose: () => void;
  onAssign?: () => void;
}
