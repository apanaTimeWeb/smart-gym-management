// RESPONSIBILITY: Extracted hook for trainer self check-in and check-out logic.
// Extracted from useAttendanceLogic.ts to keep the parent hook under the 150-line ceiling (Rule 1).
// DATA FLOW: useAttendanceLogic → useTrainerSelfAttendance → attendanceApi

import { useCallback } from 'react';
import { getUser } from '@/lib/api';
import { attendanceApi } from '@/app/trainer/attendance/attendance_api/attendance_api';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';

interface UseTrainerSelfAttendanceOptions {
  setSaving: (v: boolean) => void;
  showToast: (msg: string, type: ToastType) => void;
  loadAll: () => Promise<void>;
}

/**
 * Provides selfCheckIn and selfCheckOut actions for the trainer's own attendance.
 * Extracted from useAttendanceLogic to keep hook under 150-line ceiling (Rule 1).
 */
export function useTrainerSelfAttendance({
  setSaving,
  showToast,
  loadAll,
}: UseTrainerSelfAttendanceOptions) {
  const selfCheckIn = useCallback(async () => {
    setSaving(true);
    try {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      const res = await attendanceApi.createAttendanceRecord({
        staffId: String(user.id),
        date: new Date().toISOString().split('T')[0] ?? '',
        checkIn: new Date().toISOString(),
        type: 'STAFF',
      });
      // Display message from backend response envelope (Rule 14 — no hardcoded toasts)
      const msg = (res as { message?: string }).message ?? 'Operation completed';
      showToast(msg, 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [setSaving, showToast, loadAll]);

  const selfCheckOut = useCallback(async () => {
    setSaving(true);
    try {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      // Uses attendanceApi.checkout — backend finds the latest active attendance record
      // for this staff member and closes it. The staffId is sent as the record ID here
      // assuming the backend endpoint supports staff-scoped checkout by staffId.
      const now = new Date().toISOString();
      const res = await attendanceApi.checkout(String(user.id), now);
      // Display message from backend response envelope (Rule 14 — no hardcoded toasts)
      const msg = (res as { message?: string }).message ?? 'Operation completed';
      showToast(msg, 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [setSaving, showToast, loadAll]);

  return { selfCheckIn, selfCheckOut };
}
