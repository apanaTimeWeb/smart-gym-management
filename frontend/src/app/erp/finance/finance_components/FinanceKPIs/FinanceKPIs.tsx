"use client";

import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { FileText, TrendingUp, DollarSign } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function FinanceKPIs() {
 const { summary } = useFinanceContext();
 if (!summary) return null;

 const kpis = [
 { label: 'Total Revenue', value: fmt(summary.totalRevenue), icon: TrendingUp, color: 'var(--finance-kpi-green-text)', bg: 'var(--finance-kpi-green-bg)' },
 { label: 'Monthly Revenue', value: fmt(summary.monthlyRevenue), icon: DollarSign, color: 'var(--finance-kpi-blue-text)', bg: 'var(--finance-kpi-blue-bg)' },
 { label: 'Pending Amount', value: fmt(summary.pendingAmount), icon: FileText, color: 'var(--finance-kpi-red-text)', bg: 'var(--finance-kpi-red-bg)' },
 { label: 'Total Payments', value: summary.totalPayments, icon: TrendingUp, color: 'var(--finance-kpi-purple-text)', bg: 'var(--finance-kpi-purple-bg)' },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 finance-module">
 {kpis.map((k, i) => (
 <div key={i} className="rounded-xl p-4 shadow-sm border flex items-center gap-3" style={{ backgroundColor: 'var(--finance-bg-card)', borderColor: 'var(--finance-border)' }}>
 <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
 <k.icon size={19} style={{ color: k.color }} />
 </div>
 <div>
 <p className="text-xs font-medium" style={{ color: 'var(--finance-text-secondary)' }}>{k.label}</p>
 <p className="text-xl font-bold" style={{ color: 'var(--finance-text-primary)' }}>{k.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
