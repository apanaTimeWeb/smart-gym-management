'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { PROGRESS_TAB_IDS, type ProgressTab } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTabTypes';
import { PROGRESS_SORT_FIELDS, type ProgressSortDirection, type ProgressSortField } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

/** Owns useTrainerProgressFilters behavior for this Trainer module. */
export function useTrainerProgressFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMemberId = searchParams.get('memberId') ?? '';
  const requestedTab = searchParams.get('tab');
  const activeTab: ProgressTab = requestedTab && PROGRESS_TAB_IDS.includes(requestedTab as ProgressTab) ? requestedTab as ProgressTab : 'individual';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? 'date';
  const sortBy: ProgressSortField = PROGRESS_SORT_FIELDS.includes(sortByValue as ProgressSortField) ? sortByValue as ProgressSortField : 'date';
  const sortDirection: ProgressSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const setSelectedMemberId = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('memberId', id);
    else params.delete('memberId');
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const setCurrentPage = useCallback((page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); router.push(`${pathname}?${params.toString()}`); }, [pathname, router, searchParams]);

  const setSort = useCallback((field: ProgressSortField) => { const params = new URLSearchParams(searchParams.toString()); params.set('sortBy', field); params.set('sortDirection', field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc'); params.set('page', '1'); router.push(`${pathname}?${params.toString()}`); }, [pathname, router, searchParams, sortBy, sortDirection]);

  const setActiveTab = useCallback((tab: ProgressTab) => {
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
