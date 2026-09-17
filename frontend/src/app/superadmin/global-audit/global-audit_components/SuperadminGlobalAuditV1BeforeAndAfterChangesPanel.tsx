// RESPONSIBILITY: Renders the Superadmin global-audit V1 Before & after changes view.
'use client';
import { formatDateTime } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminGlobalAuditV1SectionProps } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditV1Types.ts';
export default function SuperadminGlobalAuditV1BeforeAndAfterChangesPanel({ data }: SuperadminGlobalAuditV1SectionProps) {
    return <SuperadminV1Panel title="Before & after changes" description="Inspect exactly what changed instead of reading only the event name.">
  <div className="space-y-3">
    {data.changes.map((c) => <div key={`${c.time}-${c.resource}`} className="rounded-lg border border-border p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">
            {c.action}
            ·
            {c.resource}
          </p>
          <p className="text-xs text-secondary">
            {c.actor}
            ·
            {formatDateTime(c.time)}
          </p>
        </div>
        <span className={c.risk === 'HIGH' ? 'rounded-full bg-danger-bg px-2 py-1 text-xs font-semibold text-danger' : c.risk === 'MEDIUM' ? 'rounded-full bg-warning-bg px-2 py-1 text-xs font-semibold text-warning' : 'rounded-full bg-info-bg px-2 py-1 text-xs font-semibold text-info'}>
          {c.risk}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-lg bg-input p-3">
          <p className="text-xs uppercase text-secondary">
            Before
          </p>
          <p className="mt-1 truncate text-sm text-foreground">
            {c.before}
          </p>
        </div>
        <div className="rounded-lg bg-primary-subtle p-3">
          <p className="text-xs uppercase text-primary">
            After
          </p>
          <p className="mt-1 truncate text-sm text-foreground">
            {c.after}
          </p>
        </div>
      </div>
    </div>)}
  </div>
    </SuperadminV1Panel>;
}
