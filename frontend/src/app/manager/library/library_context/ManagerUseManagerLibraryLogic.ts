'use client';
// DATA FLOW: URL filters → ManagerLibraryApi/TanStack Query → library UI; mutations reconcile Query cache.
// RESPONSIBILITY: Coordinates Diet Library URL state, server queries, UI modal state, and CRUD mutations.
/** Manages UseLibraryLogic for the Manager module. */
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';
import type { DietPlan, LibraryContextType, LibraryInitialData } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import { EMPTY_DIET_FORM, type DietFormValues } from '@/app/manager/library/library_utils/ManagerLibrarySharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useManagerLibraryLogic(initialData?: LibraryInitialData | null): LibraryContextType {
  const { confirm } = useConfirm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page') || 1);
  const debouncedSearch = useManagerDebounce(search, 300);
  const [showDietModal, setShowDietModal] = useState(false);
  const [editDietId, setEditDietId] = useState<string | null>(null);
  const [editDietData, setEditDietData] = useState<DietPlan | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((page: number) => setUrlParam('page', String(page)), [setUrlParam]);

  const queryKey = useMemo(() => ['manager', 'library', 'diet-plans', { search: debouncedSearch, page: currentPage, limit: 12 }] as const, [currentPage, debouncedSearch]);
  const dietQuery = useQuery({ queryKey, queryFn: async () => (await libraryApi.getDietPlans({ search: debouncedSearch, page: String(currentPage), limit: '12' })).data ?? { dietPlans: [], total: 0 }, initialData: initialData ? { dietPlans: initialData.dietPlans, total: initialData.dietPlans.length } : undefined });
  const mutation = useMutation({
    mutationFn: async (input: { id: string | null; data: Partial<DietPlan> }) => input.id ? libraryApi.updateDietPlan(input.id, input.data) : libraryApi.createDietPlan(input.data),
    onSuccess: (response) => { setToast({ message: response.message, type: 'success' }); setShowDietModal(false); queryClient.invalidateQueries({ queryKey: ['manager', 'library', 'diet-plans'] }); },
    onError: (error) => setToast({ message: error instanceof Error ? error.message : 'Unable to save diet plan.', type: 'error' }),
  });
  const deleteMutation = useMutation({
    mutationFn: libraryApi.removeDietPlan,
    onSuccess: (response) => { setToast({ message: response.message, type: 'success' }); queryClient.invalidateQueries({ queryKey: ['manager', 'library', 'diet-plans'] }); },
    onError: (error) => setToast({ message: error instanceof Error ? error.message : 'Unable to delete diet plan.', type: 'error' }),
  });

  const openAddDiet = useCallback(() => { setEditDietId(null); setEditDietData(EMPTY_DIET_FORM as unknown as DietPlan); setShowDietModal(true); }, []);
  const openEditDiet = useCallback((diet: DietPlan) => { setEditDietId(diet.id); setEditDietData(diet); setShowDietModal(true); }, []);
  const saveDietPlan = useCallback(async (data: Partial<DietPlan>) => { await mutation.mutateAsync({ id: editDietId, data }); }, [editDietId, mutation]);
  const deleteDietPlan = useCallback(async (id: string) => { const ok = await confirm({ title: 'Remove Diet Plan', message: 'Delete this diet plan?', confirmText: 'Delete', type: 'danger' }); if (ok) await deleteMutation.mutateAsync(id); }, [confirm, deleteMutation]);

  return {
    dietPlans: dietQuery.data?.dietPlans ?? [],
    isLoading: dietQuery.isPending,
    isError: dietQuery.isError,
    saving: mutation.isPending || deleteMutation.isPending,
    toast, search, debouncedSearch, setSearch, currentPage, setCurrentPage,
    showToast: (message, type) => setToast({ message, type }), hideToast: () => setToast(null),
    loadAll: async () => { await dietQuery.refetch(); },
    showDietModal, setShowDietModal, editDietId, editDietData, openAddDiet, openEditDiet, saveDietPlan, deleteDietPlan,
  };
}
