// RESPONSIBILITY: Renders the Superadmin global-audit V1 Suspicious activity view.
'use client';
import { CircleAlert } from 'lucide-react';
import { getSuperadminGlobalAuditStatusBadgeClasses } from '@/app/superadmin/global-audit/global_audit_utils/SuperadminGlobalAuditStatusBadgeConfig';
import Panel from '@/components/ui/Panel';
import type { SuperadminGlobalAuditV1SectionProps } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditV1Types.ts';
export default function SuperadminGlobalAuditV1SuspiciousActivityPanel({ data }: SuperadminGlobalAuditV1SectionProps) {
    return <Panel title="Suspicious activity" description="Operational patterns worth human review.">
  <div className="space-y-3">
    {data.anomalies.map((a) => <div key={a.title} className="flex gap-3 rounded-lg border border-border p-3">
      <CircleAlert size={18} className={getSuperadminGlobalAuditStatusBadgeClasses(a.severity)}/>
      <div>
        <p className="font-medium text-primary">
          {a.title}
        </p>
        <p className="mt-1 text-xs text-secondary">
          {a.detail}
        </p>
      </div>
    </div>)}
  </div>
    </Panel>;
}
