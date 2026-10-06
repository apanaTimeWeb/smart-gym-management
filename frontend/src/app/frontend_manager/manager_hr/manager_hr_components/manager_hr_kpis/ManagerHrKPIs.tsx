// RESPONSIBILITY: Renders ManagerHrKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { DollarSign, UserCheck, FileText } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';
import { ManagerHrFormatCurrency } from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';


/** @description Renders the ManagerHrKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerHrKPIs() {
  const t = useTranslations('MANAGER_HR');
  const locale = useLocale();

  const { summary } = useManagerHrLogic();

  const kpis = [
    { label: t("COPY_TOTAL_SALARY_GENERATED"), value: ManagerHrFormatCurrency(summary?.totalSalaryThisMonth || 0, ManagerEnvConfig.currencyCode, locale), icon: DollarSign, colorClass: 'text-primary', bgClass: "bg-primary-subtle" },
    { label: t("COPY_TOTAL_PAID"), value: ManagerHrFormatCurrency(summary?.totalSalaryPaid || 0, ManagerEnvConfig.currencyCode, locale), icon: UserCheck, colorClass: 'text-success', bgClass: "bg-success-bg" },
    { label: t("COPY_OUTSTANDING_DUE"), value: ManagerHrFormatCurrency(summary?.totalSalaryDue || 0, ManagerEnvConfig.currencyCode, locale), icon: FileText, colorClass: 'text-warning', bgClass: "bg-warning-bg" },
    { label: t("COPY_ADVANCE_GIVEN"), value: ManagerHrFormatCurrency(summary?.totalAdvanceGiven || 0, ManagerEnvConfig.currencyCode, locale), icon: DollarSign, colorClass: 'text-danger', bgClass: "bg-danger-bg" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-xl p-4 shadow-card border border-border bg-card flex items-center gap-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
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
