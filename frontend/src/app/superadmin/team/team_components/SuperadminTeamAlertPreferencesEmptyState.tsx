// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin alert preferences list.
'use client';
import SuperadminEmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminEmptyState';
export default function SuperadminTeamAlertPreferencesEmptyState() {
    return <SuperadminEmptyState title="Alert preferences" description="Add alert preferences when platform monitoring notifications are needed."/>;
}
