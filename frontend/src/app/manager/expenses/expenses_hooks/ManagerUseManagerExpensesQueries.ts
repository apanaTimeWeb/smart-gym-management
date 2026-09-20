// DATA FLOW: Manager module state/API data → useManagerExpensesQueries → owning Manager UI components.
'use client';
/** Manages UseExpensesQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { expensesApi } from '@/app/manager/expenses/expenses_api/ManagerExpensesApi';


export const managerExpensesQueryKeys = {
  all: ['manager', 'expenses'] as const,
  list: (params?: Record<string, string>) => [...managerExpensesQueryKeys.all, 'list', params] as const,
  stats: () => [...managerExpensesQueryKeys.all, 'stats'] as const };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useExpensesListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerExpensesQueryKeys.list(params),
    queryFn: () => expensesApi.fetchExpenses(params).then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useExpensesStatsQuery() {
  return useQuery({
    queryKey: managerExpensesQueryKeys.stats(),
    queryFn: () => expensesApi.fetchExpenseStats().then(res => res.data) });
}
