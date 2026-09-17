// RESPONSIBILITY: Renders the Superadmin dashboard V1 DashboardRetentionSummary summary cards.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1MetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1MetricCard';
import type { SuperadminDashboardV1SectionProps } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types.ts';
export default function SuperadminDashboardV1RetentionSummaryCards({ data }: SuperadminDashboardV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <SuperadminV1MetricCard label="Income kept from existing gyms" value={formatPercent1dp(data.existingIncomeRetained)} helper="Existing gym income retained" tone="success"/>
  <SuperadminV1MetricCard label="Gym retention" value={formatPercent1dp(data.gymRetention)} helper="Gyms still active" tone="success"/>
  <SuperadminV1MetricCard label="Revenue lost" value={formatPercent1dp(data.revenueLostPercent)} helper="Share of opening income" tone="danger"/>
  <SuperadminV1MetricCard label="Customer churn" value={formatPercent1dp(data.customerChurn)} helper="Gyms that left" tone="warning"/>
  <SuperadminV1MetricCard label="Closing monthly income" value={formatCurrency(data.endingIncome)} helper="Current recurring income"/>
    </div>;
}
