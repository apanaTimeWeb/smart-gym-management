// RESPONSIBILITY: Renders the dedicated empty state for the Superadmin saved groups list.
'use client';
import SuperadminV1EmptyState from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1EmptyState';
export default function SuperadminSegmentsSavedGroupsEmptyState() {
    return <SuperadminV1EmptyState title="Saved groups" description="Save a useful tenant filter when you need to reuse the same audience."/>;
}
