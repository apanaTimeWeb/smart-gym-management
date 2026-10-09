"use client";
// RESPONSIBILITY: Owns Diet Library query state, URL filters, modal UI state, and trainer-safe mutations.
// DATA FLOW: URL filters → TanStack Query → TrainerLibraryApi → TrainerLibraryDietGrid; UI-only modal/toast state stays local.
import { useCallback, useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureDebounce';

import { TrainerLibraryApi } from '@/app/frontend_trainer/trainer_library/trainer_library_api/TrainerLibraryApi';

import { TRAINER_LIBRARY_GOALS as TRAINER_LIBRARY_FILTER_GOALS } from '@/app/frontend_trainer/trainer_library/trainer_library_constants/TrainerLibraryConstants';

import { TRAINER_LIBRARY_QUERY_KEYS } from '@/app/frontend_trainer/trainer_library/trainer_library_constants/TrainerLibraryQueryKeys';

import { useTrainerLibraryDiet } from '@/app/frontend_trainer/trainer_library/trainer_library_hooks/useTrainerLibraryDiet';

import type { TrainerLibraryFilterGoal, TrainerLibraryLogicReturn } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryTypes';











/**
 * @description Owns useTrainerLibraryLogic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerLibraryLogic state and data flow for the library feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerLibraryLogic(): TrainerLibraryLogicReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setLocalSearch] = useState(searchParams.get('search') ?? '');
  const debouncedSearch = useTrainerInfrastructureDebounce(search, 300);
  const requestedGoal = searchParams.get('goal');
  const filterGoal: TrainerLibraryFilterGoal = requestedGoal && TRAINER_LIBRARY_FILTER_GOALS.includes(requestedGoal as TrainerLibraryFilterGoal)
    ? requestedGoal as TrainerLibraryFilterGoal
    : 'All';
  const currentPage = Number(searchParams.get('page')) || 1;

  const query = useQuery({
    queryKey: TRAINER_LIBRARY_QUERY_KEYS.dietPlans({ search: debouncedSearch, goal: filterGoal, page: currentPage }),
    queryFn: async () => {
      const params: Record<string,string> = { page: String(currentPage), limit: '10' };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filterGoal !== 'All') params.goal = filterGoal;
      const response = await TrainerLibraryApi.fetchDietPlans(params);
      return response;
    },
  });

// Effect contract: synchronize URL-backed library filters with the debounced search request lifecycle.
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
    dietPlans: query.data?.data?.dietPlans ?? [], totalDietPlans: query.data?.data?.total ?? 0, isPending: query.isPending, isError: query.isError, isSuccess: query.isSuccess,
    search, debouncedSearch, setSearch, filterGoal, setFilterGoal, currentPage, setCurrentPage,
    loadAll, ...dietLogic,
  };
}
