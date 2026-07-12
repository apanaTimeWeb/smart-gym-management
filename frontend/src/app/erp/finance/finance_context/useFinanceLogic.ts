import { useState, useCallback, useEffect, useRef } from 'react';
import { financeApi, type Payment, type FinanceSummary } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import { FinanceContextType } from '@/app/erp/finance/finance_types/finance_types';
import { AddPaymentFormValues } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import { useDebounce } from '@/app/erp/erp_utils/useDebounce';

export function useFinanceLogic(initialData?: any): FinanceContextType {
  const [payments, setPayments] = useState<Payment[]>(initialData?.payments || []);
  const [totalPayments, setTotalPayments] = useState<number>(initialData?.totalPayments || 0);
  const [summary, setSummary] = useState<FinanceSummary | null>(initialData?.summary || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstRender = useRef(true);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
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
      setPayments(paymentsRes.data.payments || []);
      setTotalPayments(paymentsRes.data.total || 0);
      setSummary(summaryRes.data);
 } catch (e) { 
 const msg = (e as Error).message;
 setError(msg);
 showToast(msg, 'error'); 
 }
 finally { setLoading(false); }
  }, [showToast, currentPage, debouncedSearch]);

  useEffect(() => { 
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    loadAll(); 
  }, [loadAll, initialData]);

  const savePayment = useCallback(async (data: AddPaymentFormValues) => {
    setLoading(true);
    try {
      const res = await financeApi.createPayment({ 
        memberId: Number(data.memberId), 
        amount: Number(data.amount), 
        method: data.method, 
        notes: data.notes 
      });
      showToast((res as any).message, 'success');
      setShowModal(false);
      await loadAll();
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setLoading(false); 
    }
  }, [loadAll, showToast]);

 return {
 payments,
 totalPayments,
 summary,
 loading,
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
