"use client";
// RESPONSIBILITY: Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary).
import { useTranslations } from 'next-intl';

import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinanceLogic';
import { FINANCE_PAYMENT_STATUSES, FINANCE_TABS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import { useAdminFinanceTabsViewModel } from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_tabs/useAdminFinanceTabsViewModel';
import { RefreshCw, Search } from 'lucide-react';
import AdminFinancePaymentsTable from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_payments_table/AdminFinancePaymentsTable';
import AdminFinanceRevenueSummary from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_revenue_summary/AdminFinanceRevenueSummary';
import AdminFinanceExpensesTable from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_expenses_table/AdminFinanceExpensesTable';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';

/**
 * AdminFinanceTabs renders the admin finance tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceTabs: Renders the tab bar and tab content switcher for the Finance module (Payments, Expenses, Summary).
 * @dependencies Consumes useAdminFinanceLogic, AdminFinanceConstants, AdminFinancePaymentsTable, AdminFinanceRevenueSummary, AdminFinanceExpensesTable.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceTabs() {
  const t = useTranslations();

  const { loadAll, search, setSearch, methodFilter, setMethodFilter, statusFilter, setStatusFilter } = useAdminFinanceLogic();
  const { tab, setTab, localSearch, setLocalSearch } = useAdminFinanceTabsViewModel(search, setSearch);

  return (
    <div className="rounded-xl shadow-card border overflow-hidden bg-card border-border">
      <div className="border-b border-border flex justify-between items-center flex-wrap gap-2">
        <div className="flex">
          {FINANCE_TABS.map((t, __testIdIndex44) => (
            <button type="button" key={t} onClick={() => setTab(t)}
              className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
                tab === t ? 'text-primary border-focus bg-surface-highlight' : 'text-secondary border-transparent hover:opacity-80'
              }`}
             data-testid={`admin_finance-admin_finance-tabs-click-map44-${__testIdIndex44}-1`}>{t}</button>
          ))}
        </div>
        {tab !== 'Expenses' && (
          <div className="px-4 flex flex-wrap gap-3 items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
              <input value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder={t('finance.admin_finance_tabs.text_7e1f7a5cf9')} aria-label={t('finance.admin_finance_tabs.text_3a82474c4f')}
                className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary w-40 sm:w-64 focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
               data-testid="admin_finance-admin_finance-tabs-control"/>
            </div>
            {tab === 'Payments' && (
              <>
                <div className="w-36 bg-input rounded-lg border-none">
                  <AdminLayoutSearchableDropdown
                    options={[
                      { value: 'All', label: t('finance.admin_finance_tabs.remaining_allMethods') },
                      { value: 'UPI', label: t('finance.AdminAuditRepair.upi') },
                      { value: 'Cash', label: t('finance.AdminAuditRepair.cash') },
                      { value: 'Card', label: t('finance.AdminAuditRepair.card') },
                      { value: 'NetBanking', label: t('finance.AdminAuditRepair.netBanking') },
                    ]}
                    value={methodFilter}
                    onChange={(v) => setMethodFilter(v as string)}
                   testId="admin_finance-admin_finance-tabs-change"/>
                </div>
                <div className="w-36 bg-input rounded-lg border-none">
                  <AdminLayoutSearchableDropdown
                    options={[
                      { value: 'All', label: t('finance.admin_finance_tabs.remaining_allStatuses') },
                      { value: FINANCE_PAYMENT_STATUSES[0], label: t('finance.AdminAuditRepair.paid') },
                      { value: FINANCE_PAYMENT_STATUSES[1], label: t('finance.AdminAuditRepair.due') },
                      { value: FINANCE_PAYMENT_STATUSES[2], label: t('finance.AdminAuditRepair.refunded') },
                    ]}
                    value={statusFilter}
                    onChange={(v) => setStatusFilter(v as string)}
                   testId="admin_finance-admin_finance-tabs-change-2"/>
                </div>
              </>
            )}
            <div className="flex gap-2">
              <button type="button" aria-label={t('finance.admin_finance_tabs.text_1e5fcf297b')} onClick={loadAll} className="min-h-11 min-w-11 flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="admin_finance-admin_finance-tabs-click-2">
                <RefreshCw size={18}  strokeWidth={2}/>
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
