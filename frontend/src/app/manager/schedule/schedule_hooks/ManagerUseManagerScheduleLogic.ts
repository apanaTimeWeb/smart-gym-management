'use client';
// DATA FLOW: Manager module state/API data → useManagerScheduleLogic → owning Manager UI components.
// RESPONSIBILITY: All data-fetching, mutation, and UI state logic for the Schedule module. Keeps components pure.
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
/** Manages UseScheduleLogic for the Manager module. */
import { useCallback, useMemo } from 'react';
import { useManagerScheduleQuery, useManagerScheduleMutations } from '@/app/manager/schedule/schedule_api/ManagerUseManagerScheduleQueries';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { ManagerScheduleViewModel, TrainerShift, ShiftDay, CreateShiftDto } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { useManagerScheduleUiStore } from '@/app/manager/schedule/schedule_store/ManagerUseManagerScheduleUiStore';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';

export function useManagerScheduleLogic(): ManagerScheduleViewModel {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const ui = useManagerScheduleUiStore();

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


  const showToast = ui.showToast;
  const hideToast = ui.hideToast;

  const filters = useMemo(() => ({ ...(search ? { search: debouncedSearch } : {}), ...(selectedDay !== 'All' ? { day: selectedDay } : {}) }), [debouncedSearch, selectedDay]);
  const scheduleQuery = useManagerScheduleQuery(filters);

  const openAddShift = useCallback((trainerId: string) => {
    ui.openAddShift(trainerId);
  }, [ui]);

  const openEditShift = useCallback((shift: TrainerShift) => {
    ui.openEditShift(shift);
  }, [ui]);

  const closeShiftModal = useCallback(() => {
    ui.closeShiftModal();
  }, [ui]);

  const scheduleMutations = useManagerScheduleMutations();
  const saving = scheduleMutations.create.isPending || scheduleMutations.update.isPending || scheduleMutations.remove.isPending;
  const trainers = scheduleQuery.data?.trainers ?? [];
  const kpis = scheduleQuery.data?.kpis ?? null;
  const status = scheduleQuery.status;
  const error = scheduleQuery.isError ? MANAGER_GENERIC_ERROR_MESSAGE : '';

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    if (ui.shiftModal.editShift) await scheduleMutations.update.mutateAsync({ id: ui.shiftModal.editShift.id, body: data });
    else await scheduleMutations.create.mutateAsync(data);
    closeShiftModal();
  }, [closeShiftModal, scheduleMutations.create, scheduleMutations.update, ui.shiftModal.editShift]);

  const deleteShift = useCallback(async (id: string) => { await scheduleMutations.remove.mutateAsync({ id, idempotencyKey: crypto.randomUUID() }); }, [scheduleMutations.remove]);


  return {
    trainers,
    kpis,
    status,
    error,
    toast: ui.toast,
    showToast,
    hideToast,
    loadAll: async () => { await scheduleQuery.refetch(); },
    selectedDay,
    setSelectedDay,
    search,
    setSearch,
    shiftModal: ui.shiftModal,
    openAddShift,
    openEditShift,
    closeShiftModal,
    saving,
    saveShift,
    deleteShift };
}
