"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { workoutApi, type Exercise, type DietPlan } from '@/lib/api';
import type { ToastType } from '@/components/Toast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '../library_utils/LibrarySharedConstants';

interface LibraryContextType {
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

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<LibraryTab>('Exercises');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<number | null>(null);
  const [exForm, setExForm] = useState(EMPTY_EXERCISE_FORM);

  const [showDietModal, setShowDietModal] = useState(false);
  const [editDietId, setEditDietId] = useState<number | null>(null);
  const [dietForm, setDietForm] = useState(EMPTY_DIET_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [exRes, dietRes] = await Promise.all([
        workoutApi.getExercises(),
        workoutApi.getDietPlans(),
      ]);
      setExercises(exRes.data);
      setDietPlans(dietRes.data);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [showToast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Exercise CRUD
  const openAddEx = useCallback(() => { 
    setEditExId(null); 
    setExForm(EMPTY_EXERCISE_FORM); 
    setShowExModal(true); 
  }, []);
  
  const openEditEx = useCallback((ex: Exercise) => {
    setEditExId(ex.id);
    setExForm({ 
      name: ex.name, 
      category: ex.category, 
      muscleGroup: ex.muscleGroup.join(', '), 
      sets: String(ex.sets || ''), 
      reps: ex.reps || '', 
      duration: ex.duration || '', 
      difficulty: ex.difficulty, 
      description: ex.description || '', 
      videoUrl: ex.videoUrl || '' 
    });
    setShowExModal(true);
  }, []);
  
  const saveExercise = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      const payload = { 
        ...exForm, 
        muscleGroup: exForm.muscleGroup.split(',').map(s => s.trim()), 
        sets: exForm.sets ? Number(exForm.sets) : undefined 
      };
      
      if (editExId) { 
        await workoutApi.updateExercise(editExId, payload); 
        showToast('Exercise updated!', 'success'); 
      } else { 
        await workoutApi.createExercise(payload); 
        showToast('Exercise added!', 'success'); 
      }
      setShowExModal(false); 
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editExId, exForm, loadAll, showToast]);
  
  const deleteExercise = useCallback(async (id: number) => {
    if (!window.confirm('Delete this exercise?')) return;
    try { 
      await workoutApi.removeExercise(id); 
      showToast('Deleted', 'success'); 
      await loadAll(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadAll, showToast]);

  // Diet CRUD
  const openAddDiet = useCallback(() => { 
    setEditDietId(null); 
    setDietForm(EMPTY_DIET_FORM); 
    setShowDietModal(true); 
  }, []);
  
  const openEditDiet = useCallback((d: DietPlan) => {
    setEditDietId(d.id);
    setDietForm({ 
      name: d.name, 
      goal: d.goal, 
      calories: String(d.calories || ''), 
      protein: String(d.protein || ''), 
      carbs: String(d.carbs || ''), 
      fats: String(d.fats || ''), 
      description: d.description || '', 
      meals: d.meals.join('\n') 
    });
    setShowDietModal(true);
  }, []);
  
  const saveDietPlan = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSaving(true);
    try {
      const payload = { 
        ...dietForm, 
        calories: dietForm.calories ? Number(dietForm.calories) : undefined, 
        protein: dietForm.protein ? Number(dietForm.protein) : undefined, 
        carbs: dietForm.carbs ? Number(dietForm.carbs) : undefined, 
        fats: dietForm.fats ? Number(dietForm.fats) : undefined, 
        meals: dietForm.meals.split('\n').map(s => s.trim()).filter(Boolean) 
      };
      
      if (editDietId) { 
        await workoutApi.updateDietPlan(editDietId, payload); 
        showToast('Diet plan updated!', 'success'); 
      } else { 
        await workoutApi.createDietPlan(payload); 
        showToast('Diet plan created!', 'success'); 
      }
      setShowDietModal(false); 
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editDietId, dietForm, loadAll, showToast]);
  
  const deleteDietPlan = useCallback(async (id: number) => {
    if (!window.confirm('Delete this diet plan?')) return;
    try { 
      await workoutApi.removeDietPlan(id); 
      showToast('Deleted', 'success'); 
      await loadAll(); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [loadAll, showToast]);

  const value = useMemo(() => ({
    tab, setTab,
    exercises, dietPlans,
    loading, saving, toast,
    showToast, hideToast, loadAll,
    showExModal, setShowExModal, editExId, exForm, setExForm, openAddEx, openEditEx, saveExercise, deleteExercise,
    showDietModal, setShowDietModal, editDietId, dietForm, setDietForm, openAddDiet, openEditDiet, saveDietPlan, deleteDietPlan
  }), [
    tab, exercises, dietPlans, loading, saving, toast,
    showToast, hideToast, loadAll,
    showExModal, editExId, exForm, openAddEx, openEditEx, saveExercise, deleteExercise,
    showDietModal, editDietId, dietForm, openAddDiet, openEditDiet, saveDietPlan, deleteDietPlan
  ]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibraryContext must be used within a LibraryProvider');
  }
  return context;
}
