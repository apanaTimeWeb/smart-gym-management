import { create } from 'zustand';
import type { Workout, Exercise } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';

interface TrainerWorkoutState {
  showWkModal: boolean;
  setShowWkModal: (show: boolean) => void;
  editWk: Workout | null;
  setEditWk: (wk: Workout | null) => void;

  showExModal: boolean;
  setShowExModal: (show: boolean) => void;
  editEx: Exercise | null;
  setEditEx: (ex: Exercise | null) => void;

  showDetailDrawer: boolean;
  setShowDetailDrawer: (show: boolean) => void;
  detailWk: Workout | null;
  setDetailWk: (wk: Workout | null) => void;

  showAssignModal: boolean;
  setShowAssignModal: (show: boolean) => void;
  assignWk: Workout | null;
  setAssignWk: (wk: Workout | null) => void;
}

export const useTrainerWorkoutStore = create<TrainerWorkoutState>((set) => ({
  showWkModal: false,
  setShowWkModal: (show) => set({ showWkModal: show }),
  editWk: null,
  setEditWk: (wk) => set({ editWk: wk }),

  showExModal: false,
  setShowExModal: (show) => set({ showExModal: show }),
  editEx: null,
  setEditEx: (ex) => set({ editEx: ex }),

  showDetailDrawer: false,
  setShowDetailDrawer: (show) => set({ showDetailDrawer: show }),
  detailWk: null,
  setDetailWk: (wk) => set({ detailWk: wk }),

  showAssignModal: false,
  setShowAssignModal: (show) => set({ showAssignModal: show }),
  assignWk: null,
  setAssignWk: (wk) => set({ assignWk: wk }),
}));
