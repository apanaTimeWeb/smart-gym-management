import { useState, useCallback, useEffect } from 'react';
import { type SalesTab, type DateFilter } from '@/app/erp/sales/sales_utils/SalesSharedConstants';
import { SalesContextType } from '@/app/erp/sales/sales_types/sales_types';
import { salesApi } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';

export function useSalesLogic(): SalesContextType {
  const [tab, setTab] = useState<SalesTab>('Overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const [overviewData, setOverviewData] = useState<any[]>([]);
  const [membershipReport, setMembershipReport] = useState<any[]>([]);
  const [membershipTotals, setMembershipTotals] = useState<any>({});
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [allMemberships, setAllMemberships] = useState<any[]>([]);
  const [allMembershipsTotal, setAllMembershipsTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { limit: '10', page: currentPage.toString() };
      if (debouncedSearch) params.search = debouncedSearch;

      const [overviewRes, reportRes, pendingRes, allRes] = await Promise.all([
        salesApi.getOverview(),
        salesApi.getMembershipReport(),
        salesApi.getPendingPayments(params),
        salesApi.getAllMemberships(params)
      ]);

      setOverviewData(overviewRes.data?.monthlyRevenue || []);
      setMembershipReport(reportRes.data?.report || []);
      setMembershipTotals(reportRes.data?.totals || {});
      
      setPendingPayments(pendingRes.data?.members || []);
      setPendingTotal(pendingRes.data?.total || 0);
      
      setAllMemberships(allRes.data?.members || []);
      setAllMembershipsTotal(allRes.data?.total || 0);

    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Failed to fetch sales data', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    tab, setTab,
    dateFilter, setDateFilter,
    search, setSearch,
    currentPage, setCurrentPage,
    overviewData,
    membershipReport,
    membershipTotals,
    pendingPayments,
    pendingTotal,
    allMemberships,
    allMembershipsTotal,
    loading,
    loadAll,
    toast,
    showToast
  };
}
