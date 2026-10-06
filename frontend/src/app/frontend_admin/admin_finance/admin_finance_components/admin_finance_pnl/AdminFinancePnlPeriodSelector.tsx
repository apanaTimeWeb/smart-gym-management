"use client";
// RESPONSIBILITY: Period selector segmented control + Export CSV button for the P&L page.
import { useTranslations } from 'next-intl';
import { PNL_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import type { PnlPeriod } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceTypes';

import type { AdminFinancePnlPeriodSelectorProps } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinancePnlPeriodSelectorPropsTypes';


/**
 * AdminFinancePnlPeriodSelector renders the admin finance pnl period selector UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePnlPeriodSelector: Period selector segmented control + Export CSV button for the P&L page.
 * @dependencies Consumes AdminFinanceConstants, AdminFinanceTypes, AdminFinancePnlPeriodSelectorPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePnlPeriodSelector({
  period,
  onPeriodChange,
}: AdminFinancePnlPeriodSelectorProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Segmented Control */}
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {PNL_PERIOD_OPTIONS.map((opt , __testIdIndex26) => (
          <button type="button"
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              period === opt.value
                ? 'bg-primary text-on-primary shadow-card'
                : 'text-secondary hover:text-primary hover:bg-card'
            }`}
           data-testid={`admin_finance-admin_finance-pnl-period-selector-select-map26-${__testIdIndex26}-1`}>
            {t(opt.labelKey)}
          </button>
        ))}
      </div>

      {/* Export */}
    </div>
  );
}