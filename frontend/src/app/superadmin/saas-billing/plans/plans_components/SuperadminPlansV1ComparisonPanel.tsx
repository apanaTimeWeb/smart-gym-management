// RESPONSIBILITY: Renders the Superadmin plans V1 Plan comparison view.
'use client';
import { displayValue, formatCurrency, formatNumber } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminPlansV1SectionProps } from '@/app/superadmin/saas-billing/plans/plans_types/SuperadminPlansV1Types.ts';
export default function SuperadminPlansV1ComparisonPanel({ data }: SuperadminPlansV1SectionProps) {
    return <Panel title="Plan comparison" description="Simple plan comparison for pricing and limit decisions.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Plan
          </th>
          <th className="px-3 py-3">
            Monthly price
          </th>
          <th className="px-3 py-3">
            Members
          </th>
          <th className="px-3 py-3">
            Storage
          </th>
          <th className="px-3 py-3">
            Branches
          </th>
        </tr>
      </thead>
      <tbody>
        {data.plans.map((p) => <tr key={p.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {p.name}
          </td>
          <td className="px-3 py-3 text-primary">
            {formatCurrency(p.monthly)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {p.members < 0 ? 'Unlimited' : formatNumber(p.members)}
          </td>
          <td className="px-3 py-3 text-secondary">
            {displayValue(p.storage, '—')}
            GB
          </td>
          <td className="px-3 py-3 text-secondary">
            {p.branches < 0 ? 'Unlimited' : formatNumber(p.branches)}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
