// RESPONSIBILITY: Renders the Superadmin team summary cards section.
'use client';
import { formatDateTime, formatNumber } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminTeamSectionProps } from '@/app/superadmin/team/team_types/SuperadminTeamTypes';
export default function SuperadminTeamSummaryCards({ data }: SuperadminTeamSectionProps) {
    const active = data.users.filter(u => u.status === 'ACTIVE').length;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <MetricCard label="Team Members" value={formatNumber(data.users.length)} helper="Platform operators"/>
  <MetricCard label="Active Access" value={formatNumber(active)} helper="Enabled accounts" tone="success"/>
  <MetricCard label="Role Groups" value={formatNumber(data.roles.length)} helper="Defined scopes" tone="info"/>
  <MetricCard label="Alerts On" value={formatNumber(data.alerts.filter((item) => item.enabled).length)} helper="Current alerts" tone="warning"/>
    </div>);
}
