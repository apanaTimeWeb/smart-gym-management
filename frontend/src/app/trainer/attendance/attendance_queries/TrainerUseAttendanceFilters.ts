'use client';
// RESPONSIBILITY: URL search param-driven filter state for the Attendance module.
// DATA FLOW: URL (?tab=&search=&date=&page=) → useAttendanceFilters → useAttendanceQuery
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { ATTENDANCE_TABS, type AttendanceTab } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';

export function useAttendanceFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setUrlParam = useCallback((key: string, value: string | null, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (resetPage && key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const rawTab = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = rawTab && (ATTENDANCE_TABS as readonly string[]).includes(rawTab)
    ? rawTab
    : ATTENDANCE_TABS[0]!;

  const search = searchParams.get('search') ?? '';
  const filterDate = searchParams.get('date') ?? 'All Time';
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);

  const setTab = useCallback((val: AttendanceTab) => setUrlParam('tab', val), [setUrlParam]);
  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setFilterDate = useCallback((val: string) => setUrlParam('date', val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString(), false), [setUrlParam]);

  return { tab, setTab, search, setSearch, filterDate, setFilterDate, currentPage, setCurrentPage };
}
