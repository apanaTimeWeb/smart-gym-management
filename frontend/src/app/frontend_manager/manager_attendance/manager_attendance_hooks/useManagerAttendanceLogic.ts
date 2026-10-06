'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ATTENDANCE_TABS } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceSharedConstants';
import { useManagerAttendanceMutations } from '@/app/frontend_manager/manager_attendance/manager_attendance_hooks/useManagerAttendanceMutations';
import { useAttendanceListQuery, useTodayStatsQuery, useActiveMembersQuery, useStaffQuery } from '@/app/frontend_manager/manager_attendance/manager_attendance_hooks/useManagerAttendanceQueries';
import { useManagerAttendanceUiStore } from '@/app/frontend_manager/manager_attendance/manager_attendance_store/useManagerAttendanceUiStore';
import { ManagerAttendanceDisplayValue } from '@/app/frontend_manager/manager_attendance/manager_attendance_utils/ManagerAttendanceFormatters';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import type { AttendanceTab } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceSharedConstants';
import type { ManagerAttendanceViewModel } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useManagerAttendanceLogic.
 * @dependencies Uses ManagerAttendanceFormatters, useManagerAttendanceMutations, useManagerAttendanceQueries, useManagerAttendanceUiStore.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceLogic owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceLogic(): ManagerAttendanceViewModel {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = useManagerAttendanceUiStore();
  const currentPage = Number(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const dateFilter = searchParams.get('date') || '';
  const statusFilter = searchParams.get('status') || '';
  const tabParam = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = tabParam && ATTENDANCE_TABS.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0];
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const current = searchParams.get('search') || '';
    if (debouncedSearch !== current) setUrlParam('search', debouncedSearch || null);
  }, [debouncedSearch, searchParams, setUrlParam]);

  const setSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('search', value); else params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setDateFilter = useCallback((value: string) => setUrlParam('date', value || null), [setUrlParam]);
  const setStatusFilter = useCallback((value: string) => setUrlParam('status', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(Math.max(1, value))), [setUrlParam]);
  const setTab = useCallback((value: AttendanceTab) => setUrlParam('tab', value), [setUrlParam]);

  const params = useMemo(() => {
    const next: Record<string, string> = { page: String(currentPage), limit: String(MANAGER_ITEMS_PER_PAGE) };
    if (debouncedSearch) next.search = debouncedSearch;
    if (dateFilter) next.date = dateFilter;
    if (statusFilter) next.status = statusFilter;
    if (tab !== 'Daily Attendance Report') next.type = tab === 'Member Attendance' ? 'MEMBER' : 'STAFF';
    return next;
  }, [currentPage, dateFilter, debouncedSearch, statusFilter, tab]);

  const { data: listData, isPending: listLoading, isError: listError, error: listErrorValue, refetch } = useAttendanceListQuery(params);
  const { data: statsData, isPending: statsLoading, isError: statsError, error: statsErrorValue } = useTodayStatsQuery();
  const { data: membersData } = useActiveMembersQuery();
  const { data: staffData } = useStaffQuery();
  const members = useMemo(() => membersData?.members || [], [membersData]);
  const staff = useMemo(() => staffData?.staff || [], [staffData]);
  const records = listData?.attendances || [];
  const totalRecords = listData?.total || 0;
  const todayStats = statsData || { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 };
  const isPending = listLoading || statsLoading;
  const isError = listError || statsError;
  const errorMessage = [listErrorValue, statsErrorValue].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';
  const { markAttendance } = useManagerAttendanceMutations(members, staff, ui.setSaving, ui.setShowModal, ui.setForm, ui.showToast);

  const exportAttendance = useCallback(() => {
    const csvContent = [
      ['Date', 'Name', 'Role', 'Status', 'Check In', 'Check Out'],
      ...records.map((record) => [
        record.date, ManagerAttendanceDisplayValue(record.member?.name || record.staff?.name), record.type === 'MEMBER' ? 'Member' : 'Staff',
        ManagerAttendanceDisplayValue(record.status), ManagerAttendanceDisplayValue(record.checkIn), ManagerAttendanceDisplayValue(record.checkOut ?? record.checkOutTime),
      ]),
    ].map((row) => row.map((cell) => String(cell).replaceAll('"', '""')).map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
  }, [records]);

  return {
    records, totalRecords, todayStats, members, staff, isPending, isError, errorMessage, saving: ui.saving, toast: ui.toast,
    tab, setTab, search, setSearch, dateFilter, setDateFilter, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, calendarUser: ui.calendarUser, setCalendarUser: ui.setCalendarUser,
    form: ui.form, setForm: ui.setForm, showToast: ui.showToast, hideToast: ui.hideToast,
    loadAll: async () => { await refetch(); }, markAttendance, exportAttendance,
  };
}
