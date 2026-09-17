// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin role groups list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminTeamRoleGroupsEmptyState() {
    return <SuperadminV1EmptyState title="Role groups" description="Create role groups before assigning platform permissions."/>;
}
