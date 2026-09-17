// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin offboarding queue list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminOffboardingQueueEmptyState() {
    return <SuperadminV1EmptyState title="Offboarding queue" description="Cancelled tenants will appear here when export, grace, or purge steps are pending."/>;
}
