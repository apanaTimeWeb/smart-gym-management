'use client';
// RESPONSIBILITY: Owns Library-only UI state for modals and toast presentation; never stores server records.
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
import { create } from 'zustand';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { DietPlan, Exercise } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes';


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

/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryUiStore.
 * @dependencies Uses ManagerLibraryTypes, ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryUiStore owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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
