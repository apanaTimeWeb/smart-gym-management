// RESPONSIBILITY: Renders the Superadmin integrations summary cards section.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminIntegrationsSectionProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
export default function SuperadminIntegrationsSummaryCards({ data }: SuperadminIntegrationsSectionProps) {
    const connected = data.integrations.filter((item) => item.status === 'ACTIVE').length;
    const failed = data.webhooks.filter((item) => item.status === 'FAILED').length;
    const averageHealth = data.integrations.length > 0 ? Math.round(data.integrations.reduce((sum, item) => sum + item.health, 0) / data.integrations.length) : 0;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <SuperadminMetricCard label="Connected Services" value={`${connected}/${data.integrations.length}`} helper="External services" tone="success"/>
  <SuperadminMetricCard label="Failed Webhooks" value={formatNumber(failed)} helper="Need review" tone="danger"/>
  <SuperadminMetricCard label="Active developer keys" value={formatNumber(data.keys.filter((k) => k.status === 'ACTIVE').length)} helper="Tenant developer access" tone="info"/>
  <SuperadminMetricCard label="Average Health" value={`${formatNumber(averageHealth)}%`} helper="Connection health"/>
    </div>);
}
