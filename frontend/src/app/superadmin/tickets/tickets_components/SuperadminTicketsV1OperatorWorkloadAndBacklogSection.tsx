// RESPONSIBILITY: Renders the Superadmin tickets V1 Operator workload, Backlog age view.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminTicketsV1SectionProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types.ts';
export default function SuperadminTicketsV1OperatorWorkloadAndBacklogSection({ data }: SuperadminTicketsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Operator workload" description="Open work and overdue service targets by support operator.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary">
            <th className="px-3 py-3">
              Operator
            </th>
            <th className="px-3 py-3">
              Open
            </th>
            <th className="px-3 py-3">
              Urgent
            </th>
            <th className="px-3 py-3">
              Over target
            </th>
            <th className="px-3 py-3">
              Avg hours
            </th>
          </tr>
        </thead>
        <tbody>
          {data.agents.map((a) => <tr key={a.name} className="border-b border-border">
            <td className="px-3 py-3 font-medium text-foreground">
              {a.name}
            </td>
            <td className="px-3 py-3 text-secondary">
              {a.open}
            </td>
            <td className="px-3 py-3 text-warning">
              {a.urgent}
            </td>
            <td className="px-3 py-3 text-danger">
              {a.overTarget}
            </td>
            <td className="px-3 py-3 text-secondary">
              {a.averageHours}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Backlog age" description="Older tickets need faster attention.">
    <div className="h-64">
      <SuperadminV1ApexBarChart categories={data.aging.map((x) => x.bucket)} series={[{ name: 'Tickets', data: data.aging.map((x) => x.count) }]} valueFormatter={(v) => formatNumber(v)}/>
    </div>
  </SuperadminV1Panel>
    </div>;
}
