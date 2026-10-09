// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryDietPlan } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';

export interface TrainerLibraryDietGridProps {
  dietPlans: TrainerLibraryDietPlan[];
  totalDietPlans: number;
  currentPage: number;
  isPending: boolean;
  isError: boolean;
  search: string;
  onPageChange: (page: number) => void;
  onViewDiet: (plan: TrainerLibraryDietPlan) => void;
}
