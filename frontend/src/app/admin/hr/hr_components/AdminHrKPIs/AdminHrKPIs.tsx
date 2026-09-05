// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
'use client';

import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { Users, DollarSign, UserCheck, FileText } from 'lucide-react';

export default function AdminHrKPIs() {
  const { summary } = useHrContext();

  const kpis = [
    { label: 'Total Staff', value: summary?.totalStaff || 0, icon: Users, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
    { label: 'Active Staff', value: summary?.activeStaff || 0, icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success/10' },
    { label: 'Payroll This Month', value: (summary?.totalPayrollThisMonth || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }), icon: DollarSign, colorClass: 'text-info', bgClass: 'bg-info/10' },
    { label: 'Pending Payrolls', value: summary?.pendingCount || 0, icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
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
