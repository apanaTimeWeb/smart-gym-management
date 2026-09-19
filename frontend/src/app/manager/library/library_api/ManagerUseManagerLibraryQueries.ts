'use client';
// RESPONSIBILITY: Owns TanStack Query definitions for Library server-state collections and their cache identities.
import { useQuery } from '@tanstack/react-query';
import { libraryApi, type ManagerLibraryListParams } from '@/app/manager/library/library_api/ManagerLibraryApi';

export const managerLibraryQueryKeys = {
  all: ['manager', 'library'] as const,
  dietPlans: (params: ManagerLibraryListParams) => [...managerLibraryQueryKeys.all, 'diet-plans', params] as const,
  exercises: (params: ManagerLibraryListParams) => [...managerLibraryQueryKeys.all, 'exercises', params] as const,
};

export function useManagerLibraryDietPlansQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: managerLibraryQueryKeys.dietPlans(params), queryFn: () => libraryApi.fetchDietPlans(params) });
}

export function useManagerLibraryExercisesQuery(params: ManagerLibraryListParams) {
  return useQuery({ queryKey: managerLibraryQueryKeys.exercises(params), queryFn: () => libraryApi.fetchExercises(params) });
}
