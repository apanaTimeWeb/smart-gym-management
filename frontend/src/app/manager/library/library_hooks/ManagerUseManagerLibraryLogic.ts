'use client';
// RESPONSIBILITY: Coordinates Library URL state, TanStack Query server data, module UI state, confirmation, and CRUD mutations.
import { useCallback, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { useManagerLibraryDietPlansQuery, useManagerLibraryExercisesQuery } from '@/app/manager/library/library_api/ManagerUseManagerLibraryQueries';
import { useManagerLibraryMutations } from '@/app/manager/library/library_api/ManagerUseManagerLibraryMutations';
import { useManagerLibraryUiStore } from '@/app/manager/library/library_store/ManagerUseManagerLibraryUiStore';
import type { DietPlan, Exercise, LibraryView, ManagerLibraryViewModel } from '@/app/manager/library/library_types/ManagerLibraryTypes';

export function useManagerLibraryLogic(): ManagerLibraryViewModel {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ui = useManagerLibraryUiStore();
  const viewValue = searchParams.get('view');
  const view: LibraryView = viewValue === 'exercises' ? 'exercises' : 'diet';
  const search = searchParams.get('search') ?? '';
  const currentPage = Math.max(Number(searchParams.get('page') ?? '1') || 1, 1);
  const debouncedSearch = useManagerDebounce(search, 300);
  const params = useMemo(() => ({ search: debouncedSearch, page: String(currentPage), limit: String(MANAGER_ITEMS_PER_PAGE) }), [currentPage, debouncedSearch]);
  const dietQuery = useManagerLibraryDietPlansQuery(params);
  const exerciseQuery = useManagerLibraryExercisesQuery(params);
  const mutations = useManagerLibraryMutations();
  const deletionIdempotencyKeys = useRef(new Map<string, string>());

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.set('page', '1');
    router.replace(next.size ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const setView = useCallback((nextView: LibraryView) => setUrlParam('view', nextView === 'diet' ? null : nextView), [setUrlParam]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam('page', String(Math.max(1, page))), [setUrlParam]);

  const saveDietPlan = useCallback(async (data: Partial<DietPlan>) => {
    const response = await mutations.saveDiet.mutateAsync({ id: ui.editDietId, data });
    ui.setShowDietModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveDiet, ui]);
  const deleteDietPlan = useCallback(async (id: string) => {
    const ok = await confirm({ title: 'Delete Diet Plan', message: 'This action permanently removes the diet plan from the Manager Library.', confirmText: 'Delete', type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`diet:${id}`);
    if (!idempotencyKey) { idempotencyKey = crypto.randomUUID(); deletionIdempotencyKeys.current.set(`diet:${id}`, idempotencyKey); }
    const response = await mutations.removeDiet.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`diet:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeDiet, ui]);
  const saveExercise = useCallback(async (data: Partial<Exercise>) => {
    const response = await mutations.saveExercise.mutateAsync({ id: ui.editExerciseId, data });
    ui.setShowExerciseModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveExercise, ui]);
  const deleteExercise = useCallback(async (id: string) => {
    const ok = await confirm({ title: 'Delete Exercise', message: 'This action permanently removes the exercise from the Manager Library.', confirmText: 'Delete', type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`exercise:${id}`);
    if (!idempotencyKey) { idempotencyKey = crypto.randomUUID(); deletionIdempotencyKeys.current.set(`exercise:${id}`, idempotencyKey); }
    const response = await mutations.removeExercise.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`exercise:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeExercise, ui]);

  const activeQuery = view === 'diet' ? dietQuery : exerciseQuery;
  return {
    view, setView,
    dietPlans: dietQuery.data?.data?.dietPlans ?? [], totalDietPlans: dietQuery.data?.data?.total ?? 0,
    exercises: exerciseQuery.data?.data?.exercises ?? [], totalExercises: exerciseQuery.data?.data?.total ?? 0,
    isLoading: activeQuery.isPending, isError: activeQuery.isError,
    errorMessage: activeQuery.error instanceof Error ? activeQuery.error.message : '',
    saving: mutations.saveDiet.isPending || mutations.removeDiet.isPending || mutations.saveExercise.isPending || mutations.removeExercise.isPending,
    toast: ui.toast,
    search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showToast: ui.showToast, hideToast: ui.hideToast,
    loadAll: async () => { await activeQuery.refetch(); },
    showDietModal: ui.showDietModal, setShowDietModal: ui.setShowDietModal, editDietId: ui.editDietId, editDietData: ui.editDietData,
    openAddDiet: ui.openAddDiet, openEditDiet: ui.openEditDiet, saveDietPlan, deleteDietPlan,
    showExerciseModal: ui.showExerciseModal, setShowExerciseModal: ui.setShowExerciseModal, editExerciseId: ui.editExerciseId, editExerciseData: ui.editExerciseData,
    openAddExercise: ui.openAddExercise, openEditExercise: ui.openEditExercise, saveExercise, deleteExercise,
  };
}
