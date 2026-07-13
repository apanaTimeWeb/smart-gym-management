// RESPONSIBILITY: FinanceKPIs.tsx handles the logic and UI for its corresponding feature.
"use client";

import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { FileText, TrendingUp, DollarSign } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function FinanceKPIs() {
 const { summary } = useFinanceContext();
 if (!summary) return null;

 const kpis = [
 { label: 'Total Revenue', value: fmt(summary.totalRevenue), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success/10' },
 { label: 'Monthly Revenue', value: fmt(summary.monthlyRevenue), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
 { label: 'Pending Amount', value: fmt(summary.pendingAmount), icon: FileText, colorClass: 'text-danger', bgClass: 'bg-danger/10' },
 { label: 'Total Payments', value: summary.totalPayments, icon: TrendingUp, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((k, i) => (
 <div key={i} className="rounded-xl p-4 shadow-sm border border-border bg-card flex items-center gap-3">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bgClass}`}>
 <k.icon size={19} className={k.colorClass} />
 </div>
 <div>
 <p className="text-xs font-medium text-secondary">{k.label}</p>
 <p className="text-xl font-bold text-foreground">{k.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
