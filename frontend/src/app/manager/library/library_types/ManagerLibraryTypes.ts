// RESPONSIBILITY: Defines Manager Library domain records, view state, and UI-facing server-state contracts.
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';

export type LibraryView = 'diet' | 'exercises';
export type ManagerLibraryNutrientKey = 'calories' | 'protein' | 'carbs' | 'fats';


export interface ManagerLibraryViewModel {
  view: LibraryView;
  setView: (view: LibraryView) => void;
  dietPlans: DietPlan[];
  totalDietPlans: number;
  exercises: Exercise[];
  totalExercises: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  toast: { message: string; type: ManagerToastType } | null;
  search: string;
  debouncedSearch: string;
  setSearch: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  showDietModal: boolean;
  setShowDietModal: (show: boolean) => void;
  editDietId: string | null;
  editDietData: DietPlan | null;
  openAddDiet: () => void;
  openEditDiet: (diet: DietPlan) => void;
  saveDietPlan: (data: Partial<DietPlan>) => Promise<void>;
  deleteDietPlan: (id: string) => Promise<void>;
  showExerciseModal: boolean;
  setShowExerciseModal: (show: boolean) => void;
  editExerciseId: string | null;
  editExerciseData: Exercise | null;
  openAddExercise: () => void;
  openEditExercise: (exercise: Exercise) => void;
  saveExercise: (data: Partial<Exercise>) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
}

export interface DietMeal {
  time?: string;
  name?: string;
  calories?: number;
  foods?: string[];
}

export interface DietPlan {
  id: string;
  name: string;
  goal: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  description?: string;
  meals: (string | DietMeal)[];
  isActive: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup?: string[];
  sets?: number;
  reps?: number;
  duration?: number;
  difficulty: string;
  description?: string;
  videoUrl?: string;
  isActive: boolean;
}
