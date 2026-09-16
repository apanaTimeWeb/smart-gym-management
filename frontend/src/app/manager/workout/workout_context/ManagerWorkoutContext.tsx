'use client';
// DATA FLOW: Manager module state/API data → ManagerWorkoutContext → owning Manager UI components.
// RESPONSIBILITY: Provides UI orchestration state to the Workout Library module hierarchy using URL parameters for filtering.
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { WorkoutFormValues, ExerciseFormValues } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';
import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/manager/workout/workout_utils/ManagerWorkoutSharedConstants';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ExerciseSnapshot } from '@/app/manager/workout/workout_types/ManagerWorkoutSnapshotTypes';

interface WorkoutContextType {
  tab: string;
  setTab: (t: string) => void;
  search: string;
  setSearch: (s: string) => void;
  levelFilter: string;
  setLevelFilter: (l: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showWkModal: boolean;
  setShowWkModal: (s: boolean) => void;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  setWkForm: (f: WorkoutFormValues) => void;
  openAddWk: () => void;
  openEditWk: (w: Workout) => void;

  showExModal: boolean;
  setShowExModal: (s: boolean) => void;
  editExId: string | null;
  exForm: ExerciseFormValues;
  setExForm: (f: ExerciseFormValues) => void;
  openAddEx: () => void;
  openEditEx: (e: ExerciseSnapshot) => void;
}

const ManagerWorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'Workout Plans';
  const search = searchParams.get('search') || '';
  const levelFilter = searchParams.get('level') || 'ALL';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL' && value !== '1' && value !== 'Workout Plans') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  }, [searchParams]);

  const setTab = (v: string) => router.replace(`${pathname}?${createQueryString('tab', v)}`);
  const setSearch = (v: string) => router.replace(`${pathname}?${createQueryString('search', v)}`);
  const setLevelFilter = (v: string) => router.replace(`${pathname}?${createQueryString('level', v)}`);
  const setCurrentPage = (v: number) => router.replace(`${pathname}?${createQueryString('page', v.toString())}`);

  const [showWkModal, setShowWkModal] = useState(false);
  const [editWkId, setEditWkId] = useState<string | null>(null);
  const [wkForm, setWkForm] = useState(EMPTY_WORKOUT_FORM);

  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<string | null>(null);
  const [exForm, setExForm] = useState(EMPTY_EXERCISE_FORM);

  const openAddWk = useCallback(() => { 
    setEditWkId(null); 
    setWkForm(EMPTY_WORKOUT_FORM); 
    setShowWkModal(true); 
  }, []);
  
  const openEditWk = useCallback((w: Workout) => { 
    setEditWkId(w.id); 
    setWkForm({ 
      name: w.name, 
      level: w.level, 
      days: Array.isArray(w.days) ? w.days.length : w.days, 
      exercises: w.exercises, 
      focus: w.focus, 
      duration: w.duration, 
      tags: w.tags.join(', ') 
    }); 
    setShowWkModal(true); 
  }, []);

  const openAddEx = useCallback(() => { 
    setEditExId(null); 
    setExForm(EMPTY_EXERCISE_FORM); 
    setShowExModal(true); 
  }, []);
  
  const openEditEx = useCallback((ex: ExerciseSnapshot) => { 
    setEditExId(ex.id); 
    setExForm({ 
      name: ex.name, 
      muscle: Array.isArray(ex.muscleGroup) ? ex.muscleGroup.join(', ') : (ex.muscleGroup || ''), 
      equipment: ex.equipment || '', 
      difficulty: ex.difficulty 
    }); 
    setShowExModal(true); 
  }, []);

  const value = useMemo(() => ({
    tab, setTab,
    search, setSearch,
    levelFilter, setLevelFilter,
    currentPage, setCurrentPage,
    showWkModal, setShowWkModal, editWkId, wkForm, setWkForm, openAddWk, openEditWk,
    showExModal, setShowExModal, editExId, exForm, setExForm, openAddEx, openEditEx,
  }), [
    tab, search, levelFilter, currentPage,
    showWkModal, editWkId, wkForm,
    showExModal, editExId, exForm,
    openAddWk, openEditWk, openAddEx, openEditEx
  ]);

  return (
    <ManagerWorkoutContext.Provider value={value}>
      {children}
    </ManagerWorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(ManagerWorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
}
