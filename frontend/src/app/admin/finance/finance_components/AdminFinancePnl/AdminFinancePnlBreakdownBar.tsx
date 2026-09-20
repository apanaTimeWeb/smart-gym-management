"use client";
// RESPONSIBILITY: Renders one proportional bar for a P&L breakdown metric.

import type { AdminFinancePnlBreakdownBarProps } from '@/app/admin/finance/finance_types/AdminFinancePnlBreakdownBarPropsTypes';


export default function AdminFinancePnlBreakdownBar({ value, max, colorClass }: AdminFinancePnlBreakdownBarProps) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="w-full h-1.5 bg-input rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
