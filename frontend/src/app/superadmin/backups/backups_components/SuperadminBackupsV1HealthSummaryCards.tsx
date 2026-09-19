// RESPONSIBILITY: Renders the Superadmin backups V1 BackupsHealthSummary summary cards.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminBackupsV1SectionProps } from '@/app/superadmin/backups/backups_types/SuperadminBackupsV1Types.ts';
export default function SuperadminBackupsV1HealthSummaryCards({ data }: SuperadminBackupsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <SuperadminMetricCard label="Healthy" value={formatNumber(data.summary.healthy)} helper="Recent successful backups" tone="success"/>
  <SuperadminMetricCard label="Warning" value={formatNumber(data.summary.warning)} helper="Older than target" tone="warning"/>
  <SuperadminMetricCard label="Failed" value={formatNumber(data.summary.failed)} helper="Needs action" tone="danger"/>
  <SuperadminMetricCard label="Last restore test" value={data.summary.lastRestoreTest} helper={data.summary.restoreTestStatus} tone="success"/>
  <SuperadminMetricCard label="Recovery point" value={data.summary.recoveryPointTarget} helper="Maximum backup age"/>
  <SuperadminMetricCard label="Recovery time" value={data.summary.recoveryTimeTarget} helper="Restore target"/>
    </div>;
}
