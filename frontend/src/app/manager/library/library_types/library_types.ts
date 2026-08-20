// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Diet Library module.
import type { } from '@/lib/api';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/manager/library/library_utils/LibrarySharedConstants';
import React from 'react';

export interface LibraryInitialData {
  exercises: Exercise[];
  dietPlans: DietPlan[];
}

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
 editExId: string | null;
 editExData: Record<string, any> | null;
 openAddEx: () => void;
 openEditEx: (ex: Exercise) => void;
 saveExercise: (data: Record<string, any>) => Promise<void>;
 deleteExercise: (id: string) => Promise<void>;
 
 // Diet Modal State
 showDietModal: boolean;
 setShowDietModal: (show: boolean) => void;
 editDietId: string | null;
 editDietData: Record<string, any> | null;
 openAddDiet: () => void;
 openEditDiet: (d: DietPlan) => void;
 saveDietPlan: (data: Record<string, any>) => Promise<void>;
 deleteDietPlan: (id: string) => Promise<void>;
}

export interface Exercise {
  id: string; name: string; category: string; muscleGroup: string[];
  sets?: number; reps?: string; duration?: string;
  difficulty: string; description?: string; videoUrl?: string; imageUrl?: string; isActive: boolean;
}
export interface DietPlan {
  id: string; name: string; goal: string;
  calories?: number; protein?: number; carbs?: number; fats?: number;
  description?: string; meals: string[]; isActive: boolean;
}
