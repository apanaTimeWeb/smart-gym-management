// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin role groups list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminTeamRoleGroupsEmptyState() {
    return <SuperadminEmptyState title="Role groups" description="Create role groups before assigning platform permissions."/>;
}
