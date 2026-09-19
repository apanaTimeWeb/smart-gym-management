// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin team members list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminTeamMembersEmptyState() {
    return <EmptyState title="Team members" description="Add a named operator when platform access is needed."/>;
}
