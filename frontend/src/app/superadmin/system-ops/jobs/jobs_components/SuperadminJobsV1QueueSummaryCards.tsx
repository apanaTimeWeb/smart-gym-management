// RESPONSIBILITY: Renders the Superadmin jobs V1 JobsQueueSummary summary cards.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminJobsV1SectionProps } from '@/app/superadmin/system-ops/jobs/jobs_types/SuperadminJobsV1Types.ts';
export default function SuperadminJobsV1QueueSummaryCards({ data }: SuperadminJobsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label="Waiting" value={formatNumber(data.summary.waiting)} helper="Queued jobs"/>
  <MetricCard label="Running" value={formatNumber(data.summary.running)} helper="In progress" tone="info"/>
  <MetricCard label="Failed today" value={formatNumber(data.summary.failed24h)} helper="Last 24 hours" tone="danger"/>
  <MetricCard label="Stuck jobs" value={formatNumber(data.summary.deadLetter)} helper="Needs manual review" tone="warning"/>
  <MetricCard label="Oldest waiting" value={`${data.summary.oldestWaitingMinutes} min`} helper="Queue delay" tone="warning"/>
    </div>;
}
