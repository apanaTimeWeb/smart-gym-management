'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { useManagerScheduleQuery } from '@/app/frontend_manager/manager_schedule/manager_schedule_hooks/useManagerScheduleQueries';
import { useManagerScheduleMutations } from '@/app/frontend_manager/manager_schedule/manager_schedule_hooks/useManagerScheduleMutations';
import { useManagerScheduleUiStore } from '@/app/frontend_manager/manager_schedule/manager_schedule_store/useManagerScheduleUiStore';
import type { ManagerScheduleViewModel, TrainerShift, ShiftDay, CreateShiftDto } from '@/app/frontend_manager/manager_schedule/manager_schedule_types/ManagerScheduleTypes';

/** Manages UseScheduleLogic for the Manager module. */


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerScheduleLogic.
 * @dependencies Uses ManagerDebounce, ManagerErrorMessage, ManagerIdempotency, useManagerScheduleQueries.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerScheduleLogic owns the schedule feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerScheduleLogic(): ManagerScheduleViewModel {
  const t = useTranslations('MANAGER_SCHEDULE');
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
  const saveKeyRef = useRef<string | null>(null);
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const saving = scheduleMutations.create.isPending || scheduleMutations.update.isPending || scheduleMutations.remove.isPending;
  const trainers = scheduleQuery.data?.trainers ?? [];
  const kpis = scheduleQuery.data?.kpis ?? null;
  const status = scheduleQuery.status;
  const error = scheduleQuery.isError ? t("TEXT_GENERIC_ERROR") : '';

  const saveShift = useCallback(async (data: CreateShiftDto) => {
    const idempotencyKey = saveKeyRef.current ?? createManagerIdempotencyKey(); saveKeyRef.current = idempotencyKey;
    if (ui.shiftModal.editShift) await scheduleMutations.update.mutateAsync({ id: ui.shiftModal.editShift.id, body: data, idempotencyKey });
    else await scheduleMutations.create.mutateAsync({ body: data, idempotencyKey });
    saveKeyRef.current = null;
    closeShiftModal();
  }, [closeShiftModal, scheduleMutations.create, scheduleMutations.update, ui.shiftModal.editShift]);

  const deleteShift = useCallback(async (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? createManagerIdempotencyKey(); deleteKeyByIdRef.current.set(id, idempotencyKey); const response = await scheduleMutations.remove.mutateAsync({ id, idempotencyKey }); deleteKeyByIdRef.current.delete(id); return response; }, [scheduleMutations.remove]);


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
