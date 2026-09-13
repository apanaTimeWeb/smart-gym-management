'use client';

import { useState, useCallback } from 'react';
import type { TrainerScheduleSummary, TrainerShift, CreateShiftDto } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

export function useManagerScheduleMutations(
  trainers: TrainerScheduleSummary[],
  setTrainers: React.Dispatch<React.SetStateAction<TrainerScheduleSummary[]>>,
  shiftModal: { open: boolean; editShift: TrainerShift | null; trainerId: string | null },
  closeShiftModal: () => void,
  showToast: (msg: string, t: ToastType) => void
) {
  const [saving, setSaving] = useState(false);

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    setSaving(true);
    try {
      if (shiftModal.editShift) {
        setTrainers(prev => prev.map(t => {
          if (t.trainerId !== data.trainerId) return t;
          return {
            ...t,
            shifts: t.shifts.map(s =>
              s.id === shiftModal.editShift!.id
                ? { ...s, ...data, trainerName: t.trainerName, trainerRole: t.trainerRole }
                : s
            ),
          };
        }));
        showToast('Shift updated successfully', 'success');
      } else {
        const newShift: TrainerShift = {
          id: `s_${Date.now()}`,
          trainerName: trainers.find(t => t.trainerId === data.trainerId)?.trainerName ?? '',
          trainerRole: trainers.find(t => t.trainerId === data.trainerId)?.trainerRole ?? '',
          ...data,
        };
        setTrainers(prev => prev.map(t =>
          t.trainerId === data.trainerId
            ? { ...t, shifts: [...t.shifts, newShift], totalShiftsPerWeek: t.totalShiftsPerWeek + 1 }
            : t
        ));
        showToast('Shift added successfully', 'success');
      }
      closeShiftModal();
    } catch (e) {
      showToast((e as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [shiftModal.editShift, trainers, showToast, closeShiftModal, setTrainers]);

  const deleteShift = useCallback(async (id: string) => {
    try {
      setTrainers(prev => prev.map(t => ({
        ...t,
        shifts: t.shifts.filter(s => s.id !== id),
        totalShiftsPerWeek: t.shifts.some(s => s.id === id) ? t.totalShiftsPerWeek - 1 : t.totalShiftsPerWeek,
      })));
      showToast('Shift removed', 'success');
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }, [showToast, setTrainers]);

  return { saving, saveShift, deleteShift };
}
