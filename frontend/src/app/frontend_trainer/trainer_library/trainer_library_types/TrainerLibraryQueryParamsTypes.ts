// RESPONSIBILITY: Library query parameter type for the feature-owned query contract.
import type { TrainerLibraryFilterGoal } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';

export interface TrainerLibraryQueryParams {
  search?: string;
  goal?: TrainerLibraryFilterGoal;
  page?: number;
}
