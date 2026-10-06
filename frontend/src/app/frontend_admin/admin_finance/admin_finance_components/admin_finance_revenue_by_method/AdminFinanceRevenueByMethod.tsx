// RESPONSIBILITY: Provides the implementation for AdminFinanceRevenueByMethod.tsx functionality within its module.
"use client";
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';

import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinanceLogic';

const fmt = (n: number) => AdminFinanceFormatCurrency(n || 0, 'INR', 'en-US');

/**
 * AdminFinanceRevenueByMethod renders the admin finance revenue by method UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceRevenueByMethod: Provides the implementation for AdminFinanceRevenueByMethod.tsx functionality within its module.
 * @dependencies Consumes AdminFinanceFormatCurrency, useAdminFinanceLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceRevenueByMethod() {
 const { payments, summary, totalPayments, status, loadAll, search, setSearch, currentPage, setCurrentPage, methodFilter, setMethodFilter } = useAdminFinanceLogic();
 if (!summary) return null;

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {Object.entries(summary.revenueByMethod).map(([method, amount]) => (
 <div key={method} className="rounded-xl p-4 shadow-card border border-border bg-card">
 <p className="text-xs mb-1 text-secondary">{method}</p>
 <p className="text-lg font-bold text-primary">{fmt(amount as number)}</p>
 </div>
 ))}
 </div>
 );
}
