"use client";
// RESPONSIBILITY: Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary).

import { useEffect, useState } from 'react';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { FINANCE_TABS } from '@/app/admin/finance/finance_utils/AdminFinanceSharedConstants';
import { RefreshCw, Search } from 'lucide-react';
import AdminFinancePaymentsTable from '@/app/admin/finance/finance_components/AdminFinancePaymentsTable/AdminFinancePaymentsTable';
import AdminFinanceRevenueSummary from '@/app/admin/finance/finance_components/AdminFinanceRevenueSummary/AdminFinanceRevenueSummary';
import AdminFinanceExpensesTable from '@/app/admin/finance/finance_components/AdminFinanceExpensesTable/AdminFinanceExpensesTable';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';

export default function AdminFinanceTabs() {
  const [tab, setTab] = useState<string>(FINANCE_TABS[0]);
  const { loadAll, search, setSearch, methodFilter, setMethodFilter, statusFilter, setStatusFilter } = useAdminFinanceLogic();

  const [localSearch, setLocalSearch] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

// EFFECT: Synchronizes this component effect with its declared React dependencies in finance/finance_components/AdminFinanceTabs/AdminFinanceTabs.tsx.
  useEffect(() => {
    const timer = setTimeout(() => { if (localSearch !== search) { setSearch(localSearch); } }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch]);

  return (
    <div className="rounded-xl shadow-card border overflow-hidden bg-card border-border">
      <div className="border-b border-border flex justify-between items-center flex-wrap gap-2">
        <div className="flex">
          {FINANCE_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
                tab === t ? 'text-primary border-primary bg-surface-highlight' : 'text-secondary border-transparent hover:opacity-80'
              }`}
            >{t}</button>
          ))}
        </div>
        {tab !== 'Expenses' && (
          <div className="px-4 flex flex-wrap gap-3 items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center"><Search size={16} className="text-secondary" /></span>
              <input value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder="Search payments..." aria-label="Search payments"
                className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary w-40 sm:w-64"
              />
            </div>
            {tab === 'Payments' && (
              <>
                <div className="w-36 bg-input rounded-lg border-none">
                  <AdminSearchableDropdown
                    options={[
                      { value: 'All', label: 'All Methods' },
                      { value: 'UPI', label: 'UPI' },
                      { value: 'Cash', label: 'Cash' },
                      { value: 'Card', label: 'Card' },
                      { value: 'NetBanking', label: 'NetBanking' },
                    ]}
                    value={methodFilter}
                    onChange={(v) => setMethodFilter(v as string)}
                  />
                </div>
                <div className="w-36 bg-input rounded-lg border-none">
                  <AdminSearchableDropdown
                    options={[
                      { value: 'All', label: 'All Statuses' },
                      { value: 'PAID', label: 'Paid' },
                      { value: 'DUE', label: 'Due' },
                      { value: 'REFUNDED', label: 'Refunded' },
                    ]}
                    value={statusFilter}
                    onChange={(v) => setStatusFilter(v as string)}
                  />
                </div>
              </>
            )}
            <div className="flex gap-2">
              <button type="button" aria-label="Refresh finance data" onClick={loadAll} className="min-h-11 min-w-11 flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        {tab === 'Payments' && <AdminFinancePaymentsTable />}
        {tab === 'Expenses' && <AdminFinanceExpensesTable />}
        {tab === 'Summary' && <AdminFinanceRevenueSummary />}
      </div>
    </div>
  );
}
