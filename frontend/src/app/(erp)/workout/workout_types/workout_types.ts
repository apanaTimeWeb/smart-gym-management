import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/(erp)/workout/workout_utils/WorkoutSharedConstants';
import React from 'react';

/** Core data shape for a workout plan */
export interface Workout {
 id: number;
 name: string;
 level: string;
 days: number;
 exercises: number;
 focus: string;
 duration: string;
 tags: string[];
}

/** Core data shape for a single exercise */
export interface Exercise {
 id: number;
 name: string;
 muscle: string;
 equipment: string;
 difficulty: string;
}

export interface WorkoutContextType {
 tab: string;
 setTab: (tab: string) => void;
 search: string;
 setSearch: (s: string) => void;
 currentPage: number;
 setCurrentPage: (p: number) => void;
 
 workouts: Workout[];
 exercises: Exercise[];
 filteredWk: Workout[];
 filteredEx: Exercise[];
 
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
