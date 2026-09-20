// RESPONSIBILITY: UI-only Zustand state contract for Trainer Workout.
import type { Workout, Exercise } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

export interface TrainerWorkoutState {
  showWkModal: boolean;
  setShowWkModal: (show: boolean) => void;
  editWk: Workout | null;
  setEditWk: (workout: Workout | null) => void;
  showExModal: boolean;
  setShowExModal: (show: boolean) => void;
  editEx: Exercise | null;
  setEditEx: (exercise: Exercise | null) => void;
  showDetailDrawer: boolean;
  setShowDetailDrawer: (show: boolean) => void;
  detailWk: Workout | null;
  setDetailWk: (workout: Workout | null) => void;
  showAssignModal: boolean;
  setShowAssignModal: (show: boolean) => void;
  assignWk: Workout | null;
  setAssignWk: (workout: Workout | null) => void;
}
