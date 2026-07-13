// RESPONSIBILITY: Provides the implementation for RevenueByMethod.tsx functionality within its module.
"use client";

import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function RevenueByMethod() {
 const { summary } = useFinanceContext();
 if (!summary) return null;

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {Object.entries(summary.revenueByMethod).map(([method, amount]) => (
 <div key={method} className="rounded-xl p-4 shadow-sm border border-border bg-card">
 <p className="text-xs mb-1 text-secondary">{method}</p>
 <p className="text-lg font-bold text-foreground">{fmt(amount as number)}</p>
 </div>
 ))}
 </div>
 );
}
