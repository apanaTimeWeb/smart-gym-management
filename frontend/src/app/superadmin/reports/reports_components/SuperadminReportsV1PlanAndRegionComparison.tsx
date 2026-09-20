// RESPONSIBILITY: Renders the Superadmin reports V1 Plan comparison, Region comparison view.
'use client';
import { formatCurrencyFromMinorUnits, formatNumber, formatPercent1dp } from '@/lib/formatters';
import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';
import type { SuperadminReportsV1SectionProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types.ts';
export default function SuperadminReportsV1PlanAndRegionComparison({ data }: SuperadminReportsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Plan comparison" description="Current income by plan.">
    <div className="h-72">
      <ApexBarChart categories={data.planComparison.map((x) => x.name)} series={[{ name: 'Monthly income', data: data.planComparison.map((x) => x.income) }]} valueFormatter={(v) => formatCurrencyFromMinorUnits(v)}/>
    </div>
  </Panel>
  <Panel title="Region comparison" description="Current vs previous income by region.">
    <div className="h-72">
      <ApexBarChart categories={data.regionComparison.map((x) => x.name)} series={[{ name: 'Current', data: data.regionComparison.map((x) => x.current) }, { name: 'Previous', data: data.regionComparison.map((x) => x.previous) }]} valueFormatter={(v) => formatCurrencyFromMinorUnits(v)}/>
    </div>
  </Panel>
    </div>;
}
