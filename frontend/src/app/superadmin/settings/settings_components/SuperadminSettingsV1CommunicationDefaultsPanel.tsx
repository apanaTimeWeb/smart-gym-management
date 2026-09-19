// RESPONSIBILITY: Renders the Superadmin settings V1 Communication defaults view.
'use client';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import type { SuperadminSettingsV1SectionProps } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types.ts';
export default function SuperadminSettingsV1CommunicationDefaultsPanel({ data }: SuperadminSettingsV1SectionProps) {
    return <SuperadminPanel title="Communication defaults" description="Platform-wide alert routing defaults.">
  <div className="space-y-3">
    {data.communication.map((x) => <div key={x.label} className="flex items-center justify-between rounded-lg border border-border p-3">
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
