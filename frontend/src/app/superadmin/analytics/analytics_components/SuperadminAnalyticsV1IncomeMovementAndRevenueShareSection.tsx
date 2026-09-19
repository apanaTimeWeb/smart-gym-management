// RESPONSIBILITY: Renders the Superadmin analytics V1 Income movement, Revenue share concentration view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminApexBarChart';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection({ data }: SuperadminAnalyticsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminPanel title="Income movement" description="Where monthly income moved during the period.">
    <div className="h-72">
      <SuperadminApexBarChart categories={data.movement.map((x) => x.label)} series={[{ name: 'Monthly income change', data: data.movement.map((x) => x.value) }]} horizontal valueFormatter={(v) => formatCurrency(v)}/>
    </div>
  </SuperadminPanel>
  <SuperadminPanel title="Revenue share concentration" description="Shows how dependent the platform is on a few groups.">
    <div className="h-72">
      <SuperadminApexBarChart categories={data.concentration.map((x) => x.group)} series={[{ name: 'Revenue share', data: data.concentration.map((x) => x.share) }]} valueFormatter={(v) => `${formatPercent1dp(v)}`}/>
    </div>
  </SuperadminPanel>
    </div>;
}
