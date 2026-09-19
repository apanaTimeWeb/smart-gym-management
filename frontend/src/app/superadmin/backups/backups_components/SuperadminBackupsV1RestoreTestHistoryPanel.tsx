// RESPONSIBILITY: Renders the Superadmin backups V1 Restore test history view.
'use client';
import Panel from '@/components/ui/Panel';
import type { SuperadminBackupsV1SectionProps } from '@/app/superadmin/backups/backups_types/SuperadminBackupsV1Types.ts';
export default function SuperadminBackupsV1RestoreTestHistoryPanel({ data }: SuperadminBackupsV1SectionProps) {
    return <Panel title="Restore test history" description="A backup existing on disk is not enough; restore tests prove that recovery works.">
  <div className="space-y-3">
    {data.restoreHistory.map((h) => <div key={h.date} className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <p className="font-medium text-primary">
          {h.date}
        </p>
        <p className="text-xs text-secondary">
          {h.scope}
          ·
          {h.durationMinutes}
          minutes
        </p>
      </div>
      <span className="text-xs font-semibold text-success">
        {h.status}
      </span>
    </div>)}
  </div>
    </Panel>;
}
