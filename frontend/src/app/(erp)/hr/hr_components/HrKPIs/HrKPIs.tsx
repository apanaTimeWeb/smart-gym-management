"use client";

import { useHrContext } from '../../hr_context/HrContext';
import { Users, DollarSign, CheckCircle, Clock } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function HrKPIs() {
 const { summary } = useHrContext();

 const kpis = [
 { label: 'Total Staff', value: summary?.totalStaff || 0, color: 'var(--hr-kpi-blue-text)', bg: 'var(--hr-kpi-blue-bg)', icon: Users },
 { label: 'Active Staff', value: summary?.activeStaff || 0, color: 'var(--hr-kpi-green-text)', bg: 'var(--hr-kpi-green-bg)', icon: CheckCircle },
 { label: 'Payroll (Month)', value: fmt(summary?.totalPayrollThisMonth || 0), color: 'var(--hr-kpi-orange-text)', bg: 'var(--hr-kpi-orange-bg)', icon: DollarSign },
 { label: 'Pending Payroll', value: summary?.pendingCount || 0, color: 'var(--hr-kpi-red-text)', bg: 'var(--hr-kpi-red-bg)', icon: Clock },
 ];

 return (
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 hr-module">
 {kpis.map((s, i) => (
 <div key={i} className="rounded-xl p-4 shadow-sm border flex items-center gap-3" style={{ backgroundColor: 'var(--hr-bg-card)', borderColor: 'var(--hr-border)' }}>
 <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
 <s.icon size={19} style={{ color: s.color }} />
 </div>
 <div>
 <p className="text-xs font-medium" style={{ color: 'var(--hr-text-secondary)' }}>{s.label}</p>
 <p className="text-xl font-bold" style={{ color: 'var(--hr-text-primary)' }}>{s.value}</p>
 </div>
 </div>
 ))}
 </div>
 );
}
