// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin alert preferences list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminTeamAlertPreferencesEmptyState() {
    return <SuperadminV1EmptyState title="Alert preferences" description="Add alert preferences when platform monitoring notifications are needed."/>;
}
