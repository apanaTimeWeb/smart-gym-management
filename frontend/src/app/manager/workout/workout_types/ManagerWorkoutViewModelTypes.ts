// RESPONSIBILITY: Return type contract for the Manager Workout UI facade.
import type { WorkoutFormValues, ExerciseFormValues } from '@/app/manager/workout/workout_types/ManagerWorkoutFormTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';

export interface ManagerWorkoutViewModel {
  tab: string;
  setTab: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  levelFilter: string;
  setLevelFilter: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  showWkModal: boolean;
  setShowWkModal: (value: boolean) => void;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  setWkForm: (value: WorkoutFormValues) => void;
  openAddWk: () => void;
  openEditWk: (workout: Workout) => void;
  showExModal: boolean;
  setShowExModal: (value: boolean) => void;
  editExId: string | null;
  exForm: ExerciseFormValues;
  setExForm: (value: ExerciseFormValues) => void;
  openAddEx: () => void;
  openEditEx: (exercise: ExerciseSnapshot) => void;
}
