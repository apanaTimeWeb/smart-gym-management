'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useManagerWorkoutUiStore } from '@/app/frontend_manager/manager_workout/manager_workout_store/useManagerWorkoutUiStore';

import type { ManagerWorkoutViewModel } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutViewModelTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutLogic.
 * @dependencies Uses useManagerWorkoutUiStore, ManagerWorkoutTypes, ManagerWorkoutViewModelTypes.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerWorkoutLogic owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerWorkoutLogic(): ManagerWorkoutViewModel {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerWorkoutUiStore();
  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const isDefault = !value || (key === 'level' && value === 'ALL') || (key === 'page' && value === '1') || (key === 'tab' && value === 'Workout Plans');
    if (isDefault) params.delete(key); else params.set(key, value);
    if (key !== 'page') params.delete('page');
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  return {
    tab: searchParams.get('tab') || 'Workout Plans', setTab: (value) => updateUrl('tab', value),
    search: searchParams.get('search') || '', setSearch: (value) => updateUrl('search', value),
    levelFilter: searchParams.get('level') || 'ALL', setLevelFilter: (value) => updateUrl('level', value),
    currentPage: Number(searchParams.get('page') || '1'), setCurrentPage: (value) => updateUrl('page', String(value)),
    showWkModal: ui.showWkModal, setShowWkModal: ui.setShowWkModal, editWkId: ui.editWkId, wkForm: ui.wkForm, setWkForm: ui.setWkForm, openAddWk: ui.openAddWk, openEditWk: ui.openEditWk,
    showExModal: ui.showExModal, setShowExModal: ui.setShowExModal, editExId: ui.editExId, exForm: ui.exForm, setExForm: ui.setExForm, openAddEx: ui.openAddEx, openEditEx: ui.openEditEx };
}
