// RESPONSIBILITY: Renders the Superadmin features V1 Platform release log, Rollback readiness view.
'use client';
import { formatDateTime } from '@/lib/formatters';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminFeaturesV1SectionProps } from '@/app/superadmin/features/features_types/SuperadminFeaturesV1Types.ts';
export default function SuperadminFeaturesV1ReleaseAndRollbackSection({ data }: SuperadminFeaturesV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Platform release log" description="Internal release notes for the Superadmin surface itself.">
    <div className="space-y-3">
      {data.releases.map((r) => <div key={r.version} className="rounded-lg border border-border p-3">
        <div className="flex justify-between">
          <span className="font-medium text-foreground">
            {r.version}
          </span>
          <span className="text-xs text-secondary">
            {r.date}
          </span>
        </div>
        <p className="mt-1 text-sm text-foreground">
          {r.summary}
        </p>
        <p className="mt-1 text-xs text-secondary">
          Impact:
          {r.impact}
        </p>
      </div>)}
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Rollback readiness" description="Keep the last healthy point visible before increasing rollout.">
    <div className="space-y-3">
      {data.rollback.map((r) => <div key={r.feature} className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <p className="font-medium text-foreground">
            {r.feature}
          </p>
          <p className="text-xs text-secondary">
            Last healthy:
            {formatDateTime(r.lastHealthy)}
          </p>
        </div>
        <span className="text-xs text-secondary">
          Last rollback:
          {r.lastRollback}
        </span>
      </div>)}
    </div>
  </SuperadminV1Panel>
    </div>;
}
