import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/erp/workout/workout_utils/WorkoutSharedConstants';
import React from 'react';

import type { Exercise } from '@/lib/api';

import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';

export interface WorkoutContextType {
 tab: string;
 setTab: (tab: string) => void;
 search: string;
 setSearch: (s: string) => void;
 currentPage: number;
 setCurrentPage: (p: number) => void;
 
 workouts: Workout[];
 totalWorkouts: number;
 exercises: Exercise[];
 totalExercises: number;
 
 loading: boolean;
 saving: boolean;
 toast: { message: string; type: ToastType } | null;
 showToast: (msg: string, type: ToastType) => void;
 hideToast: () => void;
 loadAll: () => Promise<void>;

 showWkModal: boolean;
 setShowWkModal: (show: boolean) => void;
 editWkId: number | null;
 wkForm: typeof EMPTY_WORKOUT_FORM;
 setWkForm: React.Dispatch<React.SetStateAction<typeof EMPTY_WORKOUT_FORM>>;
 
 showExModal: boolean;
 setShowExModal: (show: boolean) => void;
 editExId: number | null;
 exForm: typeof EMPTY_EXERCISE_FORM;
 setExForm: React.Dispatch<React.SetStateAction<typeof EMPTY_EXERCISE_FORM>>;
 
 openAddWk: () => void;
 openEditWk: (w: Workout) => void;
 saveWk: (e: React.FormEvent) => void;
 deleteWk: (id: number) => void;
 
 openAddEx: () => void;
 openEditEx: (ex: Exercise) => void;
 saveEx: (e: React.FormEvent) => void;
 deleteEx: (id: number) => void;
}

export interface Workout {
  id: number; name: string; level: string; days: number;
  exercises: number; focus: string; duration: string; tags: string[]; isActive?: boolean;
}
