// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Finance module.
import { useState, useCallback, useEffect, useRef } from 'react';
import { financeApi } from '@/app/erp/finance/finance_api/finance_api';
import type { Payment, FinanceSummary } from '@/app/erp/finance/finance_types/finance_types';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { FinanceContextType, FinanceInitialData } from '@/app/erp/finance/finance_types/finance_types';
import { AddPaymentFormValues } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import { FetchState } from '@/app/erp/finance/finance_types/finance_types';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useFinanceLogic(initialData?: FinanceInitialData | null): FinanceContextType {
  const [payments, setPayments] = useState<Payment[]>(initialData?.payments || []);
  const [totalPayments, setTotalPayments] = useState<number>(initialData?.totalPayments || 0);
  const [summary, setSummary] = useState<FinanceSummary | null>(initialData?.summary || null);
  const [fetchState, setFetchState] = useState<FetchState>(initialData ? 'success' : 'loading');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const isFirstRender = useRef(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const search = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const debouncedSearch = useDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) current.set(key, value);
    else current.delete(key);
    if (key !== 'page') current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`);
  }, [searchParams, pathname, router]);

  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setFetchState('loading');
    setError('');
    try {
      const params: Record<string, string> = { 
        limit: '10', 
        page: currentPage.toString() 
      };
      if (debouncedSearch) params.search = debouncedSearch;

      const [paymentsRes, summaryRes] = await Promise.all([
        financeApi.getPayments(params),
        financeApi.getSummary(),
      ]);
      setPayments(paymentsRes.data?.payments || []);
      setTotalPayments(paymentsRes.data?.total || 0);
      setSummary(summaryRes.data || null);
      setFetchState('success');
  } catch (e) { 
  const msg = (e as Error).message;
  setError(msg);
  showToast(msg, 'error');  
  setFetchState('error');
 }
  }, [showToast, currentPage, debouncedSearch]);

  useEffect(() => { 
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialData) return;
    }
    loadAll(); 
  }, [loadAll, initialData]);

  const savePayment = useCallback(async (data: AddPaymentFormValues) => {
    setSaving(true);
    try {
      const res = await financeApi.createPayment({ 
        memberId: data.memberId, 
        amount: Number(data.amount), 
        method: data.method, 
        notes: data.notes 
      }) as { message?: string };
      showToast(res.message || 'Payment created successfully', 'success');
      setShowModal(false);
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [loadAll, showToast]);

 return {
 payments,
 totalPayments,
 summary,
 fetchState,
 saving,
 error,
 toast,
 showToast,
 hideToast,
 loadAll,
  showModal,
  setShowModal,
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  savePayment
  };
}
