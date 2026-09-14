'use client';
// RESPONSIBILITY: Orchestrator for the Finance module — KPIs, tabbed Payments table + Summary chart.
// DATA FLOW: FinanceProvider → useFinanceContext → sub-sections
import { FinanceProvider, useFinanceContext } from '@/app/manager/finance/finance_context/ManagerFinanceContext';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { Wallet, Loader2 } from 'lucide-react';

import ManagerFinanceKpiCards from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceKpiCards';
import ManagerFinanceFilters from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceFilters';
import ManagerFinanceTable from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceTable';
import ManagerFinanceRevenueChart from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceRevenueChart';

function FinanceInner() {
  const { tab, setTab, payments, fetchState, reload } = useFinanceContext();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Branch Finance" subtitle="Track payments, revenue, and financial overview" />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <ManagerFinanceKpiCards />

        {/* Tabs */}
        <div className="flex gap-1 bg-input rounded-xl p-1 w-fit">
          {(['Payments', 'Summary'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 text-sm font-medium rounded-lg motion-safe:transition-colors ${
                tab === t ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Payments Tab ── */}
        {tab === 'Payments' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            {/* Toolbar */}
            <ManagerFinanceFilters />

            {fetchState === 'loading' ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-7 h-7 motion-safe:animate-spin text-primary" />
              </div>
            ) : fetchState === 'error' ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-danger font-medium">Failed to load payments</p>
                <button onClick={reload} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90">Try Again</button>
              </div>
            ) : payments.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Wallet size={36} className="mx-auto text-secondary opacity-40" />
                <p className="text-sm text-secondary font-medium">No payments found</p>
              </div>
            ) : (
              <ManagerFinanceTable />
            )}
          </div>
        )}

        {/* ── Summary Tab ── */}
        {tab === 'Summary' && (
          <div className="space-y-5">
            <ManagerFinanceRevenueChart />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Export wrapped in provider ────────────────────────────────────────────────
export default function ManagerFinanceMain() {
  return (
    <FinanceProvider>
      <FinanceInner />
    </FinanceProvider>
  );
}
