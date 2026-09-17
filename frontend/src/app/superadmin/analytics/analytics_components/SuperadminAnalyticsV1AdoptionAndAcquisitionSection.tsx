// RESPONSIBILITY: Renders the Superadmin analytics V1 Feature adoption, Acquisition source comparison view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1AdoptionAndAcquisitionSection({ data }: SuperadminAnalyticsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Feature adoption" description="Available vs enabled vs actually used by tenants.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase text-secondary">
            <th className="px-3 py-3 text-left">
              Feature
            </th>
            <th className="px-3 py-3">
              Available
            </th>
            <th className="px-3 py-3">
              Enabled
            </th>
            <th className="px-3 py-3">
              Used
            </th>
          </tr>
        </thead>
        <tbody>
          {data.adoption.map((a) => <tr key={a.feature} className="border-b border-border">
            <td className="px-3 py-3 font-medium text-foreground">
              {a.feature}
            </td>
            <td className="px-3 py-3 text-secondary">
              {formatNumber(a.available)}
            </td>
            <td className="px-3 py-3 text-secondary">
              {formatNumber(a.active)}
            </td>
            <td className="px-3 py-3 text-foreground">
              {formatNumber(a.used)}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Acquisition source comparison" description="Compare source quality by volume, income, and churn.">
    <div className="space-y-3">
      {data.sources.map((s) => <div key={s.source} className="rounded-lg border border-border p-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">
            {s.source}
          </span>
          <span className="text-sm text-primary">
            {formatNumber(s.gyms)}
            gyms
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-secondary">
          <span>
            {formatCurrency(s.monthlyIncome)}
          </span>
          <span>
            {formatPercent1dp(s.churn)}
            churn
          </span>
        </div>
      </div>)}
    </div>
  </SuperadminV1Panel>
    </div>;
}
