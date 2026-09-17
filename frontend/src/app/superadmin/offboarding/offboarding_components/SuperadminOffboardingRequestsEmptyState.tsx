// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin export requests list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminOffboardingRequestsEmptyState() {
    return <SuperadminV1EmptyState title="Export requests" description="New data-export requests will appear here for review."/>;
}
