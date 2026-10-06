'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ManagerFinanceApi } from '@/app/frontend_manager/manager_finance/manager_finance_api/ManagerFinanceApi';
import { ManagerFinanceQueryKeys } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceQueryKeys';
import { FINANCE_ALL_FILTER } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants';
import { useManagerFinancePayments, useManagerFinanceSummary } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceQueries';
import { useManagerFinanceUiStore } from '@/app/frontend_manager/manager_finance/manager_finance_store/useManagerFinanceUiStore';
import { ManagerFinanceFormatDate } from '@/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters';

import type { ManagerFinanceViewModel } from '@/app/frontend_manager/manager_finance/manager_finance_types/ManagerFinanceViewModelTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates finance feature state and its documented UI/API boundary through useManagerFinanceLogic.
 * @dependencies Uses ManagerFinanceFormatters, ManagerFinanceApi, useManagerFinanceQueries, useManagerFinanceUiStore.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerFinanceLogic owns the finance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerFinanceLogic(): ManagerFinanceViewModel {
  const searchParams = useSearchParams(); const router = useRouter(); const pathname = usePathname(); const queryClient = useQueryClient(); const ui = useManagerFinanceUiStore();
  const range = searchParams.get('range') || 'this_month'; const search = searchParams.get('search') || ''; const statusFilter = searchParams.get('status') || FINANCE_ALL_FILTER; const methodFilter = searchParams.get('method') || FINANCE_ALL_FILTER; const currentPage = parseInt(searchParams.get('page') || '1', 10); const startDate = searchParams.get('startDate') || ''; const endDate = searchParams.get('endDate') || '';
  const setUrlParam = useCallback((key: string, value: string | null) => { const current = new URLSearchParams(searchParams.toString()); if (value && value !== 'ALL') current.set(key, value); else current.delete(key); if (key !== 'page') current.set('page', '1'); router.push(`${pathname}?${current.toString()}`); }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]); const setStatusFilter = useCallback((value: string) => setUrlParam('status', value), [setUrlParam]); const setMethodFilter = useCallback((value: string) => setUrlParam('method', value), [setUrlParam]); const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]); const setStartDate = useCallback((value: string) => setUrlParam('startDate', value || null), [setUrlParam]); const setEndDate = useCallback((value: string) => setUrlParam('endDate', value || null), [setUrlParam]);
  const queryParams = useMemo(() => ({ search, status: statusFilter, method: methodFilter, page: String(currentPage), limit: '25', range, startDate, endDate }), [currentPage, endDate, methodFilter, range, search, startDate, statusFilter]);
  const paymentsQuery = useManagerFinancePayments(queryParams); const summaryQuery = useManagerFinanceSummary(range);
  const errorMessage = [paymentsQuery.error, summaryQuery.error].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';
  const reload = useCallback(() => { void queryClient.invalidateQueries({ queryKey: ManagerFinanceQueryKeys.all }); }, [queryClient]);
  const exportCSV = useCallback(() => { const payments = paymentsQuery.data?.payments ?? []; const rows = [['Invoice No','Member','Plan','Amount','Method','Status','Date'], ...payments.map((payment) => [payment.invoiceNumber, payment.member?.name ?? '—', payment.member?.plan?.name ?? '—', payment.amount, payment.method, payment.status, ManagerFinanceFormatDate(payment.paidAt)])]; const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `finance_${new Date().toISOString().split('T')[0]}.csv`; anchor.click(); URL.revokeObjectURL(url); }, [paymentsQuery.data?.payments]);
  const exportPDF = useCallback(async () => { const response = await ManagerFinanceApi.exportPaymentsReport('pdf'); if (response.data?.url) window.open(response.data.url, '_blank', 'noopener,noreferrer'); }, []);
  const printReceipt = useCallback((_id: string) => { window.print(); }, []);
  return { tab: ui.tab, setTab: ui.setTab, search, setSearch, statusFilter, setStatusFilter, methodFilter, setMethodFilter, currentPage, setCurrentPage, startDate, setStartDate, endDate, setEndDate, payments: paymentsQuery.data?.payments ?? [], summary: summaryQuery.data ?? null, totalPayments: paymentsQuery.data?.total ?? 0, isPending: paymentsQuery.isPending || summaryQuery.isPending, isError: paymentsQuery.isError || summaryQuery.isError, errorMessage, reload, exportCSV, exportPDF, printReceipt, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast };
}
