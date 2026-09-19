// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin developer access list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminIntegrationsDeveloperAccessEmptyState() {
    return <EmptyState title="Developer access" description="Issue a developer key only when a tenant integration requires platform API access."/>;
}
