// RESPONSIBILITY: Renders the Superadmin reports V1 Plan comparison, Region comparison view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminReportsV1SectionProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types.ts';
export default function SuperadminReportsV1PlanAndRegionComparison({ data }: SuperadminReportsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Plan comparison" description="Current income by plan.">
    <div className="h-72">
      <SuperadminV1ApexBarChart categories={data.planComparison.map((x) => x.name)} series={[{ name: 'Monthly income', data: data.planComparison.map((x) => x.income) }]} valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Region comparison" description="Current vs previous income by region.">
    <div className="h-72">
      <SuperadminV1ApexBarChart categories={data.regionComparison.map((x) => x.name)} series={[{ name: 'Current', data: data.regionComparison.map((x) => x.current) }, { name: 'Previous', data: data.regionComparison.map((x) => x.previous) }]} valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminV1Panel>
    </div>;
}
