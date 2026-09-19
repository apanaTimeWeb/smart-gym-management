// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin developer access list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminIntegrationsDeveloperAccessEmptyState() {
    return <SuperadminEmptyState title="Developer access" description="Issue a developer key only when a tenant integration requires platform API access."/>;
}
