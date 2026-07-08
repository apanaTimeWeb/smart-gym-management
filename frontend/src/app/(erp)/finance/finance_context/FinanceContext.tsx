"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { financeApi, type Payment, type FinanceSummary } from '@/lib/api';
import type { ToastType } from '@/components/Toast';

interface FinanceContextType {
  payments: Payment[];
  summary: FinanceSummary | null;
  loading: boolean;
  error: string;
  toast: { message: string; type: ToastType } | null;
  showToast: (msg: string, t: ToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
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

  const value = useMemo(() => ({
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
  }), [payments, summary, loading, error, toast, showToast, hideToast, loadAll, showModal, setShowModal]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinanceContext() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinanceContext must be used within a FinanceProvider');
  }
  return context;
}
