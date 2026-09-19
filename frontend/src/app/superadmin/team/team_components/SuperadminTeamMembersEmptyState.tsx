// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin team members list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminTeamMembersEmptyState() {
    return <SuperadminEmptyState title="Team members" description="Add a named operator when platform access is needed."/>;
}
