'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { MANAGER_PT_TAB_OPTIONS } from '@/app/frontend_manager/manager_pt/manager_pt_constants/ManagerPtTabConstants';
import type { PtActiveTab } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';
import { useManagerPtMutations } from '@/app/frontend_manager/manager_pt/manager_pt_hooks/useManagerPtMutations';
import { useManagerPtQueries } from '@/app/frontend_manager/manager_pt/manager_pt_hooks/useManagerPtQueries';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates pt feature state and its documented UI/API boundary through useManagerPtLogic.
 * @dependencies Uses ManagerDebounce, ManagerToastService, ManagerIdempotency, ManagerPtApi.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerPtLogic owns the pt feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerPtLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const debouncedSearch = useManagerDebounce(search, 300);
  const limit = Number(searchParams.get('limit') || '10');
  const setPage = useCallback((page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); router.replace(`${pathname}?${params.toString()}`, { scroll: false }); }, [pathname, router, searchParams]);

  const activeTab = useMemo(() => {
    const value = searchParams.get('tab') as PtActiveTab | null;
    return value && MANAGER_PT_TAB_OPTIONS.includes(value) ? value : 'dashboard';
  }, [searchParams]);

  const setActiveTab = useCallback((tab: PtActiveTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const { kpisQuery, workloadQuery, packagesQuery, assignmentsQuery } = useManagerPtQueries(currentPage, limit, debouncedSearch);

  const ptMutations = useManagerPtMutations();

  const assignments = assignmentsQuery.data?.assignments ?? [];
  const totalAssignments = assignmentsQuery.data?.total ?? 0;
  const expiringPackages = useMemo(
    () => assignments.filter((assignment) => assignment.sessionsRemaining <= 3 && assignment.sessionsRemaining > 0),
    [assignments],
  );

  const isPending = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isPending);
  const isError = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isError);
  const errorMessage = [kpisQuery.error, workloadQuery.error, packagesQuery.error, assignmentsQuery.error].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';

  return {
    activeTab,
    setActiveTab,
    packages: packagesQuery.data ?? [],
    assignments,
    totalAssignments,
    currentPage,
    limit,
    search,
    setPage,
    kpis: kpisQuery.data ?? null,
    workload: workloadQuery.data ?? [],
    expiringPackages,
    isPending,
    isError,
    errorMessage,
    handleMarkSession: ptMutations.handleMarkSession,
    markingId: ptMutations.markingId,
    createAssignment: ptMutations.createAssignment,
    assignmentSaving: ptMutations.assignmentSaving };
}
