'use client';
// RESPONSIBILITY: Renders the Superadmin integrations page header section.
import { useTranslations } from 'next-intl';

import type { SuperadminIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsTypes';

/**
 * @description Renders the Superadmin integrations page header section.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminIntegrationsPageHeader({ data }: SuperadminIntegrationsSectionProps) {
  const t = useTranslations('superadmin_integrations');
    return (<div>
  <h1 className="superadmin-page-title text-primary">
    
    {t('ui.integrations_developer_access_ea889ff')}
  </h1>
  <p className="mt-1 text-sm text-secondary">
    
    {t('ui.platform_connection_health_webhook_delivery_and__6450d6e')}
  </p>
    </div>);
}
