// RESPONSIBILITY: Renders the Superadmin analytics V1 AnalyticsRetentionSummary summary cards.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1RetentionSummaryCards({ data }: SuperadminAnalyticsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label="Income kept from existing gyms" value={formatPercent1dp(data.metrics.existingIncomeRetained)} helper="Existing gym income" tone="success"/>
  <MetricCard label="Income kept without upgrades" value={formatPercent1dp(data.metrics.grossIncomeRetained)} helper="Protected base income"/>
  <MetricCard label="Gym retention" value={formatPercent1dp(data.metrics.gymRetention)} helper="Gym survival" tone="success"/>
  <MetricCard label="Revenue lost" value={formatPercent1dp(data.metrics.revenueLost)} helper="Income lost" tone="danger"/>
  <MetricCard label="Customer churn" value={formatPercent1dp(data.metrics.customerChurn)} helper="Gyms leaving" tone="warning"/>
    </div>;
}
