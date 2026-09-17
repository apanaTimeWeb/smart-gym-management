// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin connections list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminIntegrationsConnectionsEmptyState() {
    return <SuperadminV1EmptyState title="Connections" description="Connect a payment, messaging, email, or storage service to see its health."/>;
}
