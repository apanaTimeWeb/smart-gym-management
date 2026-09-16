"use client";
// RESPONSIBILITY: Renders the period selection segment controls.

import { REVENUE_PERIOD_OPTIONS } from '@/app/admin/plans/plans_utils/AdminPlansRevenueConstants';
import type { RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

interface AdminPlansRevenuePeriodSelectorProps {
  period: RevenuePeriod;
  onPeriodChange: (p: RevenuePeriod) => void;
}

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
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-secondary hover:text-foreground hover:bg-card'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}