// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin export requests list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminOffboardingRequestsEmptyState() {
    return <EmptyState title="Export requests" description="New data-export requests will appear here for review."/>;
}
