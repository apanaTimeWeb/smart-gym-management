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
import { PT_TAB_OPTIONS } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export function useManagerPtLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [markingId, setMarkingId] = useState<string | null>(null);

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
  const assignmentsQuery = useQuery({ queryKey: ['manager', 'pt', 'assignments'], queryFn: async () => (await managerPtApi.fetchAssignments()).data ?? [] });

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
        queryClient.setQueryData(['manager', 'pt', 'assignments'], (current: typeof assignmentsQuery.data) =>
          current?.map((assignment) => assignment.id === response.data?.id ? response.data : assignment) ?? [],
        );
      } else {
        queryClient.invalidateQueries({ queryKey: ['manager', 'pt', 'assignments'] });
      }
    },
    onError: (error) => showManagerErrorToast(error, 'manager-pt-session-error'),
    onSettled: () => setMarkingId(null),
  });

  const assignments = assignmentsQuery.data ?? [];
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
