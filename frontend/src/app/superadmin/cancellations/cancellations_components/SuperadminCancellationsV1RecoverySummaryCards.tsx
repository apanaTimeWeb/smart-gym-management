// RESPONSIBILITY: Renders the Superadmin cancellations V1 CancellationsRecoverySummary summary cards.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminCancellationsV1SectionProps } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsV1Types.ts';
export default function SuperadminCancellationsV1RecoverySummaryCards({ data }: SuperadminCancellationsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
  <MetricCard label="Gyms saved" value={formatNumber(data.outcomes.savedGyms)} helper="Retention actions worked" tone="success"/>
  <MetricCard label="Income saved" value={formatCurrency(data.outcomes.savedIncome)} helper="Monthly income protected" tone="success"/>
  <MetricCard label="Gyms lost" value={formatNumber(data.outcomes.lostGyms)} helper="Still churned" tone="danger"/>
  <MetricCard label="Income lost" value={formatCurrency(data.outcomes.lostIncome)} helper="Monthly income gone" tone="danger"/>
    </div>;
}
