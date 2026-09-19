// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin webhook deliveries list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminIntegrationsWebhooksEmptyState() {
    return <EmptyState title="Webhook deliveries" description="Successful and failed deliveries will appear here as integrations send events."/>;
}
