// RESPONSIBILITY: Renders the Superadmin gyms V1 Tenant comparison sample view.
'use client';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminGymsV1SectionProps } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsV1Types.ts';
export default function SuperadminGymsV1TenantComparisonPanel({ data }: SuperadminGymsV1SectionProps) {
    return <SuperadminV1Panel title="Tenant comparison sample" description="This view gives Superadmin a quick operational picture without replacing the main tenant table.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Gym
          </th>
          <th className="px-3 py-3">
            Region
          </th>
          <th className="px-3 py-3">
            Plan
          </th>
          <th className="px-3 py-3">
            Monthly income
          </th>
          <th className="px-3 py-3">
            Health
          </th>
          <th className="px-3 py-3">
            Usage
          </th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row) => <tr key={row.name} className="border-b border-border">
          <td className="px-3 py-3">
            <span className="block max-w-52 truncate font-medium text-foreground">
              {row.name}
            </span>
            <span className="text-xs text-secondary">
              {row.status}
            </span>
          </td>
          <td className="px-3 py-3 text-secondary">
            {row.region}
          </td>
          <td className="px-3 py-3 text-secondary">
            {row.plan}
          </td>
          <td className="px-3 py-3 text-foreground">
            {formatCurrency(row.income)}
          </td>
          <td className="px-3 py-3 text-foreground">
            {formatNumber(row.health)}
            /100
          </td>
          <td className="px-3 py-3 text-foreground">
            {row.usage}
            %
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminV1Panel>;
}
