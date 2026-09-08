// RESPONSIBILITY: All data-fetching, mutation, and UI state logic for the Schedule module. Keeps components pure.
'use client';
import { useState, useCallback, useEffect } from 'react';
import type {
  TrainerScheduleSummary, ScheduleKPIData, ScheduleContextType,
  TrainerShift, CreateShiftDto, ShiftDay,
} from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { scheduleApi } from '@/app/manager/schedule/schedule_api/ManagerScheduleApi';
import { MOCK_TRAINERS, MOCK_SCHEDULE_KPIS } from '@/app/manager/schedule/schedule_utils/ManagerScheduleSharedConstants';
import { useDebounce } from '@/app/manager/manager_utils/useDebounce';

export function useManagerScheduleLogic(): ScheduleContextType {
  const [trainers, setTrainers] = useState<TrainerScheduleSummary[]>([]);
  const [kpis, setKpis] = useState<ScheduleKPIData | null>(null);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [selectedDay, setSelectedDay] = useState<ShiftDay | 'All'>('All');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [shiftModal, setShiftModal] = useState<{ open: boolean; editShift: TrainerShift | null; trainerId: string | null }>({
    open: false, editShift: null, trainerId: null,
  });

  const debouncedSearch = useDebounce(search, 300);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      // TODO: Replace mock with real API calls once backend is ready
      // const [trainersRes, kpisRes] = await Promise.all([scheduleApi.getTrainers(), scheduleApi.getKPIs()]);
      // setTrainers(trainersRes.data?.trainers ?? []);
      // setKpis(kpisRes.data);
      await new Promise(r => setTimeout(r, 400)); // simulate network
      setTrainers(MOCK_TRAINERS);
      setKpis(MOCK_SCHEDULE_KPIS);
      setFetchState('success');
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      showToast(msg, 'error');
      setFetchState('error');
    }
  }, [showToast]);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const openAddShift = useCallback((trainerId: string) => {
    setShiftModal({ open: true, editShift: null, trainerId });
  }, []);

  const openEditShift = useCallback((shift: TrainerShift) => {
    setShiftModal({ open: true, editShift: shift, trainerId: shift.trainerId });
  }, []);

  const closeShiftModal = useCallback(() => {
    setShiftModal({ open: false, editShift: null, trainerId: null });
  }, []);

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    setSaving(true);
    try {
      if (shiftModal.editShift) {
        // TODO: const res = await scheduleApi.updateShift(shiftModal.editShift.id, data);
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
        // TODO: const res = await scheduleApi.createShift(data);
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
  }, [shiftModal.editShift, trainers, showToast, closeShiftModal]);

  const deleteShift = useCallback(async (id: string) => {
    try {
      // TODO: await scheduleApi.deleteShift(id);
      setTrainers(prev => prev.map(t => ({
        ...t,
        shifts: t.shifts.filter(s => s.id !== id),
        totalShiftsPerWeek: t.shifts.some(s => s.id === id) ? t.totalShiftsPerWeek - 1 : t.totalShiftsPerWeek,
      })));
      showToast('Shift removed', 'success');
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }, [showToast]);

  // Filter trainers by search
  const filteredTrainers = debouncedSearch
    ? trainers.filter(t => t.trainerName.toLowerCase().includes(debouncedSearch.toLowerCase()) || t.trainerRole.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : trainers;

  return {
    trainers: filteredTrainers,
    kpis,
    fetchState,
    error,
    toast,
    showToast,
    hideToast,
    loadAll,
    selectedDay,
    setSelectedDay,
    search,
    setSearch,
    shiftModal,
    openAddShift,
    openEditShift,
    closeShiftModal,
    saving,
    saveShift,
    deleteShift,
  };
}
