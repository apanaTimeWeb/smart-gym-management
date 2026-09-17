// RESPONSIBILITY: Renders the Superadmin cancellations V1 Why gyms leave, Churn by plan view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminCancellationsV1SectionProps } from '@/app/superadmin/cancellations/cancellations_types/SuperadminCancellationsV1Types.ts';
export default function SuperadminCancellationsV1ReasonsAndPlanComparisonSection({ data }: SuperadminCancellationsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Why gyms leave" description="Reason categories make retention actions more targeted.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary">
            <th className="px-3 py-3">
              Reason
            </th>
            <th className="px-3 py-3">
              Gyms
            </th>
            <th className="px-3 py-3">
              Income lost
            </th>
          </tr>
        </thead>
        <tbody>
          {data.reasons.map((r) => <tr key={r.reason} className="border-b border-border">
            <td className="px-3 py-3 font-medium text-foreground">
              {r.reason}
            </td>
            <td className="px-3 py-3 text-secondary">
              {r.gyms}
            </td>
            <td className="px-3 py-3 text-danger">
              {formatCurrency(r.incomeLost)}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Churn by plan" description="Simple plan-level comparison.">
    <div className="h-64">
      <SuperadminV1ApexBarChart categories={data.byPlan.map((x) => x.plan)} series={[{ name: 'Customer churn', data: data.byPlan.map((x) => x.churn) }]} valueFormatter={(v) => formatPercent1dp(v)}/>
    </div>
  </SuperadminV1Panel>
    </div>;
}
