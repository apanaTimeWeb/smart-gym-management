// RESPONSIBILITY: Renders the Superadmin jobs V1 JobsQueueSummary summary cards.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminJobsV1SectionProps } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsV1Types.ts';
export default function SuperadminJobsV1QueueSummaryCards({ data }: SuperadminJobsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <SuperadminMetricCard label="Waiting" value={formatNumber(data.summary.waiting)} helper="Queued jobs"/>
  <SuperadminMetricCard label="Running" value={formatNumber(data.summary.running)} helper="In progress" tone="info"/>
  <SuperadminMetricCard label="Failed today" value={formatNumber(data.summary.failed24h)} helper="Last 24 hours" tone="danger"/>
  <SuperadminMetricCard label="Stuck jobs" value={formatNumber(data.summary.deadLetter)} helper="Needs manual review" tone="warning"/>
  <SuperadminMetricCard label="Oldest waiting" value={`${data.summary.oldestWaitingMinutes} min`} helper="Queue delay" tone="warning"/>
    </div>;
}
