'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { Users, DollarSign, UserCheck, FileText } from 'lucide-react';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';

export default function ManagerHrKPIs() {
  const { summary } = useManagerHrLogic();

  const kpis = [
    { label: 'Total Salary Generated', value: formatCurrencyFromMinorUnits(summary?.totalSalaryThisMonth || 0, ManagerEnvConfig.currencyCode), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary/10' },
    { label: 'Total Paid', value: formatCurrencyFromMinorUnits(summary?.totalSalaryPaid || 0, ManagerEnvConfig.currencyCode), icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success/10' },
    { label: 'Outstanding Due', value: formatCurrencyFromMinorUnits(summary?.totalSalaryDue || 0, ManagerEnvConfig.currencyCode), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning/10' },
    { label: 'Advance Given', value: formatCurrencyFromMinorUnits(summary?.totalAdvanceGiven || 0, ManagerEnvConfig.currencyCode), icon: DollarSign, colorClass: 'text-danger', bgClass: 'bg-danger/10' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-xl p-4 shadow-card border border-border bg-card flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.bgClass}`}>
            <k.icon size={18} className={k.colorClass} />
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
