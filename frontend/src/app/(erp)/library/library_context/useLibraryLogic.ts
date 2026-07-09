import { useState, useCallback, useEffect } from 'react';
import { workoutApi, type Exercise, type DietPlan } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/(erp)/library/library_utils/LibrarySharedConstants';
import { LibraryContextType } from '@/app/(erp)/library/library_types/library_types';
import { useConfirm } from '@/app/(erp)/erp_components/ErpConfirmProvider';

export function useLibraryLogic(): LibraryContextType {
  const { confirm } = useConfirm();
 const [tab, setTab] = useState<LibraryTab>('Exercises');
 const [exercises, setExercises] = useState<Exercise[]>([]);
 const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
 
 const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
 const res = await workoutApi.updateExercise(editExId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await workoutApi.createExercise(payload); 
 showToast((res as any).message, 'success'); 
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
  const isConfirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await workoutApi.removeExercise(id); 
 showToast((res as any).message, 'success'); 
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
 const res = await workoutApi.updateDietPlan(editDietId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await workoutApi.createDietPlan(payload); 
 showToast((res as any).message, 'success'); 
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
  const isConfirmed = await confirm({ title: 'Delete Diet Plan', message: 'Delete this diet plan?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await workoutApi.removeDietPlan(id); 
 showToast((res as any).message, 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

  return {
    tab, setTab,
    exercises, dietPlans,
    loading, saving, toast,
    search, setSearch, currentPage, setCurrentPage,
    showToast, hideToast, loadAll,
 showExModal, setShowExModal, editExId, exForm, setExForm, openAddEx, openEditEx, saveExercise, deleteExercise,
 showDietModal, setShowDietModal, editDietId, dietForm, setDietForm, openAddDiet, openEditDiet, saveDietPlan, deleteDietPlan
 };
}
