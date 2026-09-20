"use client";
// RESPONSIBILITY: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).

import { ArrowUpCircle } from 'lucide-react';
import type { AdminUsageMetric } from '@/app/admin/usage/usage_types/AdminUsageTypes';

import type { AdminUsageMetricCardProps } from '@/app/admin/usage/usage_types/AdminUsageMetricCardPropsTypes';


export default function AdminUsageMetricCard({ metric, onUpgrade }: AdminUsageMetricCardProps) {
  const usageRatio = metric.limit > 0 ? Math.min(1, Math.max(0, metric.used / metric.limit)) : 0;
  const pct = Math.round(usageRatio * 100);
  const isCritical = usageRatio >= metric.criticalThreshold;
  const isWarning = usageRatio >= metric.warningThreshold && !isCritical;
  const showUpgradeCta = usageRatio >= metric.warningThreshold;

  const barColor = isCritical ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success';
  const textColor = isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success';
  const borderColor = isCritical ? 'border-border' : isWarning ? 'border-warning' : 'border-border';

  return (
    <div className={`bg-card rounded-xl border p-5 space-y-3 hover:border-primary motion-safe:transition-all motion-safe:duration-base ${borderColor}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">{metric.label}</p>
        <span className={`text-xs font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-input rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-xslow ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-secondary">
          {metric.used.toLocaleString('en-IN')} / {metric.limit.toLocaleString('en-IN')} {metric.unit}
        </span>
        {isCritical && (
          <span className="text-xs font-bold text-on-danger bg-danger px-2 py-0.5 rounded-full">At Limit</span>
        )}
        {isWarning && !isCritical && (
          <span className="text-xs font-bold text-on-primary bg-warning px-2 py-0.5 rounded-full">Near Limit</span>
        )}
      </div>
      {showUpgradeCta && (
        <button
          onClick={onUpgrade}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-subtle hover:bg-primary-subtle text-primary text-xs font-semibold motion-safe:transition-colors border border-border motion-safe:duration-base"
          aria-label={`Upgrade plan to increase ${metric.label} limit`}
        >
          <ArrowUpCircle size={13} />
          Upgrade to increase {metric.label} limit
        </button>
      )}
    </div>
  );
}