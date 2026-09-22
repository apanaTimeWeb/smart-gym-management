"use client";
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

// RESPONSIBILITY: Provides the implementation for AdminFinanceRevenueByMethod.tsx functionality within its module.

import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';

const fmt = (n: number) => formatCurrency(n || 0);

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
