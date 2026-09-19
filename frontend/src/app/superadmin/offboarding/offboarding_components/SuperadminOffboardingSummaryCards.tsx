// RESPONSIBILITY: Renders the Superadmin offboarding summary cards section.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import { SUPERADMIN_OFFBOARDING_STATUS } from '@/app/superadmin/offboarding/offboarding_utils/SuperadminOffboardingConstants';
import type { SuperadminOffboardingSectionProps } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
export default function SuperadminOffboardingSummaryCards({ data }: SuperadminOffboardingSectionProps) {
    const ready = data.queue.filter((item) => item.status === SUPERADMIN_OFFBOARDING_STATUS.EXPORT_READY).length;
    const scheduled = data.queue.filter((item) => item.status === SUPERADMIN_OFFBOARDING_STATUS.PURGE_SCHEDULED).length;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <SuperadminMetricCard label="Offboarding Queue" value={formatNumber(data.queue.length)} helper="Cancelled tenants"/>
  <SuperadminMetricCard label="Exports Ready" value={formatNumber(ready)} helper="Ready to download" tone="success"/>
  <SuperadminMetricCard label="Purge Scheduled" value={formatNumber(scheduled)} helper="Past grace checks" tone="warning"/>
  <SuperadminMetricCard label="Grace Period" value={`${formatNumber(data.policy.gracePeriodDays)} days`} helper="Default policy" tone="info"/>
    </div>);
}
