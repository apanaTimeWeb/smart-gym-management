// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin team members list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminTeamMembersEmptyState() {
    return <SuperadminV1EmptyState title="Team members" description="Add a named operator when platform access is needed."/>;
}
