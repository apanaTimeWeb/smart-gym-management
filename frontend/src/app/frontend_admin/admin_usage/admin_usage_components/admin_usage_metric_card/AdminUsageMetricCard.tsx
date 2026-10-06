"use client";
// RESPONSIBILITY: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';
import { formatNumber } from '@/app/frontend_admin/admin_usage/admin_usage_utils/AdminUsageFormatters';

import { ArrowUpCircle } from 'lucide-react';
import type { AdminUsageMetric } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageTypes';

import type { AdminUsageMetricCardProps } from '@/app/frontend_admin/admin_usage/admin_usage_types/AdminUsageMetricCardPropsTypes';


/**
 * AdminUsageMetricCard renders the admin usage metric card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminUsageMetricCard: Renders a single usage metric bar card (label, used/limit, progress bar with color coding, and upgrade CTA at 80% threshold).
 * @dependencies Consumes AdminLayoutProgressBar, AdminUsageFormatters, AdminUsageTypes, AdminUsageMetricCardPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminUsageMetricCard({ metric, onUpgrade }: AdminUsageMetricCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  const usageRatio = metric.limit > 0 ? Math.min(1, Math.max(0, metric.used / metric.limit)) : 0;
  const pct = Math.round(usageRatio * 100);
  const isCritical = usageRatio >= metric.criticalThreshold;
  const isWarning = usageRatio >= metric.warningThreshold && !isCritical;
  const showUpgradeCta = usageRatio >= metric.warningThreshold;

  const textColor = isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success';
  const borderColor = isCritical ? 'border-border' : isWarning ? 'border-border' : 'border-border';

  return (
    <div className={`bg-card rounded-xl border p-5 space-y-3 hover:border-focus motion-safe:transition-all motion-safe:duration-base ${borderColor}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary">{metric.label}</p>
        <span className={`text-xs font-bold ${textColor}`}>{pct}%</span>
      </div>
      <AdminLayoutProgressBar
        value={pct}
        variant={isCritical ? 'danger' : isWarning ? 'warning' : 'success'}
        label={t('usage.admin_usage_metric_card.auto_usage', { label: metric.label })}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-secondary">
          {formatNumber(metric.used, locale)} / {formatNumber(metric.limit, locale)} {metric.unit}
        </span>
        {isCritical && (
          <span className="text-xs font-bold text-on-danger bg-danger px-2 py-0.5 rounded-full" data-testid="admin_usage-adminusagemetriccard-status-1">{t('usage.admin_usage_metric_card.text_ec4a8cfea4')}</span>
        )}
        {isWarning && !isCritical && (
          <span className="text-xs font-bold text-warning bg-warning-bg px-2 py-0.5 rounded-full" data-testid="admin_usage-adminusagemetriccard-status-2">{t('usage.admin_usage_metric_card.text_782bd6b85f')}</span>
        )}
      </div>
      {showUpgradeCta && (
        <button type="button"
          onClick={onUpgrade}
          className="min-h-11 min-w-11 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary-subtle hover:bg-primary-subtle text-primary text-xs font-semibold motion-safe:transition-colors border border-border motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95"
          aria-label={t('admin_usage_metric_card.auto_upgradePlanFor', { label: metric.label })}
         data-testid="admin_usage-admin_usage-metric-card-click">
          <ArrowUpCircle size={18}  strokeWidth={2}/>
          {t('usage.admin_usage_metric_card.text_0339f20514')}{metric.label} {t('usage.admin_usage_metric_card.text_e4d68c5a97')}</button>
      )}
    </div>
  );
}
