/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { WorkoutFormValues, ExerciseFormValues } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutSnapshotTypes';
import type { Workout } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutTypes';


interface ManagerWorkoutUiState {
  showWkModal: boolean;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  showExModal: boolean;
  editExId: string | null;
  exForm: ExerciseFormValues;
  setShowWkModal: (value: boolean) => void;
  setEditWkId: (value: string | null) => void;
  setWkForm: (value: WorkoutFormValues) => void;
  setShowExModal: (value: boolean) => void;
  setEditExId: (value: string | null) => void;
  setExForm: (value: ExerciseFormValues) => void;
  openAddWk: () => void;
  openEditWk: (workout: Workout) => void;
  openAddEx: () => void;
  openEditEx: (exercise: ExerciseSnapshot) => void;
}

/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutUiStore.
 * @dependencies Uses ManagerWorkoutFormTypes, ManagerWorkoutSnapshotTypes, ManagerWorkoutTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerWorkoutUiStore = create<ManagerWorkoutUiState>((set) => ({
  showWkModal: false,
  editWkId: null,
  wkForm: EMPTY_WORKOUT_FORM,
  showExModal: false,
  editExId: null,
  exForm: EMPTY_EXERCISE_FORM,
  setShowWkModal: (showWkModal) => set({ showWkModal }),
  setEditWkId: (editWkId) => set({ editWkId }),
  setWkForm: (wkForm) => set({ wkForm }),
  setShowExModal: (showExModal) => set({ showExModal }),
  setEditExId: (editExId) => set({ editExId }),
  setExForm: (exForm) => set({ exForm }),
  openAddWk: () => set({ editWkId: null, wkForm: EMPTY_WORKOUT_FORM, showWkModal: true }),
  openEditWk: (workout) => set({
    editWkId: workout.id,
    wkForm: {
      name: workout.name,
      level: workout.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      days: Array.isArray(workout.days) ? workout.days.length : workout.days,
      exercises: workout.exercises,
      focus: workout.focus,
      duration: workout.duration,
      tags: workout.tags.join(', ') },
    showWkModal: true }),
  openAddEx: () => set({ editExId: null, exForm: EMPTY_EXERCISE_FORM, showExModal: true }),
  openEditEx: (exercise) => set({
    editExId: exercise.id,
    exForm: {
      name: exercise.name,
      muscle: Array.isArray(exercise.muscleGroup) ? exercise.muscleGroup.join(', ') : (exercise.muscleGroup || ''),
      equipment: exercise.equipment || '',
      difficulty: exercise.difficulty as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" },
    showExModal: true }) }));
