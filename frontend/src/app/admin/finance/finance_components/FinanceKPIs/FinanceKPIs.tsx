// RESPONSIBILITY: Provides the implementation for FinanceKPIs.tsx functionality within its module.
'use client';

import { useFinanceContext } from '@/app/admin/finance/finance_context/FinanceContext';
import { FileText, TrendingUp, DollarSign } from 'lucide-react';

export default function FinanceKPIs() {
 const { summary } = useFinanceContext();
 if (!summary) return null;

 const kpis = [
 { label: 'Total Revenue', value: (summary.totalRevenue || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }), icon: TrendingUp, colorClass: 'text-success', bgClass: 'bg-success/10' },
 { label: 'Monthly Revenue', value: (summary.monthlyRevenue || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
 { label: 'Pending Amount', value: (summary.pendingAmount || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }), icon: FileText, colorClass: 'text-danger', bgClass: 'bg-danger/10' },
 { label: 'Total Payments', value: summary.totalPayments, icon: TrendingUp, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((k) => (
 <div key={k.label} className="rounded-xl p-4 shadow-sm border border-border bg-card flex items-center gap-3">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bgClass}`}>
 <k.icon size={19} className={k.colorClass} />
 </div>
 <div>
 <p className="text-xs font-medium text-secondary">{k.label}</p>
 <p className="text-xl font-bold text-primary">{k.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
