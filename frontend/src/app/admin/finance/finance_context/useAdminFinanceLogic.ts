"use client";

// RESPONSIBILITY: Owns Finance URL filter state and TanStack Query server-state orchestration for read-only finance analytics.
// DATA FLOW: URL state -> query parameters/query keys -> Admin Finance API -> Zod-validated response -> read-only views.
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/app/admin/finance/finance_api/AdminFinanceApi';
import type { FinanceInitialData } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import type { AdminFinanceExpenseUrlParamKey } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

/** Coordinates FinanceLogic state, data flow, and feature behavior. */
export function useAdminFinanceLogic(initialData?: FinanceInitialData | null) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';

  const search = searchParams.get('search') ?? '';
  const methodFilter = searchParams.get('method') ?? 'All';
  const statusFilter = searchParams.get('status') ?? 'All';
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? '1') || 1);
  const range = searchParams.get('range') ?? 'this_month';
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.set('page', '1');
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }, [pathname, router, searchParams]);

  const expenseCategory = searchParams.get('expenseCategory') ?? 'All';
  const expensePage = Math.max(1, Number(searchParams.get('expensePage') ?? '1') || 1);

  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(Math.max(1, value))), [setUrlParam]);
  const setMethodFilter = useCallback((value: string) => setUrlParam('method', value === 'All' ? null : value), [setUrlParam]);
  const setStatusFilter = useCallback((value: string) => setUrlParam('status', value === 'All' ? null : value), [setUrlParam]);
  const setRange = useCallback((value: string) => setUrlParam('range', value === 'this_month' ? null : value), [setUrlParam]);
  const setExpenseUrlParam = useCallback((key: AdminFinanceExpenseUrlParamKey, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value); else next.delete(key);
    if (key === 'expenseCategory') next.set('expensePage', '1');
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const setExpenseCategory = useCallback((value: string) => setExpenseUrlParam('expenseCategory', value === 'All' ? null : value), [setExpenseUrlParam]);
  const setExpensePage = useCallback((value: number) => setExpenseUrlParam('expensePage', String(Math.max(1, value))), [setExpenseUrlParam]);

  const queryParams = {
    limit: '10',
    page: String(currentPage),
    branchId: selectedBranchId,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(methodFilter !== 'All' ? { method: methodFilter } : {}),
    ...(statusFilter !== 'All' ? { status: statusFilter } : {}),
  };

  const paymentsQuery = useQuery({
    queryKey: ['admin', 'finance', 'payments', queryParams],
    queryFn: () => financeApi.fetchPayments(queryParams),
    initialData: initialData?.payments ? {
      success: true,
      message: 'SSR',
      data: { payments: initialData.payments, total: initialData.totalPayments ?? 0 },
    } : undefined,
  });

  const summaryQuery = useQuery({
    queryKey: ['admin', 'finance', 'summary', selectedBranchId, range],
    queryFn: () => financeApi.fetchSummary(selectedBranchId, range),
    initialData: initialData?.summary ? { success: true, message: 'SSR', data: initialData.summary } : undefined,
  });

  const expenseParams = {
    branchId: selectedBranchId,
    page: String(expensePage),
    limit: '8',
    ...(expenseCategory !== 'All' ? { category: expenseCategory } : {}),
  };
  const expensesQuery = useQuery({
    queryKey: ['admin', 'finance', 'expenses', expenseParams],
    queryFn: () => financeApi.fetchExpenses(expenseParams),
  });

  const isError = paymentsQuery.isError || summaryQuery.isError || expensesQuery.isError;
  const status = paymentsQuery.status;

  const loadAll = useCallback(async () => {
    await Promise.all([paymentsQuery.refetch(), summaryQuery.refetch(), expensesQuery.refetch()]);
  }, [expensesQuery, paymentsQuery, summaryQuery]);

  return {
    payments: paymentsQuery.data?.data?.payments ?? [],
    expenses: expensesQuery.data?.data?.expenses ?? [],
    totalExpenses: expensesQuery.data?.data?.total ?? 0,
    totalExpenseAmount: expensesQuery.data?.data?.totalAmount ?? 0,
    expenseCategory,
    expensePage,
    totalPayments: paymentsQuery.data?.data?.total ?? 0,
    summary: summaryQuery.data?.data ?? null,
    status,
    error: isError ? 'Unable to load finance data. Please try again.' : '',
    loadAll,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    methodFilter,
    setMethodFilter,
    statusFilter,
    setStatusFilter,
    range,
    setRange,
    setExpenseCategory,
    setExpensePage,
  };
}
