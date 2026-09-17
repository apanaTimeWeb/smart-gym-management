// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin developer access list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminIntegrationsDeveloperAccessEmptyState() {
    return <SuperadminV1EmptyState title="Developer access" description="Issue a developer key only when a tenant integration requires platform API access."/>;
}
