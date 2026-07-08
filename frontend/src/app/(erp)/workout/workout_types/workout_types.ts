import { 
  Workout, Exercise, 
  EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM 
} from '../workout_utils/WorkoutSharedConstants';
import React from 'react';

export interface WorkoutContextType {
  tab: string;
  setTab: (tab: string) => void;
  search: string;
  setSearch: (s: string) => void;
  
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
