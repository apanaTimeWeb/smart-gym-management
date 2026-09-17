'use client';
// RESPONSIBILITY: Owns URL tab state, TanStack Query server state, and PT mutations.
// DATA FLOW: ManagerPtApi → TanStack Query → useManagerPtLogic → ManagerPtMain.
/** Manages UsePtLogic for the Manager module. */
import { useCallback, useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { managerPtApi } from '@/app/manager/pt/pt_api/ManagerPtApi';
import type { PtActiveTab } from '@/app/manager/pt/pt_types/ManagerPtTypes';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';
import { PT_TAB_OPTIONS } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export function useManagerPtLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [markingId, setMarkingId] = useState<string | null>(null);
  const currentPage = Number(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const debouncedSearch = useManagerDebounce(search, 300);
  const limit = Number(searchParams.get('limit') || '10');
  const setPage = useCallback((page: number) => { const params = new URLSearchParams(searchParams.toString()); params.set('page', String(page)); router.replace(`${pathname}?${params.toString()}`, { scroll: false }); }, [pathname, router, searchParams]);

  const activeTab = useMemo(() => {
    const value = searchParams.get('tab') as PtActiveTab | null;
    return value && PT_TAB_OPTIONS.some((tab) => tab.id === value) ? value : 'dashboard';
  }, [searchParams]);

  const setActiveTab = useCallback((tab: PtActiveTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const kpisQuery = useQuery({ queryKey: ['manager', 'pt', 'kpis'], queryFn: async () => (await managerPtApi.fetchDashboardKpis()).data ?? null });
  const workloadQuery = useQuery({ queryKey: ['manager', 'pt', 'workload'], queryFn: async () => (await managerPtApi.fetchWorkload()).data ?? [] });
  const packagesQuery = useQuery({ queryKey: ['manager', 'pt', 'packages'], queryFn: async () => (await managerPtApi.fetchPackages()).data ?? [] });
  const assignmentParams = useMemo(() => ({ page: String(currentPage), limit: String(limit), search: debouncedSearch }), [currentPage, limit, debouncedSearch]);
  const assignmentsQuery = useQuery({ queryKey: ['manager', 'pt', 'assignments', assignmentParams], queryFn: async () => (await managerPtApi.fetchAssignments(assignmentParams)).data ?? { assignments: [], total: 0, page: currentPage, limit } });

  const createAssignmentMutation = useMutation({
    mutationFn: managerPtApi.createAssignment,
    onSuccess: (response) => {
      showManagerSuccessToast(response.message, 'manager-pt-success');
      queryClient.invalidateQueries({ queryKey: ['manager', 'pt', 'assignments'] });
    },
    onError: (error) => showManagerErrorToast(error, 'manager-pt-assign-error'),
  });

  const markSessionMutation = useMutation({
    mutationFn: (assignmentId: string) => managerPtApi.markSessionComplete(assignmentId),
    onMutate: (assignmentId) => setMarkingId(assignmentId),
    onSuccess: (response) => {
      showManagerSuccessToast(response.message, 'manager-pt-success');
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['manager', 'pt', 'assignments'] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['manager', 'pt', 'assignments'] });
      }
    },
    onError: (error) => showManagerErrorToast(error, 'manager-pt-session-error'),
    onSettled: () => setMarkingId(null),
  });

  const assignments = assignmentsQuery.data?.assignments ?? [];
  const totalAssignments = assignmentsQuery.data?.total ?? 0;
  const expiringPackages = useMemo(
    () => assignments.filter((assignment) => assignment.sessionsRemaining <= 3 && assignment.sessionsRemaining > 0),
    [assignments],
  );

  const isPending = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isPending);
  const isError = [kpisQuery, workloadQuery, packagesQuery, assignmentsQuery].some((query) => query.isError);

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
    markingId,
    handleMarkSession: markSessionMutation.mutate,
    createAssignment: createAssignmentMutation.mutateAsync,
    assignmentSaving: createAssignmentMutation.isPending,
  };
}
