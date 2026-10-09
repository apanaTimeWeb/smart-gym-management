// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Library server state.
import type { TrainerLibraryQueryParams } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryQueryParamsTypes';
export type { TrainerLibraryQueryParams };

export const TRAINER_LIBRARY_QUERY_KEYS = {
  all: ['trainer_library'] as const,
  dietPlansAll: () => [...TRAINER_LIBRARY_QUERY_KEYS.all, 'diet-plans'] as const,
  dietPlans: (params: TrainerLibraryQueryParams) => [...TRAINER_LIBRARY_QUERY_KEYS.dietPlansAll(), params] as const,
  assignedMembers: () => [...TRAINER_LIBRARY_QUERY_KEYS.all, 'assigned-members'] as const,
} as const;
