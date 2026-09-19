// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin offboarding queue list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminOffboardingQueueEmptyState() {
    return <EmptyState title="Offboarding queue" description="Cancelled tenants will appear here when export, grace, or purge steps are pending."/>;
}
