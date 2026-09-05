// RESPONSIBILITY: Main entry point for the Finance module. Provides a complete payments view with KPI cards, payments table, and summary.
// DATA FLOW: page.tsx (SSR) → ManagerFinanceMain → FinanceContext → sub-components
'use client';

import { useState, useEffect, useCallback } from 'react';
import { IndianRupee, Wallet, Clock, TrendingUp, Search, Loader2, RefreshCw } from 'lucide-react';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import type { Payment, FinanceSummary } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';

// ── KPI Card ──────────────────────────────────────────────────────────────────

interface FinanceKPICardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  colorClass: string;
}

function FinanceKPICard({ label, value, icon, colorClass }: FinanceKPICardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg"
      style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.06), rgba(255,255,255,0.01))' }}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Payment Method Badge ───────────────────────────────────────────────────────

const METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI:        { bg: 'bg-pay-upi-bg',  text: 'text-pay-upi'  },
  Cash:       { bg: 'bg-pay-cash-bg', text: 'text-pay-cash' },
  Card:       { bg: 'bg-pay-card-bg', text: 'text-pay-card' },
  NetBanking: { bg: 'bg-pay-bank-bg', text: 'text-pay-bank' },
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ManagerFinanceMain() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const loadData = useCallback(async () => {
    setFetchState('loading');
    try {
      const [paymentsRes, summaryRes] = await Promise.all([
        financeApi.getPayments({ search, page: currentPage.toString(), limit: MANAGER_ITEMS_PER_PAGE.toString() }),
        financeApi.getSummary(),
      ]);
      setPayments(paymentsRes.data?.payments || []);
      setTotalPayments(paymentsRes.data?.total || 0);
      setSummary(summaryRes.data || null);
      setFetchState('success');
    } catch {
      setFetchState('error');
      showToast('Failed to load finance data. Please retry.', 'error');
    }
  }, [search, currentPage, showToast]);

  // Re-fetch when search or page changes
  // Dependency note: loadData captures search + currentPage via useCallback
  useEffect(() => {
    const debounceTimer = setTimeout(() => { loadData(); }, 300);
    return () => clearTimeout(debounceTimer);
  }, [loadData]);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  const totalPages = Math.ceil(totalPayments / MANAGER_ITEMS_PER_PAGE);

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Branch Finance" subtitle="Track payments, revenue, and financial overview" />

      <div className="p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <FinanceKPICard
            label="Total Revenue"
            value={summary ? formatCurrency(summary.totalRevenue) : '—'}
            icon={<TrendingUp size={20} className="text-success" />}
            colorClass="bg-success/10"
          />
          <FinanceKPICard
            label="This Month"
            value={summary ? formatCurrency(summary.monthlyRevenue) : '—'}
            icon={<IndianRupee size={20} className="text-primary" />}
            colorClass="bg-primary/10"
          />
          <FinanceKPICard
            label="Total Payments"
            value={summary ? summary.totalPayments.toString() : '—'}
            icon={<Wallet size={20} className="text-info" />}
            colorClass="bg-info/10"
          />
          <FinanceKPICard
            label="Pending Amount"
            value={summary ? formatCurrency(summary.pendingAmount) : '—'}
            icon={<Clock size={20} className="text-warning" />}
            colorClass="bg-warning/10"
          />
        </div>

        {/* Payments Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Search payments..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-foreground motion-safe:transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* Table */}
          {fetchState === 'loading' ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-7 h-7 motion-safe:animate-spin text-primary" />
            </div>
          ) : fetchState === 'error' ? (
            <div className="py-16 text-center">
              <p className="text-sm text-danger font-medium">Failed to load payments</p>
              <button onClick={loadData} className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white motion-safe:transition-opacity hover:opacity-90">
                Try Again
              </button>
            </div>
          ) : payments.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Wallet size={36} className="mx-auto text-secondary opacity-40" />
              <p className="text-sm text-secondary font-medium">No payments found</p>
              <p className="text-xs text-secondary">Payments will appear here once members make transactions.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/5">
                    <tr>
                      {['Invoice #', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {payments.map(p => {
                      const methodStyle = METHOD_STYLES[p.method] || { bg: 'bg-input', text: 'text-secondary' };
                      return (
                        <tr key={p.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                          <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{p.invoiceNo}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <p className="text-sm font-semibold text-foreground">{p.member?.name || '—'}</p>
                            <p className="text-xs text-secondary">{p.member?.plan?.name || '—'}</p>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{p.member?.plan?.name || '—'}</td>
                          <td className="px-5 py-3.5 text-sm font-semibold text-success whitespace-nowrap">{formatCurrency(p.amount)}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${methodStyle.bg} ${methodStyle.text}`}>
                              {p.method}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              p.status === 'PAID' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                            {new Date(p.paidAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <ManagerPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalPayments}
                itemsPerPage={MANAGER_ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {toast && <ManagerToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
