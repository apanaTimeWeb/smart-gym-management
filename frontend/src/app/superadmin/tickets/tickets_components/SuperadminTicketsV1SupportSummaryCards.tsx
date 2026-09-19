// RESPONSIBILITY: Renders the Superadmin tickets V1 TicketsSupportSummary summary cards.
'use client';
import { formatNumber } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminTicketsV1SectionProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types.ts';
export default function SuperadminTicketsV1SupportSummaryCards({ data }: SuperadminTicketsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <MetricCard label="Open tickets" value={formatNumber(data.summary.open)} helper="Current backlog"/>
  <MetricCard label="Urgent" value={formatNumber(data.summary.urgent)} helper="Need fast response" tone="danger"/>
  <MetricCard label="Near target" value={formatNumber(data.summary.nearTarget)} helper="Watch closely" tone="warning"/>
  <MetricCard label="Over target" value={formatNumber(data.summary.overTarget)} helper="Service target missed" tone="danger"/>
  <MetricCard label="First response" value={`${data.summary.averageFirstResponseMinutes} min`} helper="Average"/>
  <MetricCard label="Customer satisfaction" value={`${data.summary.satisfaction}/5`} helper="Recent surveys" tone="success"/>
    </div>;
}
