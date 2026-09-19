// RESPONSIBILITY: Renders the Superadmin jobs V1 Queue health view.
'use client';
import Panel from '@/components/ui/Panel';
import type { SuperadminJobsV1SectionProps } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsV1Types.ts';
export default function SuperadminJobsV1QueueHealthTable({ data }: SuperadminJobsV1SectionProps) {
    return <Panel title="Queue health" description="See where background work is building up.">
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary">
          <th className="px-3 py-3">
            Queue
          </th>
          <th className="px-3 py-3">
            Waiting
          </th>
          <th className="px-3 py-3">
            Running
          </th>
          <th className="px-3 py-3">
            Failed
          </th>
          <th className="px-3 py-3">
            Dead-letter
          </th>
        </tr>
      </thead>
      <tbody>
        {data.queues.map((q) => <tr key={q.name} className="border-b border-border">
          <td className="px-3 py-3 font-medium text-primary">
            {q.name}
          </td>
          <td className="px-3 py-3 text-secondary">
            {q.waiting}
          </td>
          <td className="px-3 py-3 text-secondary">
            {q.running}
          </td>
          <td className="px-3 py-3 text-danger">
            {q.failed24h}
          </td>
          <td className="px-3 py-3 text-warning">
            {q.deadLetter}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
