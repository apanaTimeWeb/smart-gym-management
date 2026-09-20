// DATA FLOW: Manager module state/API data → useManagerAttendanceMutations → owning Manager UI components.
'use client';
/** Manages UseAttendanceMutations for the Manager module. */
import { useCallback } from 'react';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import { EMPTY_ATTENDANCE_FORM } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';
import type { AttendanceFormValues } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';
import type { MemberSnapshot, StaffSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { ManagerAttendancePersonType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerAttendanceMutations(
  members: MemberSnapshot[],
  staff: StaffSnapshot[],
  setSaving: (s: boolean) => void,
  setShowModal: (s: boolean) => void,
  setForm: (f: typeof EMPTY_ATTENDANCE_FORM) => void,
  showToast: (msg: string, t: ManagerToastType) => void,
  loadAll: () => Promise<void>
) {
  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      const payloads: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string; }[] = [];
      const startDate = new Date(data.date);
      const endDate = (data.status === 'LEAVE' && data.endDate) ? new Date(data.endDate) : startDate;

      const existingRes = await attendanceApi.fetchAttendanceRecords({ limit: '1000' });
      const resData = existingRes?.data;
      const existingRecords: Attendance[] = resData?.attendances || resData?.attendance || [];

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0] || '';
        
        const isDuplicate = existingRecords.some((r: Attendance) => {
          if (data.type === 'MEMBER') {
            return String(r.memberId) === String(data.memberId) && typeof r.date === 'string' && r.date.startsWith(dateStr);
          } else {
            return String(r.staffId) === String(data.staffId) && typeof r.date === 'string' && r.date.startsWith(dateStr);
          }
        });

        if (isDuplicate) {
          throw new Error(`Attendance already marked for this ${data.type === 'MEMBER' ? 'member' : 'staff'} on ${dateStr}`);
        }

        let checkInTime = data.checkIn;
        if ((data.status === 'PRESENT' || data.type === 'MEMBER') && !checkInTime) {
           const now = new Date();
           checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }

        const recordCheckIn = async (person: MemberSnapshot | StaffSnapshot, type: ManagerAttendancePersonType) => 
          (data.type === 'MEMBER') && checkInTime
            ? new Date(`${dateStr}T${checkInTime}:00`).toISOString() 
            : undefined;

        const checkInIso = await recordCheckIn(
          (data.type === 'MEMBER' 
            ? members.find(x => String(x.id) === data.memberId)
            : staff.find(x => String(x.id) === data.staffId)) as MemberSnapshot | StaffSnapshot,
          data.type as 'MEMBER' | 'STAFF'
        );
        
        const payload: Record<string, unknown> = { 
          type: data.type, 
          date: dateStr, 
          status: data.status,
          checkIn: checkInIso };
        
        if (data.type === 'MEMBER') {
          payload.memberId = data.memberId ? data.memberId : undefined;
          if (payload.memberId) {
            const m = members.find(x => String(x.id) === payload.memberId);
            if (m?.name) payload.member = { name: m.name };
          }
        } else {
          payload.staffId = data.staffId ? data.staffId : undefined;
          if (payload.staffId) {
            const s = staff.find(x => String(x.id) === payload.staffId);
            if (s?.name) payload.staff = { name: s.name };
          }
        }
        payloads.push(payload as { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string; });
      }

      let backendMessage = '';
      for (const payload of payloads) {
        const response = await attendanceApi.markAttendance(payload);
        backendMessage = response.message;
      }

      if (backendMessage) showToast(backendMessage, 'success');
      setShowModal(false);
      setForm(EMPTY_ATTENDANCE_FORM);
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [loadAll, showToast, members, staff, setSaving, setShowModal, setForm]);

  return { markAttendance };
}
