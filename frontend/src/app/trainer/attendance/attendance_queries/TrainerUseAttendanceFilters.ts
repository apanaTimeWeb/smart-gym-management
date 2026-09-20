'use client';
// RESPONSIBILITY: Owns Attendance URL query state for tabs, search, filters, pagination, and table sorting.
// DATA FLOW: URL (?tab=&search=&date=&page=&sortBy=&sortDirection=) → useAttendanceFilters → query/API → table
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ATTENDANCE_TABS, type AttendanceTab } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import { ATTENDANCE_SORT_FIELDS, type AttendanceSortDirection, type AttendanceSortField } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

/** Resolves and updates shareable Attendance filter state stored in the route URL. */
export function useAttendanceFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setUrlParam = useCallback((key: string, value: string | null, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (resetPage && key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const rawTab = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = rawTab && (ATTENDANCE_TABS as readonly string[]).includes(rawTab) ? rawTab : ATTENDANCE_TABS[0]!;
  const search = searchParams.get('search') ?? '';
  const filterDate = searchParams.get('date') ?? 'All Time';
  const pageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const rawSortBy = searchParams.get('sortBy') ?? 'date';
  const sortBy: AttendanceSortField = ATTENDANCE_SORT_FIELDS.includes(rawSortBy as AttendanceSortField) ? rawSortBy as AttendanceSortField : 'date';
  const sortDirection: AttendanceSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const setTab = useCallback((value: AttendanceTab) => setUrlParam('tab', value), [setUrlParam]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setFilterDate = useCallback((value: string) => setUrlParam('date', value), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value), false), [setUrlParam]);
  const setSort = useCallback((field: AttendanceSortField) => {
    const nextDirection = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', field);
    params.set('sortDirection', nextDirection);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname, sortBy, sortDirection]);

  return { tab, setTab, search, setSearch, filterDate, setFilterDate, currentPage, setCurrentPage, sortBy, sortDirection, setSort };
}
