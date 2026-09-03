// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Diet Library module.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { libraryApi } from '@/app/manager/library/library_api/library_api';
import type { Exercise, DietPlan } from '@/app/manager/library/library_types/library_types';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { EMPTY_EXERCISE_FORM, EMPTY_DIET_FORM, type LibraryTab, type ExerciseFormValues, type DietFormValues } from '@/app/manager/library/library_utils/LibrarySharedConstants';
import type { LibraryContextType, LibraryInitialData } from '@/app/manager/library/library_types/library_types';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
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
  }, [showToast, currentPage, debouncedSearch]);

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
 
  const saveExercise = useCallback(async (data: Partial<ExerciseFormValues>) => {
    setSaving(true);
    try {
      const formattedData = {
        ...data,
        muscleGroup: typeof data.muscleGroup === 'string' ? data.muscleGroup.split(',').map(s => s.trim()) : data.muscleGroup
      };
      
      if (editExId) {
        const res = await libraryApi.updateExercise(editExId, formattedData as unknown as Partial<Exercise>);
        const updatedEx = res.data || formattedData;
        setExercises(prev => prev.map(e => String(e.id) === String(editExId) ? { ...e, ...updatedEx } as unknown as Exercise : e));
        showToast(res.message || 'Exercise updated successfully', 'success');
      } else {
        const res = await libraryApi.createExercise(formattedData as unknown as Partial<Exercise>);
        const newEx = res.data ? res.data : { ...formattedData, id: `ex-${Date.now()}` } as unknown as Exercise;
        setExercises(prev => [newEx, ...prev]);
        showToast(res.message || 'Exercise created successfully', 'success');
      }
      setShowExModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editExId, showToast]);
 
  const deleteExercise = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Remove Exercise', message: 'Delete this exercise from library?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await libraryApi.removeExercise(id);
      setExercises(prev => prev.filter(e => String(e.id) !== String(id)));
      showToast(res.message || 'Exercise deleted', 'success');
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [showToast, confirm]);

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
 
  const saveDietPlan = useCallback(async (data: Partial<DietFormValues>) => {
    setSaving(true);
    try {
      const formattedData = {
        ...data,
        meals: typeof data.meals === 'string' ? data.meals.split('\n').map(s => s.trim()).filter(Boolean) : data.meals
      };
      if (editDietId) {
        const res = await libraryApi.updateDietPlan(editDietId, formattedData);
        const updatedDiet = res.data || formattedData;
        setDietPlans(prev => prev.map(d => String(d.id) === String(editDietId) ? { ...d, ...updatedDiet } as unknown as DietPlan : d));
        showToast(res.message || 'Diet plan updated successfully', 'success');
      } else {
        const res = await libraryApi.createDietPlan(formattedData);
        const newDiet = res.data ? res.data : { ...formattedData, id: `diet-${Date.now()}` } as unknown as DietPlan;
        setDietPlans(prev => [newDiet, ...prev]);
        showToast(res.message || 'Diet plan created successfully', 'success');
      }
      setShowDietModal(false);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editDietId, showToast]);
 
  const deleteDietPlan = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Remove Diet Plan', message: 'Delete this diet plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await libraryApi.removeDietPlan(id);
      setDietPlans(prev => prev.filter(d => String(d.id) !== String(id)));
      showToast(res.message || 'Diet plan deleted', 'success');
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [showToast, confirm]);

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
