// RESPONSIBILITY: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).
'use client';

import { ArrowUpCircle } from 'lucide-react';
import type { AdminUsageMetric } from '@/app/admin/usage/usage_types/AdminUsageTypes';

interface AdminUsageMetricCardProps {
  metric: AdminUsageMetric;
  onUpgrade?: () => void;
}

export default function AdminUsageMetricCard({ metric, onUpgrade }: AdminUsageMetricCardProps) {
  const pct = Math.min(100, Math.round((metric.used / metric.limit) * 100));
  const isCritical = pct >= metric.warningThreshold + 10;
  const isWarning = pct >= metric.warningThreshold && !isCritical;
  const showUpgradeCta = pct >= 80;

  const barColor = isCritical ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success';
  const textColor = isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success';
  const borderColor = isCritical ? 'border-danger/40' : isWarning ? 'border-warning/40' : 'border-border';

  return (
    <div className={`bg-card rounded-xl border p-5 space-y-3 hover:border-primary motion-safe:transition-all motion-safe:duration-200 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{metric.label}</p>
        <span className={`text-xs font-bold ${textColor}`}>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-input rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-secondary">
          {metric.used.toLocaleString('en-IN')} / {metric.limit.toLocaleString('en-IN')} {metric.unit}
        </span>
        {isCritical && (
          <span className="text-xs font-bold text-danger bg-danger-bg px-2 py-0.5 rounded-full">At Limit</span>
        )}
        {isWarning && !isCritical && (
          <span className="text-xs font-bold text-warning bg-warning-bg px-2 py-0.5 rounded-full">Near Limit</span>
        )}
      </div>
      {showUpgradeCta && (
        <button
          onClick={onUpgrade}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold motion-safe:transition-colors border border-primary/20"
          aria-label={`Upgrade plan to increase ${metric.label} limit`}
        >
          <ArrowUpCircle size={13} />
          Upgrade to increase {metric.label} limit
        </button>
      )}
    </div>
  );
}
