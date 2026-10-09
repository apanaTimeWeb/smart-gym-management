// RESPONSIBILITY: UI-only Zustand state contract for the Trainer workout feature.
export interface TrainerWorkoutState {
  showWkModal: boolean;
  setShowWkModal: (show: boolean) => void;
  editWorkoutId: string | null;
  setEditWorkoutId: (workoutId: string | null) => void;
  showExModal: boolean;
  setShowExModal: (show: boolean) => void;
  editExerciseId: string | null;
  setEditExerciseId: (exerciseId: string | null) => void;
  showDetailDrawer: boolean;
  setShowDetailDrawer: (show: boolean) => void;
  showAssignModal: boolean;
  setShowAssignModal: (show: boolean) => void;
}
