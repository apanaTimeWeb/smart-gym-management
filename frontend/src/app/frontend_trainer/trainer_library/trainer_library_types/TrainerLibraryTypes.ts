import { z } from 'zod';

import { TRAINER_LIBRARY_GOALS } from '@/app/frontend_trainer/trainer_library/trainer_library_constants/TrainerLibraryConstants';

import { TrainerLibraryDietPlanSchema } from '@/app/frontend_trainer/trainer_library/trainer_library_schemas/TrainerLibraryDomainSchemas';






// RESPONSIBILITY: Owns TypeScript domain and form contracts derived from Trainer library validation schemas.
export type TrainerLibraryDietPlan = z.infer<typeof TrainerLibraryDietPlanSchema>;



export type TrainerLibraryFilterGoal = (typeof TRAINER_LIBRARY_GOALS)[number]['value'];
export interface TrainerLibraryAssignedMember { id: string; name: string; email?: string; phone?: string; assignedDietPlanId?: string | null; }
export interface TrainerLibraryLogicReturn { dietPlans: TrainerLibraryDietPlan[]; totalDietPlans: number; isPending: boolean; isError: boolean; isSuccess: boolean; search: string; debouncedSearch: string; setSearch: (value: string) => void; filterGoal: TrainerLibraryFilterGoal | 'All'; setFilterGoal: (value: TrainerLibraryFilterGoal | 'All') => void; currentPage: number; setCurrentPage: (page: number) => void; loadAll: () => Promise<void>; showDietModal: boolean; editDietId: string | null; editDietData: TrainerLibraryDietPlan | null; openEditDiet: (diet: TrainerLibraryDietPlan) => void; closeDietModal: () => void; }
