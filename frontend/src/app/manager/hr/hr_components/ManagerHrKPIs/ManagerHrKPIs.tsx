// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
'use client';
import { Users, DollarSign, UserCheck, FileText } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { useLocale } from "next-intl";

export default function ManagerHrKPIs() {
    const locale = useLocale();
  const { summary } = useManagerHrLogic();

  const kpis = [
    { label: 'Total Salary Generated', value: formatCurrency(summary?.totalSalaryThisMonth || 0, ManagerEnvConfig.currencyCode, locale), icon: DollarSign, colorClass: 'text-primary', bgClass: "bg-primary-subtle" },
    { label: 'Total Paid', value: formatCurrency(summary?.totalSalaryPaid || 0, ManagerEnvConfig.currencyCode, locale), icon: UserCheck, colorClass: 'text-success', bgClass: "bg-success-bg" },
    { label: 'Outstanding Due', value: formatCurrency(summary?.totalSalaryDue || 0, ManagerEnvConfig.currencyCode, locale), icon: FileText, colorClass: 'text-warning', bgClass: "bg-warning-bg" },
    { label: 'Advance Given', value: formatCurrency(summary?.totalAdvanceGiven || 0, ManagerEnvConfig.currencyCode, locale), icon: DollarSign, colorClass: 'text-danger', bgClass: "bg-danger-bg" },
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
