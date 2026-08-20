// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Workout Library module.
import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/manager/workout/workout_utils/WorkoutSharedConstants';
import React from 'react';

import type { Exercise } from '@/app/manager/library/library_types/library_types';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

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
 editWkId: string | null;
 wkForm: typeof EMPTY_WORKOUT_FORM;
 setWkForm: React.Dispatch<React.SetStateAction<typeof EMPTY_WORKOUT_FORM>>;
 
 showExModal: boolean;
 setShowExModal: (show: boolean) => void;
 editExId: string | null;
 exForm: typeof EMPTY_EXERCISE_FORM;
 setExForm: React.Dispatch<React.SetStateAction<typeof EMPTY_EXERCISE_FORM>>;
 
 openAddWk: () => void;
 openEditWk: (w: Workout) => void;
 saveWk: (data: any) => void;
 deleteWk: (id: string) => void;
 
 openAddEx: () => void;
 openEditEx: (ex: Exercise) => void;
 saveEx: (data: any) => void;
 deleteEx: (id: string) => void;
}

export interface Workout {
  id: string; name: string; level: string; days: number;
  exercises: number; focus: string; duration: string; tags: string[]; isActive?: boolean;
}
