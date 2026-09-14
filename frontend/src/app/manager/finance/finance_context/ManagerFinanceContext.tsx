import { formatDate } from '@/lib/formatters';
// RESPONSIBILITY: React Context — bridges TanStack Query with UI state (filters, tab, pagination).
'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import { useManagerFinancePayments, useManagerFinanceSummary } from '@/app/manager/finance/finance_api/useManagerFinanceQueries';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import { useQueryClient } from '@tanstack/react-query';

export type FinanceTab = 'Payments' | 'Summary';

interface FinanceContextValue {
  tab: FinanceTab;
  setTab: (t: FinanceTab) => void;
  search: string;
  setSearch: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  methodFilter: string;
  setMethodFilter: (v: string) => void;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  payments: Payment[];
  summary: FinanceSummary | null;
  totalPayments: number;
  fetchState: 'idle' | 'loading' | 'success' | 'error';
  reload: () => void;
  exportCSV: () => void;
  exportPDF: () => void;
  printReceipt: (id: string) => void;
}

const ManagerFinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<FinanceTab>('Payments');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const range = searchParams.get('range') || 'this_month';
  
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'ALL';
  const methodFilter = searchParams.get('method') || 'ALL';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value && value !== 'ALL') current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((v: string) => setUrlParam('search', v || null), [setUrlParam]);
  const setStatusFilter = useCallback((v: string) => setUrlParam('status', v), [setUrlParam]);
  const setMethodFilter = useCallback((v: string) => setUrlParam('method', v), [setUrlParam]);
  const setCurrentPage = useCallback((v: number) => setUrlParam('page', v.toString()), [setUrlParam]);
  const setStartDate = useCallback((v: string) => setUrlParam('startDate', v || null), [setUrlParam]);
  const setEndDate = useCallback((v: string) => setUrlParam('endDate', v || null), [setUrlParam]);

  const queryClient = useQueryClient();

  const queryParams = useMemo(() => ({
    search,
    status: statusFilter,
    method: methodFilter,
    page: currentPage.toString(),
    limit: MANAGER_ITEMS_PER_PAGE.toString(),
    range,
    startDate,
    endDate
  }), [search, statusFilter, methodFilter, currentPage, range, startDate, endDate]);

  const { 
    data: paymentsData, 
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useManagerFinancePayments(queryParams);

  const {
    data: summaryData,
    isLoading: isSummaryLoading,
  } = useManagerFinanceSummary(range);

  const payments = paymentsData?.payments || [];
  const totalPayments = paymentsData?.total || 0;
  const summary = summaryData || null;

  const fetchState = isPaymentsLoading || isSummaryLoading 
    ? 'loading' 
    : isPaymentsError 
      ? 'error' 
      : 'success';

  const reload = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['manager', 'finance', 'payments'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'finance', 'summary'] });
  }, [queryClient]);

  const exportCSV = useCallback(() => {
    const headers = ['Invoice No', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date'];
    const rows = payments.map(p => [
      p.invoiceNumber,
      p.member?.name ?? '',
      p.member?.plan?.name ?? '',
      p.amount,
      p.method,
      p.status,
      formatDate(p.paidAt),
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [payments]);

  const exportPDF = useCallback(() => {
    alert('Export PDF functionality will be implemented here.');
  }, []);

  const printReceipt = useCallback((id: string) => {
    alert(`Printing receipt for payment ID: ${id}`);
  }, []);

  return (
    <ManagerFinanceContext.Provider value={{
      tab, setTab,
      search, setSearch,
      statusFilter, setStatusFilter,
      methodFilter, setMethodFilter,
      currentPage, setCurrentPage,
      startDate, setStartDate,
      endDate, setEndDate,
      payments, summary, totalPayments,
      fetchState,
      reload, exportCSV, exportPDF, printReceipt
    }}>
      {children}
    </ManagerFinanceContext.Provider>
  );
}

export function useFinanceContext() {
  const ctx = useContext(ManagerFinanceContext);
  if (!ctx) throw new Error('useFinanceContext must be used within FinanceProvider');
  return ctx;
}
