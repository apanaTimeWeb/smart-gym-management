// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Diet Library module.
import { z } from 'zod';
import { DietPlanSchema } from '@/app/trainer/library/library_types/TrainerLibrary.schema';

export type DietPlan = z.infer<typeof DietPlanSchema>;

export type TrainerLibraryFilterGoal = (typeof import('@/app/trainer/library/library_utils/TrainerLibrarySharedConstants').GOALS)[number] | 'All';

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
  filterGoal: TrainerLibraryFilterGoal | string;
  setFilterGoal: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loadAll: () => Promise<void>;
  showDietModal: boolean;
  editDietId: string | null;
  editDietData: DietPlan | null;
  openEditDiet: (diet: DietPlan) => void;
  closeDietModal: () => void;
}
