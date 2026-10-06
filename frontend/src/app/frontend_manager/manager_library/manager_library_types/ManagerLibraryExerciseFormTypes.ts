// RESPONSIBILITY: Defines React Hook Form values and defaults for Manager Library exercise create/edit flows.
export interface ManagerLibraryExerciseFormValues {
  name: string;
  category: string;
  muscleGroup: string;
  sets?: number;
  reps?: number;
  duration?: number;
  difficulty: string;
  description: string;
  videoUrl: string;
  isActive: boolean;
}

/**
 * @description Provides the ManagerLibraryExerciseFormTypes implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_MANAGER_LIBRARY_EXERCISE_FORM: ManagerLibraryExerciseFormValues = {
  name: '',
  category: '',
  muscleGroup: '',
  sets: undefined,
  reps: undefined,
  duration: undefined,
  difficulty: 'BEGINNER',
  description: '',
  videoUrl: '',
  isActive: true,
};
