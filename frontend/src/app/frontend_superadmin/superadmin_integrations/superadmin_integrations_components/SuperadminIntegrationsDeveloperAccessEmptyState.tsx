'use client';
// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin developer access list.
import { useTranslations } from 'next-intl';

import EmptyState from '@/components/ui/EmptyState';

/**
 * @description Renders the dedicated empty state for the Superadmin developer access list.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminIntegrationsDeveloperAccessEmptyState() {
  const t = useTranslations('superadmin_integrations');
    return <div data-testid="superadmin_integrations-integrations-integrations-developer-access-empty-state-empty"><EmptyState title={t('ui.developer_access_3462a73')} description={t('ui.issue_a_developer_key_only_when_a_tenant_integra_f64a8ae')}/>
    </div>;
}
