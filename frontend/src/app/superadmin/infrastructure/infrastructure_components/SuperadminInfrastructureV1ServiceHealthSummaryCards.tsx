// RESPONSIBILITY: Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards.
'use client';
import { formatNumber, formatPercent1dp, formatDateTime } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminInfrastructureV1SectionProps } from '@/app/superadmin/infrastructure/infrastructure_types/SuperadminInfrastructureV1Types.ts';
export default function SuperadminInfrastructureV1ServiceHealthSummaryCards({ data }: SuperadminInfrastructureV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <SuperadminMetricCard label="Requests / minute" value={formatNumber(data.summary.requestsPerMinute)} helper="Current traffic"/>
  <SuperadminMetricCard label="Error rate" value={formatPercent1dp(data.summary.errorsPercent)} helper="API errors" tone={data.summary.errorsPercent < 1 ? 'success' : 'danger'}/>
  <SuperadminMetricCard label="Fast response" value={`${data.summary.p50} ms`} helper="Typical" tone="success"/>
  <SuperadminMetricCard label="Slow response" value={`${data.summary.p95} ms`} helper="Most slower requests" tone="warning"/>
  <SuperadminMetricCard label="Worst response" value={`${data.summary.p99} ms`} helper="Top 1% slowest" tone="danger"/>
    </div>;
}
