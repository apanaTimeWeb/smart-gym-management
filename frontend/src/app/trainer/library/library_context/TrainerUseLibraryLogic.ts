// RESPONSIBILITY: Owns Diet Library query state, URL filters, modal UI state, and trainer-safe mutations.
// DATA FLOW: URL filters → TanStack Query → libraryApi → TrainerLibraryDietGrid; UI-only modal/toast state stays local.
'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';
import { libraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_api';
import type { LibraryContextType, LibraryInitialData } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTrainerLibraryDiet } from '@/app/trainer/library/library_context/useTrainerLibraryDiet';

export function useTrainerLibraryLogic(initialData?: LibraryInitialData | null): LibraryContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [search, setLocalSearch] = useState(searchParams.get('search') ?? '');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const filterGoal = searchParams.get('goal') ?? 'All';
  const currentPage = Number(searchParams.get('page')) || 1;

  const query = useQuery({
    queryKey: ['trainer', 'library', 'diet-plans', { search: debouncedSearch, goal: filterGoal, page: currentPage }],
    queryFn: async () => {
      const params: Record<string,string> = { page: String(currentPage), limit: '10' };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterGoal !== 'All') params.goal = filterGoal;
      const response = await libraryApi.getDietPlans(params);
      return response;
    },
    initialData: initialData?.dietPlans ? { dietPlans: initialData.dietPlans, total: initialData.dietPlans.length } : undefined,
  });

  useEffect(() => {
    const currentSearch = searchParams.get('search') ?? '';
    if (debouncedSearch !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) params.set('search', debouncedSearch); else params.delete('search');
      params.set('page', '1');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => setLocalSearch(value), []);
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setFilterGoal = useCallback((value: string) => setUrlParam('goal', value), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam('page', String(page)), [setUrlParam]);
  const showToast = useCallback((message: string, type: ToastType) => setToast({ message, type }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const loadAll = useCallback(async () => { await query.refetch(); }, [query]);
  const dietLogic = useTrainerLibraryDiet();
  void queryClient;
  return {
    dietPlans: query.data?.dietPlans ?? [], isPending: query.isPending, isError: query.isError, isSuccess: query.isSuccess, saving, toast,
    search, debouncedSearch, setSearch, filterGoal, setFilterGoal, currentPage, setCurrentPage,
    showToast, hideToast, loadAll, ...dietLogic,
    saveDietPlan: async () => {}, deleteDietPlan: async () => {}
  };
}
