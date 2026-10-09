// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryFilterGoal } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';

export interface TrainerLibraryTabsProps {
  search: string;
  setSearch: (value: string) => void;
  filterGoal: string | TrainerLibraryFilterGoal;
  setFilterGoal: (value: TrainerLibraryFilterGoal) => void;
  onRefresh: () => Promise<void>;
}
