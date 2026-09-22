// RESPONSIBILITY: Renders the Superadmin analytics V1 Income movement, Revenue share concentration view.
'use client';

import { formatCurrency } from '@/app/superadmin/analytics/analytics_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { formatNumber, formatPercent1dp } from '@/lib/formatters';
import ApexBarChart from '@/components/ui/ApexBarChart';
import Panel from '@/components/ui/Panel';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1IncomeMovementAndRevenueShareSection({ data }: SuperadminAnalyticsV1SectionProps) {
    const locale = useLocale();

    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Income movement" description="Where monthly income moved during the period.">
    <div className="h-72">
      <ApexBarChart categories={data.movement.map((x) => x.label)} series={[{ name: 'Monthly income change', data: data.movement.map((x) => x.value) }]} horizontal valueFormatter={(v) => formatCurrency(v, 'INR', locale)}/>
    </div>
  </Panel>
  <Panel title="Revenue share concentration" description="Shows how dependent the platform is on a few groups.">
    <div className="h-72">
      <ApexBarChart categories={data.concentration.map((x) => x.group)} series={[{ name: 'Revenue share', data: data.concentration.map((x) => x.share) }]} valueFormatter={(v) => `${formatPercent1dp(v)}`}/>
    </div>
  </Panel>
    </div>;
}
