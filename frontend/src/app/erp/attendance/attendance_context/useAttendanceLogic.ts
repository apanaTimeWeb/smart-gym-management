// RESPONSIBILITY: useAttendanceLogic.ts handles the logic and UI for its corresponding feature.
import { useState, useCallback, useEffect, useRef } from 'react';
import { attendanceApi, membersApi, hrApi, type Attendance, type Member, type Staff } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { EMPTY_ATTENDANCE_FORM, ATTENDANCE_TABS, type AttendanceTab, AttendanceFormValues } from '@/app/erp/attendance/attendance_utils/AttendanceSharedConstants';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { AttendanceContextType } from '@/app/erp/attendance/attendance_types/attendance_types';

export function useAttendanceLogic(): AttendanceContextType {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [todayStats, setTodayStats] = useState({ totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 });
  const [members, setMembers] = useState<Member[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 
  const [tab, setTab] = useState<AttendanceTab>(ATTENDANCE_TABS[0]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_ATTENDANCE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        limit: '10',
        page: currentPage.toString()
      };
      if (debouncedSearch) params.search = debouncedSearch;
      if (tab !== 'All') params.type = tab === 'Members' ? 'MEMBER' : 'STAFF';

      const [attRes, statsRes, memRes, staffRes] = await Promise.all([
        attendanceApi.getAll(params),
        attendanceApi.getTodayStats(),
        membersApi.getAll({ limit: '1000' }),
        hrApi.getStaff(),
      ]);
      setRecords(attRes.data.attendance || []);
      setTotalRecords(attRes.data.total || 0);
      setTodayStats(statsRes.data);
      setMembers(memRes.data.members);
      setStaff(Array.isArray(staffRes.data) ? staffRes.data : (staffRes.data as any).staff || []);
    } catch (e) { 
      showToast((e as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [showToast, currentPage, debouncedSearch, tab]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      const dateTime = new Date(`${data.date}T${data.checkIn}:00`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { type: data.type, date: dateTime.toISOString(), checkIn: dateTime.toISOString() };
      
      if (data.type === 'MEMBER') {
        payload.memberId = data.memberId;
      } else {
        payload.staffId = data.staffId;
      }
 
 const res = await attendanceApi.mark(payload);
 showToast((res as any).message, 'success');
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
