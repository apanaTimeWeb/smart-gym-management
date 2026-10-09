"use client";
// DATA FLOW: URL query parameters → TrainerProgressTracking filters → TanStack Query parameters → progress UI.
import { useCallback } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_constants/TrainerProgressTrackingConstants';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_TAB_IDS } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_constants/TrainerProgressTrackingConstants';

import type { TrainerProgressTrackingProgressTab } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTabTypes';

import type { TrainerProgressTrackingProgressSortDirection, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_types/TrainerProgressTrackingTypes';









/**
 * @description Owns useTrainerProgressTrackingFilters behavior in the Trainer module.
 * @dependencies URL query parameters → TrainerProgressTracking filters → TanStack Query parameters → progress UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProgressTrackingFilters state and data flow for the progress tracking feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProgressTrackingFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMemberId = searchParams.get('memberId') ?? '';
  const requestedTab = searchParams.get('tab');
  const activeTab: TrainerProgressTrackingProgressTab = requestedTab && TRAINER_PROGRESS_TRACKING_PROGRESS_TAB_IDS.includes(requestedTab as TrainerProgressTrackingProgressTab) ? requestedTab as TrainerProgressTrackingProgressTab : 'individual';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? 'date';
  const sortBy: TrainerProgressTrackingProgressSortField = TRAINER_PROGRESS_TRACKING_PROGRESS_SORT_FIELDS.includes(sortByValue as TrainerProgressTrackingProgressSortField) ? sortByValue as TrainerProgressTrackingProgressSortField : 'date';
  const sortDirection: TrainerProgressTrackingProgressSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const setSelectedMemberId = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('memberId', id);
    else params.delete('memberId');
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const setCurrentPage = useCallback((page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); router.push(`${pathname}?${params.toString()}`); }, [pathname, router, searchParams]);

  const setSort = useCallback((field: TrainerProgressTrackingProgressSortField) => { const params = new URLSearchParams(searchParams.toString()); params.set('sortBy', field); params.set('sortDirection', field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc'); params.set('page', '1'); router.push(`${pathname}?${params.toString()}`); }, [pathname, router, searchParams, sortBy, sortDirection]);

  const setActiveTab = useCallback((tab: TrainerProgressTrackingProgressTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  return {
    selectedMemberId,
    setSelectedMemberId,
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    sortBy,
    sortDirection,
    setSort,
  };
}
