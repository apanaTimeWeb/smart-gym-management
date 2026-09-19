// RESPONSIBILITY: Renders the Superadmin settings V1 Billing controls view.
'use client';
import Panel from '@/components/ui/Panel';
import type { SuperadminSettingsV1SectionProps } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types.ts';
export default function SuperadminSettingsV1BillingControlsPanel({ data }: SuperadminSettingsV1SectionProps) {
    return <Panel title="Billing controls" description="Commercial timing and payment governance.">
  <div className="space-y-3">
    {data.billing.map((x) => <div key={x.label} className="flex items-center justify-between rounded-lg border border-border p-3">
      <span className="text-sm text-secondary">
        {x.label}
      </span>
      <span className="text-sm font-medium text-primary">
        {x.value}
      </span>
    </div>)}
  </div>
    </Panel>;
}
