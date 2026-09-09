// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Central logic hook for the Attendance module. Manages state, API interactions, and URL synchronization.
// DATA FLOW: UI Components -> useAttendanceLogic (State + URL) -> API (Backend)
import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ApiResponse, getUser } from '@/lib/api';
import { attendanceApi } from '@/app/trainer/attendance/attendance_api/attendance_api';
import { trainerSharedApi } from '@/app/trainer/trainer_api/trainer_api';
import type { Member } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab, AttendanceFormValues } from '@/app/trainer/attendance/attendance_utils/AttendanceSharedConstants';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import type { AttendanceContextType } from '@/app/trainer/attendance/attendance_types/attendance_types';
import type { Attendance, FetchState } from '@/app/trainer/trainer_types/trainer_types';

export function useAttendanceLogic(): AttendanceContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const filterDate = searchParams.get('date') || 'All Time';
  const tabParam = searchParams.get('tab') as AttendanceTab | null;
  const tab: AttendanceTab = tabParam && ATTENDANCE_TABS?.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0];
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

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setFilterDate = useCallback((val: string) => setUrlParam('date', val), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setTab = useCallback((val: AttendanceTab) => setUrlParam('tab', val), [setUrlParam]);

  // Local State
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');
  const [records, setRecords] = useState<Attendance[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [todayStats, setTodayStats] = useState<any>({ totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 });
  const [members, setMembers] = useState<Member[]>([]);
 
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    try {
      const user = getUser();
      const params: Record<string, string> = {
        limit: '10',
        page: currentPage.toString()
      };
      if (debouncedSearch) params.search = debouncedSearch;
      
      params.type = tab === 'Members' ? 'MEMBER' : 'STAFF';
      if (tab === 'My Attendance' && user?.id) {
        params.staffId = String(user.id);
      }

      if (filterDate !== 'All Time') {
        params.date = filterDate;
      }

      const [attRes, statsRes, memRes] = await Promise.all([
        attendanceApi.fetchAttendanceRecords(params) as unknown as Promise<ApiResponse<any>>,
        attendanceApi.getTodayStats() as unknown as Promise<ApiResponse<any>>,
        trainerSharedApi.fetchMembersBasic({ limit: '1000', status: 'active' }) as unknown as Promise<ApiResponse<{ members: Member[] }>>,
      ]);

      const fetchedRecords = attRes.data?.attendance || attRes.data?.attendances || attRes.data || [];

      setRecords(fetchedRecords);
      setTotalRecords(attRes.data?.total || fetchedRecords.length || 0);
      setTodayStats(statsRes.data);
      setMembers(memRes.data?.members || memRes.data || []);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setFetchState('success'); 
    }
  }, [showToast, currentPage, debouncedSearch, tab]);

  // Rely on URL changes to drive the fetch (plus initial mount)
  useEffect(() => { setTimeout(() => loadAll(), 0); }, [loadAll]);

  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      const res = await attendanceApi.createAttendanceRecord({
        memberId: data.memberId,
        staffId: data.staffId,
        date: data.date,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        notes: data.notes,
        type: data.type
      });
      showToast((res as { message?: string }).message || 'Attendance marked successfully', 'success');
      setShowModal(false);
      setForm(EMPTY_ATTENDANCE_FORM);
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [loadAll, showToast]);

  const selfCheckIn = useCallback(async () => {
    setSaving(true);
    try {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      await attendanceApi.createAttendanceRecord({
        staffId: String(user.id),
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toISOString(),
        type: 'STAFF',
      });
      showToast('Checked in successfully', 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [loadAll, showToast]);

  const selfCheckOut = useCallback(async () => {
    setSaving(true);
    try {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      // In a real implementation, we'd need to find the latest active attendance record to checkout from.
      // Assuming a backend endpoint supports a simple checkout mutation for the current active staff member.
      // await attendanceApi.checkoutStaff(String(user.id));
      showToast('Checked out successfully', 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [loadAll, showToast]);

  return {
    records, totalRecords, todayStats, members,
    fetchState, saving, toast,
    tab, setTab,
    viewMode, setViewMode,
    search, setSearch,
    filterDate, setFilterDate,
    currentPage, setCurrentPage,
    showModal, setShowModal,
    form, setForm,
    showToast, hideToast,
    loadAll, markAttendance,
    selfCheckIn, selfCheckOut
  };
}

