// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin webhook deliveries list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminIntegrationsWebhooksEmptyState() {
    return <SuperadminV1EmptyState title="Webhook deliveries" description="Successful and failed deliveries will appear here as integrations send events."/>;
}
