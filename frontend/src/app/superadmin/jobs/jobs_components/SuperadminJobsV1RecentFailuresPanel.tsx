// RESPONSIBILITY: Renders the Superadmin jobs V1 Recent job failures view.
'use client';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import type { SuperadminJobsV1SectionProps } from '@/app/superadmin/jobs/jobs_types/SuperadminJobsV1Types.ts';
export default function SuperadminJobsV1RecentFailuresPanel({ data }: SuperadminJobsV1SectionProps) {
    return <Panel title="Recent job failures" description="Actionable failures with tenant context and reasons.">
  <div className="space-y-3">
    {data.recentFailures.map((f) => <div key={`${f.job}-${f.time}`} className="rounded-lg border border-border p-3">
      <div className="flex justify-between gap-3">
        <span className="truncate font-medium text-primary">
          {f.job}
        </span>
        <span className="text-xs text-secondary">
          {formatDateTime(f.time)}
        </span>
      </div>
      <p className="mt-1 text-xs text-secondary">
        {f.tenant}
      </p>
      <p className="mt-1 text-xs text-danger">
        {f.reason}
      </p>
    </div>)}
  </div>
    </Panel>;
}
