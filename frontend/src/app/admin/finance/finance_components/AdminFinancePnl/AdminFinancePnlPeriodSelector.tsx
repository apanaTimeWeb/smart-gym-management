"use client";
// RESPONSIBILITY: Period selector segmented control + Export CSV button for the P&L page.

import { PNL_PERIOD_OPTIONS } from '@/app/admin/finance/finance_utils/AdminFinancePnlConstants';
import type { PnlPeriod } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

import type { AdminFinancePnlPeriodSelectorProps } from '@/app/admin/finance/finance_types/AdminFinancePnlPeriodSelectorPropsTypes';


export default function AdminFinancePnlPeriodSelector({
  period,
  onPeriodChange,
}: AdminFinancePnlPeriodSelectorProps) {

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Segmented Control */}
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {PNL_PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onPeriodChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              period === opt.value
                ? 'bg-primary text-on-primary shadow-card'
                : 'text-secondary hover:text-on-primary hover:bg-card'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Export */}
    </div>
  );
}