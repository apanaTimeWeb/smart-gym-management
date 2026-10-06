'use client';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManagerPtApi } from '@/app/frontend_manager/manager_pt/manager_pt_api/ManagerPtApi';
import { ManagerPtQueryKeys } from '@/app/frontend_manager/manager_pt/manager_pt_constants/ManagerPtQueryKeys';

/**
 * @description Owns all Manager PT TanStack Query server-state reads and their resource-scoped query keys.
 * @dependencies Uses ManagerPtApi and ManagerPtQueryKeys only; no UI state or mutation behavior.
 * @edge-case Preserves independent pending/error state for KPI, workload, package, and assignment queries.
 */
export function useManagerPtQueries(currentPage: number, limit: number, debouncedSearch: string) {
  const assignmentParams = useMemo(() => ({ page: String(currentPage), limit: String(limit), search: debouncedSearch }), [currentPage, limit, debouncedSearch]);
  const kpisQuery = useQuery({ queryKey: ManagerPtQueryKeys.kpis(), queryFn: async () => (await ManagerPtApi.fetchPtDashboardKpis()).data ?? null });
  const workloadQuery = useQuery({ queryKey: ManagerPtQueryKeys.workload(), queryFn: async () => (await ManagerPtApi.fetchWorkload()).data ?? [] });
  const packagesQuery = useQuery({ queryKey: ManagerPtQueryKeys.packages(), queryFn: async () => (await ManagerPtApi.fetchPackages()).data ?? [] });
  const assignmentsQuery = useQuery({ queryKey: ManagerPtQueryKeys.assignments(assignmentParams), queryFn: async () => (await ManagerPtApi.fetchAssignments(assignmentParams)).data ?? { assignments: [], total: 0, page: currentPage, limit } });
  return { kpisQuery, workloadQuery, packagesQuery, assignmentsQuery, assignmentParams };
}
