import type { WorkoutFormValues, ExerciseFormValues } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutSnapshotTypes';
import type { Workout } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutTypes';


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
