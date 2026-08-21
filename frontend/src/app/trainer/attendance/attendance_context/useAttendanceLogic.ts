// RESPONSIBILITY: Central logic hook for the Attendance module. Manages state, API interactions, and URL synchronization.
// DATA FLOW: UI Components -> useAttendanceLogic (State + URL) -> API (Backend)
import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ApiResponse } from '@/lib/api';
import { attendanceApi } from '@/app/trainer/attendance/attendance_api/attendance_api';
import { membersApi } from '@/app/trainer/members/members_api/members_api';
import type { Member } from '@/app/trainer/members/members_types/members_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab, AttendanceFormValues } from '@/app/trainer/attendance/attendance_utils/AttendanceSharedConstants';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { AttendanceContextType, Attendance, AttendanceStatsResponse, AttendanceResponse, FetchState } from '@/app/trainer/attendance/attendance_types/attendance_types';

export function useAttendanceLogic(): AttendanceContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [search, setLocalSearch] = useState(searchParams.get('search') || '');
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

  const setSearch = useCallback((val: string) => setLocalSearch(val), []);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setTab = useCallback((val: AttendanceTab) => setUrlParam('tab', val), [setUrlParam]);

  // Local State
  const [records, setRecords] = useState<Attendance[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [todayStats, setTodayStats] = useState<AttendanceStatsResponse>({ totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 });
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
      // Mocking fetch success
      const mockRecords: Attendance[] = [
        { id: '1', date: new Date().toISOString(), checkIn: new Date().toISOString(), type: 'MEMBER', memberId: 1, member: { name: 'John Doe' } }
      ];
      const mockStats: AttendanceStatsResponse = { totalCheckIns: 1, memberCheckIns: 1, staffCheckIns: 0 };
      const mockMembers: Member[] = [
        { id: '1', name: 'John Doe', phone: '123', email: 'john@test.com', status: 'ACTIVE', billingCycle: '1 Month', paidAmount: 0, pendingAmount: 0, expiryDate: new Date().toISOString(), joinDate: new Date().toISOString(), planId: '1' }
      ];

      setRecords(mockRecords);
      setTotalRecords(1);
      setTodayStats(mockStats);
      setMembers(mockMembers);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setFetchState('success'); 
    }
  }, [showToast, currentPage, debouncedSearch, tab]);

  // Rely on URL changes to drive the fetch (plus initial mount)
  useEffect(() => { loadAll(); }, [loadAll]);

  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      // Mocking mark attendance success
      showToast('Attendance marked successfully', 'success');
      setShowModal(false);
      setForm(EMPTY_ATTENDANCE_FORM);
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
    search, setSearch,
    currentPage, setCurrentPage,
    showModal, setShowModal,
    form, setForm,
    showToast, hideToast,
    loadAll, markAttendance
  };
}
