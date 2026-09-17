// RESPONSIBILITY: Renders the Superadmin integrations page header section.
'use client';
import type { SuperadminIntegrationsSectionProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
export default function SuperadminIntegrationsPageHeader({ data }: SuperadminIntegrationsSectionProps) {
    return (<div>
  <h1 className="text-2xl font-bold text-foreground">
    Integrations & Developer Access
  </h1>
  <p className="mt-1 text-sm text-secondary">
    Platform connection health, webhook delivery, and tenant developer access.
  </p>
    </div>);
}
