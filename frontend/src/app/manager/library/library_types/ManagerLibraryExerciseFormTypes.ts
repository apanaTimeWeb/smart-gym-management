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
