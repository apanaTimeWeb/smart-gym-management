'use client';
// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import { Users, DollarSign, UserCheck, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

export default function ManagerHrKPIs() {
  const { summary } = useHrContext();

  const kpis = [
    { label: 'Total Salary Generated', value: formatCurrency(summary?.totalSalaryThisMonth || 0), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
    { label: 'Total Paid', value: formatCurrency(summary?.totalSalaryPaid || 0), icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success/10' },
    { label: 'Outstanding Due', value: formatCurrency(summary?.totalSalaryDue || 0), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
    { label: 'Advance Given', value: formatCurrency(summary?.totalAdvanceGiven || 0), icon: DollarSign, colorClass: 'text-danger', bgClass: 'bg-danger/10' },
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
