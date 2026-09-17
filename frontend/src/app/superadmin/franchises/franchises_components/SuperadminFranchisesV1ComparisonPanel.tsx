// RESPONSIBILITY: Renders the Superadmin franchises V1 Franchise comparison view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminFranchisesV1SectionProps } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesV1Types.ts';
export default function SuperadminFranchisesV1ComparisonPanel({ data }: SuperadminFranchisesV1SectionProps) {
    return <SuperadminV1Panel title="Franchise comparison" description="Income, growth, branch count, and health by franchise group.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Franchise
          </th>
          <th className="px-3 py-3">
            Branches
          </th>
          <th className="px-3 py-3">
            Monthly income
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
        {data.franchises.map((f) => <tr key={f.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-foreground">
            {f.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {f.branches}
          </td>
          <td className="px-3 py-3 text-foreground">
            {formatCurrency(f.income)}
          </td>
          <td className={f.growth >= 0 ? 'px-3 py-3 text-success' : 'px-3 py-3 text-danger'}>
            {formatPercent1dp(f.growth)}
          </td>
          <td className="px-3 py-3 text-foreground">
            {formatNumber(f.health)}
            /100
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminV1Panel>;
}
