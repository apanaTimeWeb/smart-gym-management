"use client";
// RESPONSIBILITY: Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.
import { useTranslations } from 'next-intl';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';

import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinanceLogic';
import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';

const fmt = (n: number) => AdminFinanceFormatCurrency(n || 0, 'INR', 'en-US');

/**
 * AdminFinanceRevenueSummary renders the admin finance revenue summary UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceRevenueSummary: Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.
 * @dependencies Consumes AdminFinanceFormatCurrency, useAdminFinanceLogic, AdminLayoutProgressBar.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceRevenueSummary() {
  const t = useTranslations();

 const { payments, summary, totalPayments, status, loadAll, search, setSearch, currentPage, setCurrentPage, methodFilter, setMethodFilter } = useAdminFinanceLogic();
 if (!summary) return null;

 return (
 <div className="p-4 bg-card rounded-xl border border-border shadow-card">
 <h3 className="font-semibold text-primary">{t('finance.admin_finance_revenue_summary.text_ad2e428a29')}</h3>
 <div className="space-y-2">
 {summary.monthlyData.map((d, i: number) => {
 const max = Math.max(...summary.monthlyData.map((x) => x.revenue), 1);
 return (
 <div key={d.month} className="flex items-center gap-3">
 <span className="text-xs w-20 text-secondary">{d.month}</span>
 <div className="flex-1 min-w-0">
 <AdminLayoutProgressBar value={(d.revenue / max) * 100} label={t('admin_finance_revenue_summary.auto_revenueShare', { month: d.month })} />
 {d.revenue > 0 && <span className="text-xs text-primary font-medium">{fmt(d.revenue)}</span>}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
}
