"use client";
// RESPONSIBILITY: Renders the period selection segment controls.

import { REVENUE_PERIOD_OPTIONS } from '@/app/admin/plans/plans_utils/AdminPlansRevenueConstants';
import type { RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

import type { AdminPlansRevenuePeriodSelectorProps } from '@/app/admin/plans/plans_types/AdminPlansRevenuePeriodSelectorPropsTypes';


export default function AdminPlansRevenuePeriodSelector({ period, onPeriodChange }: AdminPlansRevenuePeriodSelectorProps) {

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex flex-wrap gap-1 bg-input border border-border rounded-xl p-1">
        {REVENUE_PERIOD_OPTIONS.map((opt) => (
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
    </div>
  );
}