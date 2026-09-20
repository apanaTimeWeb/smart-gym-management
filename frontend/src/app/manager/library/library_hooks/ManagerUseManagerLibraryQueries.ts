// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
// RESPONSIBILITY: Owns TanStack Query definitions for Library server-state collections and their cache identities.
'use client';
import { useQuery } from '@tanstack/react-query';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';
import type { ManagerLibraryListParams } from '@/app/manager/library/library_api/ManagerLibraryApi';


export const managerLibraryQueryKeys = {
  all: ['manager', 'library'] as const,
  dietPlans: (params: ManagerLibraryListParams) => [...managerLibraryQueryKeys.all, 'diet-plans', params] as const,
  exercises: (params: ManagerLibraryListParams) => [...managerLibraryQueryKeys.all, 'exercises', params] as const,
};

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerLibraryDietPlansQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: managerLibraryQueryKeys.dietPlans(params), queryFn: () => libraryApi.fetchDietPlans(params) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerLibraryExercisesQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: managerLibraryQueryKeys.exercises(params), queryFn: () => libraryApi.fetchExercises(params) });
}
