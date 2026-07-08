import type { Exercise, DietPlan } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '../library_utils/LibrarySharedConstants';
import React from 'react';

export interface LibraryContextType {
 tab: LibraryTab;
 setTab: (t: LibraryTab) => void;
 
 exercises: Exercise[];
 dietPlans: DietPlan[];
 loading: boolean;
 saving: boolean;
 toast: { message: string; type: ToastType } | null;
 
 showToast: (msg: string, t: ToastType) => void;
 hideToast: () => void;
 
 loadAll: () => Promise<void>;
 
 // Exercise Modal State
 showExModal: boolean;
 setShowExModal: (show: boolean) => void;
 editExId: number | null;
 exForm: typeof EMPTY_EXERCISE_FORM;
 setExForm: React.Dispatch<React.SetStateAction<typeof EMPTY_EXERCISE_FORM>>;
 openAddEx: () => void;
 openEditEx: (ex: Exercise) => void;
 saveExercise: (e: React.FormEvent) => Promise<void>;
 deleteExercise: (id: number) => Promise<void>;
 
 // Diet Modal State
 showDietModal: boolean;
 setShowDietModal: (show: boolean) => void;
 editDietId: number | null;
 dietForm: typeof EMPTY_DIET_FORM;
 setDietForm: React.Dispatch<React.SetStateAction<typeof EMPTY_DIET_FORM>>;
 openAddDiet: () => void;
 openEditDiet: (d: DietPlan) => void;
 saveDietPlan: (e: React.FormEvent) => Promise<void>;
 deleteDietPlan: (id: number) => Promise<void>;
}
