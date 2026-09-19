// RESPONSIBILITY: Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminDashboardV1SectionProps } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types.ts';
export default function SuperadminDashboardV1RetentionSummaryCards({ data }: SuperadminDashboardV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label="Income kept from existing gyms" value={formatPercent1dp(data.existingIncomeRetained)} helper="Existing gym income retained" tone="success"/>
  <MetricCard label="Gym retention" value={formatPercent1dp(data.gymRetention)} helper="Gyms still active" tone="success"/>
  <MetricCard label="Revenue lost" value={formatPercent1dp(data.revenueLostPercent)} helper="Share of opening income" tone="danger"/>
  <MetricCard label="Customer churn" value={formatPercent1dp(data.customerChurn)} helper="Gyms that left" tone="warning"/>
  <MetricCard label="Closing monthly income" value={formatCurrency(data.endingIncome)} helper="Current recurring income"/>
    </div>;
}
