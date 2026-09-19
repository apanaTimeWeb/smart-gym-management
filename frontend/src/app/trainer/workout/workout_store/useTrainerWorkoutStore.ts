import { create } from 'zustand';
import type { TrainerWorkoutState } from '@/app/trainer/workout/workout_store/TrainerWorkoutStoreTypes';

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
