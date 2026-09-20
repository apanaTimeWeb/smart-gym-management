// DATA FLOW: URL state → Workout query consumers; modal/form UI state → Zustand.
// RESPONSIBILITY: Compatibility facade for Workout feature state. URL state is kept in Next.js search params; UI editing state is module-scoped Zustand.
'use client';
/** Coordinates the Manager / feature. */
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useManagerWorkoutUiStore } from '@/app/manager/workout/workout_store/ManagerUseManagerWorkoutUiStore';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ManagerWorkoutViewModel } from '@/app/manager/workout/workout_types/ManagerWorkoutViewModelTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
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
