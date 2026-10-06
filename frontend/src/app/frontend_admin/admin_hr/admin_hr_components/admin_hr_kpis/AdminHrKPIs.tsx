"use client";
// RESPONSIBILITY: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatCurrency';

import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import { Users, DollarSign, UserCheck, FileText } from 'lucide-react';

/**
 * AdminHrKPIs renders the admin hr kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrKPIs: Renders the top KPI stat cards (total staff, active staff, payroll metrics) for the HR module.
 * @dependencies Consumes AdminHrFormatCurrency, useAdminHrViewModel.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { summary } = useAdminHrViewModel();


  const kpis = [
    { label: t('hr.AdminAuditRepair.totalSalaryGenerated'), value: AdminHrFormatCurrency(summary?.totalSalaryThisMonth || 0, undefined, locale), icon: DollarSign, colorClass: 'text-primary', bgClass: 'bg-primary-subtle' },
    { label: t('hr.AdminAuditRepair.totalPaid'), value: AdminHrFormatCurrency(summary?.totalSalaryPaid || 0, undefined, locale), icon: UserCheck, colorClass: 'text-success', bgClass: 'bg-success-bg' },
    { label: t('hr.AdminAuditRepair.outstandingDue'), value: AdminHrFormatCurrency(summary?.totalSalaryDue || 0, undefined, locale), icon: FileText, colorClass: 'text-warning', bgClass: 'bg-warning-bg' },
    { label: t('hr.AdminAuditRepair.advanceGiven'), value: AdminHrFormatCurrency(summary?.totalAdvanceGiven || 0, undefined, locale), icon: DollarSign, colorClass: 'text-danger', bgClass: 'bg-danger-bg' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" data-testid="admin_hr-adminhrkpis-summary">
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
