"use client";
// RESPONSIBILITY: Owns Attendance URL query state for tabs, search, filters, pagination, and table sorting.
// DATA FLOW: URL (?tab=&search=&date=&page=&sortBy=&sortDirection=) → useTrainerAttendanceFilters → query/API → table
import { useCallback } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { TRAINER_ATTENDANCE_SORT_FIELDS } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_constants/TrainerAttendanceConstants';

import { TRAINER_ATTENDANCE_TABS } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_constants/TrainerAttendanceConstants';

import type { TrainerAttendanceSortDirection, TrainerAttendanceSortField } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceInteractionTypes';

import type { TrainerAttendanceTab } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceInteractionTypes';








/**
 * @description Owns useTrainerAttendanceFilters behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerAttendanceFilters state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerAttendanceFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setUrlParam = useCallback((key: string, value: string | null, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (resetPage && key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const rawTab = searchParams.get('tab') as TrainerAttendanceTab | null;
  const tab: TrainerAttendanceTab = rawTab && (TRAINER_ATTENDANCE_TABS as readonly string[]).includes(rawTab) ? rawTab : TRAINER_ATTENDANCE_TABS[0]!;
  const search = searchParams.get('search') ?? '';
  const filterDate = searchParams.get('date') ?? 'ALL_TIME';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const rawSortBy = searchParams.get('sortBy') ?? 'date';
  const sortBy: TrainerAttendanceSortField = TRAINER_ATTENDANCE_SORT_FIELDS.includes(rawSortBy as TrainerAttendanceSortField) ? rawSortBy as TrainerAttendanceSortField : 'date';
  const sortDirection: TrainerAttendanceSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const setTab = useCallback((value: TrainerAttendanceTab) => setUrlParam('tab', value), [setUrlParam]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setFilterDate = useCallback((value: string) => setUrlParam('date', value), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value), false), [setUrlParam]);
  const setSort = useCallback((field: TrainerAttendanceSortField) => {
    const nextDirection = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', field);
    params.set('sortDirection', nextDirection);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname, sortBy, sortDirection]);

  return { tab, setTab, search, setSearch, filterDate, setFilterDate, currentPage, setCurrentPage, sortBy, sortDirection, setSort };
}
