'use client';
// DATA FLOW: Manager module state/API data → useManagerScheduleLogic → owning Manager UI components.
// RESPONSIBILITY: All data-fetching, mutation, and UI state logic for the Schedule module. Keeps components pure.
/** Manages UseScheduleLogic for the Manager module. */
import { useState, useCallback, useMemo } from 'react';
import { useManagerScheduleQuery, useManagerScheduleMutations } from '@/app/manager/schedule/schedule_api/ManagerUseManagerScheduleQueries';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { ScheduleContextType, TrainerShift, ShiftDay, CreateShiftDto } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';

export function useManagerScheduleLogic(): ScheduleContextType {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [shiftModal, setShiftModal] = useState<{ open: boolean; editShift: TrainerShift | null; trainerId: string | null }>({
    open: false, editShift: null, trainerId: null,
  });

  const search = searchParams.get('search') ?? '';
  const selectedDay = (searchParams.get('day') as ShiftDay | 'All') ?? 'All';
  const debouncedSearch = useManagerDebounce(search, 300);

  const setSearch = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set('search', val);
    else params.delete('search');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSelectedDay = useCallback((val: ShiftDay | 'All') => {
    const params = new URLSearchParams(searchParams.toString());
    if (val !== 'All') params.set('day', val);
    else params.delete('day');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);


  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const filters = useMemo(() => ({ ...(search ? { search: debouncedSearch } : {}), ...(selectedDay !== 'All' ? { day: selectedDay } : {}) }), [debouncedSearch, selectedDay]);
  const scheduleQuery = useManagerScheduleQuery(filters);

  const openAddShift = useCallback((trainerId: string) => {
    setShiftModal({ open: true, editShift: null, trainerId });
  }, []);

  const openEditShift = useCallback((shift: TrainerShift) => {
    setShiftModal({ open: true, editShift: shift, trainerId: shift.trainerId });
  }, []);

  const closeShiftModal = useCallback(() => {
    setShiftModal({ open: false, editShift: null, trainerId: null });
  }, []);

  const scheduleMutations = useManagerScheduleMutations();
  const saving = scheduleMutations.create.isPending || scheduleMutations.update.isPending || scheduleMutations.remove.isPending;
  const trainers = scheduleQuery.data?.trainers ?? [];
  const kpis = scheduleQuery.data?.kpis ?? null;
  const status = scheduleQuery.status;
  const error = scheduleQuery.error instanceof Error ? scheduleQuery.error.message : '';

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    if (shiftModal.editShift) await scheduleMutations.update.mutateAsync({ id: shiftModal.editShift.id, body: data });
    else await scheduleMutations.create.mutateAsync(data);
    closeShiftModal();
  }, [closeShiftModal, scheduleMutations.create, scheduleMutations.update, shiftModal.editShift]);

  const deleteShift = useCallback(async (id: string) => {
    await scheduleMutations.remove.mutateAsync(id);
  }, [scheduleMutations.remove]);


  return {
    trainers,
    kpis,
    status,
    error,
    toast,
    showToast,
    hideToast,
    loadAll: async () => { await scheduleQuery.refetch(); },
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
