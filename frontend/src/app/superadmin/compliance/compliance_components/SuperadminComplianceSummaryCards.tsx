// RESPONSIBILITY: Renders the Superadmin compliance summary cards section.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminComplianceSectionProps } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export default function SuperadminComplianceSummaryCards({ data }: SuperadminComplianceSectionProps) {
    return (<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <SuperadminMetricCard label="Tax Details Ready" value={formatNumber(data.summary.registeredTenants)} helper="Registered tenants" tone="success"/>
  <SuperadminMetricCard label="Missing Tax Details" value={formatNumber(data.summary.missingTaxDetails)} helper="Need review" tone="warning"/>
  <SuperadminMetricCard label="Documents Expiring" value={formatNumber(data.summary.documentsExpiring)} helper="Near-term renewals" tone="warning"/>
  <SuperadminMetricCard label="Open Tasks" value={formatNumber(data.summary.openComplianceTasks)} helper="Compliance work" tone="danger"/>
    </div>);
}
