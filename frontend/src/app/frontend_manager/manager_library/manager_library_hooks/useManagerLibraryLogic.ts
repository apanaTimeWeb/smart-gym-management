'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { useManagerLibraryMutations } from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryMutations';
import { useManagerLibraryDietPlansQuery, useManagerLibraryExercisesQuery } from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryQueries';
import { useManagerLibraryUiStore } from '@/app/frontend_manager/manager_library/manager_library_store/useManagerLibraryUiStore';
import type { DietPlan, Exercise, LibraryView, ManagerLibraryViewModel } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryLogic.
 * @dependencies Uses useManagerLibraryMutations, useManagerLibraryQueries, useManagerLibraryUiStore, ManagerConfirmProvider.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryLogic owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryLogic(): ManagerLibraryViewModel {
  const t = useTranslations('MANAGER_LIBRARY');
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
  const saveDietKeyRef = useRef<string | null>(null);
  const saveExerciseKeyRef = useRef<string | null>(null);

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
    const response = await mutations.saveDiet.mutateAsync({ id: ui.editDietId, data, idempotencyKey: (saveDietKeyRef.current ??= createManagerIdempotencyKey()) });
    saveDietKeyRef.current = null;
    ui.setShowDietModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveDiet, ui]);
  const deleteDietPlan = useCallback(async (id: string) => {
    const ok = await confirm({ title: t('DELETE_DIET_TITLE'), message: t('DELETE_DIET_MESSAGE'), confirmText: t('DELETE'), type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`diet:${id}`);
    if (!idempotencyKey) { idempotencyKey = createManagerIdempotencyKey(); deletionIdempotencyKeys.current.set(`diet:${id}`, idempotencyKey); }
    const response = await mutations.removeDiet.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`diet:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeDiet, ui]);
  const saveExercise = useCallback(async (data: Partial<Exercise>) => {
    const response = await mutations.saveExercise.mutateAsync({ id: ui.editExerciseId, data, idempotencyKey: (saveExerciseKeyRef.current ??= createManagerIdempotencyKey()) });
    saveExerciseKeyRef.current = null;
    ui.setShowExerciseModal(false);
    ui.showToast(response.message, 'success');
  }, [mutations.saveExercise, ui]);
  const deleteExercise = useCallback(async (id: string) => {
    const ok = await confirm({ title: t('DELETE_EXERCISE_TITLE'), message: t('DELETE_EXERCISE_MESSAGE'), confirmText: t('DELETE'), type: 'danger' });
    if (!ok) return;
    let idempotencyKey = deletionIdempotencyKeys.current.get(`exercise:${id}`);
    if (!idempotencyKey) { idempotencyKey = createManagerIdempotencyKey(); deletionIdempotencyKeys.current.set(`exercise:${id}`, idempotencyKey); }
    const response = await mutations.removeExercise.mutateAsync({ id, idempotencyKey });
    deletionIdempotencyKeys.current.delete(`exercise:${id}`);
    ui.showToast(response.message, 'success');
  }, [confirm, mutations.removeExercise, ui]);

  const activeQuery = view === 'diet' ? dietQuery : exerciseQuery;
  return {
    view, setView,
    dietPlans: dietQuery.data?.data?.dietPlans ?? [], totalDietPlans: dietQuery.data?.data?.total ?? 0,
    exercises: exerciseQuery.data?.data?.exercises ?? [], totalExercises: exerciseQuery.data?.data?.total ?? 0,
    isPending: activeQuery.isPending, isError: activeQuery.isError,
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
