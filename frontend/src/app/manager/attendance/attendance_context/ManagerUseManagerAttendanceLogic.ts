'use client';
// DATA FLOW: URL state → debounce → attendance query params → ManagerAttendanceApi/MSW → Attendance UI.
/** Coordinates attendance URL state, server queries, mutations, and export behavior. */
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { AttendanceContextType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';
import { useManagerAttendanceMutations } from '@/app/manager/attendance/attendance_context/ManagerUseManagerAttendanceMutations';
import { useAttendanceListQuery, useTodayStatsQuery, useActiveMembersQuery, useStaffQuery } from '@/app/manager/attendance/attendance_api/ManagerUseManagerAttendanceQueries';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { displayValue } from '@/lib/formatters';

export function useManagerAttendanceLogic(): AttendanceContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const [search, setLocalSearch] = useState(searchParams.get('search') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const tabParam = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = tabParam && ATTENDANCE_TABS.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0];
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value); else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.replace(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentSearch) setUrlParam('search', debouncedSearch || null);
  }, [debouncedSearch, searchParams, setUrlParam]);
  useEffect(() => {
    const currentDate = searchParams.get('date') || '';
    if (dateFilter !== currentDate) setUrlParam('date', dateFilter || null);
  }, [dateFilter, searchParams, setUrlParam]);
  useEffect(() => {
    const currentStatus = searchParams.get('status') || '';
    if (statusFilter !== currentStatus) setUrlParam('status', statusFilter || null);
  }, [statusFilter, searchParams, setUrlParam]);

  const setSearch = useCallback((val: string) => setLocalSearch(val), []);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', String(val)), [setUrlParam]);
  const setTab = useCallback((val: AttendanceTab) => setUrlParam('tab', val), [setUrlParam]);

  const params = useMemo(() => {
    const next: Record<string, string> = {
      page: String(currentPage),
      limit: String(MANAGER_ITEMS_PER_PAGE),
    };
    if (debouncedSearch) next.search = debouncedSearch;
    if (dateFilter) next.date = dateFilter;
    if (statusFilter) next.status = statusFilter;
    if (tab !== 'Daily Attendance Report') next.type = tab === 'Member Attendance' ? 'MEMBER' : 'STAFF';
    return next;
  }, [currentPage, dateFilter, debouncedSearch, statusFilter, tab]);

  const { data: listData, isLoading: listLoading, isError: listError, refetch } = useAttendanceListQuery(params);
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useTodayStatsQuery();
  const { data: membersData } = useActiveMembersQuery();
  const { data: staffData } = useStaffQuery();
  const members = useMemo(() => membersData?.members || [], [membersData]);
  const staff = useMemo(() => staffData?.staff || [], [staffData]);
  const records = listData?.attendances || [];
  const totalRecords = listData?.total || 0;
  const todayStats = statsData || { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 };
  const isLoading = listLoading || statsLoading;
  const isError = listError || statsError;
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [calendarUser, setCalendarUser] = useState<{ id: string; name: string; type: 'MEMBER' | 'STAFF' } | null>(null);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);
  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);
  const loadAll = useCallback(async () => { await refetch(); }, [refetch]);
  const { markAttendance } = useManagerAttendanceMutations(members, staff, setSaving, setShowModal, setForm, showToast, loadAll);

  const exportAttendance = useCallback(() => {
    const csvContent = [
      ['Date', 'Name', 'Role', 'Status', 'Check In', 'Check Out'],
      ...records.map((record) => [
        record.date,
        displayValue(record.member?.name || record.staff?.name),
        record.type === 'MEMBER' ? 'Member' : 'Staff',
        displayValue(record.status),
        displayValue(record.checkIn),
        displayValue(record.checkOut ?? record.checkOutTime),
      ])
    ].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [records]);

  return {
    records, totalRecords, todayStats, members, staff, isLoading, isError, saving, toast,
    tab, setTab, search, setSearch, dateFilter, setDateFilter, statusFilter, setStatusFilter,
    currentPage, setCurrentPage, showModal, setShowModal, calendarUser, setCalendarUser,
    form, setForm, showToast, hideToast, loadAll, markAttendance, exportAttendance,
  };
}
