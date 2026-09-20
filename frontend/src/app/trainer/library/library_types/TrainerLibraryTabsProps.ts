// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerLibraryFilterGoal } from '@/app/trainer/library/library_types/TrainerLibrary_types';

export interface TrainerLibraryTabsProps {
  search: string;
  setSearch: (value: string) => void;
  filterGoal: string | TrainerLibraryFilterGoal;
  setFilterGoal: (value: TrainerLibraryFilterGoal) => void;
  onRefresh: () => Promise<void>;
}
