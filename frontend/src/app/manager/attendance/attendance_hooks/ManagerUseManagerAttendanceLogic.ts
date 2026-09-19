'use client';
// RESPONSIBILITY: Coordinates URL filters, TanStack Query attendance server state, shared module UI state, mutations, and export behavior.
// DATA FLOW: URL → debounce → attendance query → API/MSW → UI; UI-only modal/toast/form state → module Zustand.
/** Coordinates the Manager / feature. */
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { ManagerAttendanceViewModel } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import { ATTENDANCE_TABS, type AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import { useManagerAttendanceMutations } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceMutations';
import { useAttendanceListQuery, useTodayStatsQuery, useActiveMembersQuery, useStaffQuery } from '@/app/manager/attendance/attendance_api/ManagerUseManagerAttendanceQueries';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { displayValue } from '@/lib/formatters';
import { useManagerAttendanceUiStore } from '@/app/manager/attendance/attendance_store/ManagerUseManagerAttendanceUiStore';

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

  const { data: listData, isLoading: listLoading, isError: listError, error: listErrorValue, refetch } = useAttendanceListQuery(params);
  const { data: statsData, isLoading: statsLoading, isError: statsError, error: statsErrorValue } = useTodayStatsQuery();
  const { data: membersData } = useActiveMembersQuery();
  const { data: staffData } = useStaffQuery();
  const members = useMemo(() => membersData?.members || [], [membersData]);
  const staff = useMemo(() => staffData?.staff || [], [staffData]);
  const records = listData?.attendances || [];
  const totalRecords = listData?.total || 0;
  const todayStats = statsData || { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 };
  const isLoading = listLoading || statsLoading;
  const isError = listError || statsError;
  const errorMessage = [listErrorValue, statsErrorValue].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';
  const { markAttendance } = useManagerAttendanceMutations(members, staff, ui.setSaving, ui.setShowModal, ui.setForm, ui.showToast, async () => { await refetch(); });

  const exportAttendance = useCallback(() => {
    const csvContent = [
      ['Date', 'Name', 'Role', 'Status', 'Check In', 'Check Out'],
      ...records.map((record) => [
        record.date, displayValue(record.member?.name || record.staff?.name), record.type === 'MEMBER' ? 'Member' : 'Staff',
        displayValue(record.status), displayValue(record.checkIn), displayValue(record.checkOut ?? record.checkOutTime),
      ]),
    ].map((row) => row.map((cell) => String(cell).replaceAll('"', '""')).map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
  }, [records]);

  return {
    records, totalRecords, todayStats, members, staff, isLoading, isError, errorMessage, saving: ui.saving, toast: ui.toast,
    tab, setTab, search, setSearch, dateFilter, setDateFilter, statusFilter, setStatusFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, calendarUser: ui.calendarUser, setCalendarUser: ui.setCalendarUser,
    form: ui.form, setForm: ui.setForm, showToast: ui.showToast, hideToast: ui.hideToast,
    loadAll: async () => { await refetch(); }, markAttendance, exportAttendance,
  };
}
