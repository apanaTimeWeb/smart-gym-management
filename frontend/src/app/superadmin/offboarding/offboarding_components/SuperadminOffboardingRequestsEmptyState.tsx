// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin export requests list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminOffboardingRequestsEmptyState() {
    return <SuperadminEmptyState title="Export requests" description="New data-export requests will appear here for review."/>;
}
