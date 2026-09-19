// RESPONSIBILITY: Renders the Superadmin branches V1 Branch scorecard view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminBranchesV1SectionProps } from '@/app/superadmin/branches/branches_types/SuperadminBranchesV1Types.ts';
export default function SuperadminBranchesV1PerformanceScorecard({ data }: SuperadminBranchesV1SectionProps) {
    return <SuperadminPanel title="Branch scorecard" description="Income, members, growth, and health on one table.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Branch
          </th>
          <th className="px-3 py-3">
            Gym / franchise
          </th>
          <th className="px-3 py-3">
            Members
          </th>
          <th className="px-3 py-3">
            Income
          </th>
          <th className="px-3 py-3">
            Growth
          </th>
          <th className="px-3 py-3">
            Health
          </th>
        </tr>
      </thead>
      <tbody>
        {data.branches.map((b) => <tr key={b.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {b.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {b.gym}
            <div className="text-xs">
              {b.region}
            </div>
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatNumber(b.members)}
          </td>
          <td className="px-3 py-3 text-primary">
            {formatCurrency(b.income)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {formatPercent1dp(b.growth)}
          </td>
          <td className="px-3 py-3 text-primary">
            {formatNumber(b.health)}
            /100
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminPanel>;
}
