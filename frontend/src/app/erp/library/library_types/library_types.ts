// RESPONSIBILITY: library_types.ts handles the logic and UI for its corresponding feature.
import type { } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/erp/library/library_utils/LibrarySharedConstants';
import React from 'react';

export interface LibraryContextType {
 tab: LibraryTab;
 setTab: (t: LibraryTab) => void;
 
 exercises: Exercise[];
 dietPlans: DietPlan[];
 loading: boolean;
 saving: boolean;
  toast: { message: string; type: ToastType } | null;
  
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  
  showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 
 loadAll: () => Promise<void>;
 
 // Exercise Modal State
 showExModal: boolean;
 setShowExModal: (show: boolean) => void;
 editExId: number | null;
 editExData: any;
 openAddEx: () => void;
 openEditEx: (ex: Exercise) => void;
 saveExercise: (data: any) => Promise<void>;
 deleteExercise: (id: number) => Promise<void>;
 
 // Diet Modal State
 showDietModal: boolean;
 setShowDietModal: (show: boolean) => void;
 editDietId: number | null;
 editDietData: any;
 openAddDiet: () => void;
 openEditDiet: (d: DietPlan) => void;
 saveDietPlan: (data: any) => Promise<void>;
 deleteDietPlan: (id: number) => Promise<void>;
}

export interface Exercise {
  id: number; name: string; category: string; muscleGroup: string[];
  sets?: number; reps?: string; duration?: string;
  difficulty: string; description?: string; videoUrl?: string; imageUrl?: string; isActive: boolean;
}
export interface DietPlan {
  id: number; name: string; goal: string;
  calories?: number; protein?: number; carbs?: number; fats?: number;
  description?: string; meals: string[]; isActive: boolean;
}
