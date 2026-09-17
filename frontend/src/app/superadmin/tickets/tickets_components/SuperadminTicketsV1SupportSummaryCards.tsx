// RESPONSIBILITY: Renders the Superadmin tickets V1 TicketsSupportSummary summary cards.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminV1MetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1MetricCard';
import type { SuperadminTicketsV1SectionProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types.ts';
export default function SuperadminTicketsV1SupportSummaryCards({ data }: SuperadminTicketsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <SuperadminV1MetricCard label="Open tickets" value={formatNumber(data.summary.open)} helper="Current backlog"/>
  <SuperadminV1MetricCard label="Urgent" value={formatNumber(data.summary.urgent)} helper="Need fast response" tone="danger"/>
  <SuperadminV1MetricCard label="Near target" value={formatNumber(data.summary.nearTarget)} helper="Watch closely" tone="warning"/>
  <SuperadminV1MetricCard label="Over target" value={formatNumber(data.summary.overTarget)} helper="Service target missed" tone="danger"/>
  <SuperadminV1MetricCard label="First response" value={`${data.summary.averageFirstResponseMinutes} min`} helper="Average"/>
  <SuperadminV1MetricCard label="Customer satisfaction" value={`${data.summary.satisfaction}/5`} helper="Recent surveys" tone="success"/>
    </div>;
}
