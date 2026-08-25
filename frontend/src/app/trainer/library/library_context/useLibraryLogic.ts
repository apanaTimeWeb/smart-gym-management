// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Diet Library module.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { libraryApi } from '@/app/trainer/library/library_api/library_api';
import type { Exercise, DietPlan } from '@/app/trainer/library/library_types/library_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab } from '@/app/trainer/library/library_utils/LibrarySharedConstants';
import { LibraryContextType, LibraryInitialData } from '@/app/trainer/library/library_types/library_types';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { useRouter, useSearchParams } from 'next/navigation';

export function useLibraryLogic(initialData?: LibraryInitialData | null): LibraryContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const tab = (searchParams.get('tab') as LibraryTab) || 'Exercises';
  
  const setTab = useCallback((newTab: LibraryTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    params.delete('page');
    params.delete('search');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || []);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>(initialData?.dietPlans || []);
 
 const [loading, setLoading] = useState(!initialData);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [search, setLocalSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(search, 300);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) { params.set('search', debouncedSearch); params.set('page', '1'); }
      else { params.delete('search'); params.set('page', '1'); }
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, searchParams, router]);

  const setSearch = useCallback((val: string) => setLocalSearch(val), []);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

 const [showExModal, setShowExModal] = useState(false);
 const [editExId, setEditExId] = useState<string | null>(null);
 const [editExData, setEditExData] = useState<any>(null);

 const [showDietModal, setShowDietModal] = useState(false);
 const [editDietId, setEditDietId] = useState<string | null>(null);
 const [editDietData, setEditDietData] = useState<any>(null);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const loadAll = useCallback(async () => {
 setLoading(true);
 try {
 const params: Record<string, string> = {
  page: currentPage.toString(),
  limit: '10'
 };
 if (debouncedSearch) {
  params.search = debouncedSearch;
 }
 const [exRes, dietRes] = await Promise.all([
 libraryApi.getExercises(params),
 libraryApi.getDietPlans(params),
 ]);
 setExercises(exRes.data?.exercises || exRes.data || []);
 setDietPlans(dietRes.data?.dietPlans || dietRes.data || []);
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
 muscleGroup: ex.muscleGroup?.join(', '), 
 sets: ex.sets ? String(ex.sets) : '', 
 reps: ex.reps || '', 
 duration: ex.duration || '', 
 difficulty: ex.difficulty, 
 description: ex.description || '', 
 videoUrl: ex.videoUrl || '' 
 });
 setShowExModal(true);
 }, []);
 
 const saveExercise = useCallback(async (data: Record<string, any>) => {
 setSaving(true);
 try {
 const payload = { 
 ...data, 
 muscleGroup: data.muscleGroup ? data.muscleGroup.split(',').map((s: string) => s.trim()) : [], 
 sets: data.sets ? Number(data.sets) : undefined 
 };
 
 if (editExId) { 
 const res = await libraryApi.updateExercise(editExId, payload) as unknown as { message?: string }; 
 showToast(res.message || 'Exercise updated successfully', 'success'); 
 } else { 
 const res = await libraryApi.createExercise(payload) as unknown as { message?: string }; 
 showToast(res.message || 'Exercise created successfully', 'success'); 
 }
 setShowExModal(false); 
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editExId, loadAll, showToast]);
 
  const deleteExercise = useCallback(async (id: string) => {
   const isConfirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', confirmText: 'Delete', type: 'danger' });
   if (!isConfirmed) return;
   try { 
 const res = await libraryApi.removeExercise(id) as unknown as { message?: string }; 
 showToast(res.message || 'Exercise deleted', 'success'); 
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
 meals: d.meals?.join('\n') 
 });
 setShowDietModal(true);
 }, []);
 
 const saveDietPlan = useCallback(async (data: Record<string, any>) => {
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
 const res = await libraryApi.updateDietPlan(editDietId, payload) as unknown as { message?: string }; 
 showToast(res.message || 'Diet plan updated', 'success'); 
 } else { 
 const res = await libraryApi.createDietPlan(payload) as unknown as { message?: string }; 
 showToast(res.message || 'Diet plan created', 'success'); 
 }
 setShowDietModal(false); 
 await loadAll();
 } catch (err) { 
 showToast((err as Error).message, 'error'); 
 } finally { 
 setSaving(false); 
 }
 }, [editDietId, loadAll, showToast]);
 
  const deleteDietPlan = useCallback(async (id: string) => {
   const isConfirmed = await confirm({ title: 'Delete Diet Plan', message: 'Delete this diet plan?', confirmText: 'Delete', type: 'danger' });
   if (!isConfirmed) return;
  try { 
 const res = await libraryApi.removeDietPlan(id) as unknown as { message?: string }; 
 showToast(res.message || 'Diet plan deleted', 'success'); 
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
