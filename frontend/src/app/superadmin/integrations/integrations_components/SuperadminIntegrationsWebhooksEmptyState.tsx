// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin webhook deliveries list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminIntegrationsWebhooksEmptyState() {
    return <SuperadminEmptyState title="Webhook deliveries" description="Successful and failed deliveries will appear here as integrations send events."/>;
}
