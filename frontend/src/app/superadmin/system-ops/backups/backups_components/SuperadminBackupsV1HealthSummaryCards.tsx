// RESPONSIBILITY: Renders the Superadmin backups V1 BackupsHealthSummary summary cards.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminBackupsV1SectionProps } from '@/app/superadmin/system-ops/backups/backups_types/SuperadminBackupsV1Types.ts';
export default function SuperadminBackupsV1HealthSummaryCards({ data }: SuperadminBackupsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <MetricCard label="Healthy" value={formatNumber(data.summary.healthy)} helper="Recent successful backups" tone="success"/>
  <MetricCard label="Warning" value={formatNumber(data.summary.warning)} helper="Older than target" tone="warning"/>
  <MetricCard label="Failed" value={formatNumber(data.summary.failed)} helper="Needs action" tone="danger"/>
  <MetricCard label="Last restore test" value={data.summary.lastRestoreTest} helper={data.summary.restoreTestStatus} tone="success"/>
  <MetricCard label="Recovery point" value={data.summary.recoveryPointTarget} helper="Maximum backup age"/>
  <MetricCard label="Recovery time" value={data.summary.recoveryTimeTarget} helper="Restore target"/>
    </div>;
}
