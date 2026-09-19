// RESPONSIBILITY: Renders the Superadmin franchises V1 Branch comparison, Franchise financial control view.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminFranchisesV1SectionProps } from '@/app/superadmin/franchises/franchises_types/SuperadminFranchisesV1Types.ts';
export default function SuperadminFranchisesV1BranchAndFinancialSection({ data }: SuperadminFranchisesV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Branch comparison" description="Compare important branches side-by-side.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary">
            <th className="px-3 py-3">
              Branch
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
          {data.branchComparison.map((b) => <tr key={b.branch} className="border-b border-border">
            <td className="px-3 py-3">
              <span className="block max-w-48 truncate font-medium text-primary">
                {b.branch}
              </span>
              <span className="text-xs text-secondary">
                {b.franchise}
              </span>
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
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </Panel>
  <Panel title="Franchise financial control" description="Royalty and due amounts in one simple summary.">
    <div className="space-y-3">
      {data.financials.map((f) => <div key={f.franchise} className="rounded-lg border border-border p-3">
        <div className="flex justify-between">
          <span className="font-medium text-primary">
            {f.franchise}
          </span>
          <span className="text-xs text-secondary">
            {f.contract}
          </span>
        </div>
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-secondary">
            Royalty
          </span>
          <span className="text-primary">
            {formatCurrency(f.royalty)}
          </span>
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-secondary">
            Due
          </span>
          <span className={f.due > 0 ? 'text-danger' : 'text-success'}>
            {formatCurrency(f.due)}
          </span>
        </div>
      </div>)}
    </div>
  </Panel>
    </div>;
}
