// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin alert preferences list.
'use client';
import EmptyState from '@/components/ui/EmptyState';
export default function SuperadminTeamAlertPreferencesEmptyState() {
    return <EmptyState title="Alert preferences" description="Add alert preferences when platform monitoring notifications are needed."/>;
}
