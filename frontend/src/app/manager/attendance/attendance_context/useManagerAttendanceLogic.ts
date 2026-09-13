import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { AttendanceContextType, FetchState, Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';
import { useManagerAttendanceMutations } from '@/app/manager/attendance/attendance_context/useManagerAttendanceMutations';
import { useAttendanceListQuery, useTodayStatsQuery, useActiveMembersQuery, useStaffQuery } from '@/app/manager/attendance/attendance_api/useManagerAttendanceQueries';
import { filterAndSortAttendance } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceFilterUtils';

export function useManagerAttendanceLogic(): AttendanceContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [search, setLocalSearch] = useState(searchParams.get('search') || '');
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  
  const tabParam = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = tabParam && ATTENDANCE_TABS.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0];
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentSearch) {
      setUrlParam('search', debouncedSearch || null);
    }
  }, [debouncedSearch, searchParams, setUrlParam]);

  useEffect(() => {
    setUrlParam('date', dateFilter || null);
  }, [dateFilter, setUrlParam]);

  useEffect(() => {
    setUrlParam('status', statusFilter || null);
  }, [statusFilter, setUrlParam]);

  const setSearch = useCallback((val: string) => setLocalSearch(val), []);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setTab = useCallback((val: AttendanceTab) => setUrlParam('tab', val), [setUrlParam]);

  // Queries
  const params: Record<string, string> = { limit: '10', page: currentPage.toString() };
  if (debouncedSearch) params.search = debouncedSearch;
  if (dateFilter) params.date = dateFilter;
  if (statusFilter) params.status = statusFilter;
  if (tab !== 'Daily Attendance Report') params.type = tab === 'Member Attendance' ? 'MEMBER' : 'STAFF';

  const { data: listData, isLoading: listLoading, isError: listError, refetch } = useAttendanceListQuery(params);
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useTodayStatsQuery();
  const { data: membersData } = useActiveMembersQuery();
  const { data: staffData } = useStaffQuery();

  const members = useMemo(() => membersData?.members || [], [membersData]);
  const staffArray = Array.isArray(staffData) ? staffData : (staffData?.staff || []);
  const staff = useMemo(() => staffArray, [staffArray]);

  const rawRecords = listData?.attendances || [];
  let records = useMemo(() => {
    return filterAndSortAttendance(rawRecords, tab, debouncedSearch, dateFilter, statusFilter);
  }, [rawRecords, tab, debouncedSearch, dateFilter, statusFilter]);

  const totalRecords = listData?.total || 0;
  const todayStats = statsData || { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 };

  const isLoading = listLoading || statsLoading;
  const isError = listError || statsError;
  const fetchState: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 
  const [showModal, setShowModal] = useState(false);
  const [calendarUser, setCalendarUser] = useState<{ id: string; name: string; type: 'MEMBER' | 'STAFF' } | null>(null);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const { markAttendance } = useManagerAttendanceMutations(
    members, staff, setSaving, setShowModal, setForm, showToast, loadAll
  );

  const exportAttendance = useCallback(() => {
    const csvContent = [
      ['Date', 'Name', 'Role', 'Status', 'Check In', 'Check Out'],
      ...records.map(r => [
        r.date, 
        r.member?.name || r.staff?.name || 'Unknown', 
        r.type === 'MEMBER' ? 'Member' : 'Staff', 
        r.status || 'Present', 
        r.checkIn || '-', 
        r.checkOut || '-'
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export successful', 'success');
  }, [records, showToast]);

  return {
    records, totalRecords, todayStats, members, staff,
    fetchState, saving, toast,
    tab, setTab,
    search, setSearch,
    dateFilter, setDateFilter,
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage,
    showModal, setShowModal,
    calendarUser, setCalendarUser,
    form, setForm,
    showToast, hideToast,
    loadAll, markAttendance, exportAttendance
  };
}
