// RESPONSIBILITY: Renders the Superadmin analytics V1 Income movement, Revenue share concentration view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection({ data }: SuperadminAnalyticsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Income movement" description="Where monthly income moved during the period.">
    <div className="h-72">
      <SuperadminV1ApexBarChart categories={data.movement.map((x) => x.label)} series={[{ name: 'Monthly income change', data: data.movement.map((x) => x.value) }]} horizontal valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Revenue share concentration" description="Shows how dependent the platform is on a few groups.">
    <div className="h-72">
      <SuperadminV1ApexBarChart categories={data.concentration.map((x) => x.group)} series={[{ name: 'Revenue share', data: data.concentration.map((x) => x.share) }]} valueFormatter={(v) => `${formatPercent1dp(v)}`}/>
    </div>
  </SuperadminV1Panel>
    </div>;
}
