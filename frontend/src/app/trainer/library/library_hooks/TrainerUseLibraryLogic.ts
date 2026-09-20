// RESPONSIBILITY: Owns Diet Library query state, URL filters, modal UI state, and trainer-safe mutations.
// DATA FLOW: URL filters → TanStack Query → libraryApi → TrainerLibraryDietGrid; UI-only modal/toast state stays local.
'use client';
import { useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';
import { libraryApi } from '@/app/trainer/library/library_api/TrainerLibrary_api';
import { TRAINER_LIBRARY_FILTER_GOALS, type TrainerLibraryFilterGoal } from '@/app/trainer/library/library_utils/TrainerLibrarySharedConstants';
import type { TrainerLibraryLogicReturn } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTrainerLibraryDiet } from '@/app/trainer/library/library_hooks/useTrainerLibraryDiet';

export function useTrainerLibraryLogic(): TrainerLibraryLogicReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setLocalSearch] = useState(searchParams.get('search') ?? '');
  const [saving, setSaving] = useState(false);
  const debouncedSearch = useDebounce(search, 300);
  const requestedGoal = searchParams.get('goal');
  const filterGoal: TrainerLibraryFilterGoal = requestedGoal && TRAINER_LIBRARY_FILTER_GOALS.includes(requestedGoal as TrainerLibraryFilterGoal)
    ? requestedGoal as TrainerLibraryFilterGoal
    : 'All';
  const currentPage = Number(searchParams.get('page')) || 1;

  const query = useQuery({
    queryKey: ['trainer', 'library', 'diet-plans', { search: debouncedSearch, goal: filterGoal, page: currentPage }],
    queryFn: async () => {
      const params: Record<string,string> = { page: String(currentPage), limit: '10' };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterGoal !== 'All') params.goal = filterGoal;
      const response = await libraryApi.fetchDietPlans(params);
      return response;
    },
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
  const setFilterGoal = useCallback((value: TrainerLibraryFilterGoal) => setUrlParam('goal', value), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam('page', String(page)), [setUrlParam]);
  const loadAll = useCallback(async () => { await query.refetch(); }, [query]);
  const dietLogic = useTrainerLibraryDiet();
  return {
    dietPlans: query.data?.dietPlans ?? [], totalDietPlans: query.data?.total ?? 0, isPending: query.isPending, isError: query.isError, isSuccess: query.isSuccess, saving,
    search, debouncedSearch, setSearch, filterGoal, setFilterGoal, currentPage, setCurrentPage,
    loadAll, ...dietLogic,
  };
}
