// RESPONSIBILITY: Central logic hook for the Attendance module. Manages state, API interactions, and URL synchronization.
// DATA FLOW: UI Components -> useAttendanceLogic (State + URL) -> API (Backend)
import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { attendanceApi, membersApi, hrApi, type Member, type Staff, type ApiResponse } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab, AttendanceFormValues } from '@/app/erp/attendance/attendance_utils/AttendanceSharedConstants';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { AttendanceContextType, Attendance, AttendanceStatsResponse, AttendanceResponse } from '@/app/erp/attendance/attendance_types/attendance_types';

export function useAttendanceLogic(): AttendanceContextType {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const tabParam = searchParams.get('tab') as AttendanceTab | null;

  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
  const [search, setSearch] = useState(searchParam || '');
  const [tab, setTab] = useState<AttendanceTab>(tabParam && ATTENDANCE_TABS.includes(tabParam) ? tabParam : ATTENDANCE_TABS[0]);
  const debouncedSearch = useDebounce(search, 300);

  // Local State
  const [records, setRecords] = useState<Attendance[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [todayStats, setTodayStats] = useState<AttendanceStatsResponse>({ totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 });
  const [members, setMembers] = useState<Member[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  // Sync state to URL when page, search, or tab changes
  useEffect(() => {
    const currentUrlParams = new URLSearchParams(Array.from(searchParams.entries()));
    let changed = false;

    if (debouncedSearch !== (currentUrlParams.get('search') || '')) {
      if (debouncedSearch) currentUrlParams.set('search', debouncedSearch);
      else currentUrlParams.delete('search');
      currentUrlParams.set('page', '1');
      setCurrentPage(1);
      changed = true;
    } else if (currentPage.toString() !== (currentUrlParams.get('page') || '1')) {
      currentUrlParams.set('page', currentPage.toString());
      changed = true;
    }
    
    if (tab !== (currentUrlParams.get('tab') || ATTENDANCE_TABS[0])) {
      currentUrlParams.set('tab', tab);
      currentUrlParams.set('page', '1');
      setCurrentPage(1);
      changed = true;
    }

    if (changed) {
      router.push(`${pathname}?${currentUrlParams.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentPage, tab, pathname, router]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        limit: '10',
        page: currentPage.toString()
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (tab !== 'All') params.type = tab === 'Members' ? 'MEMBER' : 'STAFF';

      // We explicitly cast the responses via our strict generic wrapper
      const [attRes, statsRes, memRes, staffRes] = await Promise.all([
        attendanceApi.getAll(params) as unknown as Promise<ApiResponse<AttendanceResponse>>,
        attendanceApi.getTodayStats() as unknown as Promise<ApiResponse<AttendanceStatsResponse>>,
        membersApi.getAll({ limit: '1000' }) as unknown as Promise<ApiResponse<{ members: Member[] }>>,
        hrApi.getStaff() as unknown as Promise<ApiResponse<{ staff: Staff[] } | Staff[]>>,
      ]);

      setRecords(attRes.data.attendance || []);
      setTotalRecords(attRes.data.total || 0);
      setTodayStats(statsRes.data);
      setMembers(memRes.data.members || []);
      
      const staffData = staffRes.data;
      setStaff(Array.isArray(staffData) ? staffData : (staffData.staff || []));
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [showToast, currentPage, debouncedSearch, tab]);

  // Rely on URL changes to drive the fetch (plus initial mount)
  useEffect(() => { loadAll(); }, [loadAll]);

  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      const dateTime = new Date(`${data.date}T${data.checkIn}:00`);
      
      const payload: { memberId?: number; staffId?: number; date: string; checkIn?: string; type: string } = { 
        type: data.type, 
        date: dateTime.toISOString(), 
        checkIn: dateTime.toISOString() 
      };
      
      if (data.type === 'MEMBER') {
        payload.memberId = data.memberId ? Number(data.memberId) : undefined;
      } else {
        payload.staffId = data.staffId ? Number(data.staffId) : undefined;
      }
 
      const res = await attendanceApi.mark(payload) as ApiResponse<{ message: string }>;
      showToast(res.message || 'Attendance marked successfully', 'success');
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
    records, totalRecords, todayStats, members, staff,
    loading, saving, toast,
    tab, setTab,
    search, setSearch,
    currentPage, setCurrentPage,
    showModal, setShowModal,
    form, setForm,
    showToast, hideToast,
    loadAll, markAttendance
  };
}
