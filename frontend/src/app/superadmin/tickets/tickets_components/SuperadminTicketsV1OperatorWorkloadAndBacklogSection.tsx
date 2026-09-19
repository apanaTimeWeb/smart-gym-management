// RESPONSIBILITY: Renders the Superadmin tickets V1 Operator workload, Backlog age view.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminApexBarChart';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminTicketsV1SectionProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsV1Types.ts';
export default function SuperadminTicketsV1OperatorWorkloadAndBacklogSection({ data }: SuperadminTicketsV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminPanel title="Operator workload" description="Open work and overdue service targets by support operator.">
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
            <td className="px-3 py-3 font-medium text-primary">
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
  </SuperadminPanel>
  <SuperadminPanel title="Backlog age" description="Older tickets need faster attention.">
    <div className="h-64">
      <SuperadminApexBarChart categories={data.aging.map((x) => x.bucket)} series={[{ name: 'Tickets', data: data.aging.map((x) => x.count) }]} valueFormatter={(v) => formatNumber(v)}/>
    </div>
  </SuperadminPanel>
    </div>;
}
