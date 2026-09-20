'use client';
// RESPONSIBILITY: Renders the ManagerFinanceContent sub-view extracted from ManagerFinanceMain; owns only this presentation responsibility.
// RESPONSIBILITY: Orchestrator for the Finance module — KPIs, tabbed Payments table + Summary chart.
// DATA FLOW:  → useManagerFinanceLogic → sub-sections
import { useManagerFinanceLogic  } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { Wallet } from 'lucide-react';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import ManagerFinanceKpiCards from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceKpiCards';
import ManagerFinanceFilters from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceFilters';
import ManagerFinanceTable from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceTable';
import ManagerFinanceRevenueChart from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceRevenueChart';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';

export function ManagerFinanceContent() {
  const { tab, setTab, payments, isLoading, isError, reload } = useManagerFinanceLogic();

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
                tab === t ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Payments Tab ── */}
        {tab === 'Payments' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
            {/* Toolbar */}
            <ManagerFinanceFilters />

            {isLoading ? (
              <ManagerTableSkeleton rows={6} />
            ) : isError ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-danger font-medium">{MANAGER_GENERIC_ERROR_MESSAGE}</p>
                <button onClick={reload} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary hover:opacity-90 motion-safe:transition-colors">Try Again</button>
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
