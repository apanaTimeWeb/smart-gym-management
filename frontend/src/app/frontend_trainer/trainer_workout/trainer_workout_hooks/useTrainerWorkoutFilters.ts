"use client";
// DATA FLOW: URL query parameters → TrainerWorkoutWorkout filters/sort/pagination → TanStack Query parameters → workout UI.
import { useCallback } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS, TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_constants/TrainerWorkoutConstants';

import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_workout/trainer_workout_types/TrainerWorkoutSortTypes';






/**
 * @description Owns useTrainerWorkoutFilters behavior in the Trainer module.
 * @dependencies URL query parameters → TrainerWorkoutWorkout filters/sort/pagination → TanStack Query parameters → workout UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerWorkoutFilters state and data flow for the workout feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerWorkoutFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawTab = searchParams.get('tab');
  const tab = TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS.some((option) => option.value === rawTab) ? rawTab : TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value;
  const search = searchParams.get('search') ?? '';
  const categoryValues = new Set((tab === 'plans' ? TRAINER_WORKOUT_CATEGORY_OPTIONS.WORKOUT : TRAINER_WORKOUT_CATEGORY_OPTIONS.EXERCISE).map((option) => option.value));
  const rawCategory = searchParams.get('category') ?? 'All';
  const category = categoryValues.has(rawCategory as never) ? rawCategory : 'All';
  const rawPage = Number(searchParams.get('page') ?? '1');
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const rawSortBy = searchParams.get('sortBy') ?? 'name';
  const sortBy: TrainerWorkoutSortField = ['name', 'category', 'difficulty'].includes(rawSortBy) ? rawSortBy as TrainerWorkoutSortField : 'name';
  const sortDirection: TrainerWorkoutSortDirection = searchParams.get('sortDirection') === 'desc' ? 'desc' : 'asc';

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page' && key !== 'tab') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleTabChange = useCallback((newTab: string) => {
    const current = new URLSearchParams(searchParams.toString());
    const validatedTab = TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS.some((option) => option.value === newTab) ? newTab : TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS[0].value;
    current.set('tab', validatedTab);
    current.set('page', '1');
    current.delete('category'); // Reset filter
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const handleSearchChange = useCallback((newSearch: string) => setUrlParam('search', newSearch || null), [setUrlParam]);
  const handleCategoryChange = useCallback((newCategory: string) => setUrlParam('category', newCategory), [setUrlParam]);
  const handlePageChange = useCallback((newPage: number) => setUrlParam('page', newPage.toString()), [setUrlParam]);
  const handleSort = useCallback((field: TrainerWorkoutSortField) => {
    const current = new URLSearchParams(searchParams.toString());
    const nextDirection = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    current.set('sortBy', field);
    current.set('sortDirection', nextDirection);
    current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router, sortBy, sortDirection]);

  return {
    tab, setTab: handleTabChange,
    search, setSearch: handleSearchChange,
    category, setCategory: handleCategoryChange,
    page, setPage: handlePageChange,
    sortBy, sortDirection, setSort: handleSort
  };
}
