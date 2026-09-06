// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Diet Library module.
import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { libraryApi } from '@/app/trainer/library/library_api/library_api';
import type { LibraryContextType } from '@/app/trainer/library/library_types/library_types';
import type { Exercise, DietPlan, FetchState } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { type LibraryTab } from '@/app/trainer/library/library_utils/LibrarySharedConstants';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useTrainerLibraryDiet } from './useTrainerLibraryDiet';
import { useTrainerLibraryExercises } from './useTrainerLibraryExercises';

export function useLibraryLogic(initialData?: any | null): LibraryContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const tab = (searchParams.get('tab') as LibraryTab) || 'Exercises';
  
  const setTab = useCallback((newTab: LibraryTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    params.delete('page');
    params.delete('search');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || []);
  const [dietPlans, setDietPlans] = useState<DietPlan[]>(initialData?.dietPlans || []);
 
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
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
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, searchParams, router, pathname]);

  const setSearch = useCallback((val: string) => setLocalSearch(val), []);

  const setCurrentPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
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
      
      let fetchedExercises = exRes.data?.exercises || exRes.data || [];
      let fetchedDietPlans = dietRes.data?.dietPlans || dietRes.data || [];
      
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        fetchedExercises = fetchedExercises.filter((e: Exercise) => 
          e.name.toLowerCase().includes(q) || e.category?.toLowerCase().includes(q) || (e.muscleGroup && e.muscleGroup.some(m => m.toLowerCase().includes(q)))
        );
        fetchedDietPlans = fetchedDietPlans.filter((d: DietPlan) => 
          d.name.toLowerCase().includes(q) || d.goal?.toLowerCase().includes(q)
        );
      }
      
      setExercises(fetchedExercises);
      setDietPlans(fetchedDietPlans);
      setFetchState('success');
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
      setFetchState('error');
    }
  }, [showToast, currentPage, debouncedSearch]);

  useEffect(() => { setTimeout(() => loadAll(), 0); }, [loadAll]);

  const dietLogic = useTrainerLibraryDiet(setDietPlans, showToast, setSaving, confirm as any);
  const exerciseLogic = useTrainerLibraryExercises(setExercises, showToast, setSaving, confirm as any);

  return {
    tab, setTab,
    exercises, dietPlans,
    fetchState, saving, toast,
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showToast, hideToast, loadAll,
    ...exerciseLogic,
    ...dietLogic
  };
}

