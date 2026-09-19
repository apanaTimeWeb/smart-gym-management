'use client';
/** Coordinates the Manager / feature. */
import React, { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useManagerFinancePayments, useManagerFinanceSummary } from '@/app/manager/finance/finance_api/ManagerUseManagerFinanceQueries';
import { formatDate } from '@/lib/formatters';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import { useManagerFinanceUiStore, type FinanceTab } from '@/app/manager/finance/finance_store/ManagerUseManagerFinanceUiStore';

import type { ManagerFinanceViewModel } from '@/app/manager/finance/finance_types/ManagerFinanceViewModelTypes';


export function useManagerFinanceLogic(): ManagerFinanceViewModel {
  const searchParams = useSearchParams(); const router = useRouter(); const pathname = usePathname(); const queryClient = useQueryClient(); const ui = useManagerFinanceUiStore();
  const range = searchParams.get('range') || 'this_month'; const search = searchParams.get('search') || ''; const statusFilter = searchParams.get('status') || 'ALL'; const methodFilter = searchParams.get('method') || 'ALL'; const currentPage = parseInt(searchParams.get('page') || '1', 10); const startDate = searchParams.get('startDate') || ''; const endDate = searchParams.get('endDate') || '';
  const setUrlParam = useCallback((key: string, value: string | null) => { const current = new URLSearchParams(Array.from(searchParams.entries())); if (value && value !== 'ALL') current.set(key, value); else current.delete(key); if (key !== 'page') current.set('page', '1'); router.push(`${pathname}?${current.toString()}`); }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]); const setStatusFilter = useCallback((value: string) => setUrlParam('status', value), [setUrlParam]); const setMethodFilter = useCallback((value: string) => setUrlParam('method', value), [setUrlParam]); const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]); const setStartDate = useCallback((value: string) => setUrlParam('startDate', value || null), [setUrlParam]); const setEndDate = useCallback((value: string) => setUrlParam('endDate', value || null), [setUrlParam]);
  const queryParams = useMemo(() => ({ search, status: statusFilter, method: methodFilter, page: String(currentPage), limit: '25', range, startDate, endDate }), [currentPage, endDate, methodFilter, range, search, startDate, statusFilter]);
  const paymentsQuery = useManagerFinancePayments(queryParams); const summaryQuery = useManagerFinanceSummary(range);
  const errorMessage = [paymentsQuery.error, summaryQuery.error].map((error) => error instanceof Error ? error.message : '').find(Boolean) ?? '';
  const reload = useCallback(() => { void queryClient.invalidateQueries({ queryKey: ['manager', 'finance', 'payments'] }); void queryClient.invalidateQueries({ queryKey: ['manager', 'finance', 'summary'] }); }, [queryClient]);
  const exportCSV = useCallback(() => { const payments = paymentsQuery.data?.payments ?? []; const rows = [['Invoice No','Member','Plan','Amount','Method','Status','Date'], ...payments.map((payment) => [payment.invoiceNumber, payment.member?.name ?? '—', payment.member?.plan?.name ?? '—', payment.amount, payment.method, payment.status, formatDate(payment.paidAt)])]; const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `finance_${new Date().toISOString().split('T')[0]}.csv`; anchor.click(); URL.revokeObjectURL(url); }, [paymentsQuery.data?.payments]);
  const exportPDF = useCallback(async () => { const response = await financeApi.exportPaymentsReport('pdf'); if (response.data?.url) window.open(response.data.url, '_blank', 'noopener,noreferrer'); }, []);
  const printReceipt = useCallback((_id: string) => { window.print(); }, []);
  return { tab: ui.tab, setTab: ui.setTab, search, setSearch, statusFilter, setStatusFilter, methodFilter, setMethodFilter, currentPage, setCurrentPage, startDate, setStartDate, endDate, setEndDate, payments: paymentsQuery.data?.payments ?? [], summary: summaryQuery.data ?? null, totalPayments: paymentsQuery.data?.total ?? 0, isLoading: paymentsQuery.isPending || summaryQuery.isPending, isError: paymentsQuery.isError || summaryQuery.isError, errorMessage, reload, exportCSV, exportPDF, printReceipt, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast };
}
