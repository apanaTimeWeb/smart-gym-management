// RESPONSIBILITY: Renders the Superadmin compliance regional coverage panel section.
'use client';
import { Landmark } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import SuperadminComplianceRegionalCoverageEmptyState from '@/app/superadmin/compliance/compliance_components/SuperadminComplianceRegionalCoverageEmptyState';
import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import { getSuperadminComplianceStatusBadgeClasses } from '@/app/superadmin/compliance/compliance_utils/SuperadminComplianceStatusBadgeConfig';
import type { SuperadminComplianceSectionProps } from '@/app/superadmin/compliance/compliance_types/SuperadminComplianceTypes';
export default function SuperadminComplianceRegionalCoveragePanel({ data }: SuperadminComplianceSectionProps) {
    return (<Panel title="Regional Coverage" description="Compare tax registration completeness by region.">
  <div className="space-y-4">
    {data.regions.length === 0 ? <SuperadminComplianceRegionalCoverageEmptyState /> : data.regions.map(r => (<div key={r.region} className="rounded-lg border border-border p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Landmark size={18} className="text-primary"/>
            <span className="font-medium text-primary">
              {r.region}
            </span>
          </div>
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminComplianceStatusBadgeClasses(r.status)}`}>
            {r.status}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={r.registered + r.missing > 0 ? Math.round((r.registered / (r.registered + r.missing)) * 100) : 0} label={`${formatNumber(r.registered)} registered / ${formatNumber(r.missing)} missing`}/>
        </div>
        <p className="mt-2 text-xs text-secondary">
          Configured tax rate
          {formatNumber(r.taxRate)}
          %
        </p>
      </div>))}
  </div>
    </Panel>);
}
