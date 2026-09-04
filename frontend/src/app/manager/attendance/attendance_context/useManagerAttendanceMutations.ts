import { useCallback } from 'react';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import type { AttendanceFormValues } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import { EMPTY_ATTENDANCE_FORM } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { Staff } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export function useManagerAttendanceMutations(
  members: Member[],
  staff: Staff[],
  setSaving: (s: boolean) => void,
  setShowModal: (s: boolean) => void,
  setForm: (f: typeof EMPTY_ATTENDANCE_FORM) => void,
  showToast: (msg: string, t: ToastType) => void,
  loadAll: () => Promise<void>
) {
  const markAttendance = useCallback(async (data: AttendanceFormValues) => {
    setSaving(true);
    try {
      const payloads: { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string; }[] = [];
      const startDate = new Date(data.date);
      const endDate = (data.status === 'LEAVE' && data.endDate) ? new Date(data.endDate) : startDate;

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const checkInIso = (data.status === 'PRESENT' && data.checkIn) 
          ? new Date(`${dateStr}T${data.checkIn}:00`).toISOString() 
          : undefined;
        
        const payload: Record<string, unknown> = { 
          type: data.type, 
          date: dateStr, 
          status: data.status || 'PRESENT',
          checkIn: checkInIso,
        };
        
        if (data.type === 'MEMBER') {
          payload.memberId = data.memberId ? data.memberId : undefined;
          if (payload.memberId) {
            const m = members.find(x => String(x.id) === payload.memberId);
            payload.member = { name: m?.name || 'Unknown Member' };
          }
        } else {
          payload.staffId = data.staffId ? data.staffId : undefined;
          if (payload.staffId) {
            const s = staff.find(x => String(x.id) === payload.staffId);
            payload.staff = { name: s?.name || 'Unknown Staff' };
          }
        }
        payloads.push(payload as { memberId?: string; staffId?: string; date: string; checkIn?: string; type: string; });
      }

      for (const payload of payloads) {
        await attendanceApi.mark(payload);
      }
      
      showToast(payloads.length > 1 ? `Marked ${data.status} for ${payloads.length} days successfully` : 'Attendance marked successfully', 'success');
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
