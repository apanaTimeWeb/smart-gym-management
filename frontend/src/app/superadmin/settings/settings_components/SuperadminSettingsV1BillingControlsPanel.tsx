// RESPONSIBILITY: Renders the Superadmin settings V1 Billing controls view.
'use client';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import type { SuperadminSettingsV1SectionProps } from '@/app/superadmin/settings/settings_types/SuperadminSettingsV1Types.ts';
export default function SuperadminSettingsV1BillingControlsPanel({ data }: SuperadminSettingsV1SectionProps) {
    return <SuperadminV1Panel title="Billing controls" description="Commercial timing and payment governance.">
  <div className="space-y-3">
    {data.billing.map((x) => <div key={x.label} className="flex items-center justify-between rounded-lg border border-border p-3">
      <span className="text-sm text-secondary">
        {x.label}
      </span>
      <span className="text-sm font-medium text-foreground">
        {x.value}
      </span>
    </div>)}
  </div>
    </SuperadminV1Panel>;
}
