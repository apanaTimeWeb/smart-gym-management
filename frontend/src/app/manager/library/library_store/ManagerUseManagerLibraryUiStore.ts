'use client';
// RESPONSIBILITY: Owns Library-only UI state for modals and toast presentation; never stores server records.
import { create } from 'zustand';
import type { DietPlan, Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';

interface ManagerLibraryUiState {
  toast: { message: string; type: ManagerToastType } | null;
  showDietModal: boolean;
  editDietId: string | null;
  editDietData: DietPlan | null;
  showExerciseModal: boolean;
  editExerciseId: string | null;
  editExerciseData: Exercise | null;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  setShowDietModal: (show: boolean) => void;
  openAddDiet: () => void;
  openEditDiet: (diet: DietPlan) => void;
  setShowExerciseModal: (show: boolean) => void;
  openAddExercise: () => void;
  openEditExercise: (exercise: Exercise) => void;
}

export const useManagerLibraryUiStore = create<ManagerLibraryUiState>((set) => ({
  toast: null,
  showDietModal: false,
  editDietId: null,
  editDietData: null,
  showExerciseModal: false,
  editExerciseId: null,
  editExerciseData: null,
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  setShowDietModal: (show) => set({ showDietModal: show }),
  openAddDiet: () => set({ editDietId: null, editDietData: null, showDietModal: true, showExerciseModal: false }),
  openEditDiet: (diet) => set({ editDietId: diet.id, editDietData: diet, showDietModal: true, showExerciseModal: false }),
  setShowExerciseModal: (show) => set({ showExerciseModal: show }),
  openAddExercise: () => set({ editExerciseId: null, editExerciseData: null, showExerciseModal: true, showDietModal: false }),
  openEditExercise: (exercise) => set({ editExerciseId: exercise.id, editExerciseData: exercise, showExerciseModal: true, showDietModal: false }),
}));
