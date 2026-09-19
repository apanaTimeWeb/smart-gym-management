// RESPONSIBILITY: Owns the typed props contract for this component.
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export interface TrainerLibraryDietGridProps {
  dietPlans: DietPlan[];
  totalDietPlans: number;
  currentPage: number;
  isPending: boolean;
  isError: boolean;
  search: string;
  onPageChange: (page: number) => void;
  onViewDiet: (plan: DietPlan) => void;
}
