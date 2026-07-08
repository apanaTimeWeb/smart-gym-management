import { useState, useCallback, useEffect } from 'react';
import { financeApi, type Payment, type FinanceSummary } from '@/lib/api';
import type { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import { FinanceContextType } from '../finance_types/finance_types';

export function useFinanceLogic(): FinanceContextType {
 const [payments, setPayments] = useState<Payment[]>([]);
 const [summary, setSummary] = useState<FinanceSummary | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
 const [showModal, setShowModal] = useState(false);

 const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
 const hideToast = useCallback(() => setToast(null), []);

 const loadAll = useCallback(async () => {
 setLoading(true);
 setError('');
 try {
 const [paymentsRes, summaryRes] = await Promise.all([
 financeApi.getPayments({ limit: '200' }),
 financeApi.getSummary(),
 ]);
 setPayments(paymentsRes.data.payments);
 setSummary(summaryRes.data);
 } catch (e) { 
 const msg = (e as Error).message;
 setError(msg);
 showToast(msg, 'error'); 
 }
 finally { setLoading(false); }
 }, [showToast]);

 useEffect(() => { 
 loadAll(); 
 }, [loadAll]);

 return {
 payments,
 summary,
 loading,
 error,
 toast,
 showToast,
 hideToast,
 loadAll,
 showModal,
 setShowModal
 };
}
