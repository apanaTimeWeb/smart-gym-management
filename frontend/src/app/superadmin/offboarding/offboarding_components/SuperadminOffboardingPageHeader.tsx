// RESPONSIBILITY: Renders the Superadmin offboarding page header section.
'use client';
import type { SuperadminOffboardingSectionProps } from '@/app/superadmin/offboarding/offboarding_types/SuperadminOffboardingTypes';
export default function SuperadminOffboardingPageHeader({ data }: SuperadminOffboardingSectionProps) {
    return (<div>
  <h1 className="text-2xl font-bold text-foreground">
    Tenant Offboarding
  </h1>
  <p className="mt-1 text-sm text-secondary">
    Export, grace-period, approval, and final purge control for cancelled tenants.
  </p>
    </div>);
}
