// RESPONSIBILITY: Renders the Superadmin analytics V1 Cohort retention view.
'use client';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminAnalyticsV1SectionProps } from '@/app/superadmin/analytics/analytics_types/SuperadminAnalyticsV1Types.ts';
export default function SuperadminAnalyticsV1CohortRetentionTable({ data }: SuperadminAnalyticsV1SectionProps) {
    return <SuperadminV1Panel title="Cohort retention" description="Each row follows gyms that started in the same month. Higher percentages mean more gyms remained active.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-xs uppercase text-secondary">
          <th className="px-3 py-3 text-left">
            Signup month
          </th>
          <th className="px-3 py-3">
            Month 1
          </th>
          <th className="px-3 py-3">
            Month 2
          </th>
          <th className="px-3 py-3">
            Month 3
          </th>
          <th className="px-3 py-3">
            Month 6
          </th>
          <th className="px-3 py-3">
            Month 12
          </th>
        </tr>
      </thead>
      <tbody>
        {data.cohort.map((c) => <tr key={c.month} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-foreground">
            {c.month}
          </td>
          {[c.m1, c.m2, c.m3, c.m6, c.m12].map((v, i) => <td key={`${c.month}-${i}`} className={`px-3 py-3 text-center ${v >= 90 ? 'text-success' : v >= 80 ? 'text-warning' : 'text-danger'}`}>
            {v}
            %
          </td>)}
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminV1Panel>;
}
