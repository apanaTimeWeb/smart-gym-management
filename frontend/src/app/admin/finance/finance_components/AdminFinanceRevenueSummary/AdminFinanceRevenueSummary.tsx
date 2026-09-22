"use client";
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

// RESPONSIBILITY: Provides the implementation for AdminFinanceRevenueSummary.tsx functionality within its module.

import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';

const fmt = (n: number) => formatCurrency(n || 0);

export default function AdminFinanceRevenueSummary() {
 const { payments, summary, totalPayments, status, loadAll, search, setSearch, currentPage, setCurrentPage, methodFilter, setMethodFilter } = useAdminFinanceLogic();
 if (!summary) return null;

 return (
 <div className="p-4 bg-card rounded-xl border border-border shadow-card">
 <h3 className="font-semibold text-primary">Monthly Revenue (Last 6 Months)</h3>
 <div className="space-y-2">
 {summary.monthlyData.map((d, i: number) => {
 const max = Math.max(...summary.monthlyData.map((x) => x.revenue), 1);
 return (
 <div key={d.month} className="flex items-center gap-3">
 <span className="text-xs w-20 text-secondary">{d.month}</span>
 <div className="flex-1 h-6 rounded-full overflow-hidden bg-input">
 <div 
 className="h-full bg-primary-subtle motion-safe:transition-all motion-safe:duration-xslow rounded-full" 
 style={{ width: `${(d.revenue / max) * 100}%` }}
 />
 {d.revenue > 0 && <span className="text-xs text-primary font-medium">{fmt(d.revenue)}</span>}
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
}
