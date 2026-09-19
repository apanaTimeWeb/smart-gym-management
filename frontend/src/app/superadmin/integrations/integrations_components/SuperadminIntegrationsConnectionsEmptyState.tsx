// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin connections list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminIntegrationsConnectionsEmptyState() {
    return <SuperadminEmptyState title="Connections" description="Connect a payment, messaging, email, or storage service to see its health."/>;
}
