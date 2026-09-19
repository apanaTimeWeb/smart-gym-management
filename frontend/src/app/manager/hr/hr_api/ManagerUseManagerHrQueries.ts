'use client';
// DATA FLOW: Manager HR API → TanStack Query cache → useManagerHrQueries → HR UI.
/** Manages UseHrQueries for the Manager module. */
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';
import type { HrSummary, Payroll, Staff, HrInitialData } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export function useManagerHrQueries(params: { search: string; role: string; month: string; page: number; limit: number }, initialData?: HrInitialData | null) {
  const queryClient = useQueryClient();
  const queryParams = useMemo(() => ({ search: params.search, role: params.role, page: String(params.page), limit: String(params.limit) }), [params.limit, params.page, params.role, params.search]);
  const staffKey = ['manager', 'hr', 'staff', queryParams] as const;
  const payrollKey = ['manager', 'hr', 'payrolls', params.month] as const;
  const summaryKey = ['manager', 'hr', 'summary'] as const;

  const staffQuery = useQuery({ queryKey: staffKey, queryFn: async () => (await hrApi.fetchStaff(queryParams)).data ?? { staff: [], total: 0 }, initialData: initialData ? { staff: initialData.staff, total: initialData.staff.length } : undefined });
  const payrollQuery = useQuery({ queryKey: payrollKey, queryFn: async () => (await hrApi.fetchPayrolls({ month: params.month, search: params.search, page: String(params.page), limit: String(params.limit) })).data ?? { payrolls: [], total: 0 }, initialData: initialData ? { payrolls: initialData.payrolls, total: initialData.payrolls.length } : undefined });
  const summaryQuery = useQuery({ queryKey: summaryKey, queryFn: async () => (await hrApi.fetchHrSummary()).data ?? null, initialData: initialData?.summary ?? undefined });

  const setStaff = useCallback((updater: Staff[] | ((previous: Staff[]) => Staff[])) => {
    queryClient.setQueryData<{ staff: Staff[]; total: number }>(staffKey, (previous) => {
      const current = previous?.staff ?? [];
      const staff = typeof updater === 'function' ? updater(current) : updater;
      return { staff, total: staff.length };
    });
  }, [queryClient, staffKey]);
  const setPayrolls = useCallback((updater: Payroll[] | ((previous: Payroll[]) => Payroll[])) => {
    queryClient.setQueryData<{ payrolls: Payroll[]; total: number }>(payrollKey, (previous) => {
      const current = previous?.payrolls ?? [];
      const payrolls = typeof updater === 'function' ? updater(current) : updater;
      return { payrolls, total: payrolls.length };
    });
  }, [payrollKey, queryClient]);
  const setSummary = useCallback((updater: HrSummary | null | ((previous: HrSummary | null) => HrSummary | null)) => {
    queryClient.setQueryData<HrSummary | null>(summaryKey, (previous) => typeof updater === 'function' ? updater(previous ?? null) : updater);
  }, [queryClient, summaryKey]);
  const loadAll = useCallback(async () => { await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]); }, [payrollQuery, staffQuery, summaryQuery]);

  return {
    staff: staffQuery.data?.staff ?? [], totalStaff: staffQuery.data?.total ?? 0, payrolls: payrollQuery.data?.payrolls ?? [], totalPayrolls: payrollQuery.data?.total ?? 0, summary: summaryQuery.data ?? null,
    setStaff, setPayrolls, setSummary, loadAll,
    isPending: staffQuery.isPending || payrollQuery.isPending || summaryQuery.isPending,
    isError: staffQuery.isError || payrollQuery.isError || summaryQuery.isError,
    error: staffQuery.error || payrollQuery.error || summaryQuery.error };
}
