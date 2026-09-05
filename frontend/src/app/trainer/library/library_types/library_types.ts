// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Diet Library module.
import type { } from '@/lib/api';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/trainer/library/library_utils/LibrarySharedConstants';
import React from 'react';

import type { Exercise, DietPlan } from '@/app/trainer/trainer_types/trainer_types';
export interface LibraryInitialData {
  exercises: Exercise[];
  dietPlans: DietPlan[];
}

import type { FetchState } from '@/app/trainer/trainer_types/trainer_types';

export interface LibraryContextType {
 tab: LibraryTab;
 setTab: (t: LibraryTab) => void;
 
 exercises: Exercise[];
 dietPlans: DietPlan[];
 fetchState: FetchState;
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




