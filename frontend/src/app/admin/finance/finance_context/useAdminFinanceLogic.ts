// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Finance module.
import { useCallback } from 'react';
import { financeApi } from '@/app/admin/finance/finance_api/finance_api';
import type { Payment, FinanceSummary } from '@/app/admin/finance/finance_types/finance_types';
import type { ToastType } from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import type { FinanceInitialData } from '@/app/admin/finance/finance_types/finance_types';
import { AddPaymentFormValues } from '@/app/admin/finance/finance_utils/AdminFinanceSharedConstants';
import type { FetchState } from '@/app/admin/finance/finance_types/finance_types';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAdminFinanceStore } from '@/app/admin/finance/finance_store/useAdminFinanceStore';

export function useAdminFinanceLogic(initialData?: FinanceInitialData | null) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { showModal, setShowModal } = useAdminFinanceStore();

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

  const showToast = useCallback((msg: string, t: ToastType) => {
    if (t === 'error') toast.error(msg);
    else toast.success(msg);
  }, []);
  const hideToast = useCallback(() => {}, []);

  const queryParams = { limit: '10', page: currentPage.toString(), ...(debouncedSearch ? { search: debouncedSearch } : {}) };

  const { data: paymentsRes, isLoading: paymentsLoading, isError: isPaymentsError, error: paymentsError } = useQuery({
    queryKey: ['financePayments', queryParams],
    queryFn: () => financeApi.fetchPayments(queryParams),
    initialData: initialData?.payments ? { success: true, message: 'SSR', data: { payments: initialData.payments, total: initialData.totalPayments || 0 } } : undefined,
  });

  const { data: summaryRes, isLoading: summaryLoading, isError: isSummaryError } = useQuery({
    queryKey: ['financeSummary'],
    queryFn: () => financeApi.fetchSummary(),
    initialData: initialData?.summary ? { success: true, message: 'SSR', data: initialData.summary } : undefined,
  });

  const createPaymentMutation = useMutation({
    mutationFn: (newPayment: Partial<Payment>) => financeApi.createPayment(newPayment),
    onSuccess: (res) => {
      showToast(res.message || 'Payment created successfully', 'success');
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ['financePayments'] });
      queryClient.invalidateQueries({ queryKey: ['financeSummary'] });
    },
    onError: (err) => {
      showToast((err as Error).message, 'error');
    },
  });

  const savePayment = useCallback(async (data: AddPaymentFormValues) => {
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
    createPaymentMutation.mutate(newPayment as Partial<Payment>);
  }, [createPaymentMutation]);

  const isLoading = paymentsLoading || summaryLoading;
  const isError = isPaymentsError || isSummaryError;
  const fetchState: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';

  let fetchedPayments = paymentsRes?.data?.payments || [];
  if (debouncedSearch) {
    fetchedPayments = fetchedPayments.filter(p =>
      p.member?.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.memberId.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.invoiceNo.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  return {
    payments: fetchedPayments,
    totalPayments: paymentsRes?.data?.total || 0,
    summary: summaryRes?.data || null,
    fetchState,
    saving: createPaymentMutation.isPending,
    error: isError ? (paymentsError as Error).message : '',
    toast: null,
    showToast,
    hideToast,
    loadAll: async () => {}, // Mocked for context compatibility
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

