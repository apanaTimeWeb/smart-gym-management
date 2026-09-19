// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin offboarding queue list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminOffboardingQueueEmptyState() {
    return <SuperadminEmptyState title="Offboarding queue" description="Cancelled tenants will appear here when export, grace, or purge steps are pending."/>;
}
