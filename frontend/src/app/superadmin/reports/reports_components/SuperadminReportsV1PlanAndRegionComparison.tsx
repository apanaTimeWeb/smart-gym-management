// RESPONSIBILITY: Renders the Superadmin reports V1 Plan comparison, Region comparison view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminApexBarChart';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminReportsV1SectionProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types.ts';
export default function SuperadminReportsV1PlanAndRegionComparison({ data }: SuperadminReportsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminPanel title="Plan comparison" description="Current income by plan.">
    <div className="h-72">
      <SuperadminApexBarChart categories={data.planComparison.map((x) => x.name)} series={[{ name: 'Monthly income', data: data.planComparison.map((x) => x.income) }]} valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminPanel>
  <SuperadminPanel title="Region comparison" description="Current vs previous income by region.">
    <div className="h-72">
      <SuperadminApexBarChart categories={data.regionComparison.map((x) => x.name)} series={[{ name: 'Current', data: data.regionComparison.map((x) => x.current) }, { name: 'Previous', data: data.regionComparison.map((x) => x.previous) }]} valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminPanel>
    </div>;
}
