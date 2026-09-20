// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin role groups list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminTeamRoleGroupsEmptyState() {
    return <EmptyState title="Role groups" description="Create role groups before assigning platform permissions."/>;
}
