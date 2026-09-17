// RESPONSIBILITY: Renders the Superadmin infrastructure V1 Service endpoint health view.
'use client';
import { formatNumber, formatPercent1dp, formatDateTime } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminInfrastructureV1SectionProps } from '@/app/superadmin/infrastructure/infrastructure_types/SuperadminInfrastructureV1Types.ts';
export default function SuperadminInfrastructureV1EndpointHealthTable({ data }: SuperadminInfrastructureV1SectionProps) {
    return <SuperadminV1Panel title="Service endpoint health" description="Response speed and error rate by major endpoint family.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Endpoint
          </th>
          <th className="px-3 py-3">
            Typical
          </th>
          <th className="px-3 py-3">
            Slow
          </th>
          <th className="px-3 py-3">
            Worst
          </th>
          <th className="px-3 py-3">
            Errors
          </th>
        </tr>
      </thead>
      <tbody>
        {data.endpoints.map((e) => <tr key={e.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-foreground">
            {e.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {e.p50}
            ms
          </td>
          <td className="px-3 py-3 text-secondary">
            {e.p95}
            ms
          </td>
          <td className="px-3 py-3 text-warning">
            {e.p99}
            ms
          </td>
          <td className="px-3 py-3 text-danger">
            {formatPercent1dp(e.errors)}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </SuperadminV1Panel>;
}
