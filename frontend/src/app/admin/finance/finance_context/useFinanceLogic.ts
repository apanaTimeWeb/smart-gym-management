// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Finance module.
import { useState, useCallback, useEffect, useRef } from 'react';
import { financeApi } from '@/app/admin/finance/finance_api/finance_api';
import type { Payment, FinanceSummary } from '@/app/admin/finance/finance_types/finance_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import type { FinanceContextType, FinanceInitialData } from '@/app/admin/finance/finance_types/finance_types';
import { AddPaymentFormValues } from '@/app/admin/finance/finance_utils/FinanceSharedConstants';
import type { FetchState } from '@/app/admin/finance/finance_types/finance_types';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
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
  const methodFilter = searchParams.get('method') || 'All';
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
  const setMethodFilter = useCallback((val: string) => setUrlParam('method', val === 'All' ? null : val), [setUrlParam]);

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
      let fetchedPayments = paymentsRes.data?.payments || [];
      if (debouncedSearch) {
        fetchedPayments = fetchedPayments.filter(p => 
          p.member?.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
          p.memberId.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.invoiceNo.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }
      setPayments(fetchedPayments);
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
      const newPayment = {
        memberId: data.memberId, 
        amount: Number(data.amount), 
        method: data.method, 
        notes: data.notes,
        paidAt: new Date().toISOString(),
        status: 'PAID',
        invoiceNo: 'INV-' + Math.floor(Math.random() * 10000),
        member: { name: 'Unknown Member', email: 'unknown@example.com', phone: '0000000000', plan: { name: 'Basic' } }
      };
      const res = await financeApi.createPayment(newPayment) as { message?: string, data?: Payment };
      showToast(res.message || 'Payment created successfully', 'success');
      setShowModal(false);
      const savedPay = res.data ? res.data : { id: `pay-${Date.now()}`, ...newPayment };
      setPayments(prev => [savedPay as Payment, ...prev]);
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
  savePayment,
  methodFilter,
  setMethodFilter
  };
}
