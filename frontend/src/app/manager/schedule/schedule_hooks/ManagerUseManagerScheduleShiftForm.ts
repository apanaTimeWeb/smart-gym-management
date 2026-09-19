'use client';
// RESPONSIBILITY: Owns Schedule Shift form setup, synchronization, validation, submission and dirty-state protection.
// DATA FLOW: Schedule UI state → RHF/Zod → shift mutation → query cache/UI.
/** Coordinates the Manager / feature. */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerScheduleLogic } from '@/app/manager/schedule/schedule_hooks/ManagerUseManagerScheduleLogic';
import type { CreateShiftDto } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { managerScheduleShiftFormSchema } from '@/app/manager/schedule/schedule_schemas/ManagerScheduleShiftFormSchema';
import type { ShiftFormValues } from '@/app/manager/schedule/schedule_types/ManagerScheduleShiftFormTypes';
import { EMPTY_SHIFT_FORM } from '@/app/manager/schedule/schedule_types/ManagerScheduleShiftFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
export function useManagerScheduleShiftForm() {
  const { shiftModal, closeShiftModal, saving, saveShift, trainers } = useManagerScheduleLogic();
  const form = useForm<ShiftFormValues>({ resolver: zodResolver(managerScheduleShiftFormSchema), defaultValues: EMPTY_SHIFT_FORM });
  useEffect(() => { if (shiftModal.open) form.reset(shiftModal.editShift ? { trainerId: shiftModal.editShift.trainerId, day: shiftModal.editShift.day, startTime: shiftModal.editShift.startTime, endTime: shiftModal.editShift.endTime, status: shiftModal.editShift.status, notes: shiftModal.editShift.notes ?? '' } : { ...EMPTY_SHIFT_FORM, trainerId: shiftModal.trainerId ?? '' }); }, [form, shiftModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(shiftModal.open && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(closeShiftModal); };
  const submit = form.handleSubmit(async (data) => { saveShift(data as unknown as CreateShiftDto); form.reset(data); });
  return { open: shiftModal.open, editShift: shiftModal.editShift, saving, trainers, form, submit, handleClose };
}
