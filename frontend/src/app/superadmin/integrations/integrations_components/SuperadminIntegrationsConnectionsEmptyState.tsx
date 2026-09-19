// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin connections list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminIntegrationsConnectionsEmptyState() {
    return <EmptyState title="Connections" description="Connect a payment, messaging, email, or storage service to see its health."/>;
}
