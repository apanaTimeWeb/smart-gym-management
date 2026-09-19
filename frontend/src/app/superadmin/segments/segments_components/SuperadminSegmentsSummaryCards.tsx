// RESPONSIBILITY: Renders the Superadmin segments summary cards section.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminSegmentsSectionProps } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export default function SuperadminSegmentsSummaryCards({ data }: SuperadminSegmentsSectionProps) {
    const covered = data.segments.reduce((total, segment) => total + segment.tenantCount, 0);
    const largestGroup = data.segments.length > 0 ? Math.max(...data.segments.map((segment) => segment.tenantCount)) : 0;
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <SuperadminMetricCard label="Saved Segments" value={formatNumber(data.segments.length)} helper="Reusable groups"/>
  <SuperadminMetricCard label="Gyms Covered" value={formatNumber(covered)} helper="Across saved groups"/>
  <SuperadminMetricCard label="Quick Presets" value={formatNumber(data.presets.length)} helper="Common questions" tone="info"/>
  <SuperadminMetricCard label="Largest Group" value={formatNumber(largestGroup)} helper="Gyms in one group" tone="success"/>
    </div>);
}
