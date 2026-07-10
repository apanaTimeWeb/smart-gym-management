import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { libraryApi, type Exercise, type DietPlan } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/erp/library/library_utils/LibrarySharedConstants';
import { LibraryContextType } from '@/app/erp/library/library_types/library_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';

export function useLibraryLogic(): LibraryContextType {
  const { confirm } = useConfirm();
 const [tab, setTab] = useState<LibraryTab>('Exercises');
 const [exercises, setExercises] = useState<Exercise[]>([]);
 const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
 
 const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);

 const [showExModal, setShowExModal] = useState(false);
 const [editExId, setEditExId] = useState<number | null>(null);
 const [editExData, setEditExData] = useState<any>(null);

 const [showDietModal, setShowDietModal] = useState(false);
 const [editDietId, setEditDietId] = useState<number | null>(null);
 const [editDietData, setEditDietData] = useState<any>(null);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const loadAll = useCallback(async () => {
 setLoading(true);
 try {
 const [exRes, dietRes] = await Promise.all([
 libraryApi.getExercises(),
 libraryApi.getDietPlans(),
 ]);
 setExercises(Array.isArray(exRes.data) ? exRes.data : (exRes.data as any).Exercises || []);
 setDietPlans(Array.isArray(dietRes.data) ? dietRes.data : (dietRes.data as any).dietPlans || []);
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
 setEditExData(EMPTY_EXERCISE_FORM); 
 setShowExModal(true); 
 }, []);
 
 const openEditEx = useCallback((ex: Exercise) => {
 setEditExId(ex.id);
 setEditExData({ 
 name: ex.name, 
 category: ex.category, 
 muscleGroup: ex.muscleGroup.join(', '), 
 sets: ex.sets ? String(ex.sets) : '', 
 reps: ex.reps || '', 
 duration: ex.duration || '', 
 difficulty: ex.difficulty, 
 description: ex.description || '', 
 videoUrl: ex.videoUrl || '' 
 });
 setShowExModal(true);
 }, []);
 
 const saveExercise = useCallback(async (data: any) => {
 setSaving(true);
 try {
 const payload = { 
 ...data, 
 muscleGroup: data.muscleGroup ? data.muscleGroup.split(',').map((s: string) => s.trim()) : [], 
 sets: data.sets ? Number(data.sets) : undefined 
 };
 
 if (editExId) { 
 const res = await libraryApi.updateExercise(editExId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await libraryApi.createExercise(payload); 
 showToast((res as any).message, 'success'); 
 }
 setShowExModal(false); 
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editExId, loadAll, showToast]);
 
 const deleteExercise = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
  try { 
 const res = await libraryApi.removeExercise(id); 
 showToast((res as any).message, 'success'); 
 await loadAll(); 
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 }
 }, [loadAll, showToast]);

 // Diet CRUD
 const openAddDiet = useCallback(() => { 
 setEditDietId(null); 
 setEditDietData(EMPTY_DIET_FORM); 
 setShowDietModal(true); 
 }, []);
 
 const openEditDiet = useCallback((d: DietPlan) => {
 setEditDietId(d.id);
 setEditDietData({ 
 name: d.name, 
 goal: d.goal, 
 calories: d.calories ? String(d.calories) : '', 
 protein: d.protein ? String(d.protein) : '', 
 carbs: d.carbs ? String(d.carbs) : '', 
 fats: d.fats ? String(d.fats) : '', 
 description: d.description || '', 
 meals: d.meals.join('\n') 
 });
 setShowDietModal(true);
 }, []);
 
 const saveDietPlan = useCallback(async (data: any) => {
 setSaving(true);
 try {
 const payload = { 
 ...data, 
 calories: data.calories ? Number(data.calories) : undefined, 
 protein: data.protein ? Number(data.protein) : undefined, 
 carbs: data.carbs ? Number(data.carbs) : undefined, 
 fats: data.fats ? Number(data.fats) : undefined, 
 meals: data.meals ? data.meals.split('\n').map((s: string) => s.trim()).filter(Boolean) : [] 
 };
 
 if (editDietId) { 
 const res = await libraryApi.updateDietPlan(editDietId, payload); 
 showToast((res as any).message, 'success'); 
 } else { 
 const res = await libraryApi.createDietPlan(payload); 
 showToast((res as any).message, 'success'); 
 }
 setShowDietModal(false); 
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editDietId, loadAll, showToast]);
 
 const deleteDietPlan = useCallback(async (id: number) => {
  const isConfirmed = await confirm({ title: 'Delete Diet Plan', message: 'Delete this diet plan?', confirmText: 'Delete', type: 'danger' });
  if (!isConfirmed) return;
 try { 
 const res = await libraryApi.removeDietPlan(id); 
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
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showToast, hideToast, loadAll,
 showExModal, setShowExModal, editExId, editExData, openAddEx, openEditEx, saveExercise, deleteExercise,
 showDietModal, setShowDietModal, editDietId, editDietData, openAddDiet, openEditDiet, saveDietPlan, deleteDietPlan
 };
}
