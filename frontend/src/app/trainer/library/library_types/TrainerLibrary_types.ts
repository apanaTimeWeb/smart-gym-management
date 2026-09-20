// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Diet Library module.
import { z } from 'zod';
import { DietPlanSchema } from '@/app/trainer/library/library_types/TrainerLibrary.schema';
export type DietPlan = z.infer<typeof DietPlanSchema>;

export type TrainerLibraryFilterGoal = import('@/app/trainer/library/library_utils/TrainerLibrarySharedConstants').TrainerLibraryFilterGoal;

export interface TrainerLibraryLogicReturn {
  dietPlans: DietPlan[];
  totalDietPlans: number;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  saving: boolean;
  search: string;
  debouncedSearch: string;
  setSearch: (value: string) => void;
  filterGoal: TrainerLibraryFilterGoal;
  setFilterGoal: (value: TrainerLibraryFilterGoal) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loadAll: () => Promise<void>;
  showDietModal: boolean;
  editDietId: string | null;
  editDietData: DietPlan | null;
  openEditDiet: (diet: DietPlan) => void;
  closeDietModal: () => void;
}

export interface TrainerLibraryAssignedMember { id: string; name: string; assignedDietPlanId: string | null; }
