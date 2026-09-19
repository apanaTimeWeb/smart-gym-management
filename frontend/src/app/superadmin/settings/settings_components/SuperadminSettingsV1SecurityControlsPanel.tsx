// RESPONSIBILITY: Renders the Superadmin settings V1 Security controls view.
'use client';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminSettingsV1SectionProps } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types.ts';
export default function SuperadminSettingsV1SecurityControlsPanel({ data }: SuperadminSettingsV1SectionProps) {
    return <SuperadminPanel title="Security controls" description="Platform operator and login safeguards.">
  <div className="space-y-3">
    {data.security.map((x) => <div key={x.label} className="flex items-center justify-between rounded-lg border border-border p-3">
      <span className="text-sm text-secondary">
        {x.label}
      </span>
      <span className="text-sm font-medium text-primary">
        {x.value}
      </span>
    </div>)}
  </div>
    </SuperadminPanel>;
}
