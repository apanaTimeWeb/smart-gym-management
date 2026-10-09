// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';

export interface TrainerLibraryDietModalProps {
  isOpen: boolean;
  plan: TrainerLibraryDietPlan | null;
  onClose: () => void;
  onAssign?: () => void;
}
