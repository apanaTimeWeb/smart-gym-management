// DATA FLOW: Attendance UI state → RHF/Zod → attendance mutation → query cache/UI.
// RESPONSIBILITY: Owns Attendance form setup, synchronization, validation, submission, and dirty-state protection.
'use client';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerAttendanceLogic } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceLogic';
import { managerAttendanceFormSchema } from '@/app/manager/attendance/attendance_schemas/ManagerAttendanceFormSchema';
import { EMPTY_ATTENDANCE_FORM } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { AttendanceFormValues } from '@/app/manager/attendance/attendance_types/ManagerAttendanceFormTypes';


/** Coordinates the Attendance modal editor without placing form lifecycle logic in the view. */
export function useManagerAttendanceForm() {
  const logic = useManagerAttendanceLogic();
  const form = useForm<AttendanceFormValues>({ resolver: zodResolver(managerAttendanceFormSchema), defaultValues: EMPTY_ATTENDANCE_FORM });
  const { showModal, tab } = logic;

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showModal) return;
    const date = new Date();
    form.reset({ ...EMPTY_ATTENDANCE_FORM, date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, type: (tab === 'Staff Attendance' || tab === 'Trainer Attendance') ? 'STAFF' : 'MEMBER' });
  }, [form, showModal, tab]);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => logic.markAttendance(values));
  const watchType = form.watch('type');
  const watchStatus = form.watch('status');
  const todayDate = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }, []);

  return { ...logic, form, handleClose, submit, watchType, watchStatus, todayDate };
}
